import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { getAdminClient, isSupabaseConfigured } from '../src/lib/supabase.js';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
const tables = ['pkl_vacancies', 'pkl_applications', 'pkl_application_files'];
async function main() {
  if (!isSupabaseConfigured()) { console.error('BLOCKED: Supabase credentials are required.'); process.exitCode = 2; return; }
  const client = getAdminClient(); const failures = [];
  for (const table of tables) { const { error } = await client.from(table).select('*', { head: true, count: 'exact' }); if (error) failures.push(`table ${table}: ${error.message}`); else console.log(`OK table ${table}`); }
  const result = await client.storage.listBuckets(); if (result.error) failures.push(`storage listBuckets: ${result.error.message}`); else { const bucket = result.data.find((item) => item.name === 'cv-private'); if (!bucket) failures.push('bucket cv-private: missing (must be created privately with approval)'); else if (bucket.public) failures.push('bucket cv-private: public (must be private)'); else console.log('OK bucket cv-private exists and is private'); }
  if (failures.length) { console.error('PREFLIGHT FAILED'); failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1; return; }
  console.log('PREFLIGHT PASSED: no migration or storage mutation was performed.');
}
main().catch((error) => { console.error(`PREFLIGHT ERROR: ${error instanceof Error ? error.message : 'unknown error'}`); process.exitCode = 1; });
