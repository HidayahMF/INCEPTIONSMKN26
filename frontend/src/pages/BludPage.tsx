import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { figmaAssets } from "../assets/figmaAssets";

const units = [
  ["KGStudio", "Konstruksi Gedung dan Sanitasi", "/assets/pages/blud/kgstudio/Hero Section (4).png", "/blud/kgstudio"],
  ["UPTECHNO", "Teknik Elektronika dan Komunikasi", "/assets/pages/blud/uptechno/BG Hero.png", "/blud/uptechno"],
  ["E-MAN", "Teknik Instalasi Tenaga Listrik", "/assets/pages/blud/e-man/Hero Section (6).png", "/blud/e-man"],
  ["Manufaktur26", "Teknik Fabrikasi Logam dan Manufaktur", "/assets/pages/blud/manufaktur26/Hero Section (6).png", "/blud/manufaktur26"],
  ["Garage26", "Teknik Kendaraan Ringan", "/assets/majors/TKRAssets/tkr-hero.png", "/blud/garage26"],
  ["GADIZ VOKASI", "Sistem Informasi, Jaringan dan Aplikasi", "/assets/majors/SIJAAssets/sija-hero.png", "/blud/gadiz-vokasi"],
] as const;

export function BludPage() {
  return <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]"><PublicNavbar /><main>
    <section className="bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-6 py-20 text-center text-white sm:px-10 lg:py-28">
      <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]"><img className="h-[17px] w-[13.6px]" src={figmaAssets.blud.badgeIcon} alt="" />BELAJAR • BERKARYA • MENGHASILKAN</span>
      <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Belajar Melalui Pengalaman Nyata</h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">Kenali unit produksi dan layanan BLUD SMK Negeri 26 Jakarta yang menjadi ruang belajar siswa melalui pengalaman kerja nyata.</p>
    </section>
    <section className="px-6 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1140px] text-center">
      <span className="inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">UNIT PRODUKSI &amp; LAYANAN</span>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Jelajahi <span className="text-primary">BLUD SMK Negeri 26 Jakarta</span></h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b] sm:text-base">Setiap unit menghadirkan pengalaman belajar berbasis kompetensi, produksi, dan layanan sesuai bidang keahlian siswa.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{units.map(([name, major, image, href]) => <a className="group overflow-hidden rounded-3xl bg-white text-left shadow-[0_4px_16px_rgba(15,23,42,.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,.18)]" href={href} key={name}><img className="h-44 w-full object-cover" src={image} alt={`Unit ${name}`} /><div className="p-5"><h3 className="text-2xl font-bold text-primary-dark">{name}</h3><p className="mt-1 text-sm text-[#61708b]">{major}</p><span className="mt-4 inline-flex rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2 text-sm font-bold text-white transition-[background,color] group-hover:bg-white group-hover:bg-none group-hover:text-primary">Lihat Unit →</span></div></a>)}</div>
    </div></section>
  </main><PublicFooter /></div>;
}
