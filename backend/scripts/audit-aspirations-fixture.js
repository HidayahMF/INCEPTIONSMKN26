import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { getAdminClient, isSupabaseConfigured } from '../src/lib/supabase.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const identifiers = ['DEMO-KELAS', 'DEMO-MPK', 'DEMO-ADMIN'];
const print = (label, value) => console.log(`\n${label}\n${JSON.stringify(value, null, 2)}`);

async function main() {
  if (!isSupabaseConfigured()) throw new Error('Supabase credentials are required.');
  const db = getAdminClient();
  const mappings = await db.from('auth_identity_mappings').select('login_identifier,user_id,internal_email').in('login_identifier', identifiers).order('login_identifier');
  if (mappings.error) throw mappings.error;
  print('IDENTITY MAPPINGS', mappings.data);
  const userIds = (mappings.data || []).map((row) => row.user_id);
  if (userIds.length) {
    const profiles = await db.from('profiles').select('user_id,school_identifier,display_name,account_type,is_active').in('user_id', userIds);
    if (profiles.error) throw profiles.error;
    print('PROFILES', profiles.data);
    const roles = await db.from('role_assignments').select('user_id,role_code,scope_type,scope_id,is_active,valid_from,valid_until').in('user_id', userIds).order('role_code');
    if (roles.error) throw roles.error;
    print('DEMO ROLES', roles.data);
    const memberships = await db.from('class_memberships').select('student_id,class_id,academic_year_id').in('student_id', userIds);
    if (memberships.error) throw memberships.error;
    print('DEMO MEMBERSHIPS', memberships.data);
    const classIds = (memberships.data || []).map((row) => row.class_id);
    if (classIds.length) {
      const classes = await db.from('classes').select('id,code,grade,major_id,academic_year_id').in('id', classIds);
      if (classes.error) throw classes.error;
      print('MEMBERSHIP CLASSES', classes.data);
    }
  }
  for (const table of ['academic_years', 'classes', 'aspiration_cycles', 'class_aspirations']) {
    const query = table === 'academic_years'
      ? db.from(table).select('id,code,starts_on,ends_on,is_active').order('starts_on', { ascending: false })
      : table === 'classes'
        ? db.from(table).select('id,code,grade,major_id,academic_year_id,academic_years(code,is_active)').order('code')
        : db.from(table).select('*').order('created_at', { ascending: false }).limit(20);
    const result = await query;
    if (result.error) throw result.error;
    print(table.toUpperCase(), result.data);
  }
}
main().catch((error) => { console.error(`AUDIT FAILED: ${error.message}`); process.exitCode = 1; });
