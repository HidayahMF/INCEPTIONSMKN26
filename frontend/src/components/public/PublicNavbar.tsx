import { useState } from "react";
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
  const [activeLink, setActiveLink] = useState<string | null>(null);

  return (
    <header className="absolute left-4 right-4 top-5 z-40 flex h-20 w-auto max-w-none translate-x-0 items-center justify-between rounded-full bg-white px-4 py-2.5 shadow-[0_4px_8px_rgba(15,23,42,.08)] sm:px-6 md:left-1/2 md:right-auto md:w-[calc(100%_-_32px)] md:max-w-[1272px] md:-translate-x-1/2">
      <a
        className="flex items-center gap-2 p-1"
        href="/"
        aria-label="SMK Negeri 26 Jakarta"
      >
        <img
          className="h-[52px] w-12 object-contain"
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
            className="group flex items-center gap-[10px] rounded-xl px-4 py-4 text-lg font-medium transition-colors duration-300 ease-out focus-visible:outline-none motion-reduce:transition-none"
            href={link.href}
            key={link.label}
            onBlur={() => setActiveLink((value) => (value === link.label ? null : value))}
            onFocus={() => setActiveLink(link.label)}
            onMouseEnter={() => setActiveLink(link.label)}
            onMouseLeave={(event) => {
              if (document.activeElement !== event.currentTarget) {
                setActiveLink((value) => (value === link.label ? null : value));
              }
            }}
            style={{ color: activeLink === link.label ? "#0092FF" : "#0B1324" }}
          >
            {link.label}
            {link.dropdown && (
              <span
                className="h-3 w-[7px] shrink-0 bg-current transition-transform duration-300 ease-out motion-reduce:transition-none"
                style={{
                  maskImage: `url(${figmaAssets.icons.chevronDown})`,
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  maskSize: "7px 12px",
                  WebkitMaskImage: `url(${figmaAssets.icons.chevronDown})`,
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "7px 12px",
                  transform: activeLink === link.label ? "rotate(-90deg)" : "rotate(90deg)",
                }}
                aria-hidden="true"
              />
            )}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a
          className="rounded-full px-8 py-2.5 text-sm font-semibold text-white transition-[background,box-shadow] duration-300 ease-out hover:shadow-[0_4px_16px_rgba(15,23,42,.08)] focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none"
          style={{
            background:
              "linear-gradient(-77.19849341073589deg, rgb(0, 108, 220) 2.9054%, rgb(0, 146, 255) 74.035%, rgb(76, 186, 245) 100%)",
          }}
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
