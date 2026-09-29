import { figmaAssets } from "../../assets/figmaAssets";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang kami", href: "/profile", dropdown: true },
  { label: "Jurusan", href: "/majors", dropdown: true },
  { label: "BLUD", href: "/blud", dropdown: true },
  { label: "Program", href: "/programs" },
  { label: "Prestasi", href: "/achievements" },
  { label: "Portal Informasi", href: "/information", dropdown: true },
];

export function PublicNavbar() {
  return (
    <header className="absolute left-4 right-4 top-5 z-40 flex h-20 w-auto max-w-none translate-x-0 items-center justify-between overflow-hidden rounded-full bg-white px-4 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,.08)] sm:px-6 md:left-1/2 md:right-auto md:w-[calc(100%_-_32px)] md:max-w-[1272px] md:-translate-x-1/2">
      <a
        className="flex items-center gap-2 p-1"
        href="/"
        aria-label="SMK Negeri 26 Jakarta"
      >
        <img
          className="size-12 object-contain"
          src={figmaAssets.branding.schoolLogo}
          alt="Logo SMK Negeri 26 Jakarta"
        />
        <span className="hidden text-xs font-bold leading-[14px] text-[#1f2937] sm:block">
          SMK NEGERI 26 JAKARTA
          <em className="block text-[8px] font-normal text-muted">
            Belajar, Bekerja, Membangun
          </em>
        </span>
      </a>
      <nav className="hidden items-center lg:flex" aria-label="Navigasi utama">
        {links.map((link) => (
          <a
            className="flex items-center gap-2 px-4 py-4 text-lg font-medium text-ink hover:text-primary"
            href={link.href}
            key={link.label}
          >
            {link.label}
            {link.dropdown && (
              <img
                className="h-3 w-[7px] rotate-90"
                src={figmaAssets.icons.chevronDown}
                alt=""
              />
            )}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a
          className="rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-8 py-2.5 text-sm font-semibold text-white"
          href="/login"
        >
          Login
        </a>
        <details className="relative lg:hidden">
          <summary
            className="grid size-10 cursor-pointer list-none place-items-center rounded-full bg-light-blue text-primary-dark"
            aria-label="Buka menu"
          >
            ☰
          </summary>
          <nav className="absolute right-0 top-12 z-30 grid min-w-52 gap-1 rounded-2xl bg-white p-3 text-sm font-semibold text-muted shadow-xl">
            {links.map((link) => (
              <a
                className="rounded-xl px-3 py-2 hover:bg-light-blue"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
