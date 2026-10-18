import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "../lib/api";
import { useAuth } from "../features/auth/AuthProvider";
import { useNavigate } from "../routes/compat";
import { useFloatShapes } from "../lib/useFloatShapes";

const devAccounts = [
  { identifier: "DEMO-GURU", role: "Role Guru", access: "Akses Portal Guru", image: "/assets/pages/LoginPage/roleguru.png" },
  { identifier: "DEMO-SISWA", role: "Role Siswa", access: "Akses Portal Siswa", image: "/assets/pages/LoginPage/rolesiswa.png" },
];

export function LoginPage() {
  const { isAuthenticated, refresh } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const leftShape = useRef<HTMLImageElement>(null);
  const rightShape = useRef<HTMLImageElement>(null);
  useFloatShapes([
    { ref: leftShape, duration: 3600, distance: 14 },
    { ref: rightShape, duration: 4300, distance: -16 },
  ]);

  useEffect(() => { if (isAuthenticated) navigate("/dashboard", true); }, [isAuthenticated, navigate]);

  async function finishLogin() { await refresh(); navigate("/dashboard", true); }
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await api("/api/auth/login", { method: "POST", body: JSON.stringify({ identifier, password, remember }) });
      await finishLogin();
    } catch (e) { setError(e instanceof Error ? e.message : "Login gagal."); } finally { setBusy(false); }
  }
  async function quickLogin(account: string) {
    setBusy(true); setError("");
    try { await api("/api/dev/login-as", { method: "POST", body: JSON.stringify({ identifier: account }) }); await finishLogin(); }
    catch (e) { setError(e instanceof Error ? e.message : "Quick login gagal."); } finally { setBusy(false); }
  }

  return (
    <main className="relative isolate box-border flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#eaf7fc] px-3 py-8 sm:px-8 lg:px-12">
      <img ref={leftShape} className="pointer-events-none absolute left-[8.5%] top-[16%] z-0 w-[100px] max-w-[12vw]" src="/assets/shared/decorations/kiri.png" alt="" aria-hidden="true" />
      <img ref={rightShape} className="pointer-events-none absolute right-[6.5%] top-[51%] z-0 w-[72px] max-w-[10vw]" src="/assets/shared/decorations/kanan.png" alt="" aria-hidden="true" />
      <img
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[max(100%,1200px)] max-w-none -translate-x-1/2"
        src="/assets/pages/LoginPage/shapebirubesar.png"
        alt=""
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1272px] overflow-hidden rounded-[32px] bg-white shadow-[0_18px_60px_rgba(15,72,110,.12)] lg:h-[654px] lg:grid-cols-[1fr_1fr] lg:rounded-[44px]">
        <section data-aos="fade-right" className="relative min-h-[480px] overflow-hidden text-white sm:min-h-[540px] lg:min-h-0">
          <img className="absolute inset-0 size-full object-cover" src="/assets/pages/LoginPage/gambarportalsekolah.png" alt="Gedung SMKN 26 Jakarta" />
        </section>
        <section data-aos="fade-left" className="flex items-center bg-white px-7 py-12 sm:px-14 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-[540px]">
            <h2 data-aos="fade-up" data-aos-delay="100" className="text-3xl font-bold tracking-tight text-[#10182b] sm:text-[36px]">Masuk ke <span className="text-[#087ee8]">Portal Sekolah</span></h2>
            <p data-aos="fade-up" data-aos-delay="160" className="mt-3 text-base text-[#61708b]">Akses layanan dan informasi sekolah melalui akun Anda.</p>
            <form data-aos="fade-up" data-aos-delay="220" className="mt-8 grid gap-4" onSubmit={submit}>
              <label className="grid gap-2 text-sm text-[#53698e]">NIS / NIP / Username
                <input className="h-11 rounded-xl border border-[#cbd7e7] px-4 text-sm text-ink outline-none transition placeholder:text-[#9aaac0] focus:border-primary focus:ring-4 focus:ring-primary/10" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Masukkan NIS, NIP, atau username" autoComplete="username" required />
              </label>
              <label className="grid gap-2 text-sm text-[#53698e]">Password
                <div className="relative"><input className="h-11 w-full rounded-xl border border-[#cbd7e7] px-4 pr-12 text-sm text-ink outline-none transition placeholder:text-[#9aaac0] focus:border-primary focus:ring-4 focus:ring-primary/10" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" autoComplete="current-password" required /><button type="button" aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"} className="absolute right-3 top-1/2 size-6 -translate-y-1/2 p-1" onClick={() => setShowPassword((value) => !value)}><img className="size-full object-contain" src="/assets/pages/LoginPage/iconmatapassword.png" alt="" /></button></div>
              </label>
              <div className="flex items-center justify-between text-xs text-[#53698e]"><label className="flex items-center gap-3"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-5 rounded border-[#cbd7e7] text-primary focus:ring-primary" />Ingat Saya</label><a className="text-primary hover:underline" href="#lupa-password">Lupa Password</a></div>
              <button disabled={busy} className="mt-1 flex h-11 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#39b4f3] to-[#0079e7] text-sm font-bold text-white shadow-[0_7px_16px_rgba(0,146,255,.2)] transition hover:-translate-y-0.5 disabled:opacity-60">{busy ? "Memeriksa..." : "Masuk ke Portal"}<span aria-hidden="true">→</span></button>
              {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            </form>
            <div data-aos="fade-up" data-aos-delay="280" className="mt-8 flex items-center gap-4 text-sm text-[#53617a]"><span className="h-px flex-1 bg-[#aab7c8]" />Atau coba akses demo<span className="h-px flex-1 bg-[#aab7c8]" /></div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {devAccounts.map((account, index) => <button data-aos="zoom-in" data-aos-delay={340 + index * 80} key={account.identifier} type="button" disabled={busy} onClick={() => void quickLogin(account.identifier)} className="flex items-center gap-3 rounded-2xl border border-[#dcecf7] p-3 text-left transition hover:border-primary hover:shadow-md disabled:opacity-60"><img className="size-14 rounded-xl object-contain" src={account.image} alt="" /><span><small className="block text-xs text-[#61708b]">Akun Demo</small><strong className="block text-lg text-[#10182b]">{account.role}</strong><small className="block text-xs font-semibold text-primary">{account.access}</small></span></button>)}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
