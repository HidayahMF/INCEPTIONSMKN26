import { useEffect, useMemo, useState } from "react";
import { Link } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { LostFoundCard } from "../components/student/lostfound/LostFoundCard";
import { LostFoundFilters } from "../components/student/lostfound/LostFoundFilters";
import { LostFoundStats } from "../components/student/lostfound/LostFoundStats";
import { LostFoundTabs } from "../components/student/lostfound/LostFoundTabs";
import { demoLostFoundItems } from "../components/student/lostfound/lostfound.data";
import { getLostFoundItems } from "../components/student/lostfound/lostfound.api";
import type { LostFoundItem, LostFoundTab } from "../components/student/lostfound/lostfound.types";

export function StudentLostFoundPage() {
  const { me } = useAuth();
  const isStudent = me?.profile.account_type === "STUDENT";
  return <RequireAuth>{isStudent ? <StudentLostFoundContent /> : <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>}</RequireAuth>;
}

function StudentLostFoundContent() {
  const { me } = useAuth();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { getLostFoundItems().then((next) => setItems(next.length ? next : (isDemo ? demoLostFoundItems : []))).catch((reason) => setError(reason instanceof Error ? reason.message : "Lost & Found gagal dimuat.")).finally(() => setLoading(false)); }, [isDemo]);
  const [tab, setTab] = useState<LostFoundTab>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [date, setDate] = useState("all");
  const [status, setStatus] = useState("all");
  const categories = useMemo(() => unique(items.map((item) => item.category)), [items]);
  const locations = useMemo(() => unique(items.map((item) => item.location)), [items]);
  const dates = useMemo(() => unique(items.map((item) => item.reportedAt)), [items]);
  const statuses = useMemo(() => unique(items.map((item) => statusLabel(item.status))), [items]);
  const filteredItems = useMemo(() => items.filter((item) => {
    const needle = query.trim().toLowerCase();
    const matchesTab = tab === "all" || tab === "lost" && item.type === "LOST" || tab === "found" && item.type === "FOUND" || tab === "mine" && item.isMine;
    const matchesQuery = !needle || `${item.name} ${item.description}`.toLowerCase().includes(needle);
    return matchesTab && matchesQuery && (category === "all" || item.category === category) && (location === "all" || item.location === location) && (date === "all" || item.reportedAt === date) && (status === "all" || statusLabel(item.status) === status);
  }), [category, date, items, location, query, status, tab]);
  const today = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());

  return <StudentPortalLayout breadcrumb="Lost & Found">
    <div className="grid min-w-0 gap-6">
      <header className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end"><div className="min-w-0"><h1 className="break-words text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Lost &amp; Found</h1><p className="mt-2 break-words text-[13px] text-[#607296]">Temukan kembali barangmu atau bantu teman sekolah menemukan barang yang hilang.</p></div><div className="shrink-0 text-left sm:text-right"><strong className="block text-[12px] font-semibold capitalize text-ink">{today}</strong><span className="mt-1 block text-[11px] text-muted">Semester ganjil 2026/2027</span></div></header>
      <section className="flex gap-3 rounded-2xl border border-[#d7e9fb] bg-[#f5fbff] p-4"><img className="size-[18px] shrink-0 object-contain" src="/assets/pages/siswapages/Lost&Found/info.png" alt="" aria-hidden="true" /><div><h2 className="text-[12px] font-bold text-ink">Informasi Layanan</h2><p className="mt-1 text-[12px] text-[#607296]">Temukan kembali barangmu atau bantu teman sekolah menemukan barang yang hilang.</p></div></section>
       <LostFoundStats isDemo={isDemo} />
       {error && <p role="alert" className="rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]">{error}</p>}
      <div className="flex justify-end"><Link to="/dashboard/lost-found/report" className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-[13px] font-semibold text-white transition-[background-color,background-image,color,border-color] duration-300 hover:border hover:border-[#cbd5e1] hover:bg-white hover:bg-none hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><span>Laporkan Barang Hilang</span><img className="size-5 object-contain brightness-0 invert transition-[filter] duration-300 group-hover:[filter:brightness(0)_saturate(100%)_invert(43%)_sepia(99%)_saturate(3314%)_hue-rotate(194deg)_brightness(102%)_contrast(104%)] group-focus-visible:[filter:brightness(0)_saturate(100%)_invert(43%)_sepia(99%)_saturate(3314%)_hue-rotate(194deg)_brightness(102%)_contrast(104%)]" src="/assets/pages/siswapages/Lost&Found/Plus.png" alt="" aria-hidden="true" /></Link></div>
      <LostFoundTabs selected={tab} onChange={setTab} />
      <div id={`lost-found-panel-${tab}`} role="tabpanel" aria-labelledby={`lost-found-tab-${tab}`}><LostFoundFilters query={query} category={category} location={location} date={date} status={status} categories={categories} locations={locations} dates={dates} statuses={statuses} onQuery={setQuery} onCategory={setCategory} onLocation={setLocation} onDate={setDate} onStatus={setStatus} />
        <section className="mt-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><h2 className="text-[19px] font-bold text-ink">Barang di sekitar sekolah</h2><p className="mt-2 text-[12px] text-[#607296]">Lihat laporan barang hilang dan temuan yang tercatat di lingkungan sekolah.</p></div></div>{loading ? <div className="mt-5 h-48 animate-pulse rounded-2xl bg-white" /> : filteredItems.length ? <div className="mt-5 grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredItems.map((item) => <LostFoundCard key={item.id} item={item} />)}</div> : <div className="mt-5 rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-12 text-center text-sm text-muted">{isDemo ? "Tidak ada barang yang sesuai dengan filtermu." : "Belum ada laporan barang yang tersedia."}</div>}<p className="mt-6 text-center text-[12px] text-muted">Menampilkan {filteredItems.length} laporan{isDemo ? " contoh" : ""}</p></section>
      </div>
      <section className="flex gap-3 rounded-2xl border border-[#e1e9f4] bg-white p-5"><img className="size-[22px] shrink-0 object-contain" src="/assets/pages/siswapages/Lost&Found/shield-check.png" alt="" aria-hidden="true" /><div><h2 className="text-[14px] font-bold text-ink">Kehilangan atau menemukan barang?</h2><p className="mt-1 text-[12px] leading-5 text-muted">Segera buat laporan dengan informasi yang jelas agar proses pencarian dan pengembalian barang dapat ditindaklanjuti oleh petugas sekolah.</p></div></section>
      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
    </div>
  </StudentPortalLayout>;
}

function statusLabel(status: LostFoundItem["status"]) { return status === "PENDING" ? "Menunggu Verifikasi" : status === "VERIFIED" ? "Terverifikasi" : "Sudah Diambil"; }
function unique(values: string[]) { return [...new Set(values)]; }
