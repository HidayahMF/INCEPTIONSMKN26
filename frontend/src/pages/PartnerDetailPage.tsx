import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

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
    logo: "/assets/figma/partners/azko.png",
    industry: "Retail",
    location: "Jakarta",
    website: "https://azko.id/",
    description: "AZKO merupakan mitra industri di bidang retail yang mendukung pengembangan kompetensi kerja dan keterampilan siswa SMK Negeri 26 Jakarta.",
  },
  pln: {
    name: "PLN",
    logo: "/assets/figma/partners/pln.png",
    industry: "Energi dan ketenagalistrikan",
    location: "Jakarta",
    website: "https://www.pln.co.id/",
    description: "PLN merupakan mitra industri di bidang energi dan ketenagalistrikan yang mendukung pengenalan lingkungan kerja serta kompetensi yang relevan dengan kebutuhan industri.",
  },
  toyota: {
    name: "Toyota",
    logo: "/assets/figma/partners/toyota.jpeg",
    industry: "Otomotif",
    location: "Jakarta",
    website: "https://www.toyota.astra.co.id/",
    description: "Toyota merupakan mitra industri otomotif yang membuka ruang pembelajaran berbasis praktik dan mengenalkan standar kerja profesional kepada siswa.",
  },
  wika: {
    name: "WIKA",
    logo: "/assets/figma/partners/wika.png",
    industry: "Konstruksi dan infrastruktur",
    location: "Jakarta",
    website: "https://www.wika.co.id/",
    description: "WIKA merupakan mitra di bidang konstruksi dan infrastruktur yang memperluas pengalaman siswa melalui pembelajaran yang dekat dengan dunia kerja.",
  },
  panasonic: {
    name: "Panasonic",
    logo: "/assets/figma/partners/panasonic.png",
    industry: "Elektronik dan teknologi",
    location: "Jakarta",
    website: "https://www.panasonic.com/id/",
    description: "Panasonic merupakan mitra di bidang elektronik dan teknologi yang mendukung pengembangan kompetensi siswa sesuai perkembangan industri.",
  },
  komatsu: {
    name: "Komatsu",
    logo: "/assets/figma/partners/komatsu.png",
    industry: "Manufaktur dan alat berat",
    location: "Jakarta",
    website: "https://www.komatsu.com/",
    description: "Komatsu merupakan mitra industri manufaktur dan alat berat yang mendukung pembelajaran teknis serta pengenalan standar kerja industri.",
  },
  microvision: {
    name: "Microvision",
    logo: "/assets/figma/partners/microvision.png",
    industry: "Teknologi dan multimedia",
    location: "Jakarta",
    website: "#",
    description: "Microvision merupakan mitra industri teknologi dan solusi multimedia yang mendukung pengembangan keterampilan siswa berbasis teknologi.",
  },
  astra: {
    name: "Astra Otoparts",
    logo: "/assets/figma/partners/astra.png",
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
  return <span className="inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-[#39aef2] shadow-[0_4px_16px_rgba(15,23,42,.08)]"><span className="mr-1.5 size-1.5 self-center rounded-full bg-[#39aef2]" />{children}</span>;
}

export function PartnerDetailPage({ slug }: { slug: string }) {
  const partner = partnerDetails[slug] ?? partnerDetails.azko;
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f8ff] text-[#10182b]">
      <PublicNavbar />
      <main className="relative px-6 pb-24 pt-[132px] sm:px-8 lg:px-12">
        <img className="pointer-events-none absolute right-0 top-[110px] z-0 hidden h-[301px] w-[155px] max-w-none select-none sm:block" src="/assets/figma/mitra-industri/Shape.png" alt="" aria-hidden="true" draggable={false} />
        <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[305px_1fr] lg:gap-[72px]">
          <div className="grid min-h-[275px] place-items-center rounded-2xl border border-[#deebf7] bg-white p-8 shadow-[0_4px_16px_rgba(15,23,42,.04)] sm:min-h-[330px]">
            <img className="max-h-32 max-w-full object-contain" src={partner.logo} alt={`${partner.name} logo`} />
          </div>
          <div className="relative max-w-[690px]">
            <Label>MITRA INDUSTRI SMK NEGERI 26 JAKARTA</Label>
            <h1 className="mt-4 text-3xl font-bold text-primary sm:text-4xl lg:text-[42px]">{partner.name}</h1>
            <p className="mt-3 max-w-[650px] text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">{partner.description}</p>
            <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
              <div><dt className="text-lg font-bold text-primary">Bidang Industri</dt><dd className="mt-1 text-[#61708b]">{partner.industry}</dd></div>
              <div><dt className="text-lg font-bold text-primary">Website</dt><dd className="mt-1 break-all text-[#61708b]"><a className="hover:text-primary" href={partner.website}>{partner.website}</a></dd></div>
              <div><dt className="text-lg font-bold text-primary">Lokasi</dt><dd className="mt-1 text-[#61708b]">{partner.location}</dd></div>
            </dl>
          </div>
        </div>

        <section className="relative mx-auto mt-24 max-w-[1180px] sm:mt-28" aria-labelledby="partner-collaboration-title">
          <div className="mb-8 text-center"><Label>KOLABORASI MITRA INDUSTRI</Label></div>
          <h2 id="partner-collaboration-title" className="text-3xl font-bold sm:text-4xl">Kolaborasi dengan SMK Negeri 26 Jakarta</h2>
          <p className="mt-3 max-w-[650px] text-sm leading-6 text-[#61708b] sm:text-base">Sinergi SMK Negeri 26 Jakarta bersama industri untuk menghadirkan pengalaman belajar yang lebih dekat dengan dunia kerja.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {collaborations.map(([title, copy]) => <article className="min-h-[140px] rounded-2xl bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,.04)]" key={title}><img className="size-9" src="/assets/figma/mitra-industri/iconbuku.png" alt="" /><h3 className="mt-2 text-base font-bold leading-5 text-primary">{title}</h3><p className="mt-1 text-[10px] leading-4 text-[#172033]">{copy}</p></article>)}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1180px]" aria-labelledby="partner-competency-title">
          <div className="mb-8 text-center"><Label>BIDANG YANG RELEVAN</Label></div>
          <h2 id="partner-competency-title" className="text-3xl font-bold sm:text-4xl">Kompetensi yang Terhubung</h2>
          <p className="mt-3 max-w-[650px] text-sm leading-6 text-[#61708b] sm:text-base">Kolaborasi industri yang selaras dengan kompetensi keahlian untuk membantu siswa mempersiapkan diri menghadapi dunia kerja.</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
             {relevantCompetencies.map(([title, copy, color, href], index) => <article className="flex min-h-[215px] flex-col rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,.04)]" key={title}><img className="size-10 rounded-full object-contain" src={`/assets/figma/mitra-industri/${index + 1}.png`} alt="" aria-hidden="true" /><h3 className="mt-3 text-xl font-bold leading-6" style={{ color }}>{title}</h3><p className="mt-2 text-xs leading-5 text-[#172033]">{copy}</p><a className="mt-auto inline-flex w-fit rounded-full bg-primary px-4 py-2 text-xs font-bold text-white" href={href}>Jelajahi Jurusan <span className="ml-2">→</span></a></article>)}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
