import { useRef } from "react";

import { figmaAssets } from "../assets/figmaAssets";
import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { useFloatShapes } from "../lib/useFloatShapes";
import { tourLocations } from "../data/tourLocations";

export function TourPage() {
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);
  useFloatShapes([
    { ref: leftCircleRef, duration: 3200, distance: -12 },
    { ref: rightCircleRef, duration: 4100, distance: 16 },
  ]);
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-white text-ink">
      <PublicNavbar />
      <main>
        <section
          aria-labelledby="tour-title"
          className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-[#0b4f9e] px-6 pb-24 pt-36 sm:min-h-[660px] sm:px-10 sm:pt-40"
        >
          <img
            alt="Pemandangan udara lingkungan SMK Negeri 26 Jakarta"
            className="pointer-events-none absolute inset-0 size-full object-cover object-center"
            src={figmaAssets.tour.heroBackground}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#005bb5]/55" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-8 bottom-24 size-20 rounded-full bg-gradient-to-br from-primary to-soft-blue/70 opacity-90 sm:left-8 sm:size-24" />
          <div aria-hidden="true" className="pointer-events-none absolute right-8 top-28 size-10 rounded-full bg-gradient-to-br from-primary to-soft-blue/70 opacity-90 sm:right-20 sm:size-14" />
          <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-center text-center text-white">
            <span data-aos="fade-down" className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-primary shadow-[0_4px_16px_rgba(15,23,42,.14)] sm:text-xs">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-soft-blue" />
              SCHOOL TOUR
            </span>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-5 max-w-[760px] text-[32px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[48px] md:text-[52px]" id="tour-title">
              Jelajahi SMK Negeri 26 Jakarta
            </h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[650px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              Kenali lingkungan SMK Negeri 26 Jakarta lebih dekat melalui pengalaman visual dan informasi sekolah.
            </p>
            <div data-aos="zoom-in" data-aos-delay="260">
              <a
                aria-label="Lihat visual utama School Tour"
                className="mt-12 grid size-14 animate-bounce place-items-center rounded-full bg-white text-2xl font-bold text-primary shadow-[0_8px_20px_rgba(15,23,42,.2)] transition-transform hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-white"
                href="#tour-visual"
              >
                ↓
              </a>
            </div>
          </div>
        </section>


        <section id="tour-visual" className="mx-auto max-w-[1272px] px-6 pb-16 pt-16 sm:px-10 lg:px-0" aria-labelledby="tour-locations-title">
          <div className="text-center">
            <span data-aos="fade-down" className="inline-flex rounded-full bg-[#f6fbff] px-3 py-1 text-[10px] font-bold tracking-[0.08em] text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)] sm:text-xs">
              23 LOKASI PANORAMA
            </span>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-3xl font-bold leading-9 text-ink sm:text-4xl" id="tour-locations-title">
              Jelajahi Setiap Sudut Sekolah
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Pilih lokasi untuk membuka pengalaman panorama interaktif.
            </p>
          </div>
          <div data-aos="fade-up" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tourLocations.map((location, index) => (
              <a
                className="group overflow-hidden rounded-2xl border border-[#dce8f5] bg-white shadow-[0_4px_12px_rgba(15,23,42,.06)] transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary"
                href={location.href}
                key={location.id}
              >
                <img alt={location.name} className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" src={location.image} />
                <div className="p-4">
                  <span className="text-[10px] font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-base font-bold text-ink">{location.name}</h3>
                  <span className="mt-3 inline-flex text-xs font-medium text-primary">Buka Panorama →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-24">
          <div ref={leftCircleRef} aria-hidden="true" className="pointer-events-none absolute left-8 top-20 size-7 rounded-full bg-gradient-to-br from-primary to-soft-blue sm:left-16 sm:size-10" />
          <div ref={rightCircleRef} aria-hidden="true" className="pointer-events-none absolute right-8 top-14 size-7 rounded-full bg-gradient-to-br from-primary to-soft-blue sm:right-16 sm:size-10" />
           <span data-aos="fade-down" className="relative inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
             <img className="h-[17px] w-[13.6px]" src="/assets/figma/majors/icon-section-badge.svg" alt="" aria-hidden="true" />
             TENTANG SMK NEGERI 26 JAKARTA
          </span>
          <h2 data-aos="fade-up" data-aos-delay="100" className="relative mx-auto mt-4 max-w-[760px] text-[28px] font-bold leading-9 text-ink sm:text-[38px] sm:leading-[48px]">
            Kenali Lebih Dekat <span className="bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">SMK Negeri 26 Jakarta</span>
          </h2>
          <p data-aos="fade-up" data-aos-delay="180" className="relative mx-auto mt-3 max-w-[640px] text-sm leading-6 text-muted sm:text-base sm:leading-7">
            Masih ingin mengenal SMKN 26 Jakarta lebih jauh? Jelajahi profil, program, dan berbagai informasi tentang sekolah kami.
          </p>
          <div data-aos="fade-up" data-aos-delay="260" className="relative mt-6">
            <CtaLink href="/profile">
              Lihat Profil Sekolah
            </CtaLink>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
