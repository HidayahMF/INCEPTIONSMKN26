import { getAdminClient, getAuthClient } from '../../lib/supabase.js';

export function normalizeIdentifier(value) {
  return typeof value === 'string' ? value.trim().toUpperCase() : '';
}

export async function login(identifier, password) {
  const normalized = normalizeIdentifier(identifier);
  if (!normalized || typeof password !== 'string' || password.length < 8) return null;
  const admin = getAdminClient();
  const { data: mapping, error: mappingError } = await admin.from('auth_identity_mappings').select('internal_email,user_id').eq('login_identifier', normalized).maybeSingle();
  if (mappingError || !mapping) return null;
  const { data, error } = await getAuthClient().auth.signInWithPassword({ email: mapping.internal_email, password });
  if (error || !data.session) return null;
  const profile = await getProfile(mapping.user_id, admin);
  if (!profile || !profile.is_active) return null;
  return { session: data.session, profile };
}

export async function getProfile(userId, admin = getAdminClient()) {
  const { data, error } = await admin.from('profiles').select('user_id,school_identifier,identifier_type,display_name,account_type,is_active,created_at').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getRoles(userId, admin = getAdminClient()) {
  const { data, error } = await admin.from('role_assignments').select('id,role_code,scope_type,scope_id,valid_from,valid_until').eq('user_id', userId).eq('is_active', true).lte('valid_from', new Date().toISOString());
  if (error) throw error;
  return (data || []).filter((role) => !role.valid_until || new Date(role.valid_until) > new Date());
}

export async function getMe(userId) {
  const admin = getAdminClient();
  const [profile, roles] = await Promise.all([getProfile(userId, admin), getRoles(userId, admin)]);
  if (!profile?.is_active) return null;
  return { profile, roles };
}
