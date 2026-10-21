import { useMemo, useState } from "react";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { PklFilterBar } from "../components/student/pkl/PklFilterBar";
import { PklOpportunityCard } from "../components/student/pkl/PklOpportunityCard";
import { PklPreparationCard } from "../components/student/pkl/PklPreparationCard";
import { PklSummaryCards } from "../components/student/pkl/PklSummaryCards";
import { PklTabs } from "../components/student/pkl/PklTabs";
import { demoPklOpportunities } from "../components/student/pkl/pkl.data";
import type { PklTab } from "../components/student/pkl/pkl.types";

export function StudentPklPage() {
  const { me } = useAuth();
  const isStudent = me?.profile.account_type === "STUDENT";

  return <RequireAuth>{isStudent ? <StudentPklContent /> : <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>}</RequireAuth>;
}

function StudentPklContent() {
  const { me } = useAuth();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const opportunities = isDemo ? demoPklOpportunities : [];
  const [tab, setTab] = useState<PklTab>("opportunities");
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const [major, setMajor] = useState("all");
  const [location, setLocation] = useState("all");
  const fields = useMemo(() => unique(opportunities.map((item) => item.field)), [opportunities]);
  const majors = useMemo(() => unique(opportunities.map((item) => item.major)), [opportunities]);
  const locations = useMemo(() => unique(opportunities.map((item) => item.location)), [opportunities]);
  const filteredOpportunities = useMemo(() => opportunities.filter((item) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery = !normalizedQuery || [item.company, item.program, item.industry, item.major, item.location].some((value) => value.toLowerCase().includes(normalizedQuery));
    const matchesField = field === "all" || item.field === field;
    const matchesMajor = major === "all" || item.major === major;
    const matchesLocation = location === "all" || item.location === location;
    return matchesQuery && matchesField && matchesMajor && matchesLocation;
  }), [field, location, major, opportunities, query]);

  const date = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());

  return <StudentPortalLayout breadcrumb="PKL & Lamaran">
    <div className="grid min-w-0 gap-6">
      <header className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><h1 className="break-words text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">BKK &amp; PKL</h1><span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-semibold text-primary">Portal siswa SMK Negeri 26 Jakarta</span></div><p className="mt-2 break-words text-[13px] text-[#607296]">Temukan peluang Praktik Kerja Lapangan yang sesuai dengan jurusan dan minatmu.</p></div>
        <div className="shrink-0 text-left sm:text-right"><strong className="block text-[12px] font-semibold capitalize text-ink">{date}</strong><span className="mt-1 block text-[11px] text-muted">Semester ganjil 2026/2027</span></div>
      </header>

      <PklSummaryCards isDemo={isDemo} />
      <PklTabs selected={tab} onChange={setTab} />
      <div id={`pkl-panel-${tab}`} role="tabpanel" aria-labelledby={`pkl-tab-${tab}`}>
        {tab === "opportunities" ? <>
          <PklFilterBar query={query} field={field} major={major} location={location} fields={fields} majors={majors} locations={locations} onQueryChange={setQuery} onFieldChange={setField} onMajorChange={setMajor} onLocationChange={setLocation} />
          <section className="mt-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-[19px] font-bold text-ink">Peluang PKL untukmu</h2><span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-semibold text-primary">Peluang PKL</span></div><p className="mt-2 text-[12px] text-[#607296]">Periksa detail peluang untuk mengetahui persyaratan, periode, dan informasi pendaftaran.</p></div><span className="text-[12px] text-[#607296]">{filteredOpportunities.length} peluang ditampilkan</span></div>
             {filteredOpportunities.length ? <div className="mt-4 grid min-w-0 gap-5 lg:grid-cols-2">{filteredOpportunities.map((opportunity) => <PklOpportunityCard key={opportunity.id} opportunity={opportunity} />)}</div> : <EmptyPklState text={isDemo ? "Tidak ada peluang yang sesuai dengan filtermu." : "Peluang PKL belum tersedia untuk akunmu."} />}
          </section>
        </> : <EmptyPklState id={`pkl-panel-${tab}`} text={tab === "applications" ? "Belum ada data lamaran yang tersedia." : "Belum ada peluang yang tersimpan."} />}
      </div>
      <PklPreparationCard />
      <footer className="flex flex-col justify-between gap-2 pb-1 text-[11px] text-muted sm:flex-row"><span>SMK Negeri 26 Jakarta · Portal Internal Siswa</span><span>Portal Internal Siswa · SMK Negeri 26 Jakarta</span></footer>
    </div>
  </StudentPortalLayout>;
}

function EmptyPklState({ text, id }: { text: string; id?: string }) {
  return <section id={id} className="mt-5 rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-12 text-center"><p className="text-sm text-muted">{text}</p></section>;
}

function unique(values: string[]) {
  return [...new Set(values)];
}
