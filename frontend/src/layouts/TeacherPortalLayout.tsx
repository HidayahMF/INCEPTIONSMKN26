import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "../routes/compat";
import { useAuth } from "../features/auth/AuthProvider";
import { getActiveRolePresentation } from "../features/auth/rolePresentation";

const links = [
  {
    label: "Beranda",
    href: "/dashboard",
    icon: "/assets/pages/siswapages/beranda.png",
  },
  {
    label: "Kelas & Mata Pelajaran",
    href: "/dashboard/teacher/classes",
    icon: "/assets/pages/siswapages/bkkdanpkl.png",
  },
  {
    label: "Input Nilai",
    href: "/dashboard/grades",
    icon: "/assets/pages/siswapages/portofolioprestasi.png",
  },
  {
    label: "Rekap Kompetensi",
    href: "/dashboard/teacher/competencies",
    icon: "/assets/pages/siswapages/pembelajaran.png",
  },
  {
    label: "Review Portofolio",
    href: "/dashboard/teacher/portfolio-review",
    icon: "/assets/pages/siswapages/portofolioprestasi.png",
  },
  {
    label: "BKK & PKL",
    href: "/dashboard/teacher/pkl",
    icon: "/assets/pages/siswapages/bkkdanpkl.png",
  },
  {
    label: "Lost & Found",
    href: "/dashboard/teacher/lost-found",
    icon: "/assets/pages/siswapages/Lost&Found/info.png",
  },
  {
    label: "Aspirasi Kelas",
    href: "/dashboard/teacher/aspirations",
    icon: "/assets/pages/siswapages/aspirasikelas.png",
  },
  {
    label: "Kantin Digital",
    href: "/dashboard/teacher/canteen",
    icon: "/assets/pages/siswapages/kantindigital.png",
  },
] as const;

export function TeacherPortalLayout({
  children,
  breadcrumb = "Beranda",
}: {
  children: ReactNode;
  breadcrumb?: string;
}) {
  const { me, hasPermission } = useAuth();
  const [open, setOpen] = useState(false);
  const visibleLinks: (typeof links)[number][] = links.filter(
    (link) =>
      ((link.href !== "/dashboard/grades" &&
        link.href !== "/dashboard/teacher/competencies") ||
        hasPermission("grades:manage")) &&
      (link.href !== "/dashboard/teacher/portfolio-review" ||
        hasPermission("portfolio:review")) &&
      (link.href !== "/dashboard/teacher/pkl" || hasPermission("pkl:manage")) &&
      (link.href !== "/dashboard/teacher/lost-found" ||
        hasPermission("lost_found:manage")) &&
      (link.href !== "/dashboard/teacher/aspirations" ||
        hasPermission("aspirations:review")) &&
      (link.href !== "/dashboard/teacher/canteen" ||
        hasPermission("merchant:manage")),
  );
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f7fd] text-ink">
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:block ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <TeacherSidebar
          me={me}
          links={visibleLinks}
          onClose={() => setOpen(false)}
        />
      </div>
      {open && (
        <button
          type="button"
          aria-label="Tutup navigasi guru"
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="min-h-screen lg:pl-[247px]">
        <TeacherTopbar
          me={me}
          onOpenMenu={() => setOpen(true)}
          breadcrumb={breadcrumb}
        />
        <main className="mx-auto w-full max-w-[1400px] px-5 py-7 sm:px-8 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function TeacherSidebar({
  me,
  links: menu,
  onClose,
}: {
  me: ReturnType<typeof useAuth>["me"];
  links: (typeof links)[number][];
  onClose: () => void;
}) {
  const location = useLocation();
  const rolePresentation = getActiveRolePresentation(me);
  return (
    <aside className="flex h-dvh max-h-dvh min-h-0 w-[247px] shrink-0 flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-gradient-to-b from-[#0788ed] via-[#0789ec] to-[#0677dc] px-5 py-7 text-white">
      <Link
        to="/dashboard"
        onClick={onClose}
        className="flex items-center gap-2.5"
      >
        <img
          className="size-[51px] shrink-0 object-contain"
          src="/assets/shared/branding/smkn26-logo.png"
          alt=""
        />
        <span className="min-w-0 text-[13px] font-bold leading-[15px] tracking-[-.02em]">
          SMK NEGERI 26
          <br />
          JAKARTA
          <small className="mt-1 block text-[7px] font-normal italic leading-3 text-white/80">
            Belajar, Bekerja, Membangun
          </small>
        </span>
      </Link>
      <p className="mt-9 text-[10px] font-bold uppercase tracking-[.08em] text-white/90">
        {rolePresentation.portalContextLabel}
      </p>
      <nav className="mt-2 grid gap-1.5" aria-label={`Navigasi ${rolePresentation.portalContextLabel}`}>
        {menu.map((item) => {
          const active =
            item.href === "/dashboard"
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href);
          const content = (
            <>
              <img
                className="size-6 shrink-0 object-contain brightness-0 invert"
                src={item.icon}
                alt=""
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {active && (
                <span
                  className="h-5 w-1 rounded-full bg-white"
                  aria-hidden="true"
                />
              )}
            </>
          );
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition ${active ? "bg-white/20 text-white shadow-[0_4px_12px_rgba(0,40,120,.12)]" : "text-white/95 hover:bg-white/10"}`}
            >
              {content}
            </Link>
          );
        })}
      </nav>
      <div className="mt-7 rounded-xl bg-white px-4 py-4 text-ink shadow-[0_8px_18px_rgba(0,42,115,.12)]">
        <div className="flex items-center gap-2">
          <img
            className="size-9 rounded-lg object-contain"
            src={rolePresentation.assetPath}
            alt=""
          />
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[.08em] text-muted">
              Akun aktif
            </p>
            <p className="mt-1 truncate text-[15px] font-bold text-primary">
              {me?.profile.display_name || "Akun sekolah"}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-muted">
          {rolePresentation.displayLabel} ·{" "}
          {me?.profile.school_identifier ||
            "Identitas akun tersedia setelah sesi aktif."}
        </p>
      </div>
      <Link
        to="/"
        onClick={onClose}
        className="group mt-auto flex min-h-11 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent bg-white px-3 text-[12px] font-semibold text-primary shadow-[0_4px_12px_rgba(0,42,115,.12)] transition hover:border-white hover:bg-primary hover:text-white focus-visible:outline-none"
      >
        <img
          className="size-4 shrink-0 object-contain transition-[filter] group-hover:brightness-0 group-hover:invert"
          src="/assets/pages/siswapages/majesticons_open%20(1).png"
          alt=""
          aria-hidden="true"
        />
        Kembali ke situs publik
      </Link>
    </aside>
  );
}

function TeacherTopbar({
  me,
  onOpenMenu,
  breadcrumb,
}: {
  me: ReturnType<typeof useAuth>["me"];
  onOpenMenu: () => void;
  breadcrumb: string;
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const rolePresentation = getActiveRolePresentation(me);
  const searchItems = [
    { label: "Beranda", href: "/dashboard" },
    { label: "Profil Saya", href: "/dashboard/profile" },
    { label: "Kelas & Mata Pelajaran", href: "/dashboard/teacher/classes" },
    { label: "Input Nilai", href: "/dashboard/grades" },
    { label: "Rekap Kompetensi", href: "/dashboard/teacher/competencies" },
    { label: "Review Portofolio", href: "/dashboard/teacher/portfolio-review" },
  ];
  const results = query.trim()
    ? searchItems
        .filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 4)
    : [];
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  async function signOut() {
    if (busy) return;
    setBusy(true);
    setLogoutError("");
    try {
      await logout();
      setOpen(false);
      navigate("/login", true);
    } catch (reason) {
      setLogoutError(
        reason instanceof Error
          ? reason.message
          : "Keluar akun gagal. Silakan coba lagi.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <header className="sticky top-0 z-30 flex min-h-[80px] items-center justify-between gap-4 border-b border-[#e2e9f3] bg-white px-5 sm:px-8 lg:px-9">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label={`Buka navigasi ${rolePresentation.portalContextLabel}`}
          onClick={onOpenMenu}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf5ff] text-primary lg:hidden"
        >
          <span className="text-xl leading-none" aria-hidden="true">
            ☰
          </span>
        </button>
        <p className="hidden truncate text-[14px] text-muted sm:block">
          {rolePresentation.portalContextLabel} <span className="mx-2 text-[#b7c2d3]">/</span>
          <strong className="text-ink">{breadcrumb}</strong>
        </p>
        <p className="truncate text-[14px] font-semibold text-ink sm:hidden">
          {breadcrumb}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div className="relative hidden w-[300px] md:block">
          <label className="flex h-11 items-center gap-3 rounded-xl border border-[#dce4ee] px-4 text-[12px] text-muted focus-within:border-primary">
            <img
              className="size-5 shrink-0 object-contain"
              src="/assets/pages/siswapages/search.png"
              alt=""
              aria-hidden="true"
            />
            <span className="sr-only">Cari di {rolePresentation.portalContextLabel}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
              placeholder={`Cari di ${rolePresentation.portalContextLabel}...`}
            />
          </label>
          {results.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-[#dce4ee] bg-white p-1 shadow-[0_12px_30px_rgba(20,47,90,.14)]">
              {results.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setQuery("")}
                  className="block rounded-lg px-3 py-2 text-[12px] text-ink hover:bg-[#edf7ff]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Notifikasi"
          className="grid size-11 place-items-center rounded-xl border border-[#dce4ee] text-muted hover:bg-[#f5f9ff]"
        >
          <img
            className="size-5 object-contain"
            src="/assets/pages/siswapages/ion_notifcations.png"
            alt=""
            aria-hidden="true"
          />
        </button>
        <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-label={`Buka menu akun ${rolePresentation.displayLabel}`}
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => {
              setLogoutError("");
              setOpen((value) => !value);
            }}
            className="group flex h-11 items-center gap-2 rounded-xl border border-[#dce4ee] bg-[#f8fafc] px-2.5 text-left transition hover:border-[#b9dafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-w-[190px]"
          >
            <img
              className="size-8 rounded-full object-cover"
              src={rolePresentation.assetPath}
              alt=""
            />
            <span className="hidden min-w-0 flex-1 sm:block">
              <strong className="block truncate text-[12px] font-semibold text-ink">
                {me?.profile.display_name || "Akun sekolah"}
              </strong>
              <span className="block text-[10px] text-muted">{rolePresentation.displayLabel}</span>
            </span>
            <ChevronIcon open={open} />
          </button>
          {open && (
            <div
              role="menu"
              aria-label={`Menu akun ${rolePresentation.displayLabel}`}
              className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[250px] rounded-2xl border border-[#d7e6f3] bg-white p-2 shadow-[0_18px_40px_rgba(20,47,90,.16)]"
            >
              <div className="flex items-center gap-3 rounded-xl bg-[#f7fbff] px-3 py-3">
                <img
                  className="size-10 rounded-full object-cover"
                  src={rolePresentation.assetPath}
                  alt=""
                />
                <span className="min-w-0">
                  <strong className="block truncate text-[12px] text-ink">
                    {me?.profile.display_name || "Akun sekolah"}
                  </strong>
                  <span className="text-[10px] text-muted">
                    {rolePresentation.displayLabel} · {rolePresentation.portalContextLabel}
                  </span>
                </span>
              </div>
              <div className="my-2 h-px bg-[#e7edf5]" />
              <Link
                role="menuitem"
                to="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-[12px] font-semibold text-ink hover:bg-[#edf7ff] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <UserIcon />
                Lihat Profil
              </Link>
              <button
                role="menuitem"
                type="button"
                disabled={busy}
                onClick={() => void signOut()}
                className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-[12px] font-semibold text-[#c93b48] hover:bg-[#fff1f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e46b76] disabled:opacity-60"
              >
                <LogoutIcon />
                {busy ? "Keluar..." : "Keluar Akun"}
              </button>
              {logoutError && (
                <p
                  role="alert"
                  className="mt-2 rounded-lg bg-[#fff1f2] px-3 py-2 text-[10px] leading-4 text-[#b42332]"
                >
                  {logoutError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`hidden size-4 shrink-0 text-[#7890ad] transition-transform duration-200 group-hover:text-primary sm:block ${open ? "rotate-180" : "rotate-0"}`}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-primary"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5.5 19c.8-3.1 3-4.7 6.5-4.7s5.7 1.6 6.5 4.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg
      className="size-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 5H6.8A1.8 1.8 0 0 0 5 6.8v10.4A1.8 1.8 0 0 0 6.8 19H14M13 12h7m0 0-3-3m3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
