import { Navigate, useLocation } from '../../routes/compat';
import type { ReactNode } from 'react';
import { useAuth } from './AuthProvider';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();
  if (loading) return <main className="min-h-screen bg-school-bg p-8 text-muted">Memulihkan sesi...</main>;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

export function RequirePermission({ permission, children }: { permission: string; children: ReactNode }) {
  const { loading, isAuthenticated, hasPermission } = useAuth();
  if (loading) return <main className="min-h-screen bg-school-bg p-8 text-muted">Memeriksa izin...</main>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasPermission(permission)) return <main className="min-h-screen bg-school-bg p-8 text-muted">Anda tidak memiliki izin untuk halaman ini.</main>;
  return <>{children}</>;
}
