import { useState } from "react";
import { Link, useNavigate } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { TeacherPortalLayout } from "../layouts/TeacherPortalLayout";
import { StudentProfilePage } from "./StudentProfilePage";

export function ProfileRoutePage() {
  const { me } = useAuth();
  return <RequireAuth>{me?.profile.account_type === "TEACHER" ? <TeacherProfileContent /> : <StudentProfilePage />}</RequireAuth>;
}

export function TeacherProfilePage() {
  const { me } = useAuth();
  return <RequireAuth>{me?.profile.account_type === "TEACHER" ? <TeacherProfileContent /> : <TeacherOnlyMessage />}</RequireAuth>;
}

function TeacherProfileContent() {
  const { me, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  if (!me) return null;

  const displayName = me.profile.display_name || "Guru";
  const isDemo = me.profile.school_identifier?.startsWith("DEMO-");
  const avatar = isDemo ? "/assets/pages/LoginPage/roleguru.png" : "/assets/shared/branding/smkn26-logo.png";
  const roleLabels = [...new Set(me.roles.map((role) => roleLabel(role.role_code)).filter(Boolean))];

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

  return <TeacherPortalLayout breadcrumb="Profil Saya">
    <div className="grid min-w-0 gap-6">
      <header className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center gap-2 text-[11px] font-medium text-primary"><Link to="/dashboard" className="hover:text-primary-dark">Portal Guru</Link><span className="text-[#a9b9cc]">/</span><span className="text-muted">Profil Saya</span></div>
        <h1 className="mt-1 text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Profil Guru</h1>
        <p className="max-w-2xl text-[13px] leading-6 text-muted">Lihat informasi akun dan akses yang terhubung dengan Portal Internal Guru.</p>
      </header>

      <section className="relative overflow-hidden rounded-2xl border border-[#d7e7f4] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-7">
        <div aria-hidden="true" className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#eef8ff] to-transparent" />
        <div className="relative flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <img className="size-[92px] shrink-0 rounded-2xl border-4 border-white bg-[#edf7ff] object-cover shadow-[0_5px_16px_rgba(0,126,233,.14)]" src={avatar} alt={`Avatar ${displayName}`} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2"><h2 className="break-words text-[24px] font-bold tracking-[-.025em] text-ink sm:text-[27px]">{displayName}</h2><span className="rounded-full bg-[#e8f5ff] px-3 py-1 text-[10px] font-semibold text-primary">Guru</span></div>
            <p className="mt-2 text-[12px] text-muted">Portal Internal Guru · SMK Negeri 26 Jakarta</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#607296]"><span className="rounded-lg border border-[#dce8f5] bg-white px-3 py-1.5">Akun terautentikasi</span>{isDemo && <span className="rounded-lg border border-[#f1d99b] bg-[#fff9e9] px-3 py-1.5 text-[#9a6b0b]">Data contoh</span>}</div>
          </div>
        </div>
      </section>

      <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)]">
        <main className="grid min-w-0 gap-6">
          <InfoCard title="Informasi Akun" description="Identitas yang terhubung dengan sesi akun portal sekolah."><InfoRow label="Nama Lengkap" value={displayName} /><InfoRow label="Nomor Identitas Sekolah" value={me.profile.school_identifier || "Belum tersedia"} /><InfoRow label="Jenis Akun" value="Guru" /></InfoCard>
          <InfoCard title="Akses Peran" description="Peran yang terhubung dengan akunmu di Portal Internal Guru." >{roleLabels.length ? <div className="flex flex-wrap gap-2">{roleLabels.map((role) => <span key={role} className="rounded-lg border border-[#dce8f5] bg-[#f8fbff] px-3 py-2 text-[11px] font-semibold text-primary-dark">{role}</span>)}</div> : <EmptyState title="Belum ada peran tambahan" description="Akun ini belum memiliki peran tambahan yang ditampilkan." />}</InfoCard>
        </main>
        <aside className="grid h-fit gap-6">
          <InfoCard title="Status Akun"><div className="flex items-center gap-3 rounded-xl border border-[#dcefe4] bg-[#f4fcf7] p-3"><span className="grid size-9 place-items-center rounded-full bg-[#d9f5e5] text-[#159957]"><CheckIcon /></span><span><strong className="block text-[12px] text-ink">Sesi akun aktif</strong><span className="mt-0.5 block text-[10px] leading-4 text-muted">Akun sedang digunakan untuk Portal Internal Guru.</span></span></div><div className="mt-4"><InfoRow label="Peran utama" value="Guru" /></div></InfoCard>
          <InfoCard title="Keamanan Akun" description="Keluar dari portal ketika selesai menggunakan perangkat ini."><div className="rounded-xl border border-[#e1e9f4] bg-[#f8fbff] p-3"><p className="text-[10px] uppercase tracking-wide text-[#8492aa]">Akun yang digunakan</p><p className="mt-1 break-all text-[12px] font-semibold text-ink">{me.profile.school_identifier || "Belum tersedia"}</p></div><button type="button" disabled={isLoggingOut} onClick={() => void handleLogout()} className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#f0c9ce] bg-white px-4 text-[12px] font-semibold text-[#c93b48] transition hover:bg-[#fff1f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46b76] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"><LogoutIcon />{isLoggingOut ? "Keluar..." : "Keluar dari Akun"}</button>{logoutError && <p role="alert" className="mt-3 rounded-lg bg-[#fff1f2] px-3 py-2 text-[10px] leading-4 text-[#b42332]">{logoutError}</p>}</InfoCard>
        </aside>
      </div>
      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Guru</footer>
    </div>
  </TeacherPortalLayout>;
}

function InfoCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) { return <section className="min-w-0 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6"><h2 className="text-[16px] font-bold text-ink">{title}</h2>{description && <p className="mt-1.5 text-[11px] leading-5 text-muted">{description}</p>}<div className={description ? "mt-4" : "mt-5"}>{children}</div></section>; }
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="border-b border-[#e7edf5] py-3 last:border-0 first:pt-0 last:pb-0"><span className="block text-[10px] uppercase tracking-wide text-[#8492aa]">{label}</span><strong className="mt-1 block break-words text-[12px] leading-5 text-ink">{value}</strong></div>; }
function EmptyState({ title, description }: { title: string; description: string }) { return <div className="rounded-xl border border-dashed border-[#cbd9e8] bg-[#f8fbff] p-4"><p className="text-[12px] font-semibold text-ink">{title}</p><p className="mt-1 text-[11px] leading-5 text-muted">{description}</p></div>; }
function roleLabel(roleCode: string) {
  const labels: Record<string, string> = { SUBJECT_TEACHER: "Guru Mata Pelajaran", TEACHER: "Guru", ADMIN: "Administrator", CONTENT_EDITOR: "Pengelola Konten", BK_STAFF: "Staf Bimbingan Konseling", HEAD_OF_DEPARTMENT: "Kepala Program Keahlian", ACHIEVEMENT_VERIFIER: "Verifikator Prestasi" };
  return labels[roleCode] || roleCode.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function CheckIcon() { return <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 12.5 4 4L18.5 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function LogoutIcon() { return <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19H14M13 12h7m0 0-3-3m3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function TeacherOnlyMessage() { return <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun guru.</main>; }
