import { useState } from "react";
import { Link } from "../../routes/compat";
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
  const [query, setQuery] = useState("");
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const results = query.trim() ? searchableItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : [];

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
        <div className="flex h-11 items-center gap-2 rounded-xl border border-[#dce4ee] bg-[#f8fafc] px-2.5 sm:min-w-[180px]">
          <img className="size-8 rounded-full object-cover" src={isDemo ? "/assets/pages/LoginPage/rolesiswa.png" : "/assets/shared/branding/smkn26-logo.png"} alt="" />
          <div className="hidden min-w-0 sm:block">
            <strong className="block truncate text-[12px] font-semibold text-ink">{me?.profile.display_name || "Siswa"}</strong>
            <span className="block truncate text-[10px] text-muted">{isDemo ? "Siswa · XII SIJA 2" : "Siswa"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
