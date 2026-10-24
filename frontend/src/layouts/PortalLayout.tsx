import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "../routes/compat";
import { useAuth } from "../features/auth/AuthProvider";
import { getActiveRolePresentation } from "../features/auth/rolePresentation";
import { PortalShellHost, usePortalShellHost } from "./PortalShellContext";

type PortalLayoutProps = { children: ReactNode; breadcrumb?: string };
type PortalLink = { label: string; href: string; icon: string; permission?: string };

const links: PortalLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Admin Dashboard", href: "/admin/management", icon: "management", permission: "admin:manage" },
  { label: "Knowledge Base", href: "/admin/knowledge", icon: "knowledge", permission: "content:manage" },
  { label: "Review Portofolio", href: "/dashboard/teacher/portfolio-review", icon: "portfolio", permission: "portfolio:review" },
  { label: "BKK & PKL", href: "/dashboard/teacher/pkl", icon: "pkl", permission: "pkl:manage" },
  { label: "Lost & Found", href: "/dashboard/teacher/lost-found", icon: "lostfound", permission: "lost_found:manage" },
  { label: "Aspirasi Kelas", href: "/dashboard/teacher/aspirations", icon: "aspirations", permission: "aspirations:review" },
  { label: "Kantin Digital", href: "/dashboard/teacher/canteen", icon: "canteen", permission: "merchant:manage" },
];

export function PortalLayout({ children, breadcrumb = "Beranda" }: PortalLayoutProps) {
  const hosted = usePortalShellHost();
  const { me, hasPermission, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const rolePresentation = getActiveRolePresentation(me);
  const visibleLinks = links.filter((link) => {
    if (link.href === "/dashboard" && hasPermission("admin:manage")) return false;
    return !link.permission || hasPermission(link.permission);
  });

  if (hosted) return <>{children}</>;

  async function signOut() {
    await logout();
    navigate("/login", true);
  }

  const shell = (
    <div className="portal-shell min-h-screen overflow-x-hidden bg-[#f3f7fd] text-ink">
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:block ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <aside className="portal-sidebar flex h-dvh max-h-dvh min-h-0 shrink-0 flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-gradient-to-b from-[#0788ed] via-[#0789ec] to-[#0677dc] px-5 py-7 text-white">
          <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
            <img className="size-[51px] shrink-0 object-contain" src="/assets/shared/branding/smkn26-logo.png" alt="" />
            <span className="min-w-0 text-[13px] font-bold leading-[15px] tracking-[-.02em]">SMK NEGERI 26<br />JAKARTA<small className="mt-1 block text-[7px] font-normal italic leading-3 text-white/80">Belajar, Bekerja, Membangun</small></span>
          </Link>
          <p className="mt-9 text-[10px] font-bold uppercase tracking-[.08em] text-white/90">{rolePresentation.portalContextLabel}</p>
          <nav className="mt-2 grid gap-1.5" aria-label={`Navigasi ${rolePresentation.portalContextLabel}`}>
            {visibleLinks.map((link) => {
              const active = link.href === "/dashboard" ? location.pathname === link.href : location.pathname.startsWith(link.href);
              return <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition ${active ? "bg-white/20 text-white shadow-[0_4px_12px_rgba(0,40,120,.12)]" : "text-white/95 hover:bg-white/10"}`}><PortalIcon name={link.icon} /><span className="min-w-0 flex-1 truncate">{link.label}</span>{active && <span className="h-5 w-1 rounded-full bg-white" aria-hidden="true" />}</Link>;
            })}
          </nav>
          <Link to="/" onClick={() => setOpen(false)} className="group mt-auto flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent bg-white px-3 text-[12px] font-semibold text-primary shadow-[0_4px_12px_rgba(0,42,115,.12)] transition hover:border-white hover:bg-primary hover:text-white focus-visible:outline-none"><img className="size-4 shrink-0 object-contain transition-[filter] group-hover:brightness-0 group-hover:invert" src="/assets/pages/siswapages/majesticons_open%20(1).png" alt="" aria-hidden="true" />Kembali ke situs publik</Link>
        </aside>
      </div>
      {open && <button type="button" aria-label="Tutup navigasi" className="fixed inset-0 z-40 bg-ink/30 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="portal-main-offset min-h-screen">
        <PortalTopbar me={me} rolePresentation={rolePresentation} breadcrumb={breadcrumb} onOpenMenu={() => setOpen(true)} onLogout={signOut} />
        <main className="mx-auto w-full max-w-[1400px] px-5 py-7 sm:px-8 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
  return <PortalShellHost>{shell}</PortalShellHost>;
}

function PortalTopbar({ me, rolePresentation, breadcrumb, onOpenMenu, onLogout }: { me: ReturnType<typeof useAuth>["me"]; rolePresentation: ReturnType<typeof getActiveRolePresentation>; breadcrumb: string; onOpenMenu: () => void; onLogout: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!menuRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <header className="sticky top-0 z-30 flex min-h-[80px] items-center justify-between gap-4 border-b border-[#e2e9f3] bg-white px-5 sm:px-8 lg:px-9"><div className="flex min-w-0 items-center gap-3"><button type="button" aria-label={`Buka navigasi ${rolePresentation.portalContextLabel}`} onClick={onOpenMenu} className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf5ff] text-primary lg:hidden"><span className="text-xl leading-none" aria-hidden="true">☰</span></button><p className="hidden truncate text-[14px] text-muted sm:block">{rolePresentation.portalContextLabel} <span className="mx-2 text-[#b7c2d3]">/</span><strong className="text-ink">{breadcrumb}</strong></p><p className="truncate text-[14px] font-semibold text-ink sm:hidden">{breadcrumb}</p></div><div ref={menuRef} className="relative shrink-0"><button type="button" aria-label={`Buka menu akun ${rolePresentation.displayLabel}`} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="group flex h-11 items-center gap-2 rounded-xl border border-[#dce4ee] bg-[#f8fafc] px-2.5 text-left transition hover:border-[#b9dafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-w-[190px]"><img className="size-8 rounded-full object-cover" src={rolePresentation.assetPath} alt="" /><span className="hidden min-w-0 flex-1 sm:block"><strong className="block truncate text-[12px] font-semibold text-ink">{me?.profile.display_name || "Akun sekolah"}</strong><span className="block text-[10px] text-muted">{rolePresentation.displayLabel}</span></span><span className={`hidden size-4 text-[#7890ad] transition-transform sm:block ${open ? "rotate-180" : ""}`} aria-hidden="true">⌄</span></button>{open && <div role="menu" aria-label={`Menu akun ${rolePresentation.displayLabel}`} className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[250px] rounded-2xl border border-[#d7e6f3] bg-white p-2 shadow-[0_18px_40px_rgba(20,47,90,.16)]"><div className="flex items-center gap-3 rounded-xl bg-[#f7fbff] px-3 py-3"><img className="size-10 rounded-full object-cover" src={rolePresentation.assetPath} alt="" /><span className="min-w-0"><strong className="block truncate text-[12px] text-ink">{me?.profile.display_name || "Akun sekolah"}</strong><span className="text-[10px] text-muted">{rolePresentation.displayLabel} · {rolePresentation.portalContextLabel}</span></span></div><div className="my-2 h-px bg-[#e7edf5]" /><Link role="menuitem" to="/dashboard/profile" onClick={() => setOpen(false)} className="flex min-h-10 items-center rounded-xl px-3 text-[12px] font-semibold text-ink hover:bg-[#edf7ff] hover:text-primary">Lihat Profil</Link><button role="menuitem" type="button" onClick={() => void onLogout()} className="flex min-h-10 w-full items-center rounded-xl px-3 text-left text-[12px] font-semibold text-[#c93b48] hover:bg-[#fff1f2]">Keluar Akun</button></div>}</div></header>;
}

function PortalIcon({ name }: { name: string }) {
  const paths: Record<string, string> = { dashboard: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z", management: "M4 5h16M4 12h16M4 19h16", knowledge: "M6 3h9l4 4v14H6zM15 3v5h5M9 13h6M9 17h6", portfolio: "M5 5h14v14H5zM8 9h8M8 13h6", pkl: "M4 7h16v12H4zM8 7V5h8v2M8 12h8", lostfound: "M4 5h16v14H4zM8 9h8M8 13h5", aspirations: "M5 5h14v11H8l-3 3V5z", canteen: "M5 4v7M8 4v7M5 8h3M6.5 11v9M15 4v16M18 4v16" };
  return <svg aria-hidden="true" className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.dashboard} /></svg>;
}
