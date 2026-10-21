import { useMemo } from "react";
import { Link, usePathname } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { demoPklOpportunities } from "../components/student/pkl/pkl.data";
import type { PklOpportunity } from "../components/student/pkl/pkl.types";

export function StudentPklDetailPage() {
  const { me } = useAuth();
  return <RequireAuth>{me?.profile.account_type === "STUDENT" ? <StudentPklDetailContent /> : <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>}</RequireAuth>;
}

function StudentPklDetailContent() {
  const { me } = useAuth();
  const pathname = usePathname();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const id = decodeURIComponent(pathname.slice("/dashboard/pkl/".length));
  const opportunity = useMemo<PklOpportunity | undefined>(() => isDemo ? demoPklOpportunities.find((item) => item.id === id) : undefined, [id, isDemo]);
  if (!opportunity) return <StudentPortalLayout breadcrumb="PKL & Lamaran / Detail Peluang"><NotFound /></StudentPortalLayout>;
  // Detail memakai foto gedung yang sama dengan card listing. Asset detail posisi
  // tidak digunakan sebagai hero karena bukan representasi gedung perusahaan.
  const detailImage = opportunity.image;
  return <StudentPortalLayout breadcrumb="PKL & Lamaran / Detail Peluang">
    <div className="grid min-w-0 gap-5">
      <Link to="/dashboard/pkl" className="inline-flex w-fit items-center gap-2 text-[12px] font-medium text-primary transition hover:text-primary-dark focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><span aria-hidden="true" className="text-lg leading-none">←</span> Kembali ke BKK &amp; PKL</Link>
      <header><h1 className="text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Detail Peluang PKL</h1><p className="mt-2 text-[13px] text-[#607296]">Informasi lengkap mengenai peluang Praktik Kerja Lapangan.</p></header>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main className="grid min-w-0 gap-6 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6">
          <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,.95fr)]"><div className="group overflow-hidden rounded-[22px] bg-[#f3f7fd]"><img className="aspect-[1.5] w-full object-cover transition duration-500 group-hover:scale-[1.02]" src={detailImage} alt={`Gedung ${opportunity.company}`} /></div><div className="min-w-0"><span className="inline-flex items-center gap-2 rounded-full bg-[#dcf7e8] px-3 py-1.5 text-[10px] font-semibold text-[#20aa65]"><span className="size-1.5 rounded-full bg-current" />{opportunity.status}</span><h2 className="mt-4 break-words text-[25px] font-bold tracking-[-.025em] text-ink">{opportunity.company}</h2><p className="mt-1 text-[13px] text-[#607296]">{opportunity.industry}</p><h3 className="mt-5 break-words text-[19px] font-bold leading-6 text-ink">{opportunity.program}</h3><p className="mt-3 text-[13px] leading-6 text-[#607296]">{opportunity.description}</p><div className="mt-5 grid gap-3 rounded-2xl border border-[#d7e9f8] bg-[#f5fbff] p-4 text-[12px] text-[#52658a]"><Meta icon="major" label="Jurusan" value={opportunity.major} /><Meta icon="location" label="Lokasi" value={opportunity.location} /></div></div></section>
          <section className="grid gap-5 sm:grid-cols-2"><InfoCard icon="date" title="Periode Pendaftaran" value={opportunity.registrationPeriod} /><InfoCard icon="period" title="Periode PKL" value={opportunity.internshipPeriod} /></section>
          <section className="rounded-xl border border-[#dce8f5] bg-[#f5fbff] p-5"><SectionHeading icon="user" title="Kegiatan yang Akan Dipelajari" /><List items={opportunity.activities || [opportunity.description]} /></section>
          <section className="rounded-xl border border-[#dce8f5] bg-white p-5"><SectionHeading icon="check" title="Persyaratan" /><List items={opportunity.requirements} /></section>
        </main>
        <aside className="grid gap-5"><section className="rounded-2xl border border-[#dce8f5] bg-white p-5"><SectionHeading icon="info" title="Informasi Peluang" /><div className="mt-5 grid gap-4 text-[12px] text-[#607296]"><Meta icon="user" label="Bidang" value={opportunity.field} /><Meta icon="major" label="Jurusan" value={opportunity.major} /><Meta icon="location" label="Lokasi" value={opportunity.location} /></div></section><section className="rounded-2xl border border-[#dce8f5] bg-white p-5"><SectionHeading icon="check" title="Yang Kamu Dapatkan" /><List items={opportunity.benefits || ["Pengalaman belajar di lingkungan kerja", "Pendampingan sesuai program PKL"]} /></section><section className="rounded-2xl border border-[#d7e9f8] bg-[#f7fcff] p-5"><SectionHeading icon="mail" title="Pendaftaran" /><p className="mt-4 text-[12px] leading-5 text-[#607296]">Pendaftaran melalui portal belum tersedia. Silakan ikuti arahan petugas BKK sekolah untuk proses berikutnya.</p><button type="button" className="mt-4 min-h-10 w-full rounded-xl border border-[#cbd5e1] bg-white px-4 text-[12px] font-semibold text-primary transition hover:border-primary hover:bg-[#eef7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Pendaftaran belum tersedia</button></section></aside>
      </div>
      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
    </div>
  </StudentPortalLayout>;
}

const icons = { major: "/assets/pages/siswapages/BKK&PKL/mdi_book-education%20(2).png", location: "/assets/pages/siswapages/BKK&PKL/boxicons_location-filled.png", date: "/assets/pages/siswapages/BKK&PKL/lets-icons_date-fill%20(1).png", period: "/assets/pages/siswapages/BKK&PKL/ion_book%20(1).png", user: "/assets/pages/siswapages/BKK&PKL/fa-solid_user-cog.png", mail: "/assets/pages/siswapages/BKK&PKL/material-symbols_mail-rounded%20(1).png" };
function Meta({ icon, label, value }: { icon: keyof typeof icons; label: string; value: string }) { return <p className="flex min-w-0 items-start gap-2"><img className="mt-0.5 size-5 shrink-0 object-contain" src={icons[icon]} alt="" aria-hidden="true" /><span className="min-w-0"><strong className="block text-[10px] uppercase tracking-wide text-ink">{label}</strong><span className="mt-1 block break-words">{value}</span></span></p>; }
function InfoCard({ icon, title, value }: { icon: keyof typeof icons; title: string; value: string }) { return <div className="rounded-xl border border-[#dce8f5] bg-white p-4"><div className="flex items-center gap-2"><img className="size-5 object-contain" src={icons[icon]} alt="" aria-hidden="true" /><h2 className="text-[12px] font-bold text-ink">{title}</h2></div><p className="mt-3 text-[12px] leading-5 text-[#607296]">{value}</p></div>; }
function SectionHeading({ icon, title }: { icon: keyof typeof icons | "info" | "check"; title: string }) { const src = icon === "info" ? "/assets/pages/siswapages/BKK&PKL/material-symbols_mail-rounded%20(1).png" : icon === "check" ? "/assets/pages/bkk/checklisticon.png" : icons[icon]; return <div className="flex items-center gap-2"><img className="size-5 object-contain" src={src} alt="" aria-hidden="true" /><h2 className="text-[15px] font-bold text-ink">{title}</h2></div>; }
function List({ items }: { items: string[] }) { return <ul className="mt-4 grid gap-3 text-[12px] leading-5 text-[#607296]">{items.map((item) => <li key={item} className="flex gap-2"><img className="mt-1 size-4 shrink-0 object-contain" src="/assets/pages/bkk/checklisticon.png" alt="" aria-hidden="true" /><span>{item}</span></li>)}</ul>; }
function NotFound() { return <section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-16 text-center"><h1 className="text-xl font-bold text-ink">Peluang PKL tidak ditemukan</h1><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Peluang yang kamu cari tidak tersedia atau sudah tidak dapat diakses.</p><Link to="/dashboard/pkl" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-sm font-semibold text-white transition hover:from-[#159fe8] hover:to-[#006bd1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Kembali ke BKK &amp; PKL</Link></section>; }
