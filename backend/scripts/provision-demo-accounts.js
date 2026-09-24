import 'dotenv/config';
import { getAdminClient } from '../src/lib/supabase.js';

const accounts = [
  { identifier: 'DEMO-ADMIN', name: 'Admin Demo', type: 'STAFF', roles: ['ADMIN', 'CONTENT_EDITOR'] },
  { identifier: 'DEMO-GURU', name: 'Guru Demo', type: 'TEACHER', roles: ['SUBJECT_TEACHER'] },
  { identifier: 'DEMO-BK', name: 'Guru BK Demo', type: 'TEACHER', roles: ['BK_STAFF'] },
  { identifier: 'DEMO-KAJUR', name: 'Ketua Jurusan Demo', type: 'TEACHER', roles: ['HEAD_OF_DEPARTMENT'] },
  { identifier: 'DEMO-SISWA', name: 'Siswa Demo', type: 'STUDENT', roles: [] },
  { identifier: 'DEMO-KELAS', name: 'Ketua Kelas Demo', type: 'STUDENT', roles: ['CLASS_REP'] },
  { identifier: 'DEMO-MPK', name: 'Pengurus MPK Demo', type: 'STUDENT', roles: ['MPK_OFFICER'] },
  { identifier: 'DEMO-KANTIN', name: 'Pedagang Kantin Demo', type: 'STAFF', roles: ['CANTEEN_VENDOR'] },
  { identifier: 'DEMO-KOPERASI', name: 'Pengelola Koperasi Demo', type: 'STAFF', roles: ['COOP_OPERATOR'] }
];

const passwordFor = (identifier) => process.env[`DEMO_PASSWORD_${identifier.replaceAll('-', '_')}`];
const emailFor = (identifier) => `${identifier.toLowerCase().replaceAll(/[^a-z0-9]/g, '')}@${process.env.DEMO_AUTH_DOMAIN || 'demo.invalid'}`;

async function provision() {
  const admin = getAdminClient();
  for (const account of accounts) {
    const password = passwordFor(account.identifier);
    if (!password || password.length < 12) throw new Error(`Missing strong password env for ${account.identifier}`);
    const email = emailFor(account.identifier);
    const { data: existing } = await admin.from('auth_identity_mappings').select('user_id').eq('login_identifier', account.identifier).maybeSingle();
    let userId = existing?.user_id;
    if (!userId) {
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
      if (error) throw error;
      userId = data.user.id;
    } else {
      const { error } = await admin.auth.admin.updateUserById(userId, { password, email_confirm: true });
      if (error) throw error;
    }
    const { error: profileError } = await admin.from('profiles').upsert({ user_id: userId, school_identifier: account.identifier, identifier_type: 'INTERNAL', display_name: account.name, account_type: account.type, is_active: true });
    if (profileError) throw profileError;
    const { error: mappingError } = await admin.from('auth_identity_mappings').upsert({ user_id: userId, login_identifier: account.identifier, internal_email: email });
    if (mappingError) throw mappingError;
    for (const role of account.roles) {
      const { data: existingRole } = await admin.from('role_assignments').select('id').eq('user_id', userId).eq('role_code', role).eq('scope_type', 'GLOBAL').is('scope_id', null).maybeSingle();
      const { error } = existingRole
        ? await admin.from('role_assignments').update({ is_active: true, valid_until: null }).eq('id', existingRole.id)
        : await admin.from('role_assignments').insert({ user_id: userId, role_code: role, scope_type: 'GLOBAL', scope_id: null, is_active: true });
      if (error) throw error;
    }
  }
  console.log(`Provisioned ${accounts.length} synthetic demo accounts.`);
}

provision().catch((error) => { console.error(error.message); process.exitCode = 1; });
