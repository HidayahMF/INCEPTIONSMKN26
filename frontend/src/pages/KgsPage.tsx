import { useRef } from "react";

import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { IndustryPartnersMarquee } from "../components/public/IndustryPartnersMarquee";

const asset = (name: string) => `/assets/figma/KGS/${name}`;

const competencies = [
  "Gambar Konstruksi",
  "Pengukuran & Pemetaan",
  "Konstruksi Bangunan",
  "Pekerjaan Finishing",
  "Sistem Sanitasi",
  "Keselamatan Kerja",
  "Plumbing",
  "Mekanika Teknik",
];

const students = [
  [
    "Fathan Muyasar",
    "Juara 1 — Kompetisi Konstruksi Pelajar",
    "Fathan Muyasar.png",
  ],
  ["Nabilla Pertiwi", "Juara 2 — Lomba Gambar Teknik", "Nabilla Pertiwi.png"],
  [
    "Angelica Vero",
    "Juara Harapan 1 — Kontruksi Bangunan",
    "Angelica Vero.png",
  ],
  ["Agung Lazuardi", "Juara 3 — Plumbing Competition", "Agung Lazuardi.png"],
] as const;

const alumni = [
  [
    "Andi Pratama",
    "Andi Pratama.png",
    "KGS — Angkatan 50",
    "Bekerja di PT WIKA",
    "Selama belajar di KGS, saya nggak cuma belajar tentang konstruksi, tapi juga belajar bekerja dengan teliti, disiplin, dan bertanggung jawab. Pengalaman praktiknya sangat membantu saya saat masuk ke dunia kerja.",
  ],
  [
    "Fajar Ramadhan",
    "Fajar Ramadhan.png",
    "KGS — Angkatan 49",
    "Bekerja di PT WIKA",
    "Pembelajaran dan praktik di KGS membuat saya lebih percaya diri menghadapi dunia kerja. Banyak pengalaman yang saya dapat dan bisa saya terapkan setelah lulus.",
  ],
] as const;

function Label({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-[#D40009] shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <span className="h-[17px] w-[13.6px] bg-current [mask:url('/assets/figma/majors/icon-section-badge.svg')_center/contain_no-repeat]" aria-hidden="true" />
      {children}
    </span>
  );
}

export function KgsPage() {
  const alumniTrackRef = useRef<HTMLDivElement>(null);

  function scrollAlumni(direction: number) {
    const track = alumniTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate w-full overflow-hidden bg-[#d5c8cc]">
          <div className="relative mx-auto aspect-[1440/650] min-h-[540px] w-full sm:min-h-[580px] lg:min-h-0">
            <img
              className="absolute inset-0 z-0 size-full object-cover object-[68%_center] sm:object-[78%_center] lg:object-center"
              src={asset("Hero Section.png")}
              alt="Siswa Konstruksi Gedung dan Sanitasi SMKN 26 Jakarta"
            />
            <div className="relative z-10 mx-auto flex h-full w-[calc(100%-32px)] max-w-[1272px] items-start pl-5 pr-4 pt-[132px] sm:pl-7 sm:pr-6 sm:pt-[176px] lg:pt-[192px]">
              <div className="max-w-[700px] text-white">
                <div data-aos="fade-down">
                  <Label>JURUSAN KGS</Label>
                </div>
                <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-[34px] font-bold leading-[1.08] sm:text-5xl lg:text-[56px] xl:text-[60px]">
                  Konstruksi{" "}
                  <span className="text-[#FF3239]">Gedung &amp; Sanitasi</span>
                </h1>
                <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[700px] text-sm leading-5 text-white/90 sm:text-base sm:leading-6">
                  Membekali siswa dengan pengetahuan dan keterampilan dalam bidang
                  konstruksi gedung, gambar bangunan, pekerjaan konstruksi, hingga
                  sistem sanitasi untuk menghadapi kebutuhan dunia kerja dan
                  industri.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-8 w-[calc(100%-32px)] max-w-[1200px] overflow-hidden rounded-lg bg-[#D40009] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              ["4 Tahun", "Program Pendidikan"],
              ["8+", "Mitra Industri"],
              ["288+", "Siswa"],
              ["15+", "Prestasi KGS"],
            ].map(([value, label], index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="border-r border-white/40 px-2 py-3 last:border-0 sm:py-4"
                key={label}
              >
                <strong className="block text-xl font-bold sm:text-2xl">
                  {value}
                </strong>
                <span className="text-[9px] sm:text-xs">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[.9fr_1.1fr] lg:py-20">
          <img
            data-aos="fade-right"
            className="mx-auto w-full max-w-[470px] object-contain"
            src={asset("mengenal.png")}
            alt="Siswa Konstruksi Gedung dan Sanitasi"
          />
          <div data-aos="fade-left">
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Mengenal
              <br />
              <span className="text-[#D40009]">
                Konstruksi Gedung &amp; Sanitasi
              </span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">
              Konstruksi Gedung dan Sanitasi merupakan program keahlian yang
              mempersiapkan siswa untuk memahami proses pembangunan dan
              pemeliharaan bangunan serta sistem sanitasi. Melalui pembelajaran
              teori dan praktik, siswa diajak mengenali berbagai jenis pekerjaan
              konstruksi, mulai dari perencanaan, pengukuran, gambar bangunan,
              pelaksanaan pekerjaan, hingga penerapan keselamatan kerja.
            </p>
            <p className="mt-3 text-sm font-bold text-[#D40009]">
              Belajar dari Konsep, Berkarya dalam Praktik.
            </p>
          </div>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <div data-aos="fade-down">
              <Label>KOMPETENSI UTAMA</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-[26px] font-bold sm:text-[34px]">
              Kompetensi{" "}
              <span className="text-[#D40009]">yang Dipelajari</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">
              Siswa KGS mengembangkan berbagai keterampilan yang menjadi dasar
              untuk melanjutkan pendidikan, memasuki dunia kerja, maupun
              mengembangkan usaha di bidang konstruksi.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {competencies.map((item, index) => (
                <div
                  data-aos="zoom-in"
                  data-aos-delay={Math.min(index * 60, 360)}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 text-left shadow-[0_4px_16px_rgba(15,23,42,.05)] sm:px-5"
                  key={item}
                >
                  <img
                    className="size-10 shrink-0 rounded-full sm:size-11"
                    src={asset("Button shortcut.png")}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium leading-tight sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <div data-aos="fade-down">
              <Label>ROADMAP PEMBELAJARAN</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
              Dari Dasar hingga Siap Berkarya{" "}
              <span className="text-[#D40009]">#Program4Tahun</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
              Empat tahun perjalanan untuk mengenal, mengembangkan, menerapkan,
              dan menguji kompetensi di dunia industri.
            </p>
            <img
              data-aos="zoom-in"
              className="mx-auto mt-8 w-full max-w-[1140px] object-contain"
              src={asset("kompetensi.png")}
              alt="Roadmap pembelajaran KGS dari kelas X hingga kelas XIII"
            />
          </div>
        </section>

        <section className="px-5 py-12 sm:px-10 lg:py-16">
          <div className="mx-auto max-w-[1200px] text-center">
            <div data-aos="fade-down">
              <Label>KEGIATAN PEMBELAJARAN</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
              Belajar Tidak Hanya di{" "}
              <span className="text-[#D40009]">Dalam Kelas</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-2xl text-sm text-[#61708b]">
              Pengalaman belajar KGS hadir melalui perpaduan teori, praktik,
              proyek, dan kegiatan yang memberikan gambaran nyata mengenai dunia
              konstruksi.
            </p>
            <div className="mx-auto mt-8 grid max-w-[1100px] gap-3">
              <img
                data-aos="fade-up"
                className="h-auto w-full rounded-2xl object-contain"
                src={asset("Dokumentasi Pembelajaranatas.png")}
                alt="Dokumentasi pembelajaran KGS baris pertama"
              />
              <img
                data-aos="fade-up"
                data-aos-delay="100"
                className="h-auto w-full rounded-2xl object-contain"
                src={asset("Dokumentasi Pembelajaranbawah.png")}
                alt="Dokumentasi pembelajaran KGS baris kedua"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <div data-aos="fade-down">
              <Label>CIRI KHAS KGS</Label>
            </div>
          </div>
          <div className="mx-auto mt-8 grid max-w-[1140px] items-center gap-8 sm:gap-12 lg:grid-cols-2">
            <div className="text-left" data-aos="fade-right">
              <h2 className="text-[26px] font-bold leading-[1.15] sm:text-[34px]">
                Identitas{" "}
                <span className="text-[#D40009]">
                  Konstruksi Gedung &amp; Sanitasi #Wearpack
                </span>
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">
                Identitas KGS tidak hanya terlihat dari bidang keahliannya,
                tetapi juga dari karakter siswa yang disiplin, teliti, terampil,
                dan mampu bekerja secara bertanggung jawab. Wearpack menjadi
                salah satu identitas visual siswa KGS sekaligus mencerminkan
                karakter dunia kerja yang dekat dengan praktik, ketelitian,
                keselamatan, dan kedisiplinan.
              </p>
            </div>
            <img
              data-aos="fade-left"
              className="mx-auto w-full max-w-[460px] object-contain"
              src={asset("mengenal.png")}
              alt="Identitas siswa KGS dengan wearpack"
            />
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1200px] text-center">
            <div data-aos="fade-down">
              <Label>PRESTASI SISWA</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-[26px] font-bold sm:text-[34px]">
              Prestasi yang Dibangun{" "}
              <span className="text-[#D40009]">dari Kompetensi</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">
              Kenali perusahaan dan institusi yang menjadi bagian dari
              kolaborasi SMK Negeri 26 Jakarta dalam mendukung kesiapan siswa
              menghadapi dunia kerja.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {students.map(([name, achievement, photo], index) => (
                <article
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="overflow-hidden rounded-[20px] bg-white text-left shadow-[0_4px_16px_rgba(15,23,42,.06)]"
                  key={name}
                >
                  <img
                    className="w-full object-cover"
                    src={asset(photo)}
                    alt={name}
                  />
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#D40009]">
                      {name}
                    </h3>
                    <span
                      className="mt-1 block h-[3px] w-[48px] rounded-full bg-[#D40009]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-sm leading-5 text-[#10182b]">
                      {achievement}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <IndustryPartnersMarquee
          accent="text-[#D40009]"
          barClass="bg-[#D40009]"
          labelClass="bg-[#fdecec] text-[#D40009]"
          stats={[
            ["8+", "Mitra Industri"],
            ["12+", "Program Kolaborasi"],
            ["20+", "Kegiatan Industri"],
          ]}
        />

        <section className="bg-[linear-gradient(90deg,#FF3239,#D40009_50%,#B50008)] px-6 py-14 text-center text-white sm:px-10 lg:py-16">
          <div data-aos="fade-down">
            <Label>ALUMNI KGS</Label>
          </div>
          <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
            Dari KGS, Melangkah Lebih Jauh
          </h2>
          <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Kompetensi yang diperoleh selama belajar menjadi bekal bagi alumni
            untuk melanjutkan pendidikan, memasuki dunia kerja, maupun
            mengembangkan karier di bidang konstruksi.
          </p>
          <div className="mx-auto mt-8 flex max-w-[1200px] items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => scrollAlumni(-1)}
              aria-label="Alumni sebelumnya"
              className="group hidden size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,.2)] transition hover:bg-[#D40009] md:grid"
            >
              <img
                className="size-5 transition-[filter] group-hover:brightness-0 group-hover:invert"
                src={figmaAssets.advantages.arrowLeft}
                alt=""
              />
            </button>
            <div
              ref={alumniTrackRef}
              className="flex min-w-0 flex-1 gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden"
            >
              {alumni.map(([name, photo, batch, work, quote]) => (
                <article
                  data-aos="fade-up"
                  className="flex w-[85%] shrink-0 items-start gap-4 rounded-2xl bg-white p-4 text-left text-[#10182b] sm:gap-5 sm:p-5 md:w-[calc(50%-10px)]"
                  key={name}
                >
                  <img
                    className="size-28 shrink-0 rounded-xl object-cover sm:size-36"
                    src={asset(photo)}
                    alt={name}
                  />
                  <div className="min-w-0">
                    <strong className="block text-base sm:text-lg">{name}</strong>
                    <span className="mt-1 block text-xs text-[#61708b] sm:text-sm">
                      {batch}
                    </span>
                    <strong className="mt-2 block text-xs text-[#D40009] sm:text-sm">
                      {work}
                    </strong>
                    <p className="mt-2 text-xs leading-5 text-[#61708b] sm:text-sm">
                      “{quote}”
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollAlumni(1)}
              aria-label="Alumni berikutnya"
              className="group hidden size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,.2)] transition hover:bg-[#D40009] md:grid"
            >
              <img
                className="size-5 transition-[filter] group-hover:brightness-0 group-hover:invert"
                src={figmaAssets.advantages.arrowRight}
                alt=""
              />
            </button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
