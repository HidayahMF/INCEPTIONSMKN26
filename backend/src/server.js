import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });
import { app } from './app.js';
import { isSupabaseConfigured } from './lib/supabase.js';
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || undefined;
if (!isSupabaseConfigured()) {
  console.warn('[smkn26] Supabase belum dikonfigurasi (SUPABASE_URL/SUPABASE_ANON_KEY/SUPABASE_SERVICE_ROLE_KEY). Endpoint konten publik akan mengembalikan data kosong. Salin .env.example di root repo ke backend/.env untuk mengaktifkan konten, login, dan chat berbasis knowledge.');
}
app.listen(port, host, () => console.log(`SMKN26 API available on http://localhost:${port}`));
