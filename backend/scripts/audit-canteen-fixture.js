import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { getAdminClient, isSupabaseConfigured } from '../src/lib/supabase.js';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const print = (label, value) => console.log(`\n${label}\n${JSON.stringify(value, null, 2)}`);
async function main() {
  if (!isSupabaseConfigured()) throw new Error('Supabase credentials are required.');
  const db = getAdminClient();
  const mapping = await db.from('auth_identity_mappings').select('login_identifier,user_id,internal_email').eq('login_identifier', 'DEMO-KANTIN').maybeSingle();
  if (mapping.error) throw mapping.error;
  print('DEMO-KANTIN MAPPING', mapping.data);
  if (!mapping.data) return;
  const profile = await db.from('profiles').select('user_id,school_identifier,display_name,account_type,is_active').eq('user_id', mapping.data.user_id).maybeSingle();
  if (profile.error) throw profile.error;
  print('DEMO-KANTIN PROFILE', profile.data);
  const roles = await db.from('role_assignments').select('id,user_id,role_code,scope_type,scope_id,is_active,valid_from,valid_until').eq('user_id', mapping.data.user_id).order('role_code');
  if (roles.error) throw roles.error;
  print('DEMO-KANTIN ROLES', roles.data);
  const merchants = await db.from('merchants').select('id,name,merchant_type,owner_id,is_active,created_at').eq('owner_id', mapping.data.user_id).order('created_at');
  if (merchants.error) throw merchants.error;
  print('OWNED MERCHANTS', merchants.data);
  const allMerchants = await db.from('merchants').select('id,name,merchant_type,owner_id,is_active').order('created_at');
  if (allMerchants.error) throw allMerchants.error;
  print('ALL MERCHANTS', allMerchants.data);
}
main().catch((error) => { console.error(`AUDIT FAILED: ${error.message}`); process.exitCode = 1; });
