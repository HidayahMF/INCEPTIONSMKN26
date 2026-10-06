import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const asset = (name: string) => `/assets/figma/Prestasi/${name}`;
const achievementBadgeIcon = "/assets/figma/programs/programs-svg-04.svg";

const cards = [
  ",,,.png",
  ".....png",
  "a.png",
  "aa.png",
  "b.png",
  "bbbb.png",
  "c.png",
  "ccc.png",
  "dsa.png",
  "mmm.png",
  "nnn.png",
  "s.png",
  "v.png",
  "vvv.png",
  "xxx.png",
  "zzzz.png",
  "Card Prestasi.png",
  "Card Prestasi (1).png",
  "Card Prestasi (2).png",
  "Card Prestasi (3).png",
  "Card Prestasi (4).png",
  "Card Prestasi (5).png",
  "Card Prestasi (6).png",
  "Card Prestasi (7).png",
  "Card Prestasi (8).png",
  "Card Prestasi (9).png",
  "Card Prestasi (10).png",
  "Card Prestasi (11).png",
  "Card Prestasi (12).png",
  "Card Prestasi (13).png",
] as const;

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <img className="h-[17px] w-[13.6px]" src="/assets/figma/majors/icon-section-badge.svg" alt="" aria-hidden="true" />
      {children}
    </span>
  );
}

export function PrestasiPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#bfe2ff] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img
            className="absolute inset-0 -z-10 size-full object-cover object-center"
            src={asset("Group 1815.png")}
            alt="Siswa SMKN 26 Jakarta meraih prestasi"
          />
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(225,241,255,.88)_0%,rgba(225,241,255,.06)_42%,rgba(0,108,220,.12)_100%)]" />
          <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1272px] flex-col items-center px-5 pb-36 pt-5 text-center sm:min-h-[700px] sm:px-8 sm:pt-9 lg:min-h-[760px] lg:px-16 lg:pt-12">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
              <img className="h-[17px] w-[13.6px]" src={achievementBadgeIcon} alt="" />
              PRESTASI SMK NEGERI 26 JAKARTA
            </span>
            <h1 className="mt-4 text-[28px] font-bold leading-tight text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.2)] sm:text-4xl lg:text-[52px]">
              Prestasi Siswa{" "}
              <span className="text-primary">SMKN 26 Jakarta</span>
            </h1>
            <p className="mt-4 max-w-[760px] text-sm leading-6 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.2)] sm:text-base">
              Kumpulan pencapaian dan keberhasilan siswa SMKN 26 Jakarta dalam
              berbagai bidang kompetisi, akademik, non-akademik, dan keahlian.
            </p>
            <a
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none"
              href="#galeri-prestasi"
            >
              Jelajahi Prestasi <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
        <section className="relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[1200px] grid-cols-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10 sm:grid-cols-5">
          {[
            ["100+", "Prestasi"],
            ["10", "Tingkat Internasional"],
            ["56", "Tingkat Nasional"],
            ["24", "Tingkat Provinsi"],
            ["30", "Tingkat Kota"],
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
        <section id="galeri-prestasi" className="px-5 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1200px] text-center">
            <Badge>GALERI PRESTASI</Badge>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Raih Prestasi,{" "}
              <span className="text-primary">Tunjukkan Potensi</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-[#61708b] sm:text-base">
              Beragam pencapaian siswa SMK Negeri 26 Jakarta dalam berbagai
              kompetisi dan bidang keahlian, dari tingkat kota hingga
              internasional.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {cards.map((card) => (
                <article
                  className="overflow-hidden rounded-[9px] shadow-[0_4px_12px_rgba(15,23,42,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  key={card}
                >
                  <img
                    className="block h-auto w-full object-cover"
                    src={asset(card)}
                    alt="Prestasi siswa SMKN 26 Jakarta"
                    loading="lazy"
                  />
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
