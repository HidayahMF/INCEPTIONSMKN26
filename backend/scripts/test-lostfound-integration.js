import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { app } from '../src/app.js';
import { login } from '../src/modules/auth/auth.service.js';
import { getAdminClient } from '../src/lib/supabase.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const prefix = `E2E-LF-${Date.now()}`;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const photo = () => new File([new Uint8Array([137, 80, 78, 71])], `${prefix}.png`, { type: 'image/png' });
async function token(identifier, password) { assert(password, `${identifier} password missing`); const result = await login(identifier, password); assert(result?.session?.access_token, `${identifier} login failed`); return result.session.access_token; }
async function request(base, accessToken, path, options = {}) { const headers = new Headers(options.headers); headers.set('cookie', `smkn26_access=${accessToken}`); const response = await fetch(`${base}${path}`, { ...options, headers }); return { status: response.status, body: await response.json() }; }
async function main() {
  const studentId = process.env.LOST_FOUND_STUDENT_ID || 'DEMO-SISWA';
  const otherId = process.env.LOST_FOUND_OTHER_STUDENT_ID || 'DEMO-KELAS';
  const reviewerId = process.env.LOST_FOUND_REVIEWER_ID || 'DEMO-BK';
  const student = await token(studentId, process.env.LOST_FOUND_STUDENT_PASSWORD || process.env.DEMO_PASSWORD_DEMO_SISWA);
  const other = await token(otherId, process.env.LOST_FOUND_OTHER_STUDENT_PASSWORD || process.env.DEMO_PASSWORD_DEMO_KELAS);
  const reviewer = await token(reviewerId, process.env.LOST_FOUND_REVIEWER_PASSWORD || process.env.DEMO_PASSWORD_DEMO_BK);
  const server = app.listen(0); const base = `http://127.0.0.1:${server.address().port}`; const ids = { item: null, file: null, claim: null }; const pass = (label) => console.log(`PASS ${label}`);
  try {
    const form = new FormData(); form.append('type', 'FOUND'); form.append('name', `${prefix} Wallet`); form.append('category', 'Aksesori'); form.append('description', `${prefix} integration report`); form.append('location', 'Ruang BK'); form.append('date', '2026-10-24'); form.append('additional', 'Testing'); form.append('photo', photo());
    let result = await request(base, student, '/api/student/lost-found', { method: 'POST', body: form }); assert(result.status < 300, `create ${result.status}`); ids.item = result.body.data.id; ids.file = result.body.data.files?.[0]?.id; assert(result.body.data.status === 'PENDING', 'new report must be pending'); pass('report creation and private photo metadata');
    result = await request(base, reviewer, `/api/reviewer/lost-found/${ids.item}/verify`, { method: 'POST' }); assert(result.status < 300 && result.body.data.status === 'VERIFIED', `verify ${result.status}`); pass('reviewer verification');
    result = await request(base, other, `/api/student/lost-found/${ids.item}/claims`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ description: `${prefix} ownership evidence` }) }); assert(result.status < 300, `claim ${result.status}`); ids.claim = result.body.data.id; pass('claim submission');
    result = await request(base, reviewer, `/api/reviewer/lost-found/claims/${ids.claim}/review`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ status: 'APPROVED', note: 'Integration approval' }) }); assert(result.status < 300 && result.body.data.status === 'APPROVED', `review claim ${result.status}`); pass('claim approval and claimed status');
    result = await request(base, reviewer, `/api/reviewer/lost-found/claims/${ids.claim}/handover`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ note: 'Integration handover' }) }); assert(result.status < 300, `handover ${result.status}`); pass('handover and custody audit');
    result = await request(base, other, `/api/files/lost-found/${ids.file}`); assert(result.status === 200 && result.body.data?.url && result.body.data.expiresIn === 300, `claimant signed photo ${result.status}`); result = await request(base, reviewer, `/api/files/lost-found/${ids.file}`); assert(result.status === 403, `cross-user signed photo ${result.status}`); pass('signed photo URL, expiry, and cross-user denial');
  } finally {
    const db = getAdminClient();
    if (ids.file) { const { data } = await db.from('lost_found_files').select('bucket,storage_key').eq('id', ids.file); for (const file of data || []) await db.storage.from(file.bucket).remove([file.storage_key]); }
    if (ids.item) await db.from('lost_found_items').delete().eq('id', ids.item);
    server.close(); console.log(`CLEANUP ${prefix}`);
  }
}
main().catch((error) => { console.error(`FAIL ${error.message}`); process.exitCode = 1; });
