import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const asset = (name: string) => `/assets/figma/ekstrakulikuler/${name}`;

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

function Label({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <img className="h-[17px] w-[13.6px]" src="/assets/figma/majors/icon-section-badge.svg" alt="" aria-hidden="true" />
      {children}
    </span>
  );
}

export function EkstrakurikulerPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#b9d9f5] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img
            className="absolute inset-0 -z-10 size-full object-cover object-center"
            src={asset("Hero Section.png")}
            alt="Kegiatan ekstrakurikuler SMKN 26 Jakarta"
          />
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(225,241,255,.84)_0%,rgba(225,241,255,.08)_42%,rgba(0,108,220,.12)_100%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute right-[9%] top-[30%] -z-[4] aspect-square w-[66px] rounded-full bg-gradient-to-br from-primary to-soft-blue" />
          <div aria-hidden="true" className="pointer-events-none absolute left-[10%] top-[40%] -z-[4] aspect-square w-[76px] rounded-full bg-gradient-to-br from-primary to-soft-blue" />
          <img
            className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[760px] max-w-none -translate-x-1/2 sm:w-[1050px] lg:w-[1320px] xl:w-[1480px]"
            src={asset("Hero Section-1.png")}
            alt="Siswa SMKN 26 Jakarta"
          />
          <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1272px] flex-col items-center px-5 pb-36 pt-5 text-center sm:min-h-[700px] sm:px-8 sm:pt-9 lg:min-h-[760px] lg:px-16 lg:pt-12">
            <Label>EKSTRAKURIKULER</Label>
            <h1 className="mt-4 max-w-[1100px] whitespace-nowrap text-[26px] font-bold leading-[1.08] text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.18)] sm:text-4xl lg:text-[52px]">
              Temukan Minat, <span className="text-primary">Kembangkan Potensi</span>
            </h1>
            <p className="mt-4 max-w-[940px] text-lg leading-[1.75] text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.2)] lg:text-xl">
              SMKN 26 Jakarta menyediakan berbagai kegiatan ekstrakurikuler
              sebagai ruang bagi siswa untuk mengembangkan minat, bakat,
              keterampilan, dan pengalaman di luar pembelajaran akademik.
            </p>
            <CtaLink className="mt-5" href="#pilihan-ekstrakurikuler">
              Jelajahi Ekstrakurikuler
            </CtaLink>
          </div>
        </section>
        <section className="relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[980px] grid-cols-3 overflow-hidden rounded-lg bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10">
          {[
            ["20+", "Ekstrakurikuler"],
            ["6", "Bidang Keahlian"],
            ["1", "Komunitas Sekolah"],
          ].map(([value, label]) => (
            <div
              className="border-r border-dashed border-white/70 px-2 py-3 last:border-r-0 sm:py-4"
              key={label}
            >
              <strong className="block text-xl font-bold sm:text-2xl">
                {value}
              </strong>
              <span className="text-[9px] sm:text-xs">{label}</span>
            </div>
          ))}
        </section>
        <section className="mx-auto grid max-w-[1100px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[.9fr_1.1fr] lg:py-20">
          <img
            className="mx-auto w-full max-w-[498px] object-contain"
            src={asset("image 2 (2).png")}
            alt="Siswa mengikuti kegiatan sekolah"
          />
          <div>
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
        </section>
        <section
          id="pilihan-ekstrakurikuler"
          className="bg-[#edf4ff] px-5 py-14 sm:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[1140px]">
            <div className="text-center">
              <Label>PILIHAN EKSTRAKURIKULER</Label>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Temukan <span className="text-primary">Kegiatanmu</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
                Beragam pilihan kegiatan tersedia untuk memberikan ruang bagi
                siswa dalam mengembangkan minat dan bakat sesuai dengan potensi
                masing-masing.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
