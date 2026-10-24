import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '../..');
const assetDirectory = path.join(repositoryRoot, 'frontend', 'public', 'assets', 'pages', 'siswapages', 'portofolio');
const expectedProjectRef = process.env.PORTFOLIO_DEMO_PROJECT_REF || '';
const expectedEnvironment = process.env.PORTFOLIO_DEMO_ENV || '';
const approved = process.env.PORTFOLIO_DEMO_SEED_APPROVED === 'YES';
const execute = process.argv.includes('--execute');
const title = 'INCEPTION — Portal Internal Sekolah';
const files = [
  'ChatGPT Image Oct 24, 2026, 09_06_45 PM-1.png',
  'ChatGPT Image Oct 24, 2026, 09_06_46 PM-2.png',
  'ChatGPT Image Oct 24, 2026, 09_06_48 PM-3.png',
  'ChatGPT Image Oct 24, 2026, 09_06_49 PM-4.png',
];
const payload = {
  title,
  category: 'Web Development',
  summary: '[Contoh/Mockup Demo] Portal internal sekolah untuk menghubungkan layanan siswa, informasi sekolah, dan proses administrasi dalam satu pengalaman digital.',
  description: 'Contoh/mockup case-study untuk demonstrasi juri. INCEPTION merupakan portal internal sekolah yang dirancang agar siswa dapat mengakses informasi, layanan, dan dokumentasi kegiatan secara lebih terstruktur.',
  skills: ['React', 'TypeScript', 'Tailwind CSS'],
  role: 'Perancang alur pengalaman siswa dan pengembang antarmuka portal.',
  purpose: 'Menyediakan satu portal internal yang mudah digunakan untuk mempertemukan kebutuhan informasi dan layanan siswa dalam alur yang konsisten.',
  background: 'Contoh ini berangkat dari kebutuhan sekolah untuk mengurangi layanan yang tersebar dan menyajikan informasi siswa secara lebih terarah.',
  features: [
    'Dashboard layanan siswa dengan navigasi berdasarkan kebutuhan pengguna.',
    'Portfolio dan prestasi dengan detail case-study, dokumentasi, serta lifecycle verifikasi.',
    'Autentikasi Supabase, role-based access control, dan endpoint backend terproteksi.',
    'Dokumentasi visual private Storage dengan signed URL.',
  ],
  outputs: [
    'Prototipe portal internal sekolah.',
    'Alur CRUD portfolio yang tersimpan pada database.',
    'Dokumentasi empat gambar untuk cover dan galeri case-study.',
    'Contoh workflow draft, submit, review, dan verified.',
  ],
  lessonsLearned: 'Contoh pembelajaran: membangun fitur yang terlihat rapi tetap harus disertai kontrak API, ownership, RLS/RBAC, private Storage, dan pengujian lifecycle yang konsisten.',
  github: '',
  demoUrl: '',
  date: '2026-10-24',
};

function fail(message) {
  throw new Error(`BLOCKED: ${message}`);
}

function projectRef() {
  return (process.env.SUPABASE_URL || '').match(/^https:\/\/([^.]+)\.supabase\.co$/)?.[1] || '';
}

function printPlan(fileInfo) {
  console.log(JSON.stringify({
    mode: execute ? 'execute-requested-but-guarded' : 'dry-run',
    environment: expectedEnvironment || 'unset',
    projectRef: projectRef() || 'unrecognized',
    title,
    category: payload.category,
    fileCount: fileInfo.length,
    files: fileInfo.map((file, index) => ({ role: index === 0 ? 'cover' : 'documentation', name: file.name, bytes: file.bytes, mimeType: file.mimeType })),
    mutations: execute ? 'would use normal auth, CRUD, upload, list/detail, and signed-file endpoints' : 'none',
  }, null, 2));
}

async function inspectFiles() {
  if (new Set(files).size !== 4) fail('sample file names must be unique.');
  const fileInfo = [];
  for (const name of files) {
    if (path.extname(name).toLowerCase() !== '.png') fail(`unsupported extension for ${name}.`);
    const fullPath = path.join(assetDirectory, name);
    const buffer = await fs.readFile(fullPath).catch(() => null);
    if (!buffer) fail(`sample file is missing: ${name}.`);
    if (buffer.length < 8 || !buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) fail(`sample file is not a valid PNG: ${name}.`);
    if (buffer.length > 4 * 1024 * 1024) fail(`sample file exceeds the 4 MB serverless-safe limit: ${name}.`);
    fileInfo.push({ name, bytes: buffer.length, mimeType: 'image/png', buffer });
  }
  return fileInfo;
}

function assertExecutionGuards() {
  if (!execute) return;
  if (process.env.NODE_ENV === 'production') fail('NODE_ENV=production; no demo mutation is allowed.');
  if (!['development', 'staging'].includes(expectedEnvironment)) fail('PORTFOLIO_DEMO_ENV must explicitly be development or staging.');
  if (!expectedProjectRef || expectedProjectRef !== projectRef()) fail('PORTFOLIO_DEMO_PROJECT_REF must match SUPABASE_URL explicitly.');
  if (!approved) fail('set PORTFOLIO_DEMO_SEED_APPROVED=YES only after explicit approval.');
  if (!process.env.DEMO_PASSWORD_DEMO_SISWA) fail('DEMO_PASSWORD_DEMO_SISWA is not configured.');
}

async function request(base, token, route, options = {}) {
  const headers = new Headers(options.headers);
  headers.set('cookie', `smkn26_access=${token}`);
  const response = await fetch(`${base}${route}`, { ...options, headers });
  const body = await response.json();
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${route} failed (${response.status}): ${body.error?.message || 'unknown error'}`);
  return body.data;
}

async function login(base) {
  const response = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ identifier: 'DEMO-SISWA', password: process.env.DEMO_PASSWORD_DEMO_SISWA }) });
  const body = await response.json();
  if (!response.ok) throw new Error(`DEMO-SISWA authentication failed (${response.status}).`);
  const setCookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [response.headers.get('set-cookie') || ''];
  const cookie = setCookies.map((value) => value.split(';', 1)[0]).filter(Boolean).join('; ');
  if (!cookie) throw new Error('authentication response did not include a session cookie.');
  return cookie.match(/smkn26_access=([^;]+)/)?.[1] || '';
}

async function executeSeed(fileInfo) {
  const { app } = await import('../src/app.js');
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const token = await login(base);
    const existingRecords = (await request(base, token, '/api/student/portfolio')).filter((item) => item.title === title);
    if (existingRecords.length > 1) fail(`multiple portfolios titled "${title}" already exist; refusing to select or mutate one automatically.`);
    let created = existingRecords[0];
    if (created) {
      if (created.category !== payload.category || JSON.stringify(created.skills || []) !== JSON.stringify(payload.skills)) fail(`a portfolio titled "${title}" exists but does not match the approved demo metadata; refusing to overwrite it.`);
      console.log(`IDEMPOTENT: existing approved-title record ${created.id} will be inspected without mutation.`);
    } else {
      created = await request(base, token, '/api/student/portfolio', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    }
    const existingDetail = await request(base, token, `/api/student/portfolio/${created.id}`);
    const existingNames = new Set((existingDetail.files || []).map((file) => file.name));
    for (const file of fileInfo) {
      if (existingNames.has(file.name)) continue;
      const form = new FormData();
      form.append('recordId', created.id);
      form.append('file', new File([file.buffer], file.name, { type: file.mimeType }));
      await request(base, token, '/api/student/files/portfolio', { method: 'POST', body: form });
    }
    const listed = await request(base, token, '/api/student/portfolio');
    const detail = await request(base, token, `/api/student/portfolio/${created.id}`);
    if (!listed.some((item) => item.id === created.id)) throw new Error('created portfolio was not returned by list endpoint.');
    const returnedNames = (detail.files || []).map((file) => file.name);
    if (returnedNames.length !== 4 || new Set(returnedNames).size !== 4 || files.some((name) => !returnedNames.includes(name))) throw new Error('detail endpoint did not return the four expected distinct files.');
    for (const file of detail.files) await request(base, token, `/api/files/portfolio/${file.id}`);
    console.log(`SEEDED: ${created.id}`);
    console.log('The record remains DRAFT; submit/review should be tested with a separate temporary record.');
  } finally {
    server.close();
  }
}

async function main() {
  const fileInfo = await inspectFiles();
  printPlan(fileInfo);
  assertExecutionGuards();
  if (execute) await executeSeed(fileInfo);
  else console.log('DRY-RUN: no authentication, database, Storage, or backend mutation was performed.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'unknown error');
  process.exitCode = 1;
});
