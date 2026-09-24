import { getAuthClient, getAdminClient } from '../lib/supabase.js';
import { getProfile } from '../modules/auth/auth.service.js';

export async function authenticate(req, res, next) {
  try {
    const token = req.cookies?.smkn26_access;
    if (!token) return res.status(401).json({ data: null, error: { message: 'Sesi tidak valid.' } });
    const { data, error } = await getAuthClient().auth.getUser(token);
    if (error || !data.user) return res.status(401).json({ data: null, error: { message: 'Sesi tidak valid.' } });
    const profile = await getProfile(data.user.id, getAdminClient());
    if (!profile?.is_active) return res.status(403).json({ data: null, error: { message: 'Akun tidak aktif.' } });
    req.auth = { userId: data.user.id, profile };
    return next();
  } catch (error) { return next(error); }
}
