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
  claySoft: "#E7C4B5",
  book: "#CC785C",
  kraft: "#D4A27F",
  sand: "#EBDCBC",
  kelp: "#629A90",
  kelpDeep: "#3F6B60",
  kelpSoft: "#C7DED8",
  olive: "#5F7A45",
  oliveSoft: "#D5E0C5",
  denim: "#3F6B8A",
  denimSoft: "#CBDDE8",
};

const SANS = "DejaVu Sans, Arial, sans-serif";
const SERIF = "DejaVu Serif, Georgia, serif";
const MONO = "DejaVu Sans Mono, monospace";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const textW = (t, fs) => String(t).length * fs * 0.58;

/* ---------- reusable modern primitives ---------- */

function gradient(id, from, to, vertical = true) {
  if (vertical) return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;
}

function softShadow(id, dy = 6, blur = 12, op = 0.12) {
  return `<filter id="${id}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${blur}" flood-color="#141413" flood-opacity="${op}"/></filter>`;
}

function rounded(x, y, w, h, r, fill, { stroke = "none", sw = 0, shadow, grad } = {}) {
  let fillAttr = fill;
  if (grad) fillAttr = `url(#${grad})`;
  const fil = shadow ? ` filter="url(#${shadow})"` : "";
  const st = stroke && stroke !== "none" ? ` stroke="${stroke}" stroke-width="${sw}"` : "";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fillAttr}"${st}${fil}/>`;
}

function pill(x, y, label, { fill = C.pampas, color = C.muted, fs = 11, h = 24, bold = false, code = false } = {}) {
  const w = textW(label, fs) + (code ? 26 : 22);
  const fh = code ? MONO : SANS;
  return (
    rounded(x, y, w, h, h / 2, fill) +
    `<text x="${x + w / 2}" y="${y + h / 2 + fs * 0.36}" font-size="${fs}" fill="${color}" font-family="${fh}" text-anchor="middle"${bold ? ' font-weight="600"' : ""}>${esc(label)}</text>`
  );
}

function iconBox(x, y, size, { fill = C.ink, color = C.ivory, r = size * 0.3 } = {}) {
  return rounded(x, y, size, size, r, fill);
}

function t(x, y, s, { fs = 12, fill = C.ink, anchor = "start", weight, fam = SANS, code = false } = {}) {
  return `<text x="${x}" y="${y}" font-size="${fs}" fill="${fill}" font-family="${code ? MONO : fam}" text-anchor="${anchor}"${weight ? ` font-weight="${weight}"` : ""}>${esc(s)}</text>`;
}

function arrowDown(x, y1, y2, { color = C.mist, sw = 1.6, dash } = {}) {
  return `<g stroke="${color}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""} fill="none"><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - 6}"/><path d="M${x - 4} ${y2 - 6} L${x} ${y2} L${x + 4} ${y2 - 6}"/></g>`;
}

/* ---------- Fig 1: functional decomposition (modern) ---------- */

function fig1() {
  const W = 1200, H = 640;
  const defs = [
    gradient("gIvory", "#FFFFFF", C.ivory),
    gradient("gPampas", "#F4F2EC", C.pampas),
    gradient("gInk", "#232220", C.ink),
    gradient("gClay", "#D87B57", C.clay),
    gradient("gOlive", "#79935A", C.olive),
    gradient("gDenim", "#5A8CB0", C.denim),
    gradient("gKelp", "#7FAfA4", C.kelp),
    softShadow("sh", 8, 18, 0.1),
    softShadow("shSoft", 5, 12, 0.08),
  ].join("");

  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">`;
  s += `<defs>${defs}</defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#gIvory)"/>`;

  // header
  s += t(56, 56, "FUNCTIONAL DECOMPOSITION", { fs: 13, fill: C.mist, weight: 600, code: true });
  s += t(56, 92, "Sensing pipeline and its artefacts", { fs: 30, fill: C.ink, weight: 700 });
  s += t(56, 120, "Each stage emits the tables and ledgers the evaluation harness replays and audits.", { fs: 14, fill: C.muted });

  const colW = 265, colGap = 22, col0 = 56, rowTop = 168;
  const pads = 16;

  // header row: radio front-ends
  const radios = [
    { label: "BLE scan", sub: "advertising beacons", band: "2.4 GHz", color: C.clay, grad: "gClay" },
    { label: "Wi-Fi scan", sub: "access points", band: "2.4 GHz", color: C.olive, grad: "gOlive" },
    { label: "Wi-Fi scan", sub: "access points", band: "5 GHz", color: C.denim, grad: "gDenim" },
    { label: "Classic BT + L2CAP", sub: "two-node counter link", band: "RFCOMM", color: C.kelp, grad: "gKelp" },
  ];
  radios.forEach((r, i) => {
    const x = col0 + i * (colW + colGap);
    s += rounded(x, rowTop, colW, 84, 16, `url(#${r.grad})`, { shadow: "shSoft" });
    s += iconBox(x + pads, rowTop + 16, 26, { fill: "rgba(255,255,255,0.32)", color: "#fff" });
    // small radio glyph
    s += `<g stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round"><circle cx="${x + pads + 13}" cy="${rowTop + 29}" r="2" fill="#fff" stroke="none"/><path d="M${x + pads + 8} ${rowTop + 34} a7 7 0 0 1 10 0 M${x + pads + 4} ${rowTop + 38} a12 12 0 0 1 18 0"/></g>`;
    s += t(x + pads + 36, rowTop + 30, r.label, { fs: 15, fill: "#ffffff", weight: 600 });
    s += t(x + pads + 36, rowTop + 50, r.sub, { fs: 12, fill: "rgba(255,255,255,0.82)" });
    s += pill(x + colW - pads - textW(r.band, 10) - 20, rowTop + 16, r.band, { fill: "rgba(255,255,255,0.24)", color: "#fff", fs: 9.5, h: 20 });
  });

  // down arrows
  const arrowY = rowTop + 84;
  for (let i = 0; i < 4; i++) {
    const cx = col0 + i * (colW + colGap) + colW / 2;
    s += arrowDown(cx, arrowY + 6, arrowY + 34, { color: C.mist });
  }

  // DSP band
  const dspY = arrowY + 40;
  s += rounded(56, dspY, W - 112, 78, 18, "url(#gPampas)", { stroke: C.lineStrong, shadow: "shSoft" });
  s += t(76, dspY + 30, "PER-LINK DSP", { fs: 13, fill: C.clay, weight: 600, code: true });
  s += t(76, dspY + 56, "RingWindow · Stats (median, robust dispersion) · BaselineTracker · DipDetector / PeakDetector", { fs: 14, fill: C.inkSoft });
  s += pill(944, dspY + 24, "noise-aware floor", { fill: C.sand, color: C.clay, fs: 10.5 });
  s += pill(944, dspY + 46, "sustained gate", { fill: C.sand, color: C.clay, fs: 10.5 });

  // arrows into the three processing columns
  const procY = dspY + 78 + 16;
  const arrows2 = [];
  for (let i = 0; i < 4; i++) {
    const cx = col0 + i * (colW + colGap) + colW / 2;
    arrows2.push(arrowDown(cx, dspY + 78, procY, { color: C.mist, dash: "4 4" }));
  }

  // three processing columns (merged region annotated)
  const procCol = [56, 350, 644];
  const procW = 240, procGap = 54;
  const procs = [
    { t: "Feature extraction", items: ["depth · duration", "texture · variance", "prominence · coherence"], color: C.clay, grad: "gClay" },
    { t: "dBm → metres", items: ["log-distance per band", "gate −75 dBm", "f ∈ [0.15, 0.92]"], color: C.olive, grad: "gOlive" },
    { t: "Scan-epoch delta", items: ["store → reset → rescan", "stable level", "median of last 20"], color: C.denim, grad: "gDenim" },
  ];
  procs.forEach((p, i) => {
    const x = procCol[i];
    s += rounded(x, procY, procW, 108, 18, "#ffffff", { stroke: C.line, shadow: "shSoft" });
    s += iconBox(x + pads, procY + 16, 26, { fill: p.color, color: "#fff" });
    s += t(x + pads + 36, procY + 30, p.t, { fs: 15, fill: C.ink, weight: 600 });
    // mini glyphs
    s += `<g stroke="${p.color}" stroke-width="1.5" fill="none" stroke-linecap="round">`;
    if (i === 0) s += `<path d="M${x + pads + 13} ${procY + 29} v6 l3 1"/>`;
    if (i === 1) s += `<circle cx="${x + pads + 13}" cy="${procY + 29}" r="4"/>`;
    if (i === 2) s += `<path d="M${x + pads + 9} ${procY + 26} l3 3 -3 3 M${x + pads + 15} ${procY + 26} l3 3 -3 3"/>`;
    s += `</g>`;
    p.items.forEach((it, j) => {
      s += `<circle cx="${x + pads + 6}" cy="${procY + 56 + j * 18}" r="2.6" fill="${p.color}"/>`;
      s += t(x + pads + 16, procY + 60 + j * 18, it, { fs: 12.5, fill: C.muted });
    });
  });

  // converge arrows
  const convY = procY + 108 + 22;
  const convPoints = [W / 2 - 60, W / 2, W / 2 + 60];
  s += `<g stroke="${C.mist}" stroke-width="1.4" fill="none" stroke-linecap="round">
    <path d="M${procCol[0] + procW - 14} ${procY + 108} q 60 30 ${convPoints[0]} ${convY}"/>
    <path d="M${procCol[1] + procW / 2} ${procY + 108} l 0 ${convY}"/>
    <path d="M${procCol[2] + 14} ${procY + 108} q -60 30 ${convPoints[2]} ${convY}"/>
  </g>`;

  // EntityClassifier band
  const classY = convY;
  s += rounded(56, classY, W - 112, 96, 20, "url(#gInk)", { shadow: "sh" });
  s += t(80, classY + 30, "EntityClassifier v1.1", { fs: 18, fill: "#ffffff", weight: 700 });
  s += t(80, classY + 60, "entity type · confidence · event record", { fs: 13.5, fill: "rgba(255,255,255,0.72)" });
  s += pill(900, classY + 24, "counters", { fill: "rgba(255,255,255,0.12)", color: C.kraft, fs: 11 });
  s += pill(900, classY + 48, "range band", { fill: "rgba(255,255,255,0.12)", color: C.kraft, fs: 11 });

  // artefacts footer
  const artY = classY + 96 + 24;
  s += rounded(56, artY, W - 112, 72, 16, "url(#gPampas)", { stroke: C.lineStrong });
  s += t(80, artY + 26, "ARTEFACTS", { fs: 12, fill: C.kelpDeep, weight: 600, code: true });
  s += t(80, artY + 50, "per-link dBm tables · epoch tables · transit counts · mesh ledgers", { fs: 13.5, fill: C.inkSoft });
  s += t(W - 80, artY + 50, "validated on 4,161 scenes", { fs: 12.5, fill: C.clay, anchor: "end", code: true, weight: 600 });

  s += `</svg>`;
  return s;
}

/* ---------- Fig 2: layered architecture (modern) ---------- */

function fig2() {
  const W = 1100, H = 700;
  const defs = [
    gradient("gIvory", "#FFFFFF", C.ivory),
    gradient("gSand", "#F2E2C4", C.sand),
    gradient("gKelp", "#8FBEB2", C.kelpSoft),
    gradient("gDenim", "#E0EAF1", C.denimSoft),
    gradient("gPampas", "#F2F0EA", C.pampas),
    gradient("gInk", "#232220", C.ink),
    softShadow("sh", 8, 18, 0.1),
    softShadow("shSoft", 5, 12, 0.08),
  ].join("");

  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">`;
  s += `<defs>${defs}</defs>`;
  s += `<rect width="${W}" height="${H}" fill="url(#gIvory)"/>`;

  s += t(56, 56, "LAYERED ARCHITECTURE", { fs: 13, fill: C.mist, weight: 600, code: true });
  s += t(56, 92, "From unmodified radio hardware to the application and gamification layer", { fs: 30, fill: C.ink, weight: 700 });
  s += t(56, 120, "Five horizontal strata; a single arrow chain denotes the upward data path.", { fs: 14, fill: C.muted });

  const x0 = 230, w = 640, gap = 26, top = 168;
  const layers = [
    { t: "APPLICATION · GAMIFICATION", sub: "counters · range band · field verdict · XP · badges · day streak", grad: "gSand", color: C.clay, h: 78 },
    { t: "INFERENCE · FUSION", sub: "EntityClassifier v1.1 · mesh agreement · fused accuracy", grad: "gKelp", color: C.kelpDeep, h: 78 },
    { t: "PER-LINK DSP (Kotlin)", sub: "RingWindow · Stats · BaselineTracker · DipDetector / PeakDetector", grad: "gDenim", color: C.denim, h: 78 },
    { t: "RADIO ABSTRACTION", sub: "BLE scanner · Wi-Fi 2.4 · Wi-Fi 5 · BT stacks", grad: "gPampas", color: C.muted, h: 64 },
    { t: "UNMODIFIED HARDWARE", sub: "BLE radio · 802.11 dual-band radio · RFCOMM / L2CAP", grad: "gInk", color: C.ivory, h: 64, dark: true },
  ];

  let y = top;
  layers.forEach((l, i) => {
    s += rounded(x0, y, w, l.h, 18, `url(#${l.grad})`, { shadow: "shSoft", stroke: l.dark ? "none" : C.line });
    // layer icon
    const iconColors = [C.clay, C.kelpDeep, C.denim, C.muted, C.ivory];
    s += iconBox(x0 + 18, y + (l.h - 34) / 2, 34, { fill: l.dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.55)", color: iconColors[i] });
    const g = iconColors[i];
    if (i === 0) s += `<path d="M${x0 + 31} ${y + 20} h6 v-4 l6 6 -6 6 v-4 h-6 z" fill="${g}"/>`;
    if (i === 1) s += `<circle cx="${x0 + 35}" cy="${y + 20}" r="5" fill="${g}"/><circle cx="${x0 + 27}" cy="${y + 28}" r="5" fill="${g}"/><circle cx="${x0 + 43}" cy="${y + 28}" r="5" fill="${g}"/>`;
    if (i === 2) s += `<rect x="${x0 + 29}" y="${y + 13}" width="12" height="14" rx="2" fill="none" stroke="${g}" stroke-width="1.4"/>`;
    if (i === 3) s += `<circle cx="${x0 + 35}" cy="${y + 20}" r="2" fill="${g}"/><path d="M${x0 + 29} ${y + 26} a8 8 0 0 1 12 0" fill="none" stroke="${g}" stroke-width="1.4"/>`;
    if (i === 4) s += `<rect x="${x0 + 29}" y="${y + 15}" width="12" height="10" rx="2" fill="none" stroke="${g}" stroke-width="1.4"/>`;

    s += t(x0 + 66, y + 34, l.t, { fs: 15, fill: l.dark ? C.ivory : C.ink, weight: 700, code: true });
    s += t(x0 + 66, y + 56, l.sub, { fs: 13, fill: l.dark ? "rgba(255,255,255,0.7)" : C.muted });

    // index chip on right
    const chipFill = l.dark ? "rgba(255,255,255,0.14)" : "rgba(20,20,19,0.05)";
    const chipCol = l.dark ? C.kraft : C.mist;
    s += rounded(x0 + w - 66, y + (l.h - 28) / 2, 48, 28, 14, chipFill);
    s += t(x0 + w - 42, y + (l.h - 28) / 2 + 18, "0" + (i + 1), { fs: 11, fill: chipCol, anchor: "middle", code: true, weight: 600 });

    if (i < layers.length - 1) {
      const ay = y + l.h + gap / 2;
      s += arrowDown(x0 + w / 2, y + l.h, ay - 6, { color: C.mist, sw: 1.8 });
    }
    y += l.h + gap;
  });

  // side callout — privacy
  const cx0 = 24, cy0 = top;
  s += rounded(24, cy0, 180, 250, 18, "url(#gIvory)", { stroke: C.line, shadow: "shSoft" });
  const privItems = ["no camera", "no microphone", "no device on target", "data stays local", "aggregate only"];
  s += t(44, cy0 + 30, "PRIVACY BOUNDARY", { fs: 11, fill: C.kelpDeep, weight: 600, code: true });
  privItems.forEach((p, i) => {
    const py = cy0 + 58 + i * 28;
    s += `<circle cx="${46}" cy="${py - 4}" r="3" fill="${C.kelp}"/>`;
    s += t(58, py, p, { fs: 12.5, fill: C.inkSoft });
  });
  s += `<line x1="44" y1="${cy0 + 196}" x2="${184}" y2="${cy0 + 196}" stroke="${C.line}"/>`;
  s += t(44, cy0 + 218, "device-free throughout", { fs: 11, fill: C.mist, code: true });

  s += `</svg>`;
  return s;
}

export { fig1, fig2, C, SANS, SERIF, MONO, esc, textW };
