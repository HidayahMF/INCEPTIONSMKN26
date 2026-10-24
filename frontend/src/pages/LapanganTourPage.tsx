import { lazy, Suspense, useRef } from "react";

import { figmaAssets } from "../assets/figmaAssets";
const PanoramaViewer = lazy(() => import("../components/tour/PanoramaViewer").then((module) => ({ default: module.PanoramaViewer })));
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { tourLocations, type TourLocation } from "../data/tourLocations";
import { useFloatShapes } from "../lib/useFloatShapes";

export function LapanganTourPage({ location = tourLocations[0] }: { location?: TourLocation }) {
  const leftShapeRef = useRef<HTMLImageElement>(null);
  const rightShapeRef = useRef<HTMLImageElement>(null);
  const locationsTrackRef = useRef<HTMLDivElement>(null);
  useFloatShapes([
    { ref: leftShapeRef, duration: 3600, distance: -14 },
    { ref: rightShapeRef, duration: 4300, distance: 16 },
  ]);

  const otherLocations = tourLocations.filter((item) => item.id !== location.id);

  function scrollLocations(direction: "left" | "right") {
    const track = locationsTrackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction === "right" ? track.clientWidth * 0.9 : -track.clientWidth * 0.9,
      behavior: "smooth",
    });
  }

  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#f3f7ff] text-ink">
      <PublicNavbar />
      <main className="relative isolate overflow-hidden">
        <img ref={leftShapeRef} aria-hidden="true" className="pointer-events-none absolute left-[7%] top-[180px] z-0 size-[78px] object-contain max-md:left-[4%] max-md:top-[170px] max-md:size-14" src="/assets/pages/tour/tour-shape-left.png" alt="" />
        <img ref={rightShapeRef} aria-hidden="true" className="pointer-events-none absolute right-[7%] top-[136px] z-0 size-[78px] object-contain max-md:right-[4%] max-md:top-[170px] max-md:size-14" src="/assets/pages/tour/tour-shape-right.png" alt="" />

        <section className="relative z-10 mx-auto w-full max-w-[1272px] px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 md:pb-20 md:pt-40 lg:px-0">
          <div className="mx-auto w-full max-w-[1100px] text-center">
            <span data-aos="fade-down" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-soft-blue" />
              SCHOOL TOUR 360°
            </span>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-4 max-w-full break-words text-[32px] font-bold leading-tight tracking-[-0.03em] text-ink sm:text-5xl md:text-[48px]">
              {location.name}
            </h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-[850px] break-words text-sm font-medium leading-6 text-[#5b6f95] sm:text-lg sm:leading-7">
              {location.id === "lapangan" ? "Area terbuka untuk kegiatan olahraga, upacara, dan berbagai aktivitas siswa." : location.description}
            </p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="220" className="relative mx-auto mt-7 flex min-h-[430px] max-w-[1272px] flex-col items-center sm:mt-9 sm:min-h-[700px]">
            <img aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[145px] z-0 h-auto w-[min(1272px,calc(100vw-24px))] max-w-none -translate-x-1/2 object-contain sm:top-[220px] sm:w-[min(1272px,calc(100vw-32px))]" src="/assets/pages/tour/Shape.png" alt="" />
            <div className="relative z-10 flex w-full flex-col items-center">
              <Suspense fallback={<div className="grid aspect-[2/1] w-full max-w-[1000px] place-items-center rounded-[24px] border-[12px] border-white bg-[#edf4fb] text-sm text-muted shadow-[0_10px_28px_rgba(15,23,42,.14)]">Menyiapkan panorama…</div>}>
                <PanoramaViewer locationName={location.name} panorama={location.image} />
              </Suspense>
              <p className="mt-4 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_4px_16px_rgba(15,23,42,.1)]">
                <img className="size-5 shrink-0 object-contain" src="/assets/pages/tour/bi_hand-index-fill.png" alt="" aria-hidden="true" />
                Geser untuk melihat area sekitar.
              </p>
            </div>
          </div>
        </section>

        <section data-aos="fade-up" className="relative z-10 mx-auto w-full max-w-[1272px] px-4 pb-16 sm:px-8 sm:pb-20 lg:px-0" id="tour-locations">
          <h2 className="text-[26px] font-bold leading-tight text-ink sm:text-4xl">Lokasi <span className="text-primary">Panorama Lainnya</span></h2>
          <p className="mt-3 text-sm leading-6 text-[#5b6f95] sm:text-base">Jelajahi berbagai lokasi dan fasilitas SMKN 26 Jakarta melalui panorama interaktif.</p>
          <div className="relative mt-7">
            <button
              type="button"
              aria-label="Lokasi panorama sebelumnya"
              className="group absolute left-0 top-1/2 z-20 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-light-blue bg-white shadow-[0_4px_16px_rgba(15,23,42,.1)] transition-[background,color,box-shadow] hover:bg-primary hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary lg:left-[-52px] lg:size-12 lg:translate-x-0"
              onClick={() => scrollLocations("left")}
            >
              <img className="size-5 transition-[filter] group-hover:brightness-0 group-hover:invert" src={figmaAssets.advantages.arrowLeft} alt="" aria-hidden="true" />
            </button>
            <div ref={locationsTrackRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 overscroll-x-contain [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden">
            {otherLocations.map((item, index) => (
              <a data-aos="fade-up" data-aos-delay={Math.min(index * 60, 300)} className="group w-[270px] max-w-[calc(100vw-48px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#dce8f5] bg-white shadow-[0_4px_12px_rgba(15,23,42,.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary lg:w-[calc((100%_-_60px)/4)] lg:max-w-none" href={item.href} key={item.id}>
                 <img alt={item.name} className="h-[160px] w-full object-cover transition-transform duration-300 group-hover:scale-105" src={item.image} />
                <div className="p-3.5">
                  <h3 className="font-[Inter,sans-serif] text-[17px] font-semibold leading-[22px] text-ink">{String(tourLocations.findIndex((locationItem) => locationItem.id === item.id) + 1).padStart(2, "0")} — {item.name}</h3>
                  <p className="mt-1 min-h-[32px] font-[Inter,sans-serif] text-[11px] font-normal leading-4 text-muted">Area {item.name} yang menjadi bagian dari lingkungan dan aktivitas sekolah.</p>
                  <span className="mt-2 inline-flex items-center gap-1 font-[Inter,sans-serif] text-[11px] font-normal leading-4 text-primary">Jelajahi Panorama <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span></span>
                </div>
              </a>
            ))}
            </div>
            <button
              type="button"
              aria-label="Lokasi panorama berikutnya"
              className="group absolute right-0 top-1/2 z-20 grid size-10 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-light-blue bg-white shadow-[0_4px_16px_rgba(15,23,42,.1)] transition-[background,color,box-shadow] hover:bg-primary hover:shadow-lg focus-visible:outline-2 focus-visible:outline-primary lg:right-[-52px] lg:size-12 lg:translate-x-0"
              onClick={() => scrollLocations("right")}
            >
              <img className="size-5 transition-[filter] group-hover:brightness-0 group-hover:invert" src={figmaAssets.advantages.arrowRight} alt="" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
