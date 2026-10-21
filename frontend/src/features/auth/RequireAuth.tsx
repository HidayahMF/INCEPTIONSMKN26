import { Navigate, useLocation } from '../../routes/compat';
import type { ReactNode } from 'react';
import { useAuth } from './AuthProvider';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();
  if (loading) return <AuthLoadingScreen title="Menyiapkan Portal Siswa" message="Memulihkan sesi masuk kamu..." />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

export function RequirePermission({ permission, children }: { permission: string; children: ReactNode }) {
  const { loading, isAuthenticated, hasPermission } = useAuth();
  if (loading) return <AuthLoadingScreen title="Menyiapkan Portal Siswa" message="Memeriksa akses halaman..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasPermission(permission)) return <main className="min-h-screen bg-school-bg p-8 text-muted">Anda tidak memiliki izin untuk halaman ini.</main>;
  return <>{children}</>;
}

function AuthLoadingScreen({ title, message }: { title: string; message: string }) {
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#eaf5fa] via-white to-[#eef7ff] px-4 py-8 sm:px-6" role="status" aria-live="polite">
    <div aria-hidden="true" className="absolute -left-20 -top-24 size-64 rounded-full bg-[#bfe8ff]/45 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-32 -right-16 size-72 rounded-full bg-[#d9efff]/70 blur-3xl" />
    <section className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[#d7e6f3] bg-white shadow-[0_18px_55px_rgba(20,77,125,.12)]">
      <div className="h-1.5 bg-gradient-to-r from-[#4cbaf5] via-[#0092ff] to-[#006cdc]" />
      <div className="px-6 pb-7 pt-8 text-center sm:px-10 sm:pb-9 sm:pt-10">
        <div className="mx-auto flex size-[76px] items-center justify-center rounded-[22px] border border-[#d9eaf7] bg-[#f6fbff] shadow-[0_8px_20px_rgba(0,126,233,.1)]">
          <img className="size-14 object-contain" src="/assets/shared/branding/smkn26-logo.png" alt="Logo SMK Negeri 26 Jakarta" />
        </div>
        <p className="mt-5 text-[10px] font-bold uppercase tracking-[.16em] text-primary">Portal Internal Siswa</p>
        <h1 className="mt-2 text-[21px] font-bold tracking-[-.02em] text-ink sm:text-[23px]">{title}</h1>
        <p className="mx-auto mt-2 max-w-[290px] text-[12px] leading-5 text-muted">{message}</p>
        <div className="mt-7 rounded-2xl border border-[#e2edf6] bg-[#f8fbff] p-4 text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e4f4ff] text-primary">
              <span className="size-4 animate-spin rounded-full border-2 border-[#b8ddf5] border-t-primary" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-ink">Mohon tunggu sebentar</p>
              <p className="mt-0.5 text-[10px] text-muted">Data akun sedang disiapkan dengan aman.</p>
            </div>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e3eef7]">
            <div className="h-full w-2/5 animate-pulse rounded-full bg-gradient-to-r from-[#4cbaf5] to-[#0092ff]" />
          </div>
        </div>
        <div aria-hidden="true" className="mt-6 flex justify-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#8bcff5]" />
          <span className="size-1.5 rounded-full bg-[#4cbaf5]" />
          <span className="size-1.5 rounded-full bg-[#0092ff]" />
        </div>
      </div>
    </section>
  </main>;
}
