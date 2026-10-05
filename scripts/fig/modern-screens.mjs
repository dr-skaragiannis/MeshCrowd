import sharp from "sharp";
import fs from "fs";

const C = {
  ivory: "#FAF9F5",
  pampas: "#F0EEE6",
  pampasDeep: "#E6E3D8",
  ink: "#141413",
  inkSoft: "#2A2925",
  muted: "#6B6A61",
  mist: "#9B9A92",
  line: "#E2E0D6",
  lineStrong: "#D3D1C7",
  clay: "#C15F3C",
  claySoft: "#F3DDD2",
  book: "#CC785C",
  kraft: "#D4A27F",
  sand: "#EBDCBC",
  kelp: "#629A90",
  kelpDeep: "#3F6B60",
  olive: "#5F7A45",
  oliveDeep: "#3F552B",
  denim: "#3F6B8A",
  denimDeep: "#30536C",
};
const SANS = "DejaVu Sans, Arial, sans-serif";
const MONO = "DejaVu Sans Mono, monospace";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const textW = (t, fs) => String(t).length * fs * 0.58;

const softShadow = (id, dy = 4, blur = 8, op = 0.08) =>
  `<filter id="${id}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${blur}" flood-color="#141413" flood-opacity="${op}"/></filter>`;
const gradient = (id, from, to) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;

/* ---------- reusable phone screen atoms ---------- */

function t(x, y, s, { fs = 12, fill = C.ink, anchor = "start", weight, fam = SANS, code = false, spacing } = {}) {
  return `<text x="${x}" y="${y}" font-size="${fs}" fill="${fill}" font-family="${code ? MONO : fam}" text-anchor="${anchor}"${weight ? ` font-weight="${weight}"` : ""}${spacing ? ` letter-spacing="${spacing}"` : ""}>${esc(s)}</text>`;
}

function card(x, y, w, h, { fill = "#ffffff", stroke = C.line, r = 16, sh = "sh", grad } = {}) {
  const fillAttr = grad ? `url(#${grad})` : fill;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fillAttr}" stroke="${stroke}" stroke-width="1" filter="url(#${sh})"/>`;
}

function nodeDot(x, y, color) {
  return `<circle cx="${x}" cy="${y}" r="4" fill="${color}"/><circle cx="${x}" cy="${y}" r="6" fill="${color}" opacity="0.25"/>`;
}

function bar(x, y, w, pct, color, h = 6) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${C.pampasDeep}"/><rect x="${x}" y="${y}" width="${(w * pct) / 100}" height="${h}" rx="${h / 2}" fill="${color}"/>`;
}

function krow(x, y, k, v, { accent } = {}) {
  return (
    t(x, y + 10, k, { fs: 12, fill: C.muted }) +
    t(x + 200, y + 10, v, { fs: 12, fill: accent || C.ink, anchor: "end", code: true, weight: 600 })
  );
}

function pillT(x, y, label, { fill = C.pampas, color = C.muted, fs = 11, h = 25, bold } = {}) {
  const w = textW(label, fs) + 24;
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" filter="url(#shShort)"/>` +
    `<text x="${x + w / 2}" y="${y + h / 2 + fs * 0.36}" font-size="${fs}" fill="${color}" font-family="${SANS}" text-anchor="middle"${bold ? ' font-weight="600"' : ""}>${esc(label)}</text>`
  );
}

/* ---------- phone frame ---------- */
function phone(content, { active = "sense", time = "19:56", status = true } = {}) {
  const W = 400, H = 872;
  const tabs = ["sense", "scans", "mesh", "transit", "club", "settings"];
  const labels = { sense: "Sense", scans: "Scans", mesh: "Mesh", transit: "Transit", club: "Club", settings: "Settings" };
  const tabColors = { sense: C.clay, scans: C.book, mesh: C.kelpDeep, transit: C.denim, club: C.olive, settings: C.muted };

  const defs = [
    gradient("gBezel", "#3A3836", "#1E1C1B"),
    gradient("gScreen", "#F2F0EA", "#EFEDE6"),
    gradient("gSand", "#F3E4CB", "#EBDCBC"),
    softShadow("sh", 5, 12, 0.08),
    softShadow("shShort", 2, 5, 0.06),
    softShadow("shPhone", 30, 50, 0.4),
  ].join("");

  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">`;
  s += `<defs>${defs}</defs>`;

  // drop shadow behind phone
  s += `<rect x="6" y="16" width="${W - 12}" height="${H - 20}" rx="54" fill="url(#gBezel)" filter="url(#shPhone)"/>`;

  // bezel
  s += `<rect x="4" y="6" width="${W - 8}" height="${H - 12}" rx="54" fill="url(#gBezel)"/>`;
  // screen
  s += `<rect x="12" y="14" width="${W - 24}" height="${H - 28}" rx="42" fill="url(#gScreen)"/>`;
  // side buttons
  s += `<rect x="0" y="220" width="4" height="46" rx="2" fill="#7a7876"/><rect x="0" y="280" width="4" height="70" rx="2" fill="#7a7876"/>`;

  // status bar
  s += `<text x="30" y="44" font-size="12" font-family="${MONO}" fill="#4A4845" font-weight="600">${time}</text>`;
  s += `<g fill="#4A4845"><circle cx="${W - 96}" cy="40" r="1.4"/><circle cx="${W - 90}" cy="40" r="1.4"/><circle cx="${W - 84}" cy="40" r="1.4"/><rect x="${W - 70}" y="35" width="13" height="10" rx="2.4" fill="none" stroke="#4A4845" stroke-width="1.2"/><rect x="${W - 42}" y="35" width="24" height="10" rx="3" fill="none" stroke="#4A4845" stroke-width="1.2"/></g>`;
  s += `<text x="${W - 108}" y="44" font-size="10.5" font-family="${MONO}" fill="#4A4845">52%</text>`;

  // pillar in dynamic island
  s += `<rect x="${W / 2 - 42}" y="22" width="84" height="20" rx="10" fill="#0E0D0C"/>`;

  /* scrollable content (clipped) */
  s += `<defs><clipPath id="scr"><rect x="22" y="58" width="${W - 44}" height="${H - 58 - 96 - 20}" rx="20"/></clipPath></defs>`;
  s += `<g clip-path="url(#scr)">${content}</g>`;

  // bottom nav
  const navH = 66, navY = H - 20 - navH;
  s += `<rect x="12" y="${navY}" width="${W - 24}" height="${navH}" fill="url(#gScreen)"/>`;
  const tabW = (W - 24) / 6;
  tabs.forEach((tab, i) => {
    const cx = 12 + tabW * i + tabW / 2;
    const top = navY + 12;
    const on = tab === active;
    if (on) {
      s += `<rect x="${cx - 25}" y="${top - 4}" width="50" height="32" rx="17" fill="url(#gSand)" filter="url(#shShort)"/>`;
    }
    const col = on ? C.clay : "#8A887F";
    s += navIcon(tab, cx, top + 12, col);
    s += `<text x="${cx}" y="${top + 42}" font-size="9.5" font-family="${SANS}" text-anchor="middle" fill="${on ? C.clay : "#8A887F"}"${on ? ' font-weight="600"' : ""}>${labels[tab]}</text>`;
  });

  // system nav bar
  s += `<rect x="12" y="${H - 20}" width="${W - 24}" height="20" fill="#8B8A86"/>`;
  const syY = H - 20 + 13;
  s += `<g stroke="#ffffff" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="${W / 2 - 36}" y="${syY - 7}" width="15" height="14" rx="3"/><circle cx="${W / 2}" cy="${syY}" r="7"/><path d="M${W / 2 + 36 - 7} ${syY - 7} l-7 7 7 7"/></g>`;

  s += `</svg>`;
  return s;
}

function navIcon(name, cx, cy, col) {
  const sw = 1.6;
  let g = `<g stroke="${col}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round">`;
  switch (name) {
    case "sense": g += `<circle cx="${cx}" cy="${cy}" r="1.6" fill="${col}" stroke="none"/><path d="M${cx - 8} ${cy + 9} a12 12 0 0 1 0 -18 M${cx + 8} ${cy - 9} a12 12 0 0 1 0 18"/>`; break;
    case "scans": g += `<circle cx="${cx}" cy="${cy}" r="8"/><path d="M${cx} ${cy - 8} v8 l6 1"/>`; break;
    case "mesh": g += `<circle cx="${cx}" cy="${cy - 6}" r="2" fill="${col}" stroke="none"/><circle cx="${cx - 7}" cy="${cy + 5}" r="2" fill="${col}" stroke="none"/><circle cx="${cx + 7}" cy="${cy + 5}" r="2" fill="${col}" stroke="none"/><path d="M${cx - 1} ${cy - 4} l-5 7 M${cx + 1} ${cy - 4} l5 7 M${cx - 5} ${cy + 5} h10"/>`; break;
    case "transit": g += `<path d="M${cx - 9} ${cy} h11 M${cx + 9} ${cy} l-3 -3 M${cx + 9} ${cy} l-3 3"/>`; break;
    case "club": g += `<rect x="${cx - 7}" y="${cy - 8}" width="14" height="9" rx="1.5"/><path d="M${cx} ${cy + 1} v5 M${cx - 6} ${cy + 6} h12"/>`; break;
    default: g += `<path d="M${cx - 10} ${cy - 5} h9 M${cx - 10} ${cy} h5 M${cx - 10} ${cy + 5} h7"/><circle cx="${cx + 5}" cy="${cy - 5}" r="2.2"/><circle cx="${cx + 6}" cy="${cy}" r="2.2"/><circle cx="${cx + 5}" cy="${cy + 5}" r="2.2"/>`;
  }
  g += `</g>`;
  return g;
}

/* ---------- Fig 3: Sense ---------- */
function sense() {
  const P = 36, CW = 328;
  let s = "";
  s += t(P, 88, "MeshCrowd", { fs: 27, weight: 700 });
  s += t(P, 116, "Passive RF sensing — people & vehicles leave", { fs: 13, fill: C.muted });
  s += t(P, 133, "electromagnetic wakes", { fs: 13, fill: C.muted });

  // sensing card
  let y = 152;
  s += card(P, y, CW, 74, { grad: "gSand" });
  s += `<circle cx="${P + 20}" cy="${y + 26}" r="6" fill="${C.clay}"/><circle cx="${P + 20}" cy="${y + 26}" r="9" fill="${C.clay}" opacity="0.25"/>`;
  s += t(P + 38, y + 22, "Sensing the RF field", { fs: 16, weight: 600 });
  s += t(P + 38, y + 44, "33 passive links · BLE + Wi-Fi · 20 m radius", { fs: 11.5, fill: C.muted });
  s += t(P + CW - 18, y + 26, "Stop", { fs: 13, fill: C.muted, anchor: "end" });
  y += 74 + 12;

  // counters (2x2)
  const cw = (CW - 12) / 2, ch = 82;
  function counter(x, yy, label, val, color, grad) {
    return (
      card(x, yy, cw, ch, { grad }) +
      t(x + 16, yy + 24, label, { fs: 9, fill: color, weight: 600, spacing: "1" }) +
      t(x + 16, yy + 62, val, { fs: 30, fill: color, weight: 700 })
    );
  }
  s += counter(P, y, "PEOPLE", "67", C.clay, "g1") + counter(P + cw + 12, y, "VEHICLES", "66", C.olive, "g2");
  y += ch + 12;
  s += counter(P, y, "DISTURBANCES", "165", C.muted, "g3") + counter(P + cw + 12, y, "RF LINKS", "33", C.denim, "g4");
  y += ch + 14;

  // live signal features
  s += card(P, y, CW, 150, { sh: "sh" });
  s += t(P + 18, y + 28, "Live signal features", { fs: 16, weight: 600 });
  const fw = CW - 36;
  function feat(ly, label, val, pct, color) {
    return (
      t(P + 18, ly, label, { fs: 12, fill: "#4A4845" }) +
      t(P + 18 + fw, ly, val, { fs: 12, fill: color, anchor: "end", code: true, weight: 700 }) +
      bar(P + 18, ly + 8, fw, pct, color, 7)
    );
  }
  s += feat(y + 56, "Moving variance", "11.45 dB²", 34, C.clay);
  s += feat(y + 96, "Jitter", "1.79 dB", 46, C.denim);
  s += feat(y + 136, "Classifier confidence", "68%", 68, C.olive);
  y += 150 + 14;

  // envelope
  s += card(P, y, CW, 152, { sh: "sh" });
  s += t(P + 18, y + 28, "Attenuation envelope", { fs: 16, weight: 600 });
  s += t(P + 18, y + 46, "Max dip below adaptive baseline · markers = recent crossings", { fs: 10, fill: C.muted });
  // smooth chart
  const baseY = y + 80, cx0 = P + 20, cx1 = P + CW - 20;
  const pts = [0, 10, 24, 30, 44, 50, 66, 78, 120, 150, 170, 184, 228, 246, 268, 280, 300];
  const ys = [58, 56, 57, 55, 92, 92, 90, 56, 54, 55, 56, 57, 54, 55, 58, 56, 55];
  let d = `M${cx0} ${baseY + ys[0]}`;
  for (let i = 1; i < pts.length; i++) {
    const x0 = cx0 + (pts[i - 1] / 300) * (cw), x1 = cx0 + (pts[i] / 300) * cw;
    const yA = baseY + ys[i - 1], yB = baseY + ys[i];
    d += ` C ${x0} ${yA} ${x1} ${yB} ${x1} ${yB}`;
  }
  s += `<defs>${gradient("gFill", "#E7C4B5", "#F6EBE2")}</defs>`;
  s += `<path d="${d} L${cx0 + (cw)} ${baseY + 118} L${cx0} ${baseY + 118} Z" fill="url(#gFill)" opacity="0.55"/>`;
  s += `<path d="${d}" fill="none" stroke="${C.clay}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>`;
  s += `<circle cx="${cx0 + (30 / 300) * cw}" cy="${baseY + 92}" r="3.4" fill="${C.ink}"/><circle cx="${cx0 + (120 / 300) * cw}" cy="${baseY + 118}" r="3.4" fill="${C.ink}"/>`;
  s += `<line x1="${cx0 + 2}" y1="${baseY + 118}" x2="${cx1 - 2}" y2="${baseY + 118}" stroke="${C.lineStrong}" stroke-width="1.2"/>`;
  y += 152 + 14;

  // last crossing (bottom sliver visible)
  s += card(P, y, CW, 120, { sh: "sh" });
  s += t(P + 18, y + 28, "Last crossing", { fs: 16, weight: 600 });
  s += krow(P + 18, y + 46, "Entity", "pedestrian · 68%", { accent: C.clay });
  s += krow(P + 18, y + 74, "Dominant band", "BLE · −58 dBm dip");
  s += krow(P + 18, y + 102, "Range band", "f 0.41 → 4.4–8.2 m", { accent: C.denim });

  return s;
}

/* ---------- Fig 4: Scans ---------- */
function scans() {
  const P = 36, CW = 328;
  let s = "";
  let y = 44;
  s += card(P, y, CW, 224, { sh: "sh" });
  s += t(P + 18, y + 30, "Latest stored scan", { fs: 17, weight: 700 });
  s += t(P + 18, y + 50, "stored, then the engine reset and rescanned", { fs: 11.5, fill: C.muted });
  s += krow(P + 18, y + 70, "Window", "19:56:03 – 19:56:18 (15s)");
  s += krow(P + 18, y + 98, "Place", "My place");
  s += krow(P + 18, y + 126, "Geo", "40.3075, 21.7906");
  s += krow(P + 18, y + 154, "Counts", "p 0 · v 0 · o 1");
  s += krow(P + 18, y + 182, "Links / changed", "33 · 5 moved ≥3 dB");
  const chipY = y + 196;
  s += `<rect x="${P + 18}" y="${chipY}" width="${CW - 36}" height="0" rx="0"/>`;
  s += t(P + 18, chipY + 16, "5 links moved ≥3 dB (max 14.0 dB) → field CHANGED", { fs: 11, fill: C.clay });
  s += t(P + 18, chipY + 32, "since previous scan", { fs: 11, fill: C.clay });
  y += 224 + 14;

  // history
  s += card(P, y, CW, 360, { sh: "sh" });
  s += t(P + 18, y + 30, "History", { fs: 17, weight: 700 });
  s += t(P + 18 + (CW - 36), y + 30, "Clear", { fs: 12.5, fill: C.mist, anchor: "end" });
  s += t(P + 18, y + 50, "120 scans stored (cap 120) — tap a row for the per-link dBm table", { fs: 11, fill: C.muted });

  const history = [
    ["19:56:03", "15s", "p 0 · v 0 · o 1", "field CHANGED (5 links moved)", true],
    ["19:55:48", "15s", "p 0 · v 0 · o 1", "field CHANGED (7 links moved)", true],
    ["19:55:40", "5s", "p 0 · v 0 · o 0", "unchanged", false],
    ["19:55:35", "5s", "p 0 · v 0 · o 0", "unchanged", false],
    ["19:55:30", "5s", "p 0 · v 0 · o 0", "unchanged", false],
    ["19:55:25", "5s", "p 0 · v 0 · o 0", "unchanged", false],
  ];
  history.forEach((h, i) => {
    const ry = y + 74 + i * 47;
    const dotColor = h[4] ? C.clay : C.olive;
    s += nodeDot(P + 20, ry + 2, dotColor);
    s += t(P + 36, ry, `${h[0]} · My place · ${h[1]}`, { fs: 12, fill: C.ink, code: true, weight: 600 });
    s += t(P + 36, ry + 17, `${h[2]} · 33 links · ${h[3]}`, { fs: 10.5, fill: h[4] ? C.clay : C.muted, code: true });
    if (i < history.length - 1) s += `<line x1="${P + 18}" y1="${ry + 28}" x2="${P + CW - 18}" y2="${ry + 28}" stroke="${C.line}" stroke-width="1"/>`;
    s += `<path d="M${P + CW - 30} ${ry - 2} l4 4 -4 4" fill="none" stroke="${C.mist}" stroke-width="1.6"/>`;
  });

  return s;
}

/* ---------- Fig 5: Mesh ---------- */
function mesh() {
  const P = 36, CW = 328;
  let s = "";
  s += t(P, 88, "Mesh", { fs: 27, weight: 700 });
  s += t(P, 116, "Agreement between nearby MeshCrowd instances", { fs: 13, fill: C.muted });

  let y = 152;
  s += card(P, y, CW, 250, { sh: "sh" });
  s += t(P + 18, y + 30, "Nodes in your mesh", { fs: 17, weight: 700 });
  s += t(P + 18, y + 50, "2–5 instances confirm each other's crossings", { fs: 11.5, fill: C.muted });
  const nodes = [["This phone · Pixel 8", "72%", true], ["node-2 · Galaxy A54", "69%", false], ["node-3 · Xiaomi 12", "64%", false]];
  nodes.forEach((n, i) => {
    const ry = y + 74 + i * 28;
    s += nodeDot(P + 20, ry + 1, n[2] ? C.clay : C.kelp);
    s += t(P + 36, ry, n[0], { fs: 12.5, fill: n[2] ? C.ink : "#57564F" });
    s += t(P + CW - 18, ry, n[1], { fs: 12.5, fill: C.muted, anchor: "end", code: true, weight: 700 });
  });
  s += `<line x1="${P + 18}" y1="${y + 158}" x2="${P + CW - 18}" y2="${y + 158}" stroke="${C.line}"/>`;
  s += krow(P + 18, y + 172, "Fused accuracy", "81 %", { accent: C.olive });
  s += krow(P + 18, y + 200, "Agreement tolerance", "±1 crossing / ±4 m");
  s += krow(P + 18, y + 228, "Effective radius", "20–40 m (single: 4–12 m)", { accent: C.denim });
  y += 250 + 14;

  // radius extension
  s += card(P, y, CW, 176, { sh: "sh" });
  s += t(P + 18, y + 30, "Radius extension", { fs: 17, weight: 700 });
  s += t(P + 18, y + 50, "Geometric diversity of measurement rays", { fs: 11.5, fill: C.muted });
  const cx = P + CW / 2, cyc = y + 120;
  s += `<circle cx="${cx}" cy="${cyc}" r="52" fill="none" stroke="${C.mist}" stroke-width="1.3" stroke-dasharray="4 3"/>`;
  s += `<circle cx="${cx}" cy="${cyc}" r="30" fill="none" stroke="${C.clay}" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>`;
  s += `<circle cx="${cx}" cy="${cyc}" r="6" fill="${C.ink}"/>`;
  s += t(cx + 30, cyc - 58, "mesh 20–40 m", { fs: 10.5, fill: C.mist });
  s += t(cx + 30, cyc - 20, "single 4–12 m", { fs: 10.5, fill: C.mist });
  y += 176 + 14;

  // reliability bonus
  s += card(P, y, CW, 168, { grad: "gSand" });
  s += t(P + 18, y + 30, "Reliability bonus", { fs: 17, weight: 700 });
  s += t(P + 18, y + 50, "Distance from the mesh mean", { fs: 11.5, fill: C.muted });
  s += t(P + 18, y + 76, "Devices nearest the fused estimate earn a", { fs: 12, fill: "#4A4845" });
  s += t(P + 18, y + 96, "×1.25 multiplier; outliers never set the mesh value.", { fs: 12, fill: "#4A4845" });
  s += pillT(P + 18, y + 112, "you ×1.25", { fill: "#fff", color: C.clay, fs: 10.5, bold: true });
  s += pillT(P + 96, y + 112, "node-2 ×1.0", { fill: "#fff", color: C.muted, fs: 10.5 });
  s += pillT(P + 186, y + 112, "node-3 ×0.9", { fill: "#fff", color: C.muted, fs: 10.5 });

  return s;
}

/* ---------- Fig 6: Transit ---------- */
function transit() {
  const P = 36, CW = 328;
  let s = "";
  s += t(P, 88, "Transit", { fs: 27, weight: 700 });
  s += t(P, 116, "Two-node roadside counter · barrier coverage on commodity Bluetooth", { fs: 13, fill: C.muted });

  let y = 152;
  s += card(P, y, CW, 176, { sh: "sh" });
  s += t(P + 18, y + 30, "Barrier link", { fs: 17, weight: 700 });
  s += t(P + 18, y + 50, "Classic BT RFCOMM + BLE L2CAP", { fs: 11.5, fill: C.muted });
  // barrier diagram
  const bx = P + 24, byc = y + 116;
  s += `<line x1="${bx + 12}" y1="${byc - 34}" x2="${bx + 12}" y2="${byc + 34}" stroke="${C.clay}" stroke-width="2.5" stroke-linecap="round"/>`;
  s += `<line x1="${bx + 252}" y1="${byc - 34}" x2="${bx + 252}" y2="${byc + 34}" stroke="${C.clay}" stroke-width="2.5" stroke-linecap="round"/>`;
  s += `<circle cx="${bx + 12}" cy="${byc - 34}" r="6" fill="${C.clay}"/><circle cx="${bx + 12}" cy="${byc + 34}" r="6" fill="${C.clay}"/>`;
  s += `<circle cx="${bx + 252}" cy="${byc - 34}" r="6" fill="${C.clay}"/><circle cx="${bx + 252}" cy="${byc + 34}" r="6" fill="${C.clay}"/>`;
  s += t(bx, byc - 56, "node A", { fs: 10.5, fill: C.muted });
  s += t(bx + 240, byc - 56, "node B", { fs: 10.5, fill: C.muted });
  // vehicle
  s += `<ellipse cx="${bx + 132}" cy="${byc}" rx="96" ry="13" fill="${C.olive}" opacity="0.16"/>`;
  s += `<rect x="${bx + 86}" y="${byc - 16}" width="92" height="24" rx="7" fill="${C.olive}"/>`;
  s += `<circle cx="${bx + 106}" cy="${byc + 8}" r="6.5" fill="${C.ink}"/><circle cx="${bx + 158}" cy="${byc + 8}" r="6.5" fill="${C.ink}"/>`;
  s += `<path d="M${bx + 132} ${byc + 62} l-40 0 0 0" stroke="none"/>`;
  s += t(bx + 96, byc + 70, "barrier · 8 m separation", { fs: 10.5, fill: C.muted });
  y += 176 + 12;

  // counters (2x2 -> 1x2)
  const cw = (CW - 12) / 2, ch = 84;
  function counter(x, yy, label, val, color, grad) {
    return card(x, yy, cw, ch, { grad }) + t(x + 16, yy + 26, label, { fs: 9, fill: color, weight: 600, spacing: "1" }) + t(x + 16, yy + 64, val, { fs: 30, fill: color, weight: 700 });
  }
  s += counter(P, y, "PEDESTRIANS", "12", C.clay, "g1") + counter(P + cw + 12, y, "VEHICLES", "8", C.olive, "g2");
  y += ch + 14;

  // link state
  s += card(P, y, CW, 150, { sh: "sh" });
  s += t(P + 18, y + 30, "Link state", { fs: 16, weight: 700 });
  s += krow(P + 18, y + 50, "RFCOMM (Classic)", "connected · 8.1 pps", { accent: C.olive });
  s += krow(P + 18, y + 78, "BLE L2CAP", "connected · 4.0 pps", { accent: C.olive });
  s += krow(P + 18, y + 106, "Separation", "8 m");
  s += krow(P + 18, y + 134, "Hybrid classifier", "presence ∧ loss");
  y += 150 + 14;

  // detection by separation
  s += card(P, y, CW, 166, { sh: "sh" });
  s += t(P + 18, y + 30, "Detection by separation", { fs: 16, weight: 700 });
  s += t(P + 18, y + 50, "Fused two-node detection", { fs: 11.5, fill: C.muted });
  const det = [["3 m", 100, C.olive], ["6 m", 100, C.olive], ["10 m", 100, C.olive], ["15 m", 94, C.denim], ["25 m", 61, C.book]];
  det.forEach((d, i) => {
    const ry = y + 74 + i * 18;
    s += t(P + 18, ry, d[0], { fs: 11, fill: C.muted, code: true });
    s += bar(P + 64, ry - 6, 168, d[1], d[2], 8);
    s += t(P + CW - 18, ry, d[1] + "%", { fs: 11.5, fill: d[2], anchor: "end", code: true, weight: 700 });
  });

  return s;
}

/* ---------- Fig 7: Club ---------- */
function club() {
  const P = 36, CW = 328;
  let s = "";
  let y = 44;
  s += card(P, y, CW, 224, { sh: "sh" });
  s += t(P + 18, y + 30, "Mesh contribution", { fs: 17, weight: 700 });
  s += t(P + 18, y + 50, "What the fusion network reports through you", { fs: 11.5, fill: C.muted });
  s += krow(P + 18, y + 74, "Nodes in your mesh", "1");
  s += krow(P + 18, y + 102, "Fused accuracy", "72%", { accent: C.olive });
  s += krow(P + 18, y + 130, "Crowd level", "Calm");
  s += krow(P + 18, y + 158, "Estimated accuracy", "72 %", { accent: C.olive });
  s += krow(P + 18, y + 186, "Confirmed crossings (1 h)", "0", { accent: C.clay });
  s += `<line x1="${P + 18}" y1="${y + 200}" x2="${P + CW - 18}" y2="${y + 200}" stroke="${C.line}"/>`;
  s += t(P + 18, y + 216, "0 new this hour · mesh calm", { fs: 11, fill: C.mist, code: true });
  y += 224 + 14;

  // scoring
  s += card(P, y, CW, 176, { sh: "sh" });
  s += t(P + 18, y + 30, "Scoring", { fs: 17, weight: 700 });
  s += `<rect x="${P + 18}" y="${y + 44}" width="${CW - 36}" height="112" rx="14" fill="${C.pampas}"/>`;
  const sx = P + 32;
  s += t(sx, y + 72, "People +10 XP · Vehicles +14 XP · Disturbances +2 XP.", { fs: 11.5, fill: "#4A4845" });
  s += t(sx, y + 94, "When a crossing is confirmed by ≥2 mesh nodes", { fs: 11.5, fill: "#4A4845" });
  s += t(sx, y + 116, "you earn a ×2 fusion bonus +15 XP per", { fs: 11.5, fill: "#4A4845" });
  s += t(sx, y + 138, "confirmation — so several phones multiply your score.", { fs: 11.5, fill: "#4A4845" });
  // XP chips
  const chips = [["p +10", C.clay], ["v +14", C.olive], ["d +2", C.mist]];
  let chx = P + 18;
  chips.forEach((c2) => {
    const w = textW(c2[0], 10) + 18;
    s += `<rect x="${chx}" y="${y + 116}" width="${w}" height="20" rx="10" fill="#fff"/>`;
    s += t(chx + w / 2, y + 130, c2[0], { fs: 10, fill: c2[1], anchor: "middle", code: true, weight: 700 });
    chx += w + 8;
  });
  y += 176 + 14;

  // session history
  s += card(P, y, CW, 180, { sh: "sh" });
  s += t(P + 18, y + 30, "Session history", { fs: 17, weight: 700 });
  const sessions = [["Sep 6, 19:21", "43", "43"], ["Sep 6, 19:20", "43", "43"], ["Sep 6, 19:02", "24", "35"], ["Sep 6, 18:45", "18", "30"], ["Sep 6, 18:27", "4", "3"], ["Sep 6, 17:19", "50", "64"]];
  sessions.forEach((v, i) => {
    const ry = y + 54 + i * 21;
    if (i <= 5) {
      s += t(P + 18, ry, v[0], { fs: 11, fill: "#57564F", code: true });
      const valX = P + CW - 76;
      s += `<circle cx="${valX}" cy="${ry - 3}" r="2.5" fill="${C.olive}"/>`;
      s += t(valX + 10, ry, v[1], { fs: 11, fill: C.ink, code: true, weight: 700 });
      s += `<circle cx="${valX + 60}" cy="${ry - 3}" r="2.5" fill="${C.clay}"/>`;
      s += t(valX + 70, ry, v[2], { fs: 11, fill: C.ink, code: true, weight: 700 });
      s += t(P + CW - 16, ry, "ambient", { fs: 10.5, fill: C.mist, anchor: "end" });
    }
  });
  y += 180 + 14;

  // badges
  s += card(P, y, CW, 84, { grad: "gSand" });
  s += t(P + 18, y + 26, "Badges", { fs: 16, weight: 700 });
  s += t(P + 18, y + 44, "Keeping sensors on is the whole game", { fs: 11, fill: C.muted });
  const badges = [["First 10"], ["Night 4h"], ["Mesh 3"], ["50% fused"], ["30-day streak"]];
  let bx = P + 18;
  badges.forEach((b) => {
    const w = textW(b[0], 9.5) + 16;
    s += `<rect x="${bx}" y="${y + 52}" width="${w}" height="22" rx="11" fill="rgba(255,255,255,0.75)"/>`;
    s += t(bx + w / 2, y + 66, b[0], { fs: 9.5, fill: "#4A4845", anchor: "middle" });
    bx += w + 7;
  });

  return s;
}

export { phone, sense, scans, mesh, transit, club, C };
