import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../../lib/api';
import type { Me } from '../../types/auth';

type AuthContextValue = {
  me: Me | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const permissions: Record<string, string[]> = {
  ADMIN: ['admin:manage'], CONTENT_EDITOR: ['content:manage'], SUBJECT_TEACHER: ['grades:manage'],
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = async () => {
    try { setMe(await api<Me>('/api/me')); } catch { setMe(null); } finally { setLoading(false); }
  };
  useEffect(() => { void refresh(); }, []);
  const value = useMemo<AuthContextValue>(() => {
    const roles = me?.roles || [];
    const hasRole = (role: string) => roles.some((item) => item.role_code === role);
    return { me, loading, isAuthenticated: Boolean(me), hasRole, hasPermission: (permission) => permission === 'student:learning' ? me?.profile.account_type === 'STUDENT' : roles.some((role) => permissions[role.role_code]?.includes(permission)), logout: async () => { await api('/api/auth/logout', { method: 'POST' }); setMe(null); }, refresh };
  }, [me, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus digunakan di dalam AuthProvider.');
  return context;
}
