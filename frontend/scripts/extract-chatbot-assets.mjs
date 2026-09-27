import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = path.join(repoRoot, 'frontend/src/assets/logochatbot.png');
const outputDir = path.join(repoRoot, 'frontend/src/assets/chatbot');
const contactSheet = path.join(repoRoot, 'artifacts/chatbot-crops-contact-sheet.png');

// Coordinates are taken from the generated chatbot asset sheet. They isolate the
// three labeled state regions while excluding the labels below each icon.
const crops = {
  default: { x: 900, y: 20, width: 330, height: 280 },
  hover: { x: 900, y: 375, width: 330, height: 315 },
  pressed: { x: 900, y: 760, width: 330, height: 315 },
  mascot: { x: 0, y: 0, width: 900, height: 900 },
};
const canvasSize = 512;

function readPng(file) {
  const buffer = fs.readFileSync(file);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (!buffer.subarray(0, 8).equals(signature)) throw new Error('Source is not a PNG.');
  let offset = 8; let width; let height; let colorType; let bitDepth; const idat = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset); const type = buffer.toString('ascii', offset + 4, offset + 8); const data = buffer.subarray(offset + 8, offset + 8 + length); offset += 12 + length;
    if (type === 'IHDR') { width = data.readUInt32BE(0); height = data.readUInt32BE(4); bitDepth = data[8]; colorType = data[9]; }
    if (type === 'IDAT') idat.push(data);
    if (type === 'IEND') break;
  }
  if (bitDepth !== 8 || colorType !== 6) throw new Error(`Expected 8-bit RGBA PNG, received bitDepth=${bitDepth}, colorType=${colorType}.`);
  const raw = zlib.inflateSync(Buffer.concat(idat)); const stride = width * 4; const pixels = Buffer.alloc(width * height * 4); let input = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[input++]; const row = raw.subarray(input, input + stride); input += stride; const prior = y ? pixels.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= 4 ? row[x - 4] : 0; const up = prior ? prior[x] : 0; const upperLeft = prior && x >= 4 ? prior[x - 4] : 0;
      if (filter === 0) row[x] = row[x];
      else if (filter === 1) row[x] = (row[x] + left) & 255;
      else if (filter === 2) row[x] = (row[x] + up) & 255;
      else if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) { const estimate = left + up - upperLeft; const pa = Math.abs(estimate - left); const pb = Math.abs(estimate - up); const pc = Math.abs(estimate - upperLeft); row[x] = (row[x] + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upperLeft)) & 255; }
      else throw new Error(`Unsupported PNG filter ${filter}.`);
    }
    row.copy(pixels, y * stride);
  }
  return { width, height, pixels };
}

function trim(image, crop, padding = 10) {
  let minX = crop.width; let minY = crop.height; let maxX = -1; let maxY = -1;
  for (let y = 0; y < crop.height; y += 1) for (let x = 0; x < crop.width; x += 1) {
    const alpha = image.pixels[((crop.y + y) * image.width + crop.x + x) * 4 + 3];
    if (alpha > 8) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
  }
  if (maxX < 0) throw new Error('Crop contains no visible pixels.');
  minX = Math.max(0, minX - padding); minY = Math.max(0, minY - padding); maxX = Math.min(crop.width - 1, maxX + padding); maxY = Math.min(crop.height - 1, maxY + padding);
  return { x: crop.x + minX, y: crop.y + minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function render(image, box, size = canvasSize) {
  const pixels = Buffer.alloc(size * size * 4); const scale = Math.min((size - 24) / box.width, (size - 24) / box.height); const width = Math.max(1, Math.round(box.width * scale)); const height = Math.max(1, Math.round(box.height * scale)); const startX = Math.floor((size - width) / 2); const startY = Math.floor((size - height) / 2);
  for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
    const sourceX = box.x + Math.min(box.width - 1, Math.floor(x / scale)); const sourceY = box.y + Math.min(box.height - 1, Math.floor(y / scale)); const sourceIndex = (sourceY * image.width + sourceX) * 4; const targetIndex = ((startY + y) * size + startX + x) * 4; image.pixels.copy(pixels, targetIndex, sourceIndex, sourceIndex + 4);
  }
  return { width: size, height: size, pixels };
}

function crc32(buffer) { let crc = 0xffffffff; for (const byte of buffer) { crc ^= byte; for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const name = Buffer.from(type); const result = Buffer.alloc(12 + data.length); result.writeUInt32BE(data.length, 0); name.copy(result, 4); data.copy(result, 8); result.writeUInt32BE(crc32(Buffer.concat([name, data])), data.length + 8); return result; }
function writePng(file, image) { const rows = []; for (let y = 0; y < image.height; y += 1) rows.push(Buffer.concat([Buffer.from([0]), image.pixels.subarray(y * image.width * 4, (y + 1) * image.width * 4)])); const header = Buffer.alloc(13); header.writeUInt32BE(image.width, 0); header.writeUInt32BE(image.height, 4); header[8] = 8; header[9] = 6; return fs.writeFileSync(file, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', zlib.deflateSync(Buffer.concat(rows), { level: 9 })), chunk('IEND', Buffer.alloc(0))])); }

function makeContactSheet(images) { const gap = 24; const sheet = { width: images.length * canvasSize + (images.length + 1) * gap, height: canvasSize + gap * 2, pixels: Buffer.alloc((images.length * canvasSize + (images.length + 1) * gap) * (canvasSize + gap * 2) * 4) }; for (let i = 0; i < images.length; i += 1) for (let y = 0; y < canvasSize; y += 1) for (let x = 0; x < canvasSize; x += 1) { const source = (y * canvasSize + x) * 4; const target = ((gap + y) * sheet.width + gap + i * (canvasSize + gap) + x) * 4; images[i].pixels.copy(sheet.pixels, target, source, source + 4); } return sheet; }

const image = readPng(source); fs.mkdirSync(outputDir, { recursive: true }); fs.mkdirSync(path.dirname(contactSheet), { recursive: true }); console.log(`Source: ${source}`); console.log(`Source dimensions: ${image.width}x${image.height}`);
const rendered = [];
for (const [name, crop] of Object.entries(crops)) { const trimmed = trim(image, crop); const output = render(image, trimmed); const filename = name === 'mascot' ? 'chatbot-mascot.png' : `chatbot-${name}.png`; writePng(path.join(outputDir, filename), output); console.log(`${name}: crop x=${trimmed.x}, y=${trimmed.y}, width=${trimmed.width}, height=${trimmed.height}; output=${output.width}x${output.height}`); if (name !== 'mascot') rendered.push(output); }
writePng(contactSheet, makeContactSheet(rendered)); console.log(`Contact sheet: ${contactSheet}`);
