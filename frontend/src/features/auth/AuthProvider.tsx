import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../../lib/api';
import type { Me } from '../../types/auth';
import { clearTeacherLearningCache } from '../learning/teacher.utils';

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
  ADMIN: ['admin:manage', 'portfolio:review', 'aspirations:submit', 'aspirations:review'], CLASS_REP: ['aspirations:submit'], MPK_OFFICER: ['aspirations:review'], CANTEEN_VENDOR: ['merchant:manage'], COOP_OPERATOR: ['merchant:manage'], CONTENT_EDITOR: ['content:manage'], SUBJECT_TEACHER: ['grades:manage'], BK_STAFF: ['lost_found:manage'], ACHIEVEMENT_VERIFIER: ['achievements:verify', 'portfolio:review'], BKK_OFFICER: ['pkl:manage'], HEAD_OF_DEPARTMENT: ['portfolio:review', 'pkl:manage'],
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
    return { me, loading, isAuthenticated: Boolean(me), hasRole, hasPermission: (permission) => permission === 'student:learning' ? me?.profile.account_type === 'STUDENT' : roles.some((role) => permissions[role.role_code]?.includes(permission)), logout: async () => { await api('/api/auth/logout', { method: 'POST' }); clearTeacherLearningCache(); setMe(null); }, refresh };
  }, [me, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus digunakan di dalam AuthProvider.');
  return context;
}
