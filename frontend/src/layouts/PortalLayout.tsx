import { useState, type ReactNode } from 'react';
import { useAuth } from '../features/auth/AuthProvider';
import { Link, useNavigate, useLocation } from '../routes/compat';

export function PortalLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { me, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const links = [{ label: 'Dashboard', href: '/dashboard', show: true }, ...(me?.profile.account_type === 'STUDENT' ? [{ label: 'Rekomendasi Belajar', href: '/dashboard/learning', show: true }] : []), ...(hasPermission('grades:manage') ? [{ label: 'Input Nilai', href: '/dashboard/grades', show: true }] : []), ...(hasPermission('content:manage') ? [{ label: 'Knowledge Base', href: '/admin/knowledge', show: true }] : [])];
  return <div className="min-h-screen overflow-x-hidden bg-school-bg text-ink">
    <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-72 border-r border-light-blue bg-white p-6 shadow-xl transition-transform lg:translate-x-0`}>
      <Link to="/dashboard" className="flex items-center gap-3 text-sm font-bold tracking-tight text-ink"><img className="size-11 object-contain" src="/assets/figma/branding/smkn26-logo.png" alt="" /><span>SMK NEGERI 26 JAKARTA<span className="mt-1 block text-xs font-medium text-muted">Portal internal</span></span></Link>
      <nav className="mt-10 grid gap-2" aria-label="Navigasi portal">{links.map((link) => <Link to={link.href} key={link.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${location.pathname === link.href ? 'bg-light-blue text-primary-dark' : 'text-muted hover:bg-light-blue hover:text-primary'}`}><PortalIcon name={link.href} />{link.label}</Link>)}</nav>
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-school-bg p-4"><p className="text-xs font-semibold uppercase tracking-[.12em] text-primary">Akses aman</p><p className="mt-1 text-xs leading-5 text-muted">Data portal hanya tersedia untuk akun yang ditugaskan.</p><Link to="/" className="mt-3 block text-xs font-semibold text-primary hover:underline">Website publik</Link></div>
    </aside>
    {open && <button aria-label="Tutup navigasi" className="fixed inset-0 z-40 bg-ink/20 lg:hidden" onClick={() => setOpen(false)} />}
    <div className="min-h-screen lg:pl-72">
      <header className="flex items-center justify-between border-b border-light-blue bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-8">
        <button className="rounded-xl bg-light-blue px-3 py-2 text-sm font-semibold text-primary-dark lg:hidden" onClick={() => setOpen(true)}>Menu</button>
        <div className="ml-auto flex items-center gap-4"><div className="hidden text-right sm:block"><strong className="block text-sm text-ink">{me?.profile.display_name}</strong><span className="text-xs text-muted">{me?.profile.account_type}</span></div><button onClick={async () => { await logout(); navigate('/login', true); }} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_4px_16px_rgba(15,23,42,.08)] ring-1 ring-light-blue">Keluar</button></div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8 lg:py-12">{children}</main>
    </div>
  </div>;
}

function PortalIcon({ name }: { name: string }) {
  const paths: Record<string, string> = { '/dashboard': 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', '/dashboard/learning': 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z M4 5.5V21', '/dashboard/grades': 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5', '/admin/knowledge': 'M6 3h9l4 4v14H6zM15 3v5h5M9 13h6M9 17h6' };
  return <svg aria-hidden="true" className="size-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths['/dashboard']} /></svg>;
}
