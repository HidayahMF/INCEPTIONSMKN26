import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
import { getAdminClient, isSupabaseConfigured } from '../src/lib/supabase.js';

const tables = ['student_portfolios', 'achievement_submissions', 'portfolio_files'];
const buckets = ['portfolio-private', 'achievement-private'];

async function main() {
  if (!isSupabaseConfigured()) {
    console.error('BLOCKED: SUPABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY are required.');
    process.exitCode = 2;
    return;
  }
  const client = getAdminClient();
  const failures = [];
  for (const table of tables) {
    const { error } = await client.from(table).select('*', { count: 'exact', head: true });
    if (error) failures.push(`table ${table}: ${error.message}`);
    else console.log(`OK table ${table}`);
  }
  const bucketResult = await client.storage.listBuckets();
  if (bucketResult.error) failures.push(`storage listBuckets: ${bucketResult.error.message}`);
  else {
    const existing = new Set((bucketResult.data || []).map((bucket) => bucket.name));
    for (const bucket of buckets) {
      const resource = (bucketResult.data || []).find((item) => item.name === bucket);
      if (!resource) failures.push(`bucket ${bucket}: missing (must be created privately with approval)`);
      else if (resource.public) failures.push(`bucket ${bucket}: public (must be private)`);
      else console.log(`OK bucket ${bucket} exists and is private`);
    }
  }
  if (failures.length) {
    console.error('PREFLIGHT FAILED');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log('PREFLIGHT PASSED: no migration or storage mutation was performed.');
}

main().catch((error) => { console.error(`PREFLIGHT ERROR: ${error instanceof Error ? error.message : 'unknown error'}`); process.exitCode = 1; });
