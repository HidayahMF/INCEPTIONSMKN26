// Structural pixel comparison between the Figma node render and the web
// screenshot of the Berita section. Decodes 8-bit RGBA PNGs, builds
// ink masks vs the page background, and reports card runs from column
// profiles plus band diffs — real numbers, no guessing.

import fs from "node:fs";
import zlib from "node:zlib";

function readPng(file) {
  const buffer = fs.readFileSync(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!buffer.subarray(0, 8).equals(signature)) throw new Error(`Not a PNG: ${file}`);
  let offset = 8;
  let width; let height; let bitDepth; let colorType;
  const idat = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;
    if (type === "IHDR") { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
    if (type === "IDAT") idat.push(data);
    if (type === "IEND") break;
  }
  if (bitDepth !== 8) throw new Error(`bitDepth ${bitDepth} unsupported`);
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (!bpp) throw new Error(`colorType ${colorType} unsupported`);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * bpp;
  const pixels = Buffer.alloc(width * height * bpp);
  let input = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[input++];
    const row = raw.subarray(input, input + stride);
    input += stride;
    const prior = y ? pixels.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? row[x - bpp] : 0;
      const up = prior ? prior[x] : 0;
      const upperLeft = prior && x >= bpp ? prior[x - bpp] : 0;
      if (filter === 0) row[x] = row[x];
      else if (filter === 1) row[x] = (row[x] + left) & 255;
      else if (filter === 2) row[x] = (row[x] + up) & 255;
      else if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) { const estimate = left + up - upperLeft; const pa = Math.abs(estimate - left); const pb = Math.abs(estimate - up); const pc = Math.abs(estimate - upperLeft); row[x] = (row[x] + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upperLeft)) & 255; }
      else throw new Error(`Unsupported PNG filter ${filter}`);
    }
    row.copy(pixels, y * stride);
  }
  return { width, height, bpp, pixels };
}

const BG = [244, 248, 255];
const TOL = 14;

function inkImage(png) {
  const mask = new Uint8Array(png.width * png.height);
  for (let i = 0; i < png.width * png.height; i += 1) {
    const o = i * png.bpp;
    let diff;
    if (png.bpp === 4 && png.pixels[o + 3] < 40) diff = 0;
    else {
      diff = 0;
      for (let c = 0; c < 3; c += 1) { const d = Math.abs(png.pixels[o + c] - BG[c]); if (d > diff) diff = d; }
    }
    mask[i] = diff > TOL ? 1 : 0;
  }
  return mask;
}

function columnRuns(mask, w, h, minInk = 2) {
  const runs = [];
  let start = -1;
  for (let x = 0; x < w; x += 1) {
    let ink = 0;
    for (let y = 0; y < h; y += 1) ink += mask[y * w + x];
    const active = ink >= minInk;
    if (active && start < 0) start = x;
    if (!active && start >= 0) { if (x - start >= 6) runs.push([start, x - 1, x - start]); start = -1; }
  }
  if (start >= 0) runs.push([start, w - 1, w - start]);
  const merged = [];
  for (const run of runs) {
    const last = merged[merged.length - 1];
    if (last && run[0] - last[1] <= 4) { last[1] = run[1]; last[2] = last[1] - last[0] + 1; }
    else merged.push([...run]);
  }
  return merged;
}

function bandDiff(maskA, maskB, w, y0, y1) {
  let mism = 0; let inkA = 0; let inkB = 0;
  for (let y = y0; y < y1; y += 1) for (let x = 0; x < w; x += 1) {
    const a = maskA[y * w + x]; const b = maskB[y * w + x];
    inkA += a; inkB += b;
    if (a !== b) mism += 1;
  }
  return { inkA, inkB, mism, pct: +(100 * mism / ((y1 - y0) * w)).toFixed(2) };
}

const figmaPath = "artifacts/figma-berita-section@1x.png";
const webPath = "artifacts/berita-default.png";
const a = readPng(figmaPath);
const b = readPng(webPath);
console.log(`FIGMA ${a.width}x${a.height} | WEB ${b.width}x${b.height}`);
if (a.width !== b.width) { console.log("WIDTH MISMATCH"); process.exit(0); }
const h = Math.min(a.height, b.height);
const w = a.width;
const ma = inkImage(a);
const mb = inkImage(b);
console.log(`comparing y 0..${h}`);
console.log("FIGMA column runs:", JSON.stringify(columnRuns(ma, w, h)));
console.log("WEB   column runs:", JSON.stringify(columnRuns(mb, w, h)));
console.log("bands: top badge/title (0-190), images (195-372), text zone (390-485):");
console.log("  top  ", JSON.stringify(bandDiff(ma, mb, w, 0, 190)));
console.log("  imgs ", JSON.stringify(bandDiff(ma, mb, w, 195, 372)));
console.log("  text ", JSON.stringify(bandDiff(ma, mb, w, 390, 485)));
if (a.height > h) {
  console.log("FIGMA extra rows profile:", JSON.stringify(columnRuns(ma.subarray(h * w), w, a.height - h)));
}

function rowRuns(mask, w, x0, x1, y0, y1, minInk = 2) {
  const runs = [];
  let start = -1;
  for (let y = y0; y < y1; y += 1) {
    let ink = 0;
    for (let x = x0; x < x1; x += 1) ink += mask[y * w + x];
    const active = ink >= minInk;
    if (active && start < 0) start = y;
    if (!active && start >= 0) { if (y - start >= 2) runs.push([start, y - 1, y - start]); start = -1; }
  }
  if (start >= 0) runs.push([start, y1 - 1, y1 - start]);
  const merged = [];
  for (const run of runs) {
    const last = merged[merged.length - 1];
    if (last && run[0] - last[1] <= 2) { last[1] = run[1]; last[2] = last[1] - last[0] + 1; }
    else merged.push([...run]);
  }
  return merged;
}

console.log("row runs text zone (x 322..420, y 385..500):");
console.log("  FIGMA:", JSON.stringify(rowRuns(ma, w, 322, 420, 385, Math.min(500, a.height))));
console.log("  WEB  :", JSON.stringify(rowRuns(mb, w, 322, 420, 385, Math.min(500, b.height))));
console.log("row runs title zone (x 550..700, y 40..190):");
console.log("  FIGMA:", JSON.stringify(rowRuns(ma, w, 550, 700, 40, 190)));
console.log("  WEB  :", JSON.stringify(rowRuns(mb, w, 550, 700, 40, 190)));
