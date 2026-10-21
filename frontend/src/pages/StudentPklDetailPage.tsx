import { useMemo } from "react";
import { Link, usePathname } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { demoPklOpportunities } from "../components/student/pkl/pkl.data";
import type { PklOpportunity } from "../components/student/pkl/pkl.types";

const icons = {
  major: "/assets/pages/siswapages/BKK&PKL/mdi_book-education%20(2).png",
  location: "/assets/pages/siswapages/BKK&PKL/boxicons_location-filled.png",
  date: "/assets/pages/siswapages/BKK&PKL/lets-icons_date-fill%20(1).png",
  period: "/assets/pages/siswapages/BKK&PKL/ion_book%20(1).png",
  preparation: "/assets/pages/siswapages/BKK&PKL/fa-solid_user-cog.png",
  documents: "/assets/pages/siswapages/BKK&PKL/material-symbols_mail-rounded%20(1).png",
  checklist: "/assets/pages/bkk/checklisticon.png",
};

export function StudentPklDetailPage() {
  const { me } = useAuth();
  const isStudent = me?.profile.account_type === "STUDENT";

  return <RequireAuth>{isStudent ? <StudentPklDetailContent /> : <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>}</RequireAuth>;
}

function StudentPklDetailContent() {
  const { me } = useAuth();
  const pathname = usePathname();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const id = decodeURIComponent(pathname.slice("/dashboard/pkl/".length));
  const opportunity = useMemo<PklOpportunity | undefined>(() => isDemo ? demoPklOpportunities.find((item) => item.id === id) : undefined, [id, isDemo]);

  if (!opportunity) return <StudentPortalLayout breadcrumb="PKL & Lamaran / Detail Peluang"><NotFound /></StudentPortalLayout>;

  const related = getRelatedOpportunities(opportunity);
  return <StudentPortalLayout breadcrumb="PKL & Lamaran / Detail Peluang">
    <div className="grid min-w-0 gap-5">
      <Link to="/dashboard/pkl" className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-primary transition hover:text-primary-dark focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        <span aria-hidden="true" className="text-lg leading-none">←</span> Kembali ke BKK &amp; PKL
      </Link>

      <header className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="break-words text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Detail Peluang PKL</h1>
          {isDemo && <span className="rounded-full bg-[#fff7df] px-3 py-1 text-[10px] font-semibold text-[#b77a00]">Data contoh</span>}
        </div>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#607296]">Kenali perusahaan, pelajari program, dan persiapkan dirimu sebelum mengikuti PKL.</p>
      </header>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <main className="grid min-w-0 gap-6">
          <CompanyOverview opportunity={opportunity} />
          <ProgramTimeline opportunity={opportunity} />
          <PreparationSection />
          <RelatedOpportunities opportunities={related} />
        </main>

        <aside className="grid gap-5 xl:sticky xl:top-24">
          <QuickInformation opportunity={opportunity} />
          <RegistrationPanel />
        </aside>
      </div>

      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
    </div>
  </StudentPortalLayout>;
}

function CompanyOverview({ opportunity }: { opportunity: PklOpportunity }) {
  return <section className="min-w-0 overflow-hidden rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6">
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(280px,.96fr)] lg:items-center">
      <div className="group min-w-0 overflow-hidden rounded-2xl bg-[#eef6fc]">
        <img className="aspect-[1.55] w-full object-cover transition duration-500 group-hover:scale-[1.02]" src={opportunity.image} alt={`Gedung ${opportunity.company}`} />
      </div>
      <div className="min-w-0">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#fff7df] px-3 py-1.5 text-[10px] font-semibold text-[#a66b00]"><span className="size-1.5 rounded-full bg-current" />Informasi periode</span>
        <h2 className="mt-4 break-words text-[25px] font-bold leading-tight tracking-[-.025em] text-ink">{opportunity.company}</h2>
        <p className="mt-2 break-words text-[13px] font-medium text-primary">{opportunity.industry}</p>
        <h3 className="mt-5 break-words text-[19px] font-bold leading-6 text-ink">{opportunity.program}</h3>
        <p className="mt-3 text-[13px] leading-6 text-[#607296]">{opportunity.description}</p>
        <div className="mt-5 grid gap-3 rounded-2xl border border-[#d7e9f8] bg-[#f5fbff] p-4 text-[12px] text-[#52658a] sm:grid-cols-2">
          <Meta icon="major" label="Jurusan" value={opportunity.major} />
          <Meta icon="location" label="Lokasi" value={opportunity.location} />
        </div>
        <p className="mt-4 text-[11px] leading-5 text-muted">Ketersediaan terbaru belum dapat dikonfirmasi dari portal. Gunakan periode ini sebagai informasi referensi dan ikuti arahan BKK sekolah.</p>
      </div>
    </div>
  </section>;
}

function ProgramTimeline({ opportunity }: { opportunity: PklOpportunity }) {
  return <section className="grid gap-4 sm:grid-cols-2">
    <InfoCard icon="date" title="Periode Pendaftaran" value={opportunity.registrationPeriod} />
    <InfoCard icon="period" title="Periode Pelaksanaan PKL" value={opportunity.internshipPeriod} />
  </section>;
}

function PreparationSection() {
  const items = [
    { icon: icons.preparation, title: "CV dan Identitas", text: "Periksa data diri dan siapkan CV apabila diminta." },
    { icon: icons.documents, title: "Portofolio & Sertifikat", text: "Pilih karya yang relevan dan siapkan bukti kompetensi jika diperlukan." },
    { icon: icons.period, title: "Kesiapan Wawancara", text: "Pahami program yang dituju dan siapkan cerita tentang keterampilanmu." },
  ];
  return <section className="rounded-2xl border border-[#dce8f5] bg-white p-5 sm:p-6">
    <SectionHeading icon="preparation" title="Persiapkan Dirimu Sebelum Mendaftar" />
    <div className="mt-5 grid gap-3 md:grid-cols-3">
      {items.map((item) => <div key={item.title} className="rounded-xl border border-[#e1e9f4] bg-[#f8fbff] p-4">
        <img className="size-7 object-contain" src={item.icon} alt="" aria-hidden="true" />
        <h3 className="mt-3 text-[12px] font-bold text-ink">{item.title}</h3>
        <p className="mt-2 text-[11px] leading-5 text-[#607296]">{item.text}</p>
      </div>)}
    </div>
  </section>;
}

function QuickInformation({ opportunity }: { opportunity: PklOpportunity }) {
  return <section className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)]">
    <div className="flex items-start justify-between gap-3">
      <div><SectionHeading icon="location" title="Informasi Peluang" /><p className="mt-2 text-[11px] leading-5 text-[#71819e]">Ringkasan posisi yang perlu kamu ketahui.</p></div>
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#edf7ff] text-[11px] font-bold text-primary">03</span>
    </div>
    <div className="mt-5 grid gap-2.5">
      <QuickInfoRow icon="major" label="Jurusan" value={opportunity.major} />
      <QuickInfoRow icon="location" label="Lokasi penempatan" value={opportunity.location} />
      <QuickInfoRow icon="preparation" label="Bidang" value={opportunity.field} />
    </div>
  </section>;
}

function RegistrationPanel() {
  return <section className="rounded-2xl border border-[#d7e9f8] bg-[#f5fbff] p-5">
    <SectionHeading icon="documents" title="Informasi Pendaftaran" />
    <div className="mt-4 rounded-xl border border-[#f1d99b] bg-[#fff9e9] p-3"><p className="text-[11px] font-semibold text-[#9a6700]">Pendaftaran melalui portal belum tersedia</p><p className="mt-1 text-[11px] leading-5 text-[#856b37]">Ketersediaan dan langkah pendaftaran terbaru perlu dikonfirmasi melalui arahan resmi BKK sekolah.</p></div>
    <button type="button" disabled className="mt-4 min-h-10 w-full cursor-not-allowed rounded-xl border border-[#cbd5e1] bg-white px-4 text-[12px] font-semibold text-[#8b98aa]">Pendaftaran belum tersedia</button>
  </section>;
}

function RelatedOpportunities({ opportunities }: { opportunities: PklOpportunity[] }) {
  return <section className="rounded-2xl border border-[#dce8f5] bg-white p-5 sm:p-6">
    <div className="flex flex-wrap items-end justify-between gap-2"><div><SectionHeading icon="period" title="Peluang PKL Lainnya" /><p className="mt-2 text-[11px] text-[#607296]">Jelajahi peluang lain dari data contoh yang tersedia.</p></div><Link to="/dashboard/pkl" className="text-[11px] font-semibold text-primary hover:text-primary-dark">Lihat semua <span aria-hidden="true">→</span></Link></div>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {opportunities.map((opportunity) => <Link key={opportunity.id} to={`/dashboard/pkl/${opportunity.id}`} className="group flex min-w-0 gap-3 rounded-xl border border-[#e1e9f4] p-3 transition hover:-translate-y-0.5 hover:border-[#9ed7fb] hover:shadow-[0_8px_20px_rgba(25,63,112,.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
        <img className="size-20 shrink-0 rounded-lg object-cover" src={opportunity.image} alt={`Gedung ${opportunity.company}`} />
        <span className="min-w-0"><strong className="block break-words text-[12px] font-bold text-ink group-hover:text-primary">{opportunity.company}</strong><span className="mt-1 block break-words text-[11px] leading-4 text-[#607296]">{opportunity.program}</span><span className="mt-2 flex items-center gap-1 text-[10px] text-muted"><img className="size-3.5 object-contain" src={icons.location} alt="" aria-hidden="true" />{opportunity.location}</span></span>
      </Link>)}
    </div>
  </section>;
}

function getRelatedOpportunities(current: PklOpportunity) {
  const others = demoPklOpportunities.filter((item) => item.id !== current.id);
  const related = others.filter((item) => item.field === current.field || item.major === current.major);
  return [...related, ...others.filter((item) => !related.some((candidate) => candidate.id === item.id))].slice(0, 3);
}

function Meta({ icon, label, value }: { icon: keyof typeof icons; label: string; value: string }) {
  return <div className="flex min-w-0 items-start gap-2"><img className="mt-0.5 size-5 shrink-0 object-contain" src={icons[icon]} alt="" aria-hidden="true" /><span className="min-w-0"><strong className="block text-[10px] uppercase tracking-wide text-ink">{label}</strong><span className="mt-1 block break-words">{value}</span></span></div>;
}

function QuickInfoRow({ icon, label, value }: { icon: keyof typeof icons; label: string; value: string }) {
  return <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#e3edf7] bg-[#f8fbff] px-3 py-3">
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white shadow-[0_2px_6px_rgba(25,63,112,.06)]"><img className="size-5 object-contain" src={icons[icon]} alt="" aria-hidden="true" /></span>
    <span className="min-w-0"><strong className="block text-[10px] font-medium uppercase tracking-[.04em] text-[#8492aa]">{label}</strong><span className="mt-1 block break-words text-[12px] font-semibold leading-5 text-ink">{value}</span></span>
  </div>;
}

function InfoCard({ icon, title, value }: { icon: keyof typeof icons; title: string; value: string }) {
  return <div className="rounded-xl border border-[#dce8f5] bg-white p-4"><div className="flex items-center gap-2"><img className="size-5 object-contain" src={icons[icon]} alt="" aria-hidden="true" /><h2 className="text-[12px] font-bold text-ink">{title}</h2></div><p className="mt-3 text-[12px] leading-5 text-[#607296]">{value}</p></div>;
}

function SectionHeading({ icon, title }: { icon: keyof typeof icons; title: string }) {
  return <div className="flex items-center gap-2"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#e8f5ff]"><img className="size-5 object-contain" src={icons[icon]} alt="" aria-hidden="true" /></span><h2 className="text-[15px] font-bold text-ink">{title}</h2></div>;
}

function NotFound() {
  return <section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-16 text-center"><h1 className="text-xl font-bold text-ink">Peluang PKL tidak ditemukan</h1><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Peluang yang kamu cari tidak tersedia atau sudah tidak dapat diakses.</p><Link to="/dashboard/pkl" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-sm font-semibold text-white transition hover:from-[#159fe8] hover:to-[#006bd1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Kembali ke BKK &amp; PKL</Link></section>;
}
