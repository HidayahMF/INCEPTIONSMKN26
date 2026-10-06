import { useRef } from "react";

import { figmaAssets } from "../../assets/figmaAssets";
import { useFloatShapes } from "../../lib/useFloatShapes";

type OverviewPage = { title: string; summary: string; body: string };
type SchoolOverviewProps = { pages: OverviewPage[]; loading: boolean };
const fallbackStats = [
  ["6", "Jurusan"],
  ["1750+", "Siswa Aktif"],
  ["80", "Pendidik"],
  ["50", "Mitra Industri"],
  ["24", "Ekstrakulikuler"],
];

export function SchoolOverview({ pages, loading }: SchoolOverviewProps) {
  const smallCircleRef = useRef<HTMLDivElement>(null);
  const largeCircleRef = useRef<HTMLDivElement>(null);
  useFloatShapes([
    { ref: smallCircleRef, duration: 3200, distance: -12 },
    { ref: largeCircleRef, duration: 4100, distance: 16 },
  ]);
  const statistic = pages.find((page) => page.title.includes("Statistik"));
  const stats = (
    statistic?.body.match(
      /(\d[\d.]*)\s+(pendidik|tenaga kependidikan|murid|rombel|jurusan|mitra industri|ekstrakurikuler)/gi,
    ) || []
  )
    .map((item) => item.match(/(\d[\d.]*)\s+(.+)/))
    .filter(Boolean)
    .map((match) => [match![1], match![2]] as [string, string])
    .slice(0, 5);
  const shownStats = stats.length ? stats : fallbackStats;
  return (
    <section className="school-overview relative mx-auto mt-[59px] h-[400px] w-[min(1272px,calc(100%-32px))]" aria-labelledby="overview-title">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1272px] md:w-[1272px]">
          <div className="flex justify-center">
          <span className="rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-sm">
             MENGENAL SMK NEGERI 26 JAKARTA
          </span>
        </div>
        <div className="relative h-[337px]">
           <div className="absolute left-0 top-[23px] max-w-[680px]">
            <h2 id="overview-title" className="text-[36px] font-bold leading-[54px] text-ink">
              Lebih dari Sekadar{" "}
              <span className="text-primary-dark">Sekolah Vokasi</span>
            </h2>
            <p className="mt-1 max-w-[620px] text-lg font-medium leading-[30px] text-muted">
              {loading
                ? "Memuat informasi sekolah..."
                : "SMK Negeri 26 Jakarta merupakan sekolah menengah kejuruan yang mempersiapkan siswa untuk belajar, berkarya, dan berkembang sesuai kompetensi serta kebutuhan dunia kerja."}
            </p>
          </div>
            <div className="pointer-events-none absolute right-0 top-[35px] hidden h-[365px] w-[538px] md:block">
            <div className="absolute right-0 z-0 size-[365px] rounded-full bg-gradient-to-br from-primary-dark to-transparent" />
            <div className="absolute right-[18px] top-[18px] z-0 size-[330px] rounded-full border-2 border-white" />
            <div ref={smallCircleRef} className="absolute left-[148px] top-[7px] z-0 size-[61px] rounded-full bg-gradient-to-br from-primary-dark via-primary to-transparent" />
            <div ref={largeCircleRef} className="absolute left-0 top-[267px] z-0 size-[92px] rounded-full bg-gradient-to-br from-primary-dark via-primary to-transparent" />
            <div className="absolute left-0 top-[67px] z-10 h-[233px] w-[420px] overflow-hidden rounded-[18px] border-2 border-white shadow-[0_4px_16px_rgba(15,23,42,0.08)]" style={{ left: "35px", top: "37px" }}>
              <img
                className="block h-full w-full object-cover opacity-100"
                src={figmaAssets.school.overviewPhoto}
                alt="Gedung SMK Negeri 26 Jakarta"
              />
            </div>
          </div>
            <div className="absolute left-0 top-[180px] flex h-[90px] w-[680px] max-w-full items-center justify-between rounded-[14px] bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 text-white shadow-lg" style={{ left: "1px", top: "213px" }}>
            {shownStats.map(([value, label], index) => (
              <div
                className="flex min-w-0 items-center gap-2 sm:gap-4"
                key={label}
              >
                <div className="min-w-0 text-center">
                  <strong className={`block font-bold ${index === 0 ? "text-[36px]" : "text-[32px]"}`}>
                    {value}
                  </strong>
                  <span className="block whitespace-nowrap text-base font-medium">
                    {label}
                  </span>
                </div>
                {index < shownStats.length - 1 && (
                  <span className="h-[86px] w-px shrink-0 border-l border-dashed border-white" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <a className="overview-photo-cta secondary-button group absolute left-[1070px] top-[312px] z-20 hidden h-[41px] w-[182px] box-border items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-[18px] py-3 text-sm font-bold text-primary-dark no-underline shadow-[0_4px_16px_rgba(15,23,42,.08)] transition-[background,color,border-color] duration-300 ease-out hover:border hover:border-slate-300 hover:bg-primary hover:bg-none hover:text-white focus-visible:border focus-visible:border-slate-300 focus-visible:bg-primary focus-visible:bg-none focus-visible:text-white md:inline-flex" href="/profile">
        Kenal Lebih Dekat <img className="size-5 group-hover:brightness-0 group-hover:invert group-focus-visible:brightness-0 group-focus-visible:invert" src={figmaAssets.secondaryButton.arrowRight} alt="" />
      </a>
    </section>
  );
}
