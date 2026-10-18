import type { ReactNode } from "react";

import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { SectionBadge } from "../components/public/SectionBadge";

const ASSET_OVERRIDES: Record<string, string> = {
  "image 2 (2).png": "/assets/shared/illustrations/berkembang.png",
  "Shape (1).png": "/assets/shared/lsp/hover-shape.png",
};
const asset = (name: string) => ASSET_OVERRIDES[name] ?? `/assets/pages/lsp/${name}`;
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
const lspStats = [
  ["6+", "Jurusan Bidang Keahlian"],
  ["13+", "Skema Sertifikasi"],
  ["500+", "Peserta Tersertifikasi"],
  ["10+ Tahun", "Pengalaman"],
] as const;

const certificationSteps = [
  ["01", "Persiapan", "Siswa mempersiapkan diri dengan memahami kompetensi dan persyaratan yang dibutuhkan sebelum mengikuti uji sertifikasi."],
  ["02", "Uji Kompetensi", "Siswa menunjukkan pengetahuan dan keterampilan sesuai bidang keahlian melalui tugas atau praktik yang diujikan."],
  ["03", "Asesmen", "Kompetensi siswa dinilai oleh asesor berdasarkan standar dan kriteria yang telah ditetapkan."],
  ["04", "Hasil Sertifikasi", "Siswa memperoleh hasil asesmen sebagai bukti pengakuan atas kompetensi yang telah dicapai."],
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
        <section className="relative isolate min-h-[720px] overflow-hidden bg-[#b9d9f5] pt-24 max-md:min-h-[820px] max-md:pt-0 sm:min-h-[760px] md:aspect-[1440/820] md:min-h-0 lg:pt-32">
          <img
            className="absolute inset-0 -z-10 size-full object-cover object-[center_bottom] max-md:inset-x-0 max-md:bottom-auto max-md:top-10 max-md:h-[calc(100%+2.5rem)] max-md:object-[center_bottom] sm:object-[58%_bottom] md:object-center lg:object-[center_bottom]"
            src={asset("Hero Section.png")}
            alt="Siswa LSP SMKN 26 Jakarta"
          />
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(225,241,255,.18)_0%,rgba(225,241,255,0)_42%,rgba(0,108,220,.04)_100%)]" />
            <div className="relative z-10 mx-auto flex size-full min-h-[620px] w-full max-w-[1272px] flex-col items-center px-4 pb-36 text-center max-md:min-h-[720px] max-md:pt-[128px] sm:min-h-0 sm:px-8 lg:px-16 lg:pb-48">
            <div data-aos="fade-down">
              <Label>LEMBAGA SERTIFIKASI PROFESI (LSP)</Label>
            </div>
             <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 max-w-[330px] text-[30px] font-bold leading-[1.12] text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.18)] sm:max-w-[600px] sm:text-5xl lg:max-w-[800px] lg:text-[54px]">
              Lembaga Sertifikasi <span className="text-primary">Profesi</span>
            </h1>
             <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[330px] text-sm leading-5 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.2)] sm:max-w-[700px] sm:text-base sm:leading-7 lg:max-w-[790px] lg:leading-7">
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
          <div aria-label="Statistik LSP SMKN 26 Jakarta" className="absolute bottom-4 left-1/2 z-20 grid min-h-[90px] w-[calc(100%-32px)] -translate-x-1/2 grid-cols-2 overflow-hidden rounded-[12px] border-2 border-white bg-gradient-to-r from-[#43B8F5] via-[#0092FF] to-[#006CDC] text-white sm:min-h-[96px] md:bottom-[2.07%] md:h-[90px] md:min-h-0 md:w-[min(calc(100%-48px),1200px)] md:grid-cols-4 lg:bottom-[17px] lg:h-[90px] lg:w-[1200px] lg:origin-bottom lg:scale-[1.18]">
            {lspStats.map(([value, label], index) => (
              <div key={label} className="relative flex min-h-[40px] min-w-0 flex-col items-center justify-center px-1">
                <div className="relative z-10 text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                  <strong className="block text-[18px] font-bold leading-none sm:text-[36px] sm:leading-[43px]">{value}</strong>
                  <span className="mt-1 block text-[9px] leading-3 sm:text-base sm:font-medium sm:leading-6">{label}</span>
                </div>
                {index < lspStats.length - 1 && <span className="pointer-events-none absolute right-0 top-0 z-20 h-full border-r-2 border-dashed border-white/90" data-aos="fade-up" data-aos-delay={index * 100 + 50} aria-hidden="true" />}
              </div>
            ))}
          </div>
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
          className="px-5 py-14 max-md:px-4 max-md:pb-32 sm:px-10 lg:py-20"
        >
          <div className="mx-auto max-w-[1140px] text-center">
            <div data-aos="fade-down">
              <Label>SKEMA SERTIFIKASI</Label>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-4 max-w-[340px] text-2xl font-bold leading-[1.2] sm:max-w-none sm:text-3xl">
              Pilih Skema, Buktikan{" "}
              <span className="text-primary">Kompetensi!</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-4 max-w-[340px] text-sm leading-6 text-[#61708b] sm:mt-3 sm:max-w-2xl">
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
              className="mx-auto mt-12 hidden w-[calc(100%-16px)] max-w-[1272px] object-contain sm:mt-8 sm:block sm:w-full"
              src={asset("Alur LSP.png")}
              alt="Alur uji sertifikasi kompetensi LSP"
            />
            <div className="mx-auto mt-10 grid max-w-[340px] gap-8 text-left sm:hidden">
              {certificationSteps.map(([step, title, description], index) => (
                <article data-aos="fade-up" data-aos-delay={index * 80} key={step}>
                  <strong className="block text-2xl font-bold leading-9 text-primary">
                    {step}
                  </strong>
                  <h3 className="mt-1 text-2xl font-bold leading-9 text-ink">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-[21px] text-muted">
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






