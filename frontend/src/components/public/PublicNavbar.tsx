import { useState } from "react";
import { figmaAssets } from "../../assets/figmaAssets";
import { majors } from "../../data/majors";

type NavChild = { label: string; href: string; external?: boolean };
type NavLink = { label: string; href: string; dropdown?: boolean; children?: NavChild[] };

const dropdownOnlyLabels = new Set(["BLUD"]);

const links: NavLink[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang kami",
    href: "/profile",
    dropdown: true,
    children: [
      { label: "Profil Sekolah", href: "/profile" },
      { label: "Struktur & Unit Kerja", href: "/struktur-unit-kerja" },
      { label: "Mars SMKN 26", href: "/mars" },
      { label: "School Tour", href: "/tour" },
    ],
  },
  {
    label: "Jurusan",
    href: "/majors",
    dropdown: true,
    children: [
      { label: "KGS - Konstruksi Gedung & Sanitasi", href: "/majors/kgs" },
      ...majors.filter((major) => major.id !== "KGS").map((major) => ({ label: major.id === "TEK" ? "TEK - Teknik Elektronika & Komunikasi" : major.id === "TITL" ? "TITL - Teknik Instalasi Tenaga Listrik" : major.id === "TFLM" ? "TFLM - Teknik Fabrikasi Logam & Manufaktur" : major.id === "TKR" ? "TKR - Teknik Kendaraan Ringan" : major.id === "SIJA" ? "SIJA - Sistem Informasi, Jaringan & Aplikasi" : major.code, href: major.href })),
    ],
  },
  { label: "BLUD", href: "/blud", dropdown: true, children: [
    { label: "KGStudio", href: "/blud/kgstudio" },
    { label: "UPTECHNO", href: "/blud/uptechno" },
    { label: "E-MAN", href: "/blud/e-man" },
    { label: "Manufaktur26", href: "/blud/manufaktur26" },
    { label: "Garage26", href: "/blud/garage26" },
    { label: "GADIZ VOKASI", href: "/blud/gadiz-vokasi" },
  ] },
  { label: "Program", href: "/programs", dropdown: true },
  { label: "Prestasi", href: "/achievements" },
  { label: "Portal Informasi", href: "/information", dropdown: true, children: [
    { label: "Portal LMS-SIMAK26", href: "https://lms.smkn26jkt.sch.id/", external: true },
    { label: "Portal Perpus26", href: "https://perpus.smkn26jkt.sch.id/", external: true },
    { label: "Portal SPMB", href: "https://spmb.jakarta.go.id/", external: true },
    { label: "Portal KJP", href: "https://edu.jakarta.go.id/kjp/login", external: true },
    { label: "Portal PIP", href: "https://pip.kemendikdasmen.go.id/home_v1", external: true },
  ] },
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
        <span className="hidden w-[110px] text-xs font-bold leading-[14px] text-[#1f2937] sm:block">
          SMK NEGERI 26<br />JAKARTA
          <em className="block text-[8px] font-normal text-muted">
            Belajar, Bekerja, Membangun
          </em>
        </span>
      </a>
      <nav className="hidden items-center min-[1272px]:flex" aria-label="Navigasi utama">
        {links.map((link) => (
          <div className="group relative" key={link.label}>
            <div
              className={`flex items-center rounded-xl text-lg font-medium transition-[color,font-size] duration-300 ease-out focus-within:outline-none motion-reduce:transition-none hover:text-[20px] ${activeLink === link.label ? (link.dropdown ? "bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent" : "text-primary") : "text-ink"}`}
              onBlur={() => setActiveLink((value) => (value === link.label ? null : value))}
              onFocus={() => setActiveLink(link.label)}
              onMouseEnter={() => setActiveLink(link.label)}
              onMouseLeave={() => {
                if (!link.children) setActiveLink((value) => (value === link.label ? null : value));
              }}
            >
              {link.label === "Jurusan" ? (
                <a className="rounded-xl px-4 py-4 focus-visible:outline-none" href="/#school-majors">
                  {link.label}
                </a>
              ) : dropdownOnlyLabels.has(link.label) ? (
                <button className="rounded-xl border-0 bg-transparent px-4 py-4 font-inherit text-inherit focus-visible:outline-none" type="button">
                  {link.label}
                </button>
              ) : (
                <a className="rounded-xl px-4 py-4 focus-visible:outline-none" href={link.href}>
                  {link.label}
                </a>
              )}
              {link.dropdown && (
                <span
                  className="mr-4 h-3 w-[7px] shrink-0 transition-[transform,background-color,background-image] duration-300 ease-out motion-reduce:transition-none"
                  style={{
                    maskImage: `url(${figmaAssets.icons.chevronDown})`,
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    maskSize: "7px 12px",
                    WebkitMaskImage: `url(${figmaAssets.icons.chevronDown})`,
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "7px 12px",
                    transform: activeLink === link.label ? "rotate(90deg)" : "rotate(-90deg)",
                    backgroundColor: activeLink === link.label ? "transparent" : "#0B1324",
                    backgroundImage: activeLink === link.label ? "linear-gradient(105deg,#006CDC,#0092FF)" : "none",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
            {link.children && (
              <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-1 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="mt-1 grid gap-1 rounded-2xl border border-school-bg bg-white p-2 text-sm font-semibold text-muted shadow-xl">
                  {link.children.map((child) => (
                    <a className="rounded-xl px-3 py-2.5 hover:bg-light-blue hover:text-primary" href={child.href} key={child.href} target={child.external ? "_blank" : undefined} rel={child.external ? "noreferrer" : undefined}>
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a
          className="rounded-full border border-transparent px-8 py-2.5 text-sm font-semibold text-white transition-none focus-visible:outline-2 focus-visible:outline-primary hover:border-slate-300 hover:bg-slate-100 hover:text-primary hover:shadow-none"
          style={{
            background:
              "linear-gradient(-77.19849341073589deg, rgb(0, 108, 220) 2.9054%, rgb(0, 146, 255) 74.035%, rgb(76, 186, 245) 100%)",
          }}
          href="/login"
        >
          Login
        </a>
        <details className="relative min-[1272px]:hidden">
          <summary
            className="grid size-10 cursor-pointer list-none place-items-center rounded-full bg-light-blue text-primary-dark"
            aria-label="Buka menu"
          >
            ☰
          </summary>
            <nav className="absolute right-0 top-12 z-30 grid w-[min(14rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] gap-1 overflow-y-auto rounded-2xl bg-white p-3 text-sm font-semibold text-muted shadow-xl">
            {links.map((link) => (
              <div className="grid gap-1" key={link.label}>
                {link.label === "Jurusan" ? (
                  <a className="rounded-xl px-3 py-2 hover:bg-light-blue" href="/#school-majors">
                    {link.label}
                  </a>
                ) : dropdownOnlyLabels.has(link.label) ? (
                  <button className="rounded-xl border-0 bg-transparent px-3 py-2 text-left font-inherit text-inherit hover:bg-light-blue" type="button">
                    {link.label}
                  </button>
                ) : (
                  <a className="rounded-xl px-3 py-2 hover:bg-light-blue" href={link.href}>
                    {link.label}
                  </a>
                )}
                {link.children?.map((child) => (
                  <a className="rounded-xl px-6 py-2 text-xs text-muted hover:bg-light-blue hover:text-primary" href={child.href} key={child.href} target={child.external ? "_blank" : undefined} rel={child.external ? "noreferrer" : undefined}>
                    {child.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
