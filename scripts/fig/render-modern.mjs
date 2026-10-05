import sharp from "sharp";
import fs from "fs";
import { fig1, fig2 } from "./modern.mjs";
import { phone, sense, scans, mesh, transit, club } from "./modern-screens.mjs";

fs.mkdirSync("figures", { recursive: true });

function svgSize(svg) {
  const w = svg.match(/width="(\d+)"/);
  const vb = svg.match(/viewBox="[^"]*\s(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*"/);
  const h = svg.match(/height="(\d+)"/);
  if (w && h) return [Number(w[1]), Number(h[1])];
  return vb ? [Number(vb[1]), Number(vb[2])] : [1000, 1000];
}

async function render(name, svg, scale, density = 96) {
  fs.writeFileSync("figures/" + name + ".svg", svg);
  const out = "figures/" + name + ".png";
  const [W, H] = svgSize(svg);
  await sharp(Buffer.from(svg), { density: density * scale })
    .resize(Math.round(W * scale), Math.round(H * scale), { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const m = await sharp(out).metadata();
  console.log(name, "->", m.width, "x", m.height);
}

const defsTail = (grads) => grads.join("");

async function run() {
  // two diagrams
  await render("fig1_method", fig1(), 2);
  await render("fig2_arch", fig2(), 2);

  // five screens
  const grads = [
    '<linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7E4D9"/><stop offset="1" stop-color="#FCF6F1"/></linearGradient>',
    '<linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7EEDC"/><stop offset="1" stop-color="#F5F8F0"/></linearGradient>',
    '<linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EDECE6"/><stop offset="1" stop-color="#F7F6F2"/></linearGradient>',
    '<linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E1EAF0"/><stop offset="1" stop-color="#F0F5F8"/></linearGradient>',
    '<linearGradient id="gSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3E4CB"/><stop offset="1" stop-color="#EBDCBC"/></linearGradient>',
  ].join("");

  const screens = [
    ["fig3_sense", sense()],
    ["fig4_scans", scans()],
    ["fig5_mesh", mesh()],
    ["fig6_transit", transit()],
    ["fig7_club", club()],
  ];
  for (const [name, content] of screens) {
    const svg = phone(content, { active: name.replace("fig", "").split("_")[1] });
    // inject the gradient defs into the phone's defs block for the counter cards
    const withDefs = svg.replace(/<defs>/, `<defs>${defsTail([grads])}`);
    await render(name, withDefs, 2);
  }
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
