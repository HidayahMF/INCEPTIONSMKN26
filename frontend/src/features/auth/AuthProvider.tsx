import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api, clearApiCache, setApiCacheIdentity } from '../../lib/api';
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
let refreshRequest: Promise<Me | null> | null = null;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    if (!refreshRequest) {
      refreshRequest = api<Me>('/api/me')
        .then((next) => {
          const roleIdentity = next.roles
            .map((role) => `${role.role_code}:${role.scope_type}:${role.scope_id || ''}`)
            .sort()
            .join('|');
          setApiCacheIdentity(`${next.profile.user_id}:${roleIdentity}`);
          return next;
        })
        .catch(() => {
          setApiCacheIdentity(null);
          return null;
        })
        .finally(() => { refreshRequest = null; });
    }
    const next = await refreshRequest;
    setMe(next);
    setLoading(false);
  }, []);
  useEffect(() => { void refresh(); }, []);
  const value = useMemo<AuthContextValue>(() => {
    const roles = me?.roles || [];
    const hasRole = (role: string) => roles.some((item) => item.role_code === role);
    return { me, loading, isAuthenticated: Boolean(me), hasRole, hasPermission: (permission) => permission === 'student:learning' ? me?.profile.account_type === 'STUDENT' : roles.some((role) => permissions[role.role_code]?.includes(permission)), logout: async () => { await api('/api/auth/logout', { method: 'POST' }); clearTeacherLearningCache(); clearApiCache(); setApiCacheIdentity(null); setMe(null); }, refresh };
  }, [me, loading, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus digunakan di dalam AuthProvider.');
  return context;
}
