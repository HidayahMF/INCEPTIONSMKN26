import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { figmaAssets } from "../assets/figmaAssets";

type PartnerDetail = {
  name: string;
  logo: string;
  industry: string;
  location: string;
  website: string;
  description: string;
};

const relevantCompetencies: Array<[string, string, string, string]> = [
  ["Konstruksi Gedung & Sanitasi", "Mempelajari perancangan, pembangunan, perawatan gedung, serta pengelolaan sistem sanitasi.", "#dc2626", "/majors/kgs"],
  ["Teknik Elektronika & Komunikasi", "Mempelajari perakitan, perawatan perangkat elektronika, serta sistem komunikasi dan elektronika daya.", "#0060a9", "/majors/tek"],
  ["Teknik Instalasi Tenaga Listrik", "Mempelajari instalasi tenaga listrik dan sistem kontrol untuk kebutuhan industri.", "#fbbf24", "/majors/titl"],
  ["Teknik Fabrikasi Logam & Manufaktur", "Mempelajari pemesinan, pengelasan, dan pembuatan komponen untuk kebutuhan manufaktur.", "#bd0000", "/majors/tflm"],
  ["Teknik Kendaraan Ringan", "Mempelajari perawatan dan perbaikan mesin serta sistem kendaraan bermotor roda empat.", "#9ca3af", "/majors/tkr"],
  ["Sistem Informasi, Jaringan & Aplikasi", "Mempelajari pengembangan perangkat lunak, desain grafis, jaringan, dan infrastruktur teknologi informasi.", "#f97316", "/majors/sija"],
];

const partnerDetails: Record<string, PartnerDetail> = {
  azko: {
    name: "AZKO",
    logo: "/assets/shared/partners/azko.png",
    industry: "Retail",
    location: "Jakarta",
    website: "https://azko.id/",
    description: "AZKO merupakan mitra industri di bidang retail yang mendukung pengembangan kompetensi kerja dan keterampilan siswa SMK Negeri 26 Jakarta.",
  },
  pln: {
    name: "PLN",
    logo: "/assets/shared/partners/pln.png",
    industry: "Energi dan ketenagalistrikan",
    location: "Jakarta",
    website: "https://www.pln.co.id/",
    description: "PLN merupakan mitra industri di bidang energi dan ketenagalistrikan yang mendukung pengenalan lingkungan kerja serta kompetensi yang relevan dengan kebutuhan industri.",
  },
  toyota: {
    name: "Toyota",
    logo: "/assets/shared/partners/toyota.jpeg",
    industry: "Otomotif",
    location: "Jakarta",
    website: "https://www.toyota.astra.co.id/",
    description: "Toyota merupakan mitra industri otomotif yang membuka ruang pembelajaran berbasis praktik dan mengenalkan standar kerja profesional kepada siswa.",
  },
  wika: {
    name: "WIKA",
    logo: "/assets/shared/partners/wika.png",
    industry: "Konstruksi dan infrastruktur",
    location: "Jakarta",
    website: "https://www.wika.co.id/",
    description: "WIKA merupakan mitra di bidang konstruksi dan infrastruktur yang memperluas pengalaman siswa melalui pembelajaran yang dekat dengan dunia kerja.",
  },
  panasonic: {
    name: "Panasonic",
    logo: "/assets/shared/partners/panasonic.png",
    industry: "Elektronik dan teknologi",
    location: "Jakarta",
    website: "https://www.panasonic.com/id/",
    description: "Panasonic merupakan mitra di bidang elektronik dan teknologi yang mendukung pengembangan kompetensi siswa sesuai perkembangan industri.",
  },
  komatsu: {
    name: "Komatsu",
    logo: "/assets/shared/partners/komatsu.png",
    industry: "Manufaktur dan alat berat",
    location: "Jakarta",
    website: "https://www.komatsu.com/",
    description: "Komatsu merupakan mitra industri manufaktur dan alat berat yang mendukung pembelajaran teknis serta pengenalan standar kerja industri.",
  },
  microvision: {
    name: "Microvision",
    logo: "/assets/shared/partners/microvision.png",
    industry: "Teknologi dan multimedia",
    location: "Jakarta",
    website: "#",
    description: "Microvision merupakan mitra industri teknologi dan solusi multimedia yang mendukung pengembangan keterampilan siswa berbasis teknologi.",
  },
  astra: {
    name: "Astra Otoparts",
    logo: "/assets/shared/partners/astra.png",
    industry: "Komponen otomotif dan manufaktur",
    location: "Jakarta",
    website: "https://www.astra-otoparts.com/",
    description: "Astra Otoparts merupakan mitra di bidang komponen otomotif dan manufaktur yang memperkuat pengalaman pembelajaran siswa melalui praktik kerja.",
  },
};

const collaborations = [
  ["Praktik Kerja Lapangan (PKL)", "Memberikan kesempatan siswa memperoleh pengalaman langsung di lingkungan industri."],
  ["Pengembangan Kompetensi", "Kontribusi dalam kegiatan pembelajaran dan pendampingan peserta didik."],
  ["Rekrutmen / Penyerapan Lulusan", "Membuka peluang bagi lulusan sesuai kebutuhan dan kualifikasi industri."],
  ["Kegiatan Industri", "Kolaborasi melalui kegiatan pembelajaran, kunjungan industri, atau program lainnya."],
] as const;

function Label({ children }: { children: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]"><img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />{children}</span>;
}

const COMPETENCY_ICONS = [
  "/assets/majors/KGSAssets/kgs-shortcut.png",
  "/assets/majors/TEKAssets/tek-shortcut.png",
  "/assets/majors/TITLAssets/titl-shortcut.png",
  "/assets/majors/TFLMAssets/tflm-shortcut.png",
  "/assets/majors/TKRAssets/tkr-shortcut.png",
  "/assets/majors/SIJAAssets/sija-shortcut.png",
];

export function PartnerDetailPage({ slug }: { slug: string }) {
  const partner = partnerDetails[slug] ?? partnerDetails.azko;
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f8ff] text-[#10182b]">
      <PublicNavbar />
      <main className="relative px-6 pb-24 pt-[132px] sm:px-8 lg:px-12">
        <img className="pointer-events-none absolute right-0 z-0 hidden h-[480px] w-auto max-w-none select-none sm:block lg:h-[560px]" src={figmaAssets.detailGuru.cornerCircles} alt="" aria-hidden="true" draggable={false} />
        <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[305px_1fr] lg:gap-[72px]">
          <div data-aos="fade-right" className="grid min-h-[275px] place-items-center rounded-2xl border border-[#deebf7] bg-white p-8 shadow-[0_4px_16px_rgba(15,23,42,.04)] sm:min-h-[330px]">
            <img className="max-h-32 max-w-full object-contain" src={partner.logo} alt={`${partner.name} logo`} />
          </div>
          <div className="relative max-w-[690px]" data-aos="fade-left">
            <Label>MITRA INDUSTRI SMK NEGERI 26 JAKARTA</Label>
            <h1 className="mt-4 text-3xl font-bold text-primary sm:text-4xl lg:text-[42px]">{partner.name}</h1>
            <p className="mt-3 max-w-[650px] text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">{partner.description}</p>
            <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
              <div><dt className="bg-[linear-gradient(90deg,#006CDC_0%,#0092FF_100%)] bg-clip-text text-[20px] font-bold not-italic leading-[30px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Bidang Industri</dt><dd className="mt-1 text-[#61708b]">{partner.industry}</dd></div>
              <div><dt className="bg-[linear-gradient(90deg,#006CDC_0%,#0092FF_100%)] bg-clip-text text-[20px] font-bold not-italic leading-[30px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Website</dt><dd className="mt-1 break-all text-[#61708b]"><a className="hover:text-primary" href={partner.website}>{partner.website}</a></dd></div>
              <div><dt className="bg-[linear-gradient(90deg,#006CDC_0%,#0092FF_100%)] bg-clip-text text-[20px] font-bold not-italic leading-[30px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">Lokasi</dt><dd className="mt-1 text-[#61708b]">{partner.location}</dd></div>
            </dl>
          </div>
        </div>

        <section className="relative mx-auto mt-24 max-w-[1180px] sm:mt-28" aria-labelledby="partner-collaboration-title">
          <div className="mb-8 text-center" data-aos="fade-down"><Label>KOLABORASI MITRA INDUSTRI</Label></div>
          <h2 data-aos="fade-up" data-aos-delay="100" id="partner-collaboration-title" className="text-3xl font-bold sm:text-4xl">Kolaborasi dengan SMK Negeri 26 Jakarta</h2>
          <p data-aos="fade-up" data-aos-delay="180" className="mt-3 max-w-[650px] text-sm leading-6 text-[#61708b] sm:text-base">Sinergi SMK Negeri 26 Jakarta bersama industri untuk menghadirkan pengalaman belajar yang lebih dekat dengan dunia kerja.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
             {collaborations.map(([title, copy], index) => <article data-aos="fade-up" data-aos-delay={Math.min(index * 80, 320)} className="min-h-[140px] rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,.04)]" key={title}><img className="size-9" src="/assets/pages/mitra-industri/iconbuku.png" alt="" /><h3 className="mt-2 line-clamp-2 min-h-[36px] bg-[linear-gradient(90deg,#006CDC_0%,#0092FF_100%)] bg-clip-text text-[18px] font-bold leading-[18px] tracking-[0%] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{title === "Pengembangan Kompetensi" ? <>Pengembangan<br />Kompetensi</> : title === "Kegiatan Industri" ? <>Kegiatan<br />Industri</> : title}</h3><p className="mt-1 text-[10px] leading-4 text-[#172033]">{copy}</p></article>)}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1180px]" aria-labelledby="partner-competency-title">
          <div className="mb-8 text-center" data-aos="fade-down"><Label>BIDANG YANG RELEVAN</Label></div>
          <h2 data-aos="fade-up" data-aos-delay="100" id="partner-competency-title" className="text-3xl font-bold sm:text-4xl">Kompetensi yang Terhubung</h2>
          <p data-aos="fade-up" data-aos-delay="180" className="mt-3 max-w-[650px] text-sm leading-6 text-[#61708b] sm:text-base">Kolaborasi industri yang selaras dengan kompetensi keahlian untuk membantu siswa mempersiapkan diri menghadapi dunia kerja.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
             {relevantCompetencies.map(([title, copy, color, href], index) => <article data-aos="fade-up" data-aos-delay={Math.min(index * 60, 300)} className="group flex h-[260px] flex-col rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,.12)]" key={title}><img className="size-12 rounded-full object-contain" src={COMPETENCY_ICONS[index] ?? COMPETENCY_ICONS[0]} alt="" aria-hidden="true" /><h3 className="mt-3 line-clamp-2 min-h-[48px] text-[24px] font-bold leading-[24px] tracking-[0%]" style={{ color }}>{title === "Teknik Kendaraan Ringan" ? <>Teknik Kendaraan<br />Ringan</> : title}</h3><p className="mt-2 min-h-[45px] text-xs leading-5 text-[#172033]">{copy}</p><a className="mt-auto inline-flex h-[41px] w-[170px] shrink-0 items-center justify-center gap-2 rounded-[999px] border border-white px-4 py-[10px] text-xs font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-primary [background:linear-gradient(275.09deg,#006CDC_2.91%,#0092FF_74.03%,#4CBAF5_100%)]" href={href}>Jelajahi Jurusan <span className="text-base leading-none">→</span></a></article>)}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
