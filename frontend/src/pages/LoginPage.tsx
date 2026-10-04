import { useEffect, useState, type FormEvent } from "react";
import { api } from "../lib/api";
import { useAuth } from "../features/auth/AuthProvider";
import { useNavigate, Link } from "../routes/compat";

const devAccounts = [
  { identifier: "DEMO-GURU", label: "Guru Demo" },
  { identifier: "DEMO-SISWA", label: "Siswa Demo" },
];

export function LoginPage() {
  const { isAuthenticated, refresh } = useAuth();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", true);
  }, [isAuthenticated, navigate]);

  async function finishLogin() {
    await refresh();
    navigate("/dashboard", true);
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      });
      await finishLogin();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login gagal.");
    } finally {
      setBusy(false);
    }
  }
  async function quickLogin(account: string) {
    setBusy(true);
    setError("");
    try {
      await api("/api/dev/login-as", {
        method: "POST",
        body: JSON.stringify({ identifier: account }),
      });
      await finishLogin();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Quick login gagal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="box-border min-h-screen w-full max-w-full overflow-x-hidden bg-white p-3 sm:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] w-full min-w-0 max-w-[1380px] grid-cols-1 overflow-hidden rounded-[30px] bg-school-bg shadow-[0_18px_70px_rgba(15,23,42,.12)] lg:grid-cols-[1.08fr_.92fr]">
        <section className="relative hidden min-w-0 overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <img
            className="absolute inset-0 size-full object-cover"
            src="/assets/figma/hero/hero-school-building.png"
            alt="Gedung SMKN 26 Jakarta"
          />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,108,220,.94),rgba(0,146,255,.78)_58%,rgba(76,186,245,.48))]" />
          <div className="relative z-10 flex items-center gap-3">
            <img
              className="size-14 rounded-full bg-white/95 object-contain p-1"
              src="/assets/figma/branding/smkn26-logo.png"
              alt=""
            />
            <div>
              <p className="text-sm font-bold tracking-wide">
                SMK NEGERI 26 JAKARTA
              </p>
              <p className="mt-1 text-xs text-white/75">
                Belajar, Bekerja, Membangun
              </p>
            </div>
          </div>
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90">
              PORTAL INTERNAL
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-[-.04em] xl:text-6xl">
              Tumbuh dengan arah, belajar dengan bukti.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-white/80">
              Akses ruang belajar dan tugas sekolah yang dibangun untuk
              mendukung perjalanan siswa dan guru SMKN 26 Jakarta.
            </p>
          </div>
          <div className="relative z-10 flex gap-2">
            <span className="size-2 rounded-full bg-white" />
            <span className="size-2 rounded-full bg-white/40" />
            <span className="size-2 rounded-full bg-white/40" />
          </div>
        </section>
        <section className="login-form-panel box-border flex w-full min-w-0 max-w-full items-center overflow-hidden bg-white px-4 py-10 max-[639px]:w-[calc(100vw-88px)] max-[639px]:max-w-[calc(100vw-88px)] sm:px-12 lg:px-14 xl:px-20">
          <div className="box-border min-w-0 max-w-md max-[639px]:w-[calc(100vw-88px)] max-[639px]:max-w-[calc(100vw-88px)] sm:w-full">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <img
                className="size-12 shrink-0 object-contain"
                src="/assets/figma/branding/smkn26-logo.png"
                alt="Logo SMKN 26 Jakarta"
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-ink">
                  SMK NEGERI 26 JAKARTA
                </p>
                <p className="text-[10px] text-muted">Portal internal</p>
              </div>
            </div>
            <span className="mt-10 inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue lg:mt-0">
              Selamat datang
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Masuk ke portal
            </h2>
            <p className="mt-3 max-w-full break-words text-sm leading-6 text-muted">
              Gunakan NIS, NIP, atau identifier demo yang diberikan
              administrator.
            </p>
            <form
              className="mt-8 grid min-w-0 max-w-full gap-5 max-[639px]:w-[calc(100vw-88px)] max-[639px]:max-w-[calc(100vw-88px)]"
              onSubmit={submit}
            >
              <label className="grid min-w-0 gap-2 text-sm font-semibold text-ink">
                NIS / NIP / Identifier
                <input
                  className="box-border min-w-0 w-full max-w-full rounded-2xl border border-light-blue px-4 py-3.5 font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 max-[639px]:max-w-[calc(100vw-88px)]"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                  required
                />
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-semibold text-ink">
                Password
                <div className="relative min-w-0 w-full max-w-full max-[639px]:max-w-[calc(100vw-88px)]">
                  <input
                    className="box-border min-w-0 w-full max-w-full rounded-2xl border border-light-blue px-4 py-3.5 pr-20 font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 max-[639px]:max-w-[calc(100vw-88px)]"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? "Sembunyikan" : "Lihat"}
                  </button>
                </div>
              </label>
              <button
                className="w-full max-w-full rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,146,255,.2)] transition hover:-translate-y-0.5 disabled:opacity-60"
                disabled={busy}
              >
                {busy ? "Memeriksa..." : "Masuk ke portal"}
              </button>
              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}
            </form>
            {import.meta.env.DEV && (
              <div className="mt-8 box-border min-w-0 w-full max-w-full rounded-2xl border border-dashed border-light-blue bg-school-bg/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-muted">
                  Developer quick login
                </p>
                <p className="mt-1 text-xs text-muted">
                  Hanya tersedia pada environment lokal.
                </p>
                <div className="mt-3 grid min-w-0 grid-cols-2 gap-2">
                  {devAccounts.map((account) => (
                    <button
                      key={account.identifier}
                      disabled={busy}
                      onClick={() => void quickLogin(account.identifier)}
                      className="box-border min-w-0 w-full max-w-full rounded-xl bg-white px-3 py-2.5 text-left text-xs font-semibold text-primary shadow-sm ring-1 ring-light-blue hover:bg-light-blue"
                    >
                      {account.label}
                      <small className="mt-1 block truncate text-[10px] font-normal text-muted">
                        {account.identifier}
                      </small>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Link
              to="/"
              className="mt-8 block text-center text-sm font-semibold text-muted hover:text-primary"
            >
              ← Kembali ke website publik
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
