import { PDFDocument, rgb } from "pdf-lib";
import fs from "fs";
import sharp from "sharp";

const FIG = "figures";
const A4 = { w: 595.28, h: 841.89 }; // points (72 dpi)
const MARGIN = 46;

const figures = [
  {
    file: "fig1_method.png",
    label: "Fig. 1",
    caption:
      "Functional decomposition of the MeshCrowd sensing pipeline. Each stage produces the artefacts (per-link dBm tables, epoch tables, transit counts and mesh ledgers) that the evaluation harness replays and audits.",
    tall: false,
  },
  {
    file: "fig2_arch.png",
    label: "Fig. 2",
    caption:
      "Layered system architecture of MeshCrowd, from unmodified radio hardware through per-link DSP and inference to the application and gamification layer.",
    tall: false,
  },
  {
    file: "fig3_sense.png",
    label: "Fig. 3",
    caption:
      "The Sense dashboard: 33 passive links (BLE and dual-band Wi-Fi) within a 20 m radius, live counters (People 67, Vehicles 66, Disturbances 165, RF Links 33), moving variance 11.45 dB², jitter 1.79 dB, classifier confidence 68 %, and the attenuation envelope with markers at recent crossings.",
    tall: true,
  },
  {
    file: "fig4_scans.png",
    label: "Fig. 4",
    caption:
      "The Scans tab: a stored epoch (window 19:56:03–19:56:18 s, place “My place”, geo 40.3075, 21.7906, 33 links with 5 links moved ≥3 dB, max 14.0 dB) and the verdict “field CHANGED since previous scan” plus the 120-scan history.",
    tall: true,
  },
  {
    file: "fig5_mesh.png",
    label: "Fig. 5",
    caption:
      "The Mesh tab: 2–5 cooperating nodes confirm each other's crossings; the effective radius extends from 4–12 m (single phone) toward 20–40 m, with a reliability bonus for devices nearest the fused estimate.",
    tall: true,
  },
  {
    file: "fig6_transit.png",
    label: "Fig. 6",
    caption:
      "The Transit tab: a two-node barrier over Classic Bluetooth RFCOMM and BLE L2CAP; per-link presence and loss are fused so both a drop and an appearance are evidence, and detection is reported at each separation.",
    tall: true,
  },
  {
    file: "fig7_club.png",
    label: "Fig. 7",
    caption:
      "The Club tab: mesh contribution (nodes in your mesh, fused accuracy, crowd level), the scoring rule (people +10 XP, vehicles +14 XP, disturbances +2 XP, +15 XP and a ×2 fusion bonus per mesh-confirmed crossing), and the session history.",
    tall: true,
  },
];

/* word-wrap caption to a given max width using Helvetica */
function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines;
}

function escapePdf(s) {
  return s
    .replace(/[\u2265]/g, ">=") // ≥
    .replace(/[\u2264]/g, "<=") // ≤
    .replace(/[\u00D7]/g, "x") // ×
    .replace(/[\u2019\u2018]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2014\u2013]/g, "-") // em/en dash
    .replace(/[\u2212]/g, "-") // minus
    .replace(/[\u00B7]/g, " - ") // ·
    .replace(/[\u00b2]/g, "2") // superscript 2
    .replace(/[\u03c3\u0393\u00b1\u00b0]/g, "") // σ Γ α °
    .replace(/[\u00B0]/g, "") // °
    .replace(/[^\x20-\x7E]/g, "");
}

async function build() {
  const doc = await PDFDocument.create();
  const helv = await doc.embedFont("Helvetica");
  const helvB = await doc.embedFont("Helvetica-Bold");

  for (let i = 0; i < figures.length; i++) {
    const f = figures[i];
    const page = doc.addPage([A4.w, A4.h]);
    const meta = await sharp(`${FIG}/${f.file}`).metadata();
    const ar = meta.width / meta.height;

    // available area for the image
    const maxW = A4.w - MARGIN * 2;
    const maxH = A4.h - MARGIN * 2 - 64; // leave room for caption + number

    let w = maxW;
    let h = w / ar;
    if (h > maxH) {
      h = maxH;
      w = h * ar;
    }

    const img = await doc.embedPng(fs.readFileSync(`${FIG}/${f.file}`));
    const x = (A4.w - w) / 2;
    const imgTop = MARGIN + (maxH - h) / 2;
    page.drawImage(img, { x, y: A4.h - imgTop - h, width: w, height: h });

    // figure number + caption
    const capWidth = maxW - 10;
    const capMaxChars = Math.floor(capWidth / 7.2);
    const lines = wrap(escapePdf(f.caption), capMaxChars);

    let y = MARGIN - 2;
    // caption text
    const capTop = A4.h - imgTop - h + 18;
    y = capTop;
    page.drawText(`${f.label}. `.trim(), { x: MARGIN + 5, y, size: 9.5, font: helvB, color: rgb(0.08, 0.08, 0.08) });
    // caption body below the label on same block
    y -= 13;
    for (const line of lines) {
      page.drawText(line, { x: MARGIN + 5, y, size: 9, font: helv, color: rgb(0.24, 0.24, 0.24) });
      y -= 11.5;
    }

    // page footer (only on subsequent pages except last)
    page.drawText(`MeshCrowd — figure set · page ${i + 1} of ${figures.length}`, {
      x: MARGIN,
      y: MARGIN - 16,
      size: 7.5,
      font: helv,
      color: rgb(0.55, 0.55, 0.55),
    });
  }

  const bytes = await doc.save();
  fs.writeFileSync("MeshCrowd_Figures.pdf", bytes);
  console.log("Wrote MeshCrowd_Figures.pdf (", (bytes.length / 1024).toFixed(1), "KB ),", figures.length, "figures");
}
build().catch((e) => {
  console.error(e);
  process.exit(1);
});
