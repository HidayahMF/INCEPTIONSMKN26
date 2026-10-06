import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

type OrganizationType = "osis" | "mpk";

const details = {
  osis: {
    title: "Struktur Organisasi OSIS",
    subtitle: "Membekali siswa dengan pengetahuan dan dasar kompetensi untuk mendukung perjalanan belajar di SMK Negeri 26 Jakarta.",
    image: "/assets/figma/Organisasi/Struktur%20Osis/Strutur%20OSIS.png",
    decoration: "/assets/figma/Organisasi/Struktur%20Osis/Group%201811%20(1).png",
  },
  mpk: {
    title: "Struktur Organisasi MPK",
    subtitle: "Membekali siswa dengan pengetahuan dan dasar kompetensi untuk mendukung perjalanan belajar di SMK Negeri 26 Jakarta.",
    image: "/assets/figma/Organisasi/Struktur%20MPK/Strutur%20MPK.png",
    decoration: "/assets/figma/Organisasi/Struktur%20MPK/Group%201812%20(1).png",
  },
} as const;

export function StrukturOrganisasiPage({ type }: { type: OrganizationType }) {
  const detail = details[type];

  return <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]"><PublicNavbar /><main className="relative overflow-hidden"><section className="relative px-5 pb-24 pt-36 sm:px-8 sm:pb-28 lg:px-16"><span aria-hidden="true" className="absolute left-[7%] top-56 size-14 rounded-full bg-gradient-to-r from-[#4cbaf5] to-primary" /><span aria-hidden="true" className="absolute right-[7%] top-48 size-14 rounded-full bg-gradient-to-r from-primary to-[#b8e5ff]" /><div className="relative z-10 mx-auto max-w-[1140px] text-center"><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#39aef2] shadow-[0_4px_12px_rgba(15,23,42,.08)]"><span className="size-1.5 rounded-full bg-[#39aef2]" />STRUKTUR ORGANISASI</span><h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[52px]">{detail.title}</h1><p className="mx-auto mt-4 max-w-[780px] text-base leading-7 text-[#61708b] sm:text-xl">{detail.subtitle}</p><div className="relative mx-auto mt-8 max-w-[1000px]"><img className="relative z-10 mx-auto w-full object-contain mix-blend-multiply" src={detail.image} alt={detail.title} /><img className="pointer-events-none absolute -bottom-10 left-1/2 z-0 w-[115%] max-w-none -translate-x-1/2 object-contain" src={detail.decoration} alt="" aria-hidden="true" /></div></div></section></main><PublicFooter /></div>;
}
