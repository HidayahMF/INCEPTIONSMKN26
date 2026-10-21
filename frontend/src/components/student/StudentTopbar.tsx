import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "../../routes/compat";
import { useAuth } from "../../features/auth/AuthProvider";
import type { Me } from "../../types/auth";

type StudentTopbarProps = { me: Me | null; onOpenMenu: () => void; onUnavailable: (label: string) => void; breadcrumb?: string };

const searchableItems = [
  { label: "Beranda", href: "/dashboard" },
  { label: "Pembelajaran", href: "/dashboard/learning" },
  { label: "BKK & PKL" },
  { label: "Portofolio & Prestasi", href: "/dashboard/portfolio" },
  { label: "Lost & Found", href: "/dashboard/lost-found" },
  { label: "Aspirasi Kelas" },
  { label: "Kantin Digital" },
];

export function StudentTopbar({ me, onOpenMenu, onUnavailable, breadcrumb = "Beranda" }: StudentTopbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const results = query.trim() ? searchableItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

  useEffect(() => {
    if (!isProfileMenuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) setIsProfileMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileMenuOpen(false);
        return;
      }
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
      const menuItems = profileMenuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
      if (!menuItems?.length) return;
      event.preventDefault();
      const currentIndex = [...menuItems].indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.key === "ArrowDown" ? (currentIndex + 1) % menuItems.length : (currentIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[nextIndex]?.focus();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => profileMenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus(), 0);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileMenuOpen]);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError("");
    try {
      await logout();
      setIsProfileMenuOpen(false);
      navigate("/login", true);
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "Keluar akun gagal. Silakan coba lagi.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 flex min-h-[80px] items-center justify-between gap-4 border-b border-[#e2e9f3] bg-white px-5 sm:px-8 lg:px-9">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" aria-label="Buka navigasi siswa" onClick={onOpenMenu} className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf5ff] text-primary lg:hidden">
          <span className="text-xl" aria-hidden="true">☰</span>
        </button>
        <p className="hidden truncate text-[14px] text-muted sm:block">Portal siswa <span className="mx-2 text-[#b7c2d3]">/</span> <strong className="text-ink">{breadcrumb}</strong></p>
        <p className="truncate text-[14px] font-semibold text-ink sm:hidden">{breadcrumb}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="relative hidden w-[350px] md:block">
          <label className="flex h-11 items-center gap-3 rounded-xl border border-[#dce4ee] bg-white px-4 text-sm text-muted focus-within:border-primary">
            <img className="size-5" src="/assets/pages/siswapages/search.png" alt="" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#59657b]" placeholder="Cari layanan di portal..." aria-label="Cari layanan di portal" />
          </label>
          {results.length > 0 && <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-[#dce4ee] bg-white p-1 shadow-[0_12px_30px_rgba(20,47,90,.14)]">
            {results.map((item) => item.href ? <Link key={item.label} to={item.href} onClick={() => setQuery("")} className="block rounded-lg px-3 py-2 text-sm text-ink hover:bg-[#edf5ff]">{item.label}</Link> : <button key={item.label} type="button" onClick={() => { setQuery(""); onUnavailable(item.label); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-ink hover:bg-[#edf5ff]">{item.label}</button>)}
          </div>}
        </div>
        <button type="button" aria-label="Notifikasi" onClick={() => onUnavailable("Notifikasi")} className="grid size-11 place-items-center rounded-xl border border-[#dce4ee] text-muted transition hover:bg-[#f5f9ff]">
          <img className="size-5 object-contain" src="/assets/pages/siswapages/ion_notifcations.png" alt="" aria-hidden="true" />
        </button>
        <div ref={profileMenuRef} className="relative">
           <button type="button" aria-label="Buka menu akun siswa" aria-haspopup="menu" aria-expanded={isProfileMenuOpen} onClick={() => { setLogoutError(""); setIsProfileMenuOpen((open) => !open); }} className="group flex h-11 items-center gap-2 rounded-xl border border-[#dce4ee] bg-[#f8fafc] px-2.5 text-left transition hover:border-[#b9dafa] hover:bg-[#f1f8ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-w-[180px]">
            <img className="size-8 rounded-full object-cover" src={isDemo ? "/assets/pages/LoginPage/rolesiswa.png" : "/assets/shared/branding/smkn26-logo.png"} alt="" />
            <span className="hidden min-w-0 flex-1 sm:block"><strong className="block truncate text-[12px] font-semibold text-ink">{me?.profile.display_name || "Siswa"}</strong><span className="block truncate text-[10px] text-muted">{isDemo ? "Siswa · XII SIJA 2" : "Siswa"}</span></span>
             <ChevronIcon open={isProfileMenuOpen} />
          </button>
          {isProfileMenuOpen && <div role="menu" aria-label="Menu akun siswa" className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[min(270px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#d7e6f3] bg-white p-2 shadow-[0_18px_40px_rgba(20,47,90,.16)]">
            <div className="flex items-center gap-3 rounded-xl bg-[#f7fbff] px-3 py-3"><img className="size-10 rounded-full object-cover" src={isDemo ? "/assets/pages/LoginPage/rolesiswa.png" : "/assets/shared/branding/smkn26-logo.png"} alt="" /><span className="min-w-0"><strong className="block truncate text-[12px] font-semibold text-ink">{me?.profile.display_name || "Siswa"}</strong><span className="mt-0.5 block truncate text-[10px] text-muted">{isDemo ? "Siswa · XII SIJA 2" : "Siswa"}</span></span></div>
            <div className="my-2 h-px bg-[#e7edf5]" />
            <Link role="menuitem" to="/dashboard/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-[12px] font-semibold text-ink transition hover:bg-[#edf7ff] hover:text-primary focus-visible:bg-[#edf7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><UserIcon />Lihat Profil</Link>
            <button role="menuitem" type="button" disabled={isLoggingOut} onClick={() => void handleLogout()} className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-[12px] font-semibold text-[#c93b48] transition hover:bg-[#fff1f2] focus-visible:bg-[#fff1f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46b76] disabled:cursor-wait disabled:opacity-60"><LogoutIcon />{isLoggingOut ? "Keluar..." : "Keluar Akun"}</button>
            {logoutError && <p role="alert" className="mt-2 rounded-lg bg-[#fff1f2] px-3 py-2 text-[10px] leading-4 text-[#b42332]">{logoutError}</p>}
          </div>}
        </div>
      </div>
    </header>
  );
}

function ChevronIcon({ open }: { open: boolean }) { return <svg className={`hidden size-4 shrink-0 text-[#7890ad] transition-transform duration-200 group-hover:text-primary sm:block ${open ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function UserIcon() { return <svg className="size-4 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" /><path d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>; }
function LogoutIcon() { return <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19H14M13 12h7m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
