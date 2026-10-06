import { useRef } from "react";

import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { IndustryPartnersMarquee } from "../components/public/IndustryPartnersMarquee";

const asset = (name: string) => `/assets/figma/TEK/${name}`;

const competencies = [
  "Dasar Elektronika",
  "Pengukuran Elektronika",
  "Perakitan Rangkaian",
  "Sistem Digital",
  "Teknik Komunikasi",
  "Pemrograman & Kendali",
  "Troubleshooting",
  "Proyek Teknologi",
];

const achievements = [
  ["Hidayah Fadillah", "Juara 1 - Kompetisi Elektronika Pelajar", "Hidayah Fadillah.png"],
  ["Firmansyah", "Juara 2 - Lomba Inovasi Teknologi", "Firmansyah.png"],
  ["Alyssa Bella", "Finalis - Kompetisi Robotika Pelajar", "Alyssa Bella.png"],
  ["Dinda Azzahra", "Juara 3 - Kompetisi Teknologi", "Dinda Azzahra.png"],
] as const;

const alumni = [
  ["Fajar Maulana", "Fajar Ramadhan.png", "TEK — Angkatan 50", "Bekerja sebagai Teknisi Elektronika", "Selama belajar di TEK, saya tidak hanya memahami teori, tetapi juga terbiasa praktik, menguji rangkaian, dan menyelesaikan masalah secara langsung. Pengalaman tersebut sangat membantu saya saat memasuki dunia kerja."],
  ["Abi Rafi", "Abi Rafi.png", "TEK — Angkatan 49", "Bekerja sebagai Teknisi Elektronika", "Pembelajaran dan praktik di TEK membuat saya lebih percaya diri menghadapi dunia kerja. Banyak pengalaman yang saya dapatkan di sekolah bisa langsung saya terapkan setelah lulus."],
] as const;

function Label({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7f0fb] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.04em] text-[#004E9E] shadow-[0_2px_8px_rgba(227,6,19,.08)]">
      <span className="size-1.5 rounded-full bg-[#004E9E]" aria-hidden="true" />
      {children}
    </span>
  );
}

export function TekPage() {
  const alumniTrackRef = useRef<HTMLDivElement>(null);

  function scrollAlumni(direction: number) {
    const track = alumniTrackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate w-full overflow-hidden bg-[#9cb3cb]">
          <div className="relative mx-auto aspect-[1440/650] min-h-[540px] w-full sm:min-h-[580px] lg:min-h-0">
            <img
              className="absolute inset-0 z-0 size-full object-cover object-[68%_center] sm:object-[78%_center] lg:object-center"
              src={asset("Hero Section.png")}
              alt="Siswa Teknik Elektronika dan Komunikasi SMKN 26 Jakarta"
            />
            <div className="relative z-10 mx-auto flex h-full w-[calc(100%-32px)] max-w-[1272px] items-start pl-5 pr-4 pt-[132px] sm:pl-7 sm:pr-6 sm:pt-[176px] lg:pt-[192px]">
              <div className="max-w-[700px] text-white">
                <Label>JURUSAN TEK</Label>
                <h1 className="mt-4 text-[34px] font-bold leading-[1.08] sm:text-5xl lg:text-[56px] xl:text-[60px]">
                  Teknik{" "}
                  <span className="text-[#0876E7]">Elektronika &amp; Komunikasi</span>
                </h1>
                <p className="mt-4 max-w-[700px] text-sm leading-5 text-white/90 sm:text-base sm:leading-6">
                  Membekali siswa dengan keterampilan elektronika, komunikasi, dan
                  teknologi melalui pembelajaran berbasis praktik serta proyek nyata.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-8 w-[calc(100%-32px)] max-w-[1200px] overflow-hidden rounded-lg bg-[#004E9E] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[
              ["3 Tahun", "Program Pendidikan"],
              ["10+", "Mitra Industri"],
              ["288+", "Siswa"],
              ["20+", "Prestasi TEK"],
            ].map(([value, label]) => (
              <div
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
            className="mx-auto w-full max-w-[470px] object-contain"
            src={asset("mengenal.png")}
            alt="Siswa Teknik Elektronika dan Komunikasi"
          />
          <div>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Mengenal
              <br />
              <span className="text-[#004E9E]">
                Teknik Elektronika &amp; Komunikasi
              </span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">
              Teknik Elektronika dan Komunikasi membekali siswa dengan
              pengetahuan dan keterampilan dalam memahami, merancang, merakit,
              serta mengembangkan berbagai sistem elektronika dan komunikasi.
              Pembelajaran dirancang untuk menggabungkan pemahaman teori dengan
              pengalaman praktik sehingga siswa terbiasa menghadapi permasalahan
              teknologi secara langsung.
            </p>
            <p className="mt-3 text-sm font-bold text-[#004E9E]">
              Belajar teknologi dengan cara yang nyata.
            </p>
          </div>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <Label>KOMPETENSI UTAMA</Label>
            <h2 className="mt-4 text-[26px] font-bold sm:text-[34px]">
              Kompetensi{" "}
              <span className="text-[#004E9E]">yang Dipelajari</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">
              Siswa TEK mengembangkan keterampilan elektronika dan komunikasi
              melalui pembelajaran teori, praktik, proyek, serta pemecahan masalah
              yang diterapkan secara langsung.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {competencies.map((item) => (
                <div
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
            <Label>ROADMAP PEMBELAJARAN</Label>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Dari Dasar hingga Siap Berkarya{" "}
              <span className="text-[#004E9E]">#Program3Tahun</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
              Tiga tahun perjalanan untuk mengenal, menguasai, dan menerapkan
              kompetensi elektronika dan komunikasi melalui pembelajaran sekolah
              hingga pengalaman industri.
            </p>
            <img
              className="mx-auto mt-8 w-full max-w-[1140px] object-contain"
              src={asset("kompetensi.png")}
              alt="Roadmap pembelajaran TEK dari kelas X hingga kelas XII"
            />
          </div>
        </section>

        <section className="px-5 py-12 sm:px-10 lg:py-16">
          <div className="mx-auto max-w-[1200px] text-center">
            <Label>KEGIATAN &amp; PEMBELAJARAN</Label>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Belajar Tidak Hanya di{" "}
              <span className="text-[#004E9E]">Dalam Kelas</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#61708b]">
              Pengalaman belajar TEK hadir melalui perpaduan teori, praktik,
              proyek, dan kegiatan yang membantu siswa memahami dunia elektronika
              dan komunikasi secara nyata.
            </p>
            <div className="mx-auto mt-8 grid max-w-[1100px] gap-3">
              <img
                className="h-auto w-full rounded-2xl object-contain"
                src={asset("Dokumentasi Pembelajaran atas.png")}
                alt="Dokumentasi kegiatan pembelajaran TEK baris pertama"
              />
              <img
                className="h-auto w-full rounded-2xl object-contain"
                src={asset("Dokumentasi Pembelajaran bawah.png")}
                alt="Dokumentasi kegiatan pembelajaran TEK baris kedua"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <Label>CIRI KHAS TEK</Label>
          </div>
          <div className="mx-auto mt-8 grid max-w-[1140px] items-center gap-8 sm:gap-12 lg:grid-cols-2">
            <div className="text-left">
              <h2 className="text-[26px] font-bold leading-[1.15] sm:text-[34px]">
                Identitas{" "}
                <span className="text-[#004E9E]">
                  Teknik Elektronika &amp; Komunikasi #Wearpack
                </span>
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">
                Wearpack menjadi salah satu identitas siswa TEK yang
                mencerminkan budaya belajar yang dekat dengan dunia praktik.
                Setiap kegiatan membiasakan siswa untuk bekerja secara disiplin,
                memahami prosedur keselamatan, menggunakan peralatan dengan
                tepat, serta menghasilkan solusi melalui teknologi elektronika dan
                komunikasi.
              </p>
            </div>
            <img
              className="mx-auto w-full max-w-[460px] object-contain"
              src={asset("mengenal.png")}
              alt="Identitas siswa TEK dengan wearpack"
            />
          </div>
        </section>

        <section className="px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1200px] text-center">
            <Label>PRESTASI SISWA</Label>
            <h2 className="mt-4 text-[26px] font-bold sm:text-[34px]">
              Prestasi yang Dibangun{" "}
              <span className="text-[#004E9E]">dari Kompetensi</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-[#61708b] sm:text-base sm:leading-7">
              Kompetensi yang dipelajari menjadi bekal siswa TEK untuk berani
              berkompetisi, berinovasi, dan menunjukkan kemampuan di bidang
              elektronika dan teknologi.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map(([name, achievement, photo]) => (
                <article
                  className="overflow-hidden rounded-[20px] bg-white text-left shadow-[0_4px_16px_rgba(15,23,42,.06)]"
                  key={name}
                >
                  <img
                    className="aspect-[1.15] w-full object-cover"
                    src={asset(photo)}
                    alt={name}
                  />
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#004E9E]">
                      {name}
                    </h3>
                    <span
                      className="mt-1 block h-[3px] w-[48px] rounded-full bg-[#004E9E]"
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
          accent="text-[#004E9E]"
          barClass="bg-[#004E9E]"
          labelClass="bg-[#e7f0fb] text-[#004E9E]"
          stats={[
            ["8+", "Mitra Industri"],
            ["12+", "Program Kolaborasi"],
            ["20+", "Kegiatan Industri"],
          ]}
        />

        <section className="bg-[linear-gradient(90deg,#0A6FD1,#004E9E_50%,#003B7A)] px-6 py-14 text-center text-white sm:px-10 lg:py-16">
          <Label>ALUMNI TEK</Label>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
            Dari TEK, Melangkah Lebih Jauh
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Kompetensi yang diperoleh selama belajar menjadi bekal bagi alumni
            untuk melanjutkan pendidikan, memasuki dunia kerja, maupun
            mengembangkan karier di bidang elektronika dan teknologi.
          </p>
          <div className="mx-auto mt-8 flex max-w-[1200px] items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => scrollAlumni(-1)}
              aria-label="Alumni sebelumnya"
              className="group hidden size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,.2)] transition hover:bg-[#004E9E] md:grid"
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
                    <strong className="mt-2 block text-xs text-[#004E9E] sm:text-sm">
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
              className="group hidden size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,.2)] transition hover:bg-[#004E9E] md:grid"
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
