import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { app } from '../src/app.js';
import { login } from '../src/modules/auth/auth.service.js';
import { getAdminClient } from '../src/lib/supabase.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const assert = (ok, message) => { if (!ok) throw new Error(message); };
async function token(identifier, password) { assert(password, `${identifier} password missing`); const result = await login(identifier, password); assert(result?.session?.access_token, `${identifier} login failed`); return result.session.access_token; }
async function request(base, accessToken, path, options = {}) { const headers = new Headers(options.headers); headers.set('cookie', `smkn26_access=${accessToken}`); const response = await fetch(`${base}${path}`, { ...options, headers }); return { status: response.status, body: await response.json() }; }

async function main() {
  const db = getAdminClient();
  const adminMapping = await db.from('auth_identity_mappings').select('user_id').eq('login_identifier', 'DEMO-ADMIN').single();
  const studentMapping = await db.from('auth_identity_mappings').select('user_id').eq('login_identifier', 'DEMO-SISWA').single();
  if (adminMapping.error || studentMapping.error) throw new Error('Required demo mappings are missing.');
  const studentId = studentMapping.data.user_id;
  await db.from('profiles').update({ is_active: true }).eq('user_id', studentId);
  const auditIds = [];
  const roleIds = [];
  let server;
  try {
    const admin = await token('DEMO-ADMIN', process.env.DEMO_PASSWORD_DEMO_ADMIN);
    const student = await token('DEMO-SISWA', process.env.DEMO_PASSWORD_DEMO_SISWA);
    const adminRole = await db.from('role_assignments').select('id').eq('user_id', adminMapping.data.user_id).eq('role_code', 'ADMIN').eq('scope_type', 'GLOBAL').eq('is_active', true).limit(1).maybeSingle();
    assert(adminRole.data?.id, 'admin fixture missing');
    server = app.listen(0);
    const base = `http://127.0.0.1:${server.address().port}`;
    const pass = (label) => console.log(`PASS ${label}`);
    let result = await request(base, admin, '/api/admin/management/summary');
    assert(result.status < 300 && typeof result.body.data.users.active === 'number', `summary ${result.status}`); pass('admin operational summary');
    result = await request(base, admin, '/api/admin/management/monitoring');
    assert(result.status < 300 && Array.isArray(result.body.data.portfolio), `monitoring ${result.status}`); pass('unified monitoring');
    for (const scopeType of ['CLASS', 'MAJOR', 'SUBJECT', 'MERCHANT', 'ACADEMIC_YEAR']) {
      result = await request(base, admin, `/api/admin/management/scope-resources?scopeType=${scopeType}&pageSize=5`);
      assert(result.status < 300 && Array.isArray(result.body.data.items) && result.body.data.items.every((item) => item.id && item.displayName), `scope resources ${scopeType} ${result.status}`);
    }
    pass('admin scope resource picker data');
    result = await request(base, admin, '/api/admin/management/users?search=DEMO-SISWA&active=true&pageSize=10');
    assert(result.status < 300 && result.body.data.items.some((item) => item.user_id === studentId), 'user search/filter'); pass('user search and filters');
    result = await request(base, student, '/api/admin/management/summary');
    assert(result.status === 403, `non admin ${result.status}`); pass('non-admin denied');
    result = await request(base, student, '/api/admin/management/audit');
    assert(result.status === 403, `non admin audit ${result.status}`); pass('non-admin audit denied');
    result = await request(base, student, '/api/admin/management/scope-resources?scopeType=CLASS');
    assert(result.status === 403, `non admin scope resources ${result.status}`); pass('non-admin scope resources denied');
    result = await request(base, admin, `/api/admin/management/roles/${adminRole.data.id}/status`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active: false }) });
    assert(result.status === 409, `last admin protection ${result.status}`); pass('last ADMIN protection');
    result = await request(base, admin, `/api/admin/management/users/${studentId}/roles`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ roleCode: 'CLASS_REP', scopeType: 'CLASS', scopeId: '00000000-0000-0000-0000-000000000001' }) });
    assert(result.status === 400, `invalid scope ${result.status}`); pass('invalid role scope rejected');
    const classRow = await db.from('classes').select('id').limit(1).maybeSingle();
    assert(classRow.data?.id, 'class fixture missing');
    result = await request(base, admin, `/api/admin/management/users/${studentId}/roles`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ roleCode: 'CLASS_REP', scopeType: 'CLASS', scopeId: classRow.data.id }) });
    assert(result.status < 300 && result.body.data.scope_type === 'CLASS', `assign role ${result.status}`); roleIds.push(result.body.data.id); pass('valid scoped role assignment');
    result = await request(base, admin, `/api/admin/management/roles/${result.body.data.id}/status`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active: false }) });
    assert(result.status < 300 && result.body.data.is_active === false, `revoke role ${result.status}`); pass('role revocation');
    result = await request(base, admin, `/api/admin/management/users/${studentId}/status`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active: false }) });
    assert(result.status < 300 && result.body.data.is_active === false, `deactivate ${result.status}`);
    result = await request(base, admin, `/api/admin/management/users/${studentId}/status`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ active: true }) });
    assert(result.status < 300 && result.body.data.is_active === true, `reactivate ${result.status}`); pass('account status change and restore');
    result = await request(base, admin, '/api/admin/management/audit?pageSize=20');
    assert(result.status < 300 && result.body.data.items.some((item) => item.action === 'ACCOUNT_DEACTIVATED' && item.entity_id === studentId), 'audit events');
    for (const event of result.body.data.items.filter((item) => item.entity_id === studentId && ['ACCOUNT_DEACTIVATED', 'ACCOUNT_ACTIVATED'].includes(item.action))) auditIds.push(event.id);
    pass('admin audit viewer and account audit');
  } finally {
    await db.from('profiles').update({ is_active: true }).eq('user_id', studentId);
    if (roleIds.length) await db.from('role_assignments').delete().in('id', roleIds);
    if (auditIds.length) await db.from('admin_audit_events').delete().in('id', [...new Set(auditIds)]);
    if (server) server.close();
    console.log(`CLEANUP management audit events=${auditIds.length}`);
  }
}
main().catch((error) => { console.error(`FAIL ${error.message}`); process.exitCode = 1; });
