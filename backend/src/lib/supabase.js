import { createClient } from '@supabase/supabase-js';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

// Lets public read-only routes degrade gracefully (empty data) when the project
// runs without Supabase credentials, e.g. local UI work, instead of returning
// 500 and flooding the server log. Admin/auth routes still fail loudly.
export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getAuthClient() {
  return createClient(required('SUPABASE_URL'), required('SUPABASE_ANON_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
}

export function getAdminClient() {
  return createClient(required('SUPABASE_URL'), required('SUPABASE_SERVICE_ROLE_KEY'), { auth: { persistSession: false, autoRefreshToken: false } });
}
