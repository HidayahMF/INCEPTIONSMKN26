import type { ReactNode } from "react";

import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { SectionBadge } from "../components/public/SectionBadge";

const asset = (name: string) => `/assets/figma/lsp/${name}`;
const schemes = [
  ["Konstruksi Gedung & Sanitasi", "BLUD unit.png", "/programs/lsp/kgs"],
  ["Teknik Elektronika & Komunikasi", "BLUD unit (1).png", "/programs/lsp/tek"],
  [
    "Teknik Instalasi Tenaga Listrik",
    "BLUD unit (2).png",
    "/programs/lsp/titl",
  ],
  [
    "Teknik Fabrikasi Logam & Manufaktur",
    "BLUD unit (3).png",
    "/programs/lsp/tflm",
  ],
  ["Teknik Kendaraan Ringan", "BLUD unit (4).png", "/programs/lsp/tkr"],
  [
    "Sistem Informasi, Jaringan & Aplikasi",
    "BLUD unit (5).png",
    "/programs/lsp/sija",
  ],
] as const;
const mission = [
  "Melaksanakan sertifikasi secara obyektif dan independen.",
  "Mengembangkan SDM LSP di bidang pelaksanaan sertifikasi.",
  "Mengembangkan sarana dan prasarana pelaksanaan sertifikasi yang terstandar.",
  "Mengembangkan manajemen dan tata kelola LSP.",
  "Mengembangkan system informasi.",
] as const;

function Label({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SectionBadge>{children}</SectionBadge>
  );
}

export function LspPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
    <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#b9d9f5] pt-24 sm:min-h-[700px] lg:min-h-[860px] lg:pt-32">
          <img
            className="absolute inset-0 -z-10 size-full object-cover object-center lg:object-[center_bottom]"
            src={asset("Hero Section.png")}
            alt="Siswa LSP SMKN 26 Jakarta"
          />
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(225,241,255,.88)_0%,rgba(225,241,255,.08)_42%,rgba(0,108,220,.12)_100%)]" />
          <img
            className="pointer-events-none absolute bottom-0 left-1/2 z-0 w-[1050px] max-w-none -translate-x-1/2 sm:w-[1275px] lg:w-[1500px]"
            src={asset("Hero Section-1.png")}
            alt=""
          />
          <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1272px] flex-col items-center px-5 pb-36 pt-4 text-center sm:min-h-[700px] sm:px-8 sm:pt-6 lg:min-h-[760px] lg:px-16 lg:pb-48 lg:pt-4">
            <div data-aos="fade-down">
              <Label>LEMBAGA SERTIFIKASI PROFESI (LSP)</Label>
            </div>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 max-w-[800px] text-4xl font-bold leading-[1.08] text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.18)] sm:text-5xl lg:text-[54px]">
              Lembaga Sertifikasi <span className="text-primary">Profesi</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[790px] text-sm leading-6 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.2)] sm:text-base sm:leading-7">
              Lembaga Sertifikasi Profesi (LSP) SMKN 26 Jakarta hadir sebagai
              bagian dari proses pengakuan kompetensi siswa melalui sertifikasi
              profesi yang sesuai dengan bidang keahliannya.
            </p>
            <div data-aos="fade-up" data-aos-delay="260">
              <CtaLink className="mt-5" href="#skema-sertifikasi">
                Lihat Skema Sertifikasi
              </CtaLink>
            </div>
          </div>
        </section>
        <section className="relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[1200px] grid-cols-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10 sm:grid-cols-4">
          {[
            ["6+", "Jurusan Bidang Keahlian"],
            ["13+", "Skema Sertifikasi"],
            ["500+", "Peserta Tersertifikasi"],
            ["10+ Tahun", "Pengalaman"],
          ].map(([value, label], index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="border-b border-r border-dashed border-white/70 px-2 py-3 sm:py-4"
              key={label}
            >
              <strong className="block text-xl font-bold sm:text-2xl">
                {value}
              </strong>
              <span className="text-[9px] sm:text-xs">{label}</span>
            </div>
          ))}
        </section>
        <section className="bg-white px-6 py-14 sm:px-10 lg:py-[72px]">
          <div className="mx-auto grid max-w-[1080px] items-center gap-8 md:grid-cols-[.92fr_1.08fr] md:gap-12 lg:gap-16">
            <img
              data-aos="fade-right"
              className="mx-auto w-full max-w-[500px] object-contain"
              src={asset("image 2 (2).png")}
              alt="Siswa SMKN 26 Jakarta mengikuti sertifikasi profesi"
            />
            <div data-aos="fade-left">
              <h2 className="text-[34px] font-bold leading-[1.08] sm:text-[42px]">
                Lembaga
                <br />
                <span className="text-primary">Sertifikasi Profesi — P1</span>
              </h2>
              <p className="mt-5 max-w-[620px] text-base leading-7 text-[#61708b] sm:text-[20px] sm:leading-[1.5]">
                LSP SMKN 26 Jakarta merupakan Lembaga Sertifikasi Profesi Pihak
                Pertama (LSP-P1) yang menjadi bagian dari program pengembangan
                kompetensi siswa. Melalui proses sertifikasi, siswa memiliki
                kesempatan untuk menunjukkan kompetensi yang telah diperoleh
                selama pembelajaran dan praktik sesuai bidang keahliannya.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-[#f3f7ff] px-6 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <h2 data-aos="fade-up" className="text-2xl font-bold sm:text-3xl">
              <span className="text-primary">Visi</span> &amp;{" "}
              <span className="text-primary">Misi</span> LSP
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
              LSP SMKN 26 Jakarta memiliki visi dan misi sebagai landasan dalam
              pelaksanaan sertifikasi kompetensi bagi peserta didik.
            </p>
            <div data-aos="fade-up" data-aos-delay="180" className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="group relative min-h-[275px] overflow-hidden rounded-[24px] bg-white p-6 text-left shadow-[0_4px_16px_rgba(15,23,42,.05)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,.1)]">
                <div className="relative z-10 max-w-[calc(100%-120px)]">
                  <div className="flex items-center gap-2">
                    <img
                      className="size-4 object-contain"
                      src={asset("mdi_book-education.png")}
                      alt=""
                      aria-hidden="true"
                    />
                    <Label>VISI LSP</Label>
                  </div>
                  <p className="mt-4 max-w-[370px] text-lg font-bold leading-[1.6]">
                    Menjadi lembaga sertifikasi profesi yang terpercaya dan
                    profesional untuk memastikan kompetensi peserta didik yang
                    diakui dunia kerja di tingkat nasional maupun internasional
                  </p>
                  <span className="mt-5 block h-1 w-9 bg-primary" />
                </div>
                <img
                  className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[134px] translate-x-full object-cover opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  src={asset("Shape (1).png")}
                  alt=""
                  aria-hidden="true"
                />
              </article>
              <article className="group relative min-h-[275px] overflow-hidden rounded-[24px] bg-white p-6 text-left shadow-[0_4px_16px_rgba(15,23,42,.05)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,.1)]">
                <div className="relative z-10 max-w-[calc(100%-90px)]">
                  <div className="flex items-center gap-2">
                    <img
                      className="size-4 object-contain"
                      src={asset("mdi_book-education.png")}
                      alt=""
                      aria-hidden="true"
                    />
                    <Label>MISI LSP</Label>
                  </div>
                  <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm leading-5">
                    {mission.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                  <span className="mt-5 block h-1 w-9 bg-primary" />
                </div>
                <img
                  className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-[134px] translate-x-full object-cover opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  src={asset("Shape (1).png")}
                  alt=""
                  aria-hidden="true"
                />
              </article>
            </div>
          </div>
        </section>
        <section
          id="skema-sertifikasi"
          className="px-5 py-14 sm:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[1140px] text-center">
            <div data-aos="fade-down">
              <Label>SKEMA SERTIFIKASI</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
              Pilih Skema, Buktikan{" "}
              <span className="text-primary">Kompetensi!</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
              Skema sertifikasi menjadi bagian penting dalam proses pengakuan
              kompetensi siswa sesuai dengan bidang keahlian yang dipelajari.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {schemes.map(([title, image, href], index) => (
                <a
                  data-aos="zoom-in"
                  data-aos-delay={Math.min(index * 60, 300)}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_rgba(15,23,42,.08)]"
                  href={href}
                  key={title}
                >
                  <img
                    className="aspect-[1.32] w-full object-cover transition duration-300 group-hover:scale-105"
                    src={asset(image)}
                    alt={title}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white px-5 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1140px] text-center">
            <div data-aos="fade-down">
              <Label>UJI SERTIFIKASI KOMPETENSI</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
              Uji Kompetensi,{" "}
              <span className="text-primary">Raih Pengakuan</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#61708b]">
              Uji Sertifikasi Kompetensi merupakan proses untuk mengukur dan
              membuktikan kemampuan siswa sesuai dengan kompetensi yang telah
              dipelajari selama proses pendidikan.
            </p>
            <img
              data-aos="zoom-in"
              className="mx-auto mt-8 w-full max-w-[1272px] object-contain"
              src={asset("Alur LSP.png")}
              alt="Alur uji sertifikasi kompetensi LSP"
            />
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
