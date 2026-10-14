import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const ASSET_OVERRIDES: Record<string, string> = {
  "xxx.png": "/assets/pages/prestasi/ccc.png",
};
const asset = (name: string) => ASSET_OVERRIDES[name] ?? `/assets/pages/prestasi/${name}`;
const achievementBadgeIcon = "/assets/shared/icons/section-badge.svg";

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
      <img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />
      {children}
    </span>
  );
}

export function PrestasiPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate w-full overflow-hidden bg-[#eaf5ff]"><div className="relative mx-auto aspect-[1440/820] min-h-[560px] w-full sm:min-h-[620px] lg:min-h-0">
          <img
            className="pointer-events-none absolute inset-0 z-0 size-full object-cover object-center"
            src={asset("Group 1815.png")}
            alt="Siswa SMKN 26 Jakarta meraih prestasi"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#eaf5ff]/0 via-[#eaf5ff]/0 to-[#eaf5ff]/10" />
          <div className="relative z-10 mx-auto flex h-full w-[calc(100%-32px)] max-w-[1272px] items-start justify-center px-5 pt-[96px] text-center sm:px-7 sm:pt-[112px] lg:pt-[124px]"><div className="flex max-w-[1100px] flex-col items-center">
            <span data-aos="fade-down" className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
              <img className="h-[17px] w-[13.6px]" src={achievementBadgeIcon} alt="" />
              PRESTASI SMK NEGERI 26 JAKARTA
            </span>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 max-w-[1100px] text-[32px] font-bold leading-10 tracking-[-.02em] text-white drop-shadow-[0_3px_3px_rgba(15,23,42,.14)] md:text-[48px] md:leading-[58px]">
              Prestasi Siswa{" "}
              <span className="text-primary">SMKN 26 Jakarta</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mt-3 max-w-[1000px] text-base font-medium leading-6 text-white drop-shadow-[0_2px_3px_rgba(15,23,42,.2)] md:text-[20px] md:leading-[30px]">
              Kumpulan pencapaian dan keberhasilan siswa SMKN 26 Jakarta dalam
              berbagai bidang kompetisi, akademik, non-akademik, dan keahlian.
            </p>
            <a
              data-aos="fade-up"
              data-aos-delay="260"
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none"
              href="#galeri-prestasi"
            >
              Jelajahi Prestasi <span aria-hidden="true">→</span>
            </a>
          </div></div></div>
        </section>
        <section id="galeri-prestasi" className="px-5 py-14 sm:px-10 lg:py-20">
          <div className="mx-auto max-w-[1200px] text-center">
            <div data-aos="fade-down">
              <Badge>GALERI PRESTASI</Badge>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-2xl font-bold sm:text-3xl">
              Raih Prestasi,{" "}
              <span className="text-primary">Tunjukkan Potensi</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-[760px] text-sm leading-6 text-[#61708b] sm:text-base">
              Beragam pencapaian siswa SMK Negeri 26 Jakarta dalam berbagai
              kompetisi dan bidang keahlian, dari tingkat kota hingga
              internasional.
            </p>
            <div data-aos="fade-up" className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
