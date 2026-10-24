import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { api } from "../lib/api";
import { useAuth } from "../features/auth/AuthProvider";
import { useNavigate } from "../routes/compat";
import { useFloatShapes } from "../lib/useFloatShapes";
import { getRolePresentation } from "../features/auth/rolePresentation";

const demoAccounts = [
  { identifier: "DEMO-GURU", roleCode: "SUBJECT_TEACHER", access: "Akses Portal Guru" },
  { identifier: "DEMO-SISWA", roleCode: "STUDENT", access: "Akses Portal Siswa" },
  { identifier: "DEMO-ADMIN", roleCode: "ADMIN", access: "Kelola platform sekolah" },
  { identifier: "DEMO-KAJUR", roleCode: "HEAD_OF_DEPARTMENT", access: "Kelola layanan jurusan" },
  { identifier: "DEMO-KELAS", roleCode: "CLASS_REP", access: "Akses layanan perwakilan kelas" },
  { identifier: "DEMO-MPK", roleCode: "MPK_OFFICER", access: "Tinjau aspirasi siswa" },
  { identifier: null, roleCode: "BKK_OFFICER", access: "Akun demo belum tersedia" },
  { identifier: "DEMO-BK", roleCode: "BK_STAFF", access: "Akses layanan BK" },
  { identifier: "DEMO-KANTIN", roleCode: "CANTEEN_VENDOR", access: "Kelola pesanan kantin" },
  { identifier: "DEMO-KOPERASI", roleCode: "COOP_OPERATOR", access: "Kelola pesanan koperasi" },
].map((account) => ({ ...account, ...getRolePresentation(account.roleCode) }));

export function LoginPage() {
  const { isAuthenticated, loading, refresh, me, logout } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [focusPasswordAfterDemo, setFocusPasswordAfterDemo] = useState(false);
  const leftShape = useRef<HTMLImageElement>(null);
  const rightShape = useRef<HTMLImageElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  useFloatShapes([
    { ref: leftShape, duration: 3600, distance: 14 },
    { ref: rightShape, duration: 4300, distance: -16 },
  ]);
  useEffect(() => {
    if (!focusPasswordAfterDemo || showAllRoles) return;
    passwordInput.current?.focus();
    setFocusPasswordAfterDemo(false);
  }, [focusPasswordAfterDemo, showAllRoles]);

  if (loading) return <LoginSessionLoading />;
  if (isAuthenticated) return <AuthenticatedLoginState me={me} onLogout={logout} onContinue={() => navigate("/dashboard", true)} />;

  async function finishLogin() { await refresh(); navigate("/dashboard", true); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier, password, remember }) });
      await finishLogin();
    } catch (e) { setError(e instanceof Error ? e.message : "Login gagal."); } finally { setBusy(false); }
  }
  function selectDemoAccount(account: string) {
    setIdentifier(account);
    setPassword("");
    setError("");
    setShowAllRoles(false);
    setFocusPasswordAfterDemo(true);
  }
  async function quickLogin(account: string) {
    if (!import.meta.env.DEV) {
      selectDemoAccount(account);
      return;
    }
    setBusy(true); setError("");
    try { await api("/api/dev/login-as", { method: "POST", body: JSON.stringify({ identifier: account }) }); await finishLogin(); }
    catch (e) { setError(e instanceof Error ? e.message : "Quick login gagal."); } finally { setBusy(false); }
  }

  return (
    <main className="relative isolate box-border flex min-h-screen w-full items-start justify-center overflow-hidden bg-[#eaf7fc] px-3 py-4 sm:items-center sm:px-8 sm:py-8 lg:px-12">
      <img ref={leftShape} className="pointer-events-none absolute left-[8.5%] top-[16%] z-0 w-[100px] max-w-[12vw]" src="/assets/shared/decorations/kiri.png" alt="" aria-hidden="true" />
      <img ref={rightShape} className="pointer-events-none absolute right-[6.5%] top-[51%] z-0 w-[72px] max-w-[10vw]" src="/assets/shared/decorations/kanan.png" alt="" aria-hidden="true" />
      <img
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[max(100%,1200px)] max-w-none -translate-x-1/2"
        src="/assets/pages/LoginPage/shapebirubesar.png"
        alt=""
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1272px] overflow-hidden rounded-[32px] bg-white shadow-[0_18px_60px_rgba(15,72,110,.12)] lg:h-[654px] lg:grid-cols-[1fr_1fr] lg:rounded-[44px]">
        <section data-aos="fade-right" className="relative h-[clamp(190px,55vw,280px)] overflow-hidden text-white sm:h-[360px] lg:h-auto lg:min-h-0">
          <img className="absolute inset-0 size-full object-cover" src="/assets/pages/LoginPage/gambarportalsekolah.png" alt="Gedung SMKN 26 Jakarta" />
        </section>
        <section data-aos="fade-left" className="flex items-center bg-white px-5 py-8 sm:px-14 sm:py-12 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-[540px]">
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-[28px] font-bold leading-tight tracking-tight text-[#10182b] sm:text-[36px]">Masuk ke <span className="text-[#087ee8]">Portal Sekolah</span></h2>
            <p data-aos="fade-up" data-aos-delay="160" className="mt-3 text-base text-[#61708b]">Akses layanan dan informasi sekolah melalui akun Anda.</p>
            <form data-aos="fade-up" data-aos-delay="220" className="mt-6 grid gap-4 sm:mt-8" onSubmit={submit}>
              <label className="grid gap-2 text-sm text-[#53698e]">NIS / NIP / Username
                <input className="h-11 rounded-xl border border-[#cbd7e7] px-4 text-sm text-ink outline-none transition placeholder:text-[#9aaac0] focus:border-primary focus:ring-4 focus:ring-primary/10" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Masukkan NIS, NIP, atau username" autoComplete="username" required />
              </label>
              <label className="grid gap-2 text-sm text-[#53698e]">Password
                <div className="relative"><input ref={passwordInput} className="h-11 w-full rounded-xl border border-[#cbd7e7] px-4 pr-12 text-sm text-ink outline-none transition placeholder:text-[#9aaac0] focus:border-primary focus:ring-4 focus:ring-primary/10" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" autoComplete="current-password" required /><button type="button" aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"} className="absolute right-3 top-1/2 size-6 -translate-y-1/2 p-1" onClick={() => setShowPassword((value) => !value)}><img className="size-full object-contain" src="/assets/pages/LoginPage/iconmatapassword.png" alt="" /></button></div>
              </label>
              <div className="flex items-center justify-between text-xs text-[#53698e]"><label className="flex items-center gap-3"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-5 rounded border-[#cbd7e7] text-primary focus:ring-primary" />Ingat Saya</label><a className="text-primary hover:underline" href="#lupa-password">Lupa Password</a></div>
              <button disabled={busy} className="mt-1 flex h-11 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#39b4f3] to-[#0079e7] text-sm font-bold text-white shadow-[0_7px_16px_rgba(0,146,255,.2)] transition hover:-translate-y-0.5 disabled:opacity-60">{busy ? "Memeriksa..." : "Masuk ke Portal"}<span aria-hidden="true">→</span></button>
              {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            </form>
             <div data-aos="fade-up" data-aos-delay="280" className="mt-7 flex items-center gap-3 text-center text-xs text-[#53617a] sm:mt-8 sm:gap-4 sm:text-sm"><span className="h-px flex-1 bg-[#aab7c8]" />Atau coba akses demo<span className="h-px flex-1 bg-[#aab7c8]" /></div>
              <button type="button" aria-haspopup="dialog" onClick={() => setShowAllRoles(true)} className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-[#cfe8f8] bg-[#f7fbff] px-4 py-3.5 text-left transition hover:border-primary hover:bg-[#eff9ff] sm:mt-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e0f3ff] text-primary" aria-hidden="true"><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></span>
                <span className="min-w-0 flex-1"><strong className="block text-sm font-bold text-[#10182b] sm:text-base">Lihat Semua Akses Role Demo</strong><small className="mt-0.5 block text-xs text-[#61708b]">Pilih peran untuk mencoba portal sekolah</small></span>
                <span className="text-xl font-semibold text-primary" aria-hidden="true">→</span>
              </button>
            </div>
        </section>
      </div>
      {showAllRoles && <DemoRolesModal busy={busy} onClose={() => setShowAllRoles(false)} onLogin={quickLogin} />}
    </main>
  );
}

function LoginSessionLoading() {
  return <main className="flex min-h-screen items-center justify-center bg-[#eaf7fc] px-5" role="status" aria-live="polite"><div className="flex items-center gap-3 rounded-2xl border border-[#d7e6f3] bg-white px-5 py-4 text-[12px] text-muted shadow-[0_12px_30px_rgba(20,77,125,.1)]"><span className="size-4 animate-spin rounded-full border-2 border-[#b8ddf5] border-t-primary" aria-hidden="true" />Memeriksa sesi masuk...</div></main>;
}

function AuthenticatedLoginState({ me, onLogout, onContinue }: { me: ReturnType<typeof useAuth>["me"]; onLogout: () => Promise<void>; onContinue: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function switchAccount() {
    setBusy(true); setError("");
    try { await onLogout(); } catch (reason) { setError(reason instanceof Error ? reason.message : "Gagal keluar dari akun."); } finally { setBusy(false); }
  }
  return <main className="flex min-h-screen items-center justify-center bg-[#eaf7fc] px-5 py-8"><section className="w-full max-w-[430px] rounded-[28px] border border-[#d7e6f3] bg-white p-7 text-center shadow-[0_18px_55px_rgba(20,77,125,.12)] sm:p-10"><img className="mx-auto size-16 object-contain" src="/assets/shared/branding/smkn26-logo.png" alt="Logo SMK Negeri 26 Jakarta" /><p className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-primary">Sesi masih aktif</p><h1 className="mt-2 text-2xl font-bold text-ink">Kamu sudah masuk</h1><p className="mt-3 text-sm leading-6 text-muted">Akun <strong className="text-ink">{me?.profile.display_name || "ini"}</strong> masih aktif. Lanjutkan ke portal atau keluar untuk memakai akun lain.</p><div className="mt-7 grid gap-3"><button type="button" onClick={onContinue} className="min-h-11 rounded-xl bg-gradient-to-r from-[#39b4f3] to-[#0079e7] text-sm font-bold text-white">Lanjutkan ke Portal</button><button type="button" disabled={busy} onClick={() => void switchAccount()} className="min-h-11 rounded-xl border border-[#cfe1ef] text-sm font-semibold text-primary transition hover:bg-[#f3faff] disabled:opacity-60">{busy ? "Keluar..." : "Keluar dan Ganti Akun"}</button></div>{error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}</section></main>;
}

function DemoAccountCard({ account, index, busy, onLogin }: { account: { identifier: string | null; roleCode: string; access: string; displayLabel: string; assetPath: string }; index: number; busy: boolean; onLogin: (identifier: string) => void }) {
  const available = Boolean(account.identifier);
  return <button aria-label={`${account.displayLabel} Demo`} data-aos="zoom-in" data-aos-delay={340 + index * 50} type="button" disabled={busy || !available} onClick={() => account.identifier && void onLogin(account.identifier)} className={`flex min-h-[76px] items-center gap-3 rounded-2xl border border-[#dcecf7] bg-white/80 p-3 text-left transition ${available ? "hover:border-primary hover:shadow-md" : "cursor-not-allowed opacity-60"} disabled:opacity-60`}><img className="size-12 shrink-0 rounded-xl object-contain sm:size-14" src={account.assetPath} alt="" /><span className="min-w-0"><small className="block text-xs text-[#61708b]">{available ? "Akun Demo" : account.roleCode}</small><strong className="block text-base leading-5 text-[#10182b] sm:text-lg">{account.displayLabel}</strong><small className="block text-xs font-semibold leading-4 text-primary">{account.access}</small></span></button>;
}

function DemoRolesModal({ busy, onClose, onLogin }: { busy: boolean; onClose: () => void; onLogin: (identifier: string) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
    };
  }, []);

  const modal = <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071a33]/60 p-4 backdrop-blur-[2px] sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={dialogRef} className="flex max-h-[85dvh] w-full max-w-[780px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(7,35,72,.28)]" role="dialog" aria-modal="true" aria-labelledby="demo-roles-title">
      <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e5edf6] px-5 py-4 sm:px-7 sm:py-5">
        <div><p className="text-xs font-semibold uppercase tracking-[.12em] text-primary">Akses cepat</p><h2 id="demo-roles-title" className="mt-1 text-xl font-bold text-[#10182b] sm:text-2xl">Pilih Akses Role Demo</h2><p className="mt-1 text-sm text-[#61708b]">Pilih akun demo yang tersedia untuk melihat portal sesuai perannya.</p></div>
        <button ref={closeRef} type="button" aria-label="Tutup semua role demo" onClick={onClose} className="grid size-10 shrink-0 place-items-center rounded-xl text-2xl leading-none text-[#61708b] transition hover:bg-[#edf7ff] hover:text-primary">×</button>
      </header>
      <div className="min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-4 sm:p-6"><div className="grid gap-3 sm:grid-cols-2">{demoAccounts.map((account, index) => <DemoAccountCard key={account.identifier || account.roleCode} account={account} index={index} busy={busy} onLogin={onLogin} />)}</div></div>
    </div>
  </div>;

  return typeof document === "undefined" ? null : createPortal(modal as ReactNode, document.body);
}
