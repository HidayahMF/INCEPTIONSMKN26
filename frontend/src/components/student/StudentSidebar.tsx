import { Link, useLocation } from "../../routes/compat";
import type { Me } from "../../types/auth";
import { getActiveRolePresentation } from "../../features/auth/rolePresentation";

type StudentSidebarProps = {
  me: Me | null;
  onClose: () => void;
  onUnavailable: (label: string) => void;
};

type MenuItem = { label: string; icon: string; href?: string };

const menuItems: MenuItem[] = [
  { label: "Beranda", href: "/dashboard", icon: "/assets/pages/siswapages/beranda.png" },
  { label: "BKK & PKL", href: "/dashboard/pkl", icon: "/assets/pages/siswapages/bkkdanpkl.png" },
  { label: "Portofolio & Prestasi", href: "/dashboard/portfolio", icon: "/assets/pages/siswapages/portofolioprestasi.png" },
  { label: "Lost & Found", href: "/dashboard/lost-found", icon: "/assets/pages/siswapages/lostandfoundsidebar.png" },
  { label: "Aspirasi Kelas", href: "/dashboard/aspirations", icon: "/assets/pages/siswapages/aspirasikelas.png" },
  { label: "Pembelajaran", href: "/dashboard/learning", icon: "/assets/pages/siswapages/pembelajaran.png" },
  { label: "Kantin Digital", href: "/dashboard/canteen", icon: "/assets/pages/siswapages/kantindigital.png" },
] as const;

export function StudentSidebar({ me, onClose, onUnavailable }: StudentSidebarProps) {
  const location = useLocation();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const rolePresentation = getActiveRolePresentation(me);

  return (
      <aside className="flex h-dvh max-h-dvh min-h-0 w-[247px] shrink-0 flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-gradient-to-b from-[#0788ed] via-[#0789ec] to-[#0677dc] px-5 py-7 text-white">
      <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
        <img className="size-[51px] shrink-0 object-contain" src="/assets/shared/branding/smkn26-logo.png" alt="" />
        <span className="min-w-0 text-[13px] font-bold leading-[15px] tracking-[-.02em]">
          SMK NEGERI 26
          <br />
          JAKARTA
          <small className="mt-1 block text-[7px] font-normal italic leading-3 text-white/80">Belajar, Bekerja, Membangun</small>
        </span>
      </Link>

      <p className="mt-9 text-[10px] font-bold uppercase tracking-[.08em] text-white/90">{rolePresentation.portalContextLabel}</p>
      <nav className="mt-2 grid gap-1.5" aria-label="Navigasi portal siswa">
        {menuItems.map((item) => {
          const active = item.href ? item.label === "Lost & Found" ? location.pathname.startsWith("/dashboard/lost-found") : item.label === "BKK & PKL" ? location.pathname.startsWith("/dashboard/pkl") : item.label === "Portofolio & Prestasi" ? location.pathname.startsWith("/dashboard/portfolio") : location.pathname === item.href : false;
          const content = (
            <>
              <img className="size-6 shrink-0 object-contain brightness-0 invert" src={item.icon} alt="" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {active && <span className="h-5 w-1 rounded-full bg-white" aria-hidden="true" />}
            </>
          );
          if (item.href) {
            return <Link key={item.label} to={item.href} onClick={onClose} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[14px] font-medium transition ${active ? "bg-white/20 text-white shadow-[0_4px_12px_rgba(0,40,120,.12)]" : "text-white/95 hover:bg-white/10"}`}>{content}</Link>;
          }
          return <button key={item.label} type="button" onClick={() => onUnavailable(item.label)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left text-[14px] font-medium text-white/95 transition hover:bg-white/10">{content}</button>;
        })}
      </nav>

      <div className="mt-7 rounded-xl bg-white px-4 py-4 text-ink shadow-[0_8px_18px_rgba(0,42,115,.12)]">
        <p className="text-[10px] font-medium uppercase tracking-[.08em] text-muted">Kelas siswa</p>
        {isDemo ? (
          <>
            <p className="mt-2 text-[15px] font-bold text-primary">XII SIJA 2</p>
            <p className="mt-1 text-[11px] leading-5 text-muted">Sistem Informasi, Jaringan &amp; Aplikasi</p>
            <p className="mt-1 text-[11px] text-muted">Tahun ajaran 2026/2027</p>
          </>
        ) : (
          <p className="mt-2 text-[12px] leading-5 text-muted">Informasi kelas belum tersedia.</p>
        )}
      </div>

      <Link to="/" onClick={onClose} className="group mt-7 flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent bg-white px-3 text-[12px] font-semibold text-primary shadow-[0_4px_12px_rgba(0,42,115,.12)] transition-[background-color,color,border-color,box-shadow] duration-300 hover:border-white hover:bg-primary hover:text-white hover:shadow-none focus-visible:border-white focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none">
        <img className="size-4 shrink-0 object-contain transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src="/assets/pages/siswapages/majesticons_open%20(1).png" alt="" aria-hidden="true" />
        Kembali ke situs publik
      </Link>
    </aside>
  );
}
