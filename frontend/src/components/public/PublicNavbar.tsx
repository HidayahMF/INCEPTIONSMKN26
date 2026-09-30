import { figmaAssets } from "../../assets/figmaAssets";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Tentang kami", href: "/profile", dropdown: true },
  { label: "Jurusan", href: "/majors", dropdown: true },
  { label: "BLUD", href: "/blud", dropdown: true },
  { label: "Program", href: "/programs", dropdown: true },
  { label: "Prestasi", href: "/achievements" },
  { label: "Portal Informasi", href: "/information", dropdown: true },
];

export function PublicNavbar() {
  return (
    <header className="absolute left-4 right-4 top-5 z-40 flex h-20 w-auto max-w-none translate-x-0 items-center justify-between overflow-hidden rounded-full bg-white px-4 py-2.5 shadow-[0_4px_8px_rgba(15,23,42,.08)] sm:px-6 md:left-1/2 md:right-auto md:w-[calc(100%_-_32px)] md:max-w-[1272px] md:-translate-x-1/2">
      <a
        className="flex items-center gap-2 p-1"
        href="/"
        aria-label="SMK Negeri 26 Jakarta"
      >
        <img
          className="h-[52px] w-12 shrink-0 object-cover"
          src={figmaAssets.branding.schoolLogo}
          alt="Logo SMK Negeri 26 Jakarta"
        />
        <span className="hidden w-[94px] shrink-0 text-xs font-bold leading-[14px] text-[#1f2937] sm:block">
          SMK NEGERI 26 JAKARTA
          <em className="block whitespace-nowrap text-[8px] font-normal leading-[14px] text-[#5b6b8c]">
            Belajar, Bekerja, Membangun
          </em>
        </span>
      </a>

      <nav className="hidden items-center lg:flex" aria-label="Navigasi utama">
        {links.map((link) => (
          <a
            className="group flex items-center gap-[10px] rounded-xl px-4 py-4 text-lg font-medium text-[#0b1324] hover:text-[#0092ff] focus-visible:text-[#0092ff] focus-visible:outline-none"
            href={link.href}
            key={link.label}
          >
            {link.label}
            {link.dropdown && (
              <span
                className="relative flex h-[7px] w-3 shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                <span
                  className="block h-3 w-[7px] rotate-90 bg-current group-hover:-rotate-90 group-focus-visible:-rotate-90"
                  style={{
                    WebkitMaskImage: `url(${figmaAssets.icons.chevronDown})`,
                    maskImage: `url(${figmaAssets.icons.chevronDown})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "7px 12px",
                    maskSize: "7px 12px",
                  }}
                />
              </span>
            )}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          className="flex h-10 items-center justify-center rounded-full px-8 py-2.5 text-sm font-semibold leading-[1.5] text-white"
          href="/login"
          style={{
            backgroundImage:
              "linear-gradient(-77.19849341073589deg, rgb(0, 108, 220) 2.9054%, rgb(0, 146, 255) 74.035%, rgb(76, 186, 245) 100%)",
          }}
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
