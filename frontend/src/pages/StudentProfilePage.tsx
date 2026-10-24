import { useState } from "react";
import { Link, useNavigate } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { getActiveRolePresentation } from "../features/auth/rolePresentation";

export function StudentProfilePage() {
  const { me } = useAuth();
  return <RequireAuth>{me?.profile.account_type === "STUDENT" ? <StudentProfileContent /> : <StudentOnlyMessage />}</RequireAuth>;
}

function StudentProfileContent() {
  const { me, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  if (!me) return null;

  const isDemo = me.profile.school_identifier.startsWith("DEMO-");
  const displayName = me.profile.display_name || "Siswa";
  const rolePresentation = getActiveRolePresentation(me);
  const roleLabel = rolePresentation.displayLabel;
  const avatar = rolePresentation.assetPath;
  const academic = isDemo ? {
    school: "SMK Negeri 26 Jakarta",
    className: "XII SIJA 2",
    program: "Sistem Informasi, Jaringan & Aplikasi",
    year: "2026/2027",
  } : null;

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError("");
    try {
      await logout();
      navigate("/login", true);
    } catch (error) {
      setLogoutError(error instanceof Error ? error.message : "Keluar akun gagal. Silakan coba lagi.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return <StudentPortalLayout breadcrumb="Profil Saya">
    <div className="grid min-w-0 gap-6">
      <header className="flex min-w-0 flex-col gap-2"><div className="flex items-center gap-2 text-[11px] font-medium text-primary"><Link to="/dashboard" className="hover:text-primary-dark">Portal Siswa</Link><span className="text-[#a9b9cc]">/</span><span className="text-muted">Profil Saya</span></div><h1 className="mt-1 text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Profil Saya</h1><p className="max-w-2xl text-[13px] leading-6 text-muted">Lihat informasi akun dan identitasmu di Portal Internal SMK Negeri 26 Jakarta.</p></header>
      <section className="relative overflow-hidden rounded-2xl border border-[#d7e7f4] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-7"><div aria-hidden="true" className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#eef8ff] to-transparent" /><div className="relative flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center"><img className="size-[92px] shrink-0 rounded-2xl border-4 border-white bg-[#edf7ff] object-cover shadow-[0_5px_16px_rgba(0,126,233,.14)]" src={avatar} alt={`Avatar ${displayName}`} /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="break-words text-[24px] font-bold tracking-[-.025em] text-ink sm:text-[27px]">{displayName}</h2><span className="rounded-full bg-[#e8f5ff] px-3 py-1 text-[10px] font-semibold text-primary">{roleLabel}</span></div><p className="mt-2 text-[12px] text-muted">{academic?.className || "Informasi kelas belum tersedia."}</p><div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#607296]"><span className="rounded-lg border border-[#dce8f5] bg-white px-3 py-1.5">Portal Internal Siswa</span>{isDemo && <span className="rounded-lg border border-[#f1d99b] bg-[#fff9e9] px-3 py-1.5 text-[#9a6b0b]">Data contoh</span>}</div></div></div></section>
      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
        <main className="grid min-w-0 gap-6">
           <InfoCard title="Informasi Pribadi" description="Informasi identitas yang terhubung dengan akun portal sekolah."><InfoRow label="Nama Lengkap" value={displayName} /><InfoRow label="Nomor Identitas Sekolah" value={me.profile.school_identifier || "Belum tersedia"} /><InfoRow label="Jenis Akun" value={accountTypeLabel(me.profile.account_type)} /><InfoRow label="Role Aktif" value={roleLabel} /></InfoCard>
          <InfoCard title="Informasi Akademik" description={academic ? "Informasi akademik yang tersimpan untuk akun demo ini." : "Data akademik belum disediakan oleh API akun ini."}>{academic ? <><InfoRow label="Sekolah" value={academic.school} /><InfoRow label="Kelas" value={academic.className} /><InfoRow label="Program Keahlian" value={academic.program} /><InfoRow label="Tahun Ajaran" value={academic.year} /></> : <EmptyAcademicState />}</InfoCard>
        </main>
        <aside className="grid h-fit gap-6">
          <InfoCard title="Status Akun"><div className="flex items-center gap-3 rounded-xl border border-[#dcefe4] bg-[#f4fcf7] p-3"><span className="grid size-9 place-items-center rounded-full bg-[#d9f5e5] text-[#159957]"><CheckIcon /></span><span><strong className="block text-[12px] text-ink">Sesi akun aktif</strong><span className="mt-0.5 block text-[10px] leading-4 text-muted">Akun sedang digunakan untuk Portal Internal Siswa.</span></span></div><div className="mt-4"><InfoRow label="Peran" value={roleLabel} /></div></InfoCard>
          <InfoCard title="Keamanan Akun" description="Jaga keamanan akun dan keluar dari portal ketika selesai menggunakannya."><div className="rounded-xl border border-[#e1e9f4] bg-[#f8fbff] p-3"><p className="text-[10px] uppercase tracking-wide text-[#8492aa]">Akun yang digunakan</p><p className="mt-1 break-all text-[12px] font-semibold text-ink">{me.profile.school_identifier || "Belum tersedia"}</p></div><button type="button" disabled={isLoggingOut} onClick={() => void handleLogout()} className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#f0c9ce] bg-white px-4 text-[12px] font-semibold text-[#c93b48] transition hover:bg-[#fff1f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46b76] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"><LogoutIcon />{isLoggingOut ? "Keluar..." : "Keluar dari Akun"}</button>{logoutError && <p role="alert" className="mt-3 rounded-lg bg-[#fff1f2] px-3 py-2 text-[10px] leading-4 text-[#b42332]">{logoutError}</p>}</InfoCard>
        </aside>
      </div>
      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
    </div>
  </StudentPortalLayout>;
}

function InfoCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) { return <section className="min-w-0 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6"><h2 className="text-[16px] font-bold text-ink">{title}</h2>{description && <p className="mt-1.5 text-[11px] leading-5 text-muted">{description}</p>}<div className={description ? "mt-4" : "mt-5"}>{children}</div></section>; }
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="border-b border-[#e7edf5] py-3 last:border-0 first:pt-0 last:pb-0"><span className="block text-[10px] uppercase tracking-wide text-[#8492aa]">{label}</span><strong className="mt-1 block break-words text-[12px] leading-5 text-ink">{value}</strong></div>; }
function EmptyAcademicState() { return <div className="rounded-xl border border-dashed border-[#cbd9e8] bg-[#f8fbff] p-4"><p className="text-[12px] font-semibold text-ink">Belum ada informasi akademik</p><p className="mt-1 text-[11px] leading-5 text-muted">Kelas, program keahlian, dan tahun ajaran akan tampil setelah tersedia dari sumber data akun.</p></div>; }
function accountTypeLabel(accountType: string) { return accountType === "STUDENT" ? "Siswa" : accountType === "TEACHER" ? "Guru" : accountType || "Akun portal"; }
function CheckIcon() { return <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 12.5 4 4L18.5 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function LogoutIcon() { return <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19H14M13 12h7m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function StudentOnlyMessage() { return <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun siswa.</main>; }
