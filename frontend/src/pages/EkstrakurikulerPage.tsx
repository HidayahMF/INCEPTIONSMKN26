import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const ASSET_OVERRIDES: Record<string, string> = {
  "Button shortcut (11).png": "/assets/shared/icons/button-shortcut.png",
};
const asset = (name: string) => ASSET_OVERRIDES[name] ?? `/assets/pages/ekstrakurikuler/${name}`;

const activities = [
  [
    "ROHIS",
    "Mengembangkan pemahaman keagamaan, karakter, dan kebersamaan siswa.",
  ],
  [
    "ROHKRIS",
    "Menjadi ruang bagi siswa untuk mengembangkan iman, karakter, dan kebersamaan.",
  ],
  [
    "HADROH",
    "Mengembangkan kemampuan seni musik Islami melalui lantunan hadroh.",
  ],
  [
    "PASKIBRA",
    "Melatih kedisiplinan, ketangguhan, tanggung jawab, dan jiwa kepemimpinan.",
  ],
  [
    "PMR",
    "Membentuk kepedulian, keterampilan pertolongan pertama, dan jiwa kemanusiaan.",
  ],
  [
    "PIK-R",
    "Menjadi ruang bagi siswa untuk memperoleh wawasan dan mengembangkan kepedulian terhadap kehidupan remaja.",
  ],
  [
    "PRAMUKA",
    "Membangun kemandirian, kedisiplinan, kerja sama, dan jiwa kepemimpinan.",
  ],
  [
    "TEPEPA",
    "Mengembangkan potensi siswa melalui kegiatan dan pengalaman yang membangun karakter.",
  ],
  [
    "STUDENT COMPANY",
    "Melatih siswa mengenal proses bisnis, kerja sama tim, dan pengalaman berwirausaha.",
  ],
  ["TARI", "Mengembangkan kreativitas dan kemampuan siswa dalam seni tari."],
  [
    "ANGKLUNG",
    "Mengasah kemampuan bermusik dan kekompakan melalui seni musik angklung.",
  ],
  [
    "BAND",
    "Menjadi ruang bagi siswa untuk mengembangkan bakat dan kreativitas dalam bermusik.",
  ],
  [
    "TAEKWONDO",
    "Melatih keterampilan bela diri, disiplin, keberanian, dan ketahanan diri.",
  ],
  [
    "KIR",
    "Mendorong siswa untuk berpikir kritis, kreatif, dan mengembangkan kemampuan penelitian.",
  ],
  [
    "SILAT",
    "Mengembangkan kemampuan bela diri sekaligus membentuk disiplin dan karakter siswa.",
  ],
  [
    "FUTSAL",
    "Mengasah keterampilan bermain futsal, kerja sama tim, dan sportivitas.",
  ],
  [
    "HANDBALL",
    "Mengembangkan keterampilan olahraga, strategi permainan, kerja sama, dan sportivitas.",
  ],
  [
    "BASKET",
    "Melatih kemampuan bermain basket, kerja sama tim, dan semangat kompetitif.",
  ],
  [
    "VOLI",
    "Mengembangkan keterampilan bola voli, kekompakan, dan sportivitas dalam tim.",
  ],
  [
    "JURNALISTIK",
    "Mengasah kemampuan menulis, mencari informasi, dan menyampaikan berita secara kreatif.",
  ],
  [
    "ENGLISH CLUB",
    "Meningkatkan kemampuan berbahasa Inggris melalui kegiatan yang interaktif dan kreatif.",
  ],
  [
    "NIHON CLUB",
    "Menjadi ruang untuk mengenal bahasa dan budaya Jepang secara lebih dekat.",
  ],
  [
    "MARCHING BAND",
    "Mengembangkan kemampuan bermusik, kedisiplinan, dan kekompakan dalam sebuah tim.",
  ],
  [
    "PADUAN SUARA",
    "Mengembangkan kemampuan vokal, musikalitas, dan kekompakan melalui seni bernyanyi bersama.",
  ],
] as const;

const extracurricularStats = [
  ["20+", "Ekstrakurikuler"],
  ["6", "Bidang Keahlian"],
  ["1", "Komunitas Sekolah"],
] as const;

function Label({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />
      {children}
    </span>
  );
}

export function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate w-full overflow-hidden bg-[#eaf5ff]">
          <div className="relative mx-auto aspect-[1440/820] min-h-[560px] w-full max-md:min-h-[820px] sm:min-h-[620px] lg:min-h-0">
          <img
            className="pointer-events-none absolute inset-0 z-0 size-full object-cover object-center max-md:inset-x-0 max-md:bottom-auto max-md:top-10 max-md:h-[calc(100%+2.5rem)] max-md:object-[center_bottom]"
            src={asset("Hero Section.png")}
            alt="Kegiatan ekstrakurikuler SMKN 26 Jakarta"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#eaf5ff]/0 via-[#eaf5ff]/0 to-[#eaf5ff]/10" />
          <div className="relative z-10 mx-auto flex h-full w-[calc(100%-32px)] max-w-[1272px] items-start justify-center px-5 pt-[96px] max-md:pt-[128px] text-center sm:px-7 sm:pt-[112px] lg:pt-[124px]">
            <div className="flex max-w-[1100px] flex-col items-center">
            <div data-aos="fade-down">
              <Label>EKSTRAKURIKULER SMK NEGERI 26 JAKARTA</Label>
            </div>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 max-w-[1000px] text-[32px] font-bold leading-10 tracking-[-.02em] text-white drop-shadow-[0_3px_3px_rgba(15,23,42,.14)] md:text-[48px] md:leading-[58px]">
              Temukan Minat, <span className="text-primary">Kembangkan Potensi</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mt-3 max-w-[1000px] text-base font-medium leading-6 text-white drop-shadow-[0_2px_3px_rgba(15,23,42,.2)] md:text-[20px] md:leading-[30px]">
              SMKN 26 Jakarta menyediakan berbagai kegiatan ekstrakurikuler
              sebagai ruang bagi siswa untuk mengembangkan minat, bakat,
              keterampilan, dan pengalaman di luar pembelajaran akademik.
            </p>
            <CtaLink data-aos="fade-up" data-aos-delay="260" className="mt-4" href="#pilihan-ekstrakurikuler">
              Jelajahi Ekstrakurikuler
            </CtaLink>
            </div>
          </div>
          </div>
          <div aria-label="Statistik ekstrakurikuler" className="absolute bottom-4 left-1/2 z-20 grid min-h-[82px] w-[calc(100%-32px)] -translate-x-1/2 grid-cols-3 overflow-hidden rounded-[12px] text-white md:bottom-[2.07%] md:h-[90px] md:min-h-0 md:w-[min(calc(100%-48px),1000px)] lg:bottom-[17px] lg:h-[90px] lg:w-[1000px] lg:origin-bottom lg:scale-[1.18]">
            <img className="pointer-events-none absolute inset-0 z-0 size-full rounded-[12px] object-fill" src={asset("shapestatistik.png")} alt="" aria-hidden="true" />
            {extracurricularStats.map(([value, label], index) => (
              <div key={label} className="relative z-10 flex min-h-[40px] min-w-0 flex-col items-center justify-center px-1">
                <div className="relative z-10 text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                  <strong className="block text-[18px] font-bold leading-none sm:text-[36px] sm:leading-[43px]">{value}</strong>
                  <span className="mt-1 block text-[9px] leading-3 sm:text-base sm:font-medium sm:leading-6">{label}</span>
                </div>
                {index < extracurricularStats.length - 1 && <span className="pointer-events-none absolute right-0 top-0 z-20 h-full border-r-2 border-dashed border-white/90" data-aos="fade-up" data-aos-delay={index * 100 + 50} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto grid max-w-[1100px] items-center gap-8 md:grid-cols-[.9fr_1.1fr]">
          <img
            data-aos="fade-right"
            className="mx-auto w-full max-w-[498px] object-contain"
            src={asset("image 2 (2).png")}
            alt="Siswa mengikuti kegiatan sekolah"
          />
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Berkembang di Dalam dan{" "}
              <span className="text-primary">di Luar Kelas</span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">
              Belajar tidak hanya berlangsung di dalam ruang kelas. Melalui
              kegiatan ekstrakurikuler, siswa dapat mengeksplorasi minat,
              mengasah keterampilan, membangun kerja sama, dan mengembangkan
              potensi bersama lingkungan sekolah.
            </p>
          </div>
          </div>
        </section>
        <section
          id="pilihan-ekstrakurikuler"
          className="bg-[#edf4ff] px-5 py-14 sm:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[1140px]">
            <div className="text-center">
              <div data-aos="fade-down">
                <Label>PILIHAN EKSTRAKURIKULER</Label>
              </div>
              <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
                Temukan <span className="text-primary">Kegiatanmu</span>
              </h2>
              <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
                Beragam pilihan kegiatan tersedia untuk memberikan ruang bagi
                siswa dalam mengembangkan minat dan bakat sesuai dengan potensi
                masing-masing.
              </p>
            </div>
            <div data-aos="fade-up" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map(([title, description]) => (
                <article
                  className="min-h-[132px] rounded-2xl border border-[#deebf7] bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,.04)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,.22)]"
                  key={title}
                >
                  <img
                    className="size-9 rounded-full"
                    src={asset("Button shortcut (11).png")}
                    alt=""
                    aria-hidden="true"
                  />
                  <h3 className="mt-2 text-base font-bold text-primary">
                    {title}
                  </h3>
                  <p className="mt-1 text-[10px] leading-4 text-[#172033]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
