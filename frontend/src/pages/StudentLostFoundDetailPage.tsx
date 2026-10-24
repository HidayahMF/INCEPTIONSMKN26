import { useEffect, useState } from "react";
import { Link, usePathname } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { demoLostFoundItems } from "../components/student/lostfound/lostfound.data";
import { claimLostFoundItem, getLostFoundItem } from "../components/student/lostfound/lostfound.api";
import type { LostFoundItem } from "../components/student/lostfound/lostfound.types";
import { LostFoundGallery } from "../components/student/lostfound/LostFoundGallery";
import { LostFoundStatusPanel } from "../components/student/lostfound/LostFoundStatusPanel";
import { LostFoundTimeline } from "../components/student/lostfound/LostFoundTimeline";
import { useToast } from "../components/shared/ToastProvider";

export function StudentLostFoundDetailPage() {
  const { me } = useAuth();
  const isStudent = me?.profile.account_type === "STUDENT";
  return <RequireAuth>{isStudent ? <StudentLostFoundDetailContent /> : <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>}</RequireAuth>;
}

function StudentLostFoundDetailContent() {
  const { addToast } = useToast();
  const { me } = useAuth();
  const pathname = usePathname();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const itemId = decodeURIComponent(pathname.slice("/dashboard/lost-found/".length));
  const [item, setItem] = useState<LostFoundItem | undefined>(() => isDemo ? demoLostFoundItems.find((candidate) => candidate.id === itemId) : undefined); const [claim, setClaim] = useState(""); const [notice, setNotice] = useState(""); const [claimBusy, setClaimBusy] = useState(false);
  useEffect(() => { if (!isDemo) getLostFoundItem(itemId).then(setItem).catch(() => setItem(undefined)); }, [isDemo, itemId]);

  if (!item) return <StudentPortalLayout breadcrumb="Lost & Found / Detail Barang"><NotFound /></StudentPortalLayout>;

  const gallery = item.gallery?.length ? item.gallery : [item.image];
  const typeLabel = item.type === "LOST" ? "Barang Hilang" : "Barang Ditemukan";
  const typeClass = item.type === "LOST" ? "bg-[#fff0f0] text-[#ef3030]" : "bg-[#edf6ff] text-primary";
  const verified = item.status === "VERIFIED";

   const submitClaim = async () => {
     if (claimBusy || !claim.trim()) return;
     setClaimBusy(true);
     try {
       await claimLostFoundItem(item.id, claim);
       setNotice("Klaim berhasil diajukan.");
       addToast({ variant: "success", title: "Klaim berhasil diajukan", description: "Klaim akan ditinjau oleh petugas." });
     } catch (reason) {
       const message = reason instanceof Error ? reason.message : "Klaim gagal diajukan.";
       setNotice(message);
       addToast({ variant: "error", title: "Klaim gagal diajukan", description: message, duration: null });
     } finally {
       setClaimBusy(false);
     }
   };

   return <StudentPortalLayout breadcrumb="Lost & Found / Detail Barang">
    <div className="grid min-w-0 gap-5">
      <Link to="/dashboard/lost-found" className="inline-flex w-fit items-center gap-2 text-[12px] font-medium text-primary transition hover:text-primary-dark focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"><span aria-hidden="true" className="text-lg leading-none">←</span> Kembali ke Lost &amp; Found</Link>
      <header><h1 className="text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Detail Barang</h1><p className="mt-2 text-[13px] text-[#607296]">Informasi lengkap mengenai barang yang dilaporkan.</p></header>

       <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main className="grid min-w-0 gap-6 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6">
          <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,.98fr)]">
            <LostFoundGallery name={item.name} images={gallery} />
            <div className="min-w-0"><div className="flex flex-wrap gap-2"><span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${typeClass}`}><span className="mr-1.5 size-1.5 self-center rounded-full bg-current" />{typeLabel}</span><span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${verified ? "bg-[#dcf7e8] text-[#20aa65]" : item.status === "PENDING" ? "bg-[#fff0bf] text-[#df9700]" : "bg-[#e4f0ff] text-primary"}`}><span className="mr-1.5 size-1.5 self-center rounded-full bg-current" />{verified ? "Terverifikasi" : item.status === "PENDING" ? "Menunggu Verifikasi" : "Sudah Diambil"}</span></div><h2 className="mt-4 break-words text-[21px] font-bold text-ink">{item.name}</h2><div className="mt-3 grid gap-2 text-[11px] text-[#607296]"><MetaRow icon="location" text={item.location} /><MetaRow icon="calendar" text={`Dilaporkan ${item.reportedAt}`} /></div><section className="mt-4 rounded-2xl border border-[#d7e9f8] bg-[#f5fbff] p-4"><h3 className="text-[13px] font-bold text-ink">Deskripsi dan Ciri Khusus</h3><p className="mt-3 text-[12px] leading-5 text-[#607296]">{item.description}</p></section></div>
          </section>
          <section className="rounded-xl border border-[#dce8f5] bg-white p-4 sm:p-5"><h2 className="text-[14px] font-bold text-ink">Informasi Tambahan</h2><p className="mt-3 text-[12px] leading-5 text-[#607296]">{item.additionalInfo || "Tidak ada keterangan tambahan yang dicantumkan."}</p></section>
           {item.history?.length ? <LostFoundTimeline history={item.history} /> : <section className="rounded-xl border border-[#dce8f5] bg-white p-4 sm:p-5"><h2 className="text-[14px] font-bold text-ink">Riwayat Laporan</h2><p className="mt-3 text-[12px] text-[#607296]">Riwayat laporan belum tersedia.</p></section>}
            {item.status === "VERIFIED" && !item.isMine && <section className="rounded-xl border border-[#dce8f5] bg-white p-4"><h2 className="text-[14px] font-bold text-ink">Klaim kepemilikan</h2><textarea value={claim} onChange={(event) => setClaim(event.target.value)} className="mt-3 min-h-24 w-full rounded-xl border border-[#cbd9ea] p-3 text-[12px]" placeholder="Jelaskan ciri kepemilikan barang ini." /><button type="button" disabled={claimBusy} onClick={() => void submitClaim()} className="mt-3 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-white disabled:opacity-50">{claimBusy ? "Mengirim..." : "Ajukan Klaim"}</button>{notice && <p role="status" className="mt-3 text-[11px] text-muted">{notice}</p>}</section>}
        </main>
        <LostFoundStatusPanel item={item} />
      </div>
      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
    </div>
  </StudentPortalLayout>;
}

function NotFound() { return <section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-16 text-center"><h1 className="text-xl font-bold text-ink">Barang tidak ditemukan</h1><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Detail barang yang kamu cari tidak tersedia atau sudah tidak dapat diakses.</p><Link to="/dashboard/lost-found" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-sm font-semibold text-white transition hover:from-[#159fe8] hover:to-[#006bd1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Kembali ke Lost &amp; Found</Link></section>; }
function MetaRow({ icon, text }: { icon: "location" | "calendar"; text: string }) { return <div className="flex min-w-0 items-center gap-2"><span className="grid size-4 shrink-0 place-items-center text-[#607296]"><svg viewBox="0 0 24 24" fill="none" className="size-4">{icon === "location" ? <><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="2" /></> : <path d="M7 2h2v3h6V2h2v3h3v17H4V5h3V2Zm11 9H6v8h12v-8Z" fill="currentColor" />}</svg></span><span className="break-words">{text}</span></div>; }
