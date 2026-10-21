import { useRef, type MouseEvent } from "react";

import { figmaAssets } from "../assets/figmaAssets";
import { CtaLink } from "../components/public/CtaLink";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { useFloatShapes } from "../lib/useFloatShapes";
import { tourLocations } from "../data/tourLocations";

export function TourPage() {
  const leftCircleRef = useRef<HTMLImageElement>(null);
  const rightCircleRef = useRef<HTMLImageElement>(null);
  const aboutLeftShapeRef = useRef<HTMLDivElement>(null);
  const aboutRightShapeRef = useRef<HTMLDivElement>(null);
  const scrollButtonRef = useRef<HTMLAnchorElement>(null);
  useFloatShapes([
    { ref: scrollButtonRef, duration: 2600, distance: -10 },
    { ref: aboutLeftShapeRef, duration: 3600, distance: -14 },
    { ref: aboutRightShapeRef, duration: 4700, distance: 18 },
  ]);

  function scrollToPanorama(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    document.getElementById("tour-visual")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-white text-ink">
      <style>{`
        @keyframes tour-shape-left-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-28px); }
        }
        @keyframes tour-shape-right-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-22px); }
        }
        .tour-shape-left { animation: tour-shape-left-float 3.6s ease-in-out infinite; }
        .tour-shape-right { animation: tour-shape-right-float 4.3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tour-shape-left, .tour-shape-right { animation: none; }
        }
      `}</style>
      <PublicNavbar />
      <main>
        <section
          aria-labelledby="tour-title"
          className="relative isolate min-h-[680px] overflow-hidden bg-[#3b3b3b] px-1 pb-1 pt-1 sm:min-h-[calc(100svh-1px)] sm:px-1 sm:pb-1"
        >
          <div className="relative mx-auto min-h-[678px] w-full overflow-hidden sm:min-h-[calc(100svh-3px)]">
            <img
              alt="Pemandangan udara lingkungan SMK Negeri 26 Jakarta"
              className="pointer-events-none absolute inset-0 size-full object-cover object-center"
              src={figmaAssets.tour.heroBackground}
            />
            <img ref={leftCircleRef} aria-hidden="true" className="tour-shape-left pointer-events-none absolute left-[8%] top-[47%] size-16 object-contain opacity-90 sm:size-20" src="/assets/pages/tour/tour-shape-left.png" alt="" />
            <img ref={rightCircleRef} aria-hidden="true" className="tour-shape-right pointer-events-none absolute right-[10%] top-[26%] size-10 object-contain opacity-90 sm:size-14" src="/assets/pages/tour/tour-shape-right.png" alt="" />
            <div className="relative z-10 flex size-full min-h-[678px] translate-y-7 flex-col items-center justify-center px-5 pb-8 text-center text-white sm:min-h-[calc(100svh-3px)]">
              <span data-aos="fade-down" className="inline-flex items-center gap-1 rounded-full bg-[#f5faff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-sm">
                <span aria-hidden="true" className="size-2 rounded-full bg-soft-blue ring-1 ring-primary/25" />
                SCHOOL TOUR
              </span>
              <h1 data-aos="fade-up" data-aos-delay="100" className="mt-5 max-w-[760px] text-[32px] font-bold leading-[1.12] tracking-[-0.03em] sm:text-[40px] md:text-[40px]" id="tour-title">
                Jelajahi SMK Negeri 26 Jakarta
              </h1>
              <p data-aos="fade-up" data-aos-delay="180" className="mt-3 max-w-[650px] text-sm leading-6 text-white sm:text-base sm:leading-7">
                Dari ruang belajar, bengkel praktik, hingga berbagai fasilitas pendukung, kenali lingkungan tempat siswa belajar, berkarya, dan berkembang.
              </p>
              <div data-aos="zoom-in" data-aos-delay="260">
                <a
                  ref={scrollButtonRef}
                  aria-label="Lihat visual utama School Tour"
                  className="mt-36 grid size-20 place-items-center rounded-full bg-white text-primary shadow-[0_8px_20px_rgba(15,23,42,.2)] transition-[transform] hover:scale-105 focus-visible:outline-2 focus-visible:outline-white motion-reduce:transform-none sm:mt-36"
                  href="#tour-visual"
                  onClick={scrollToPanorama}
                >
                  <span aria-hidden="true" className="mt-[-5px] size-4 rotate-45 border-b-[3px] border-r-[3px] border-primary" />
                </a>
              </div>
            </div>
          </div>
        </section>


        <section id="tour-visual" className="mx-auto max-w-[1272px] px-6 pb-20 pt-14 sm:px-10 sm:pt-16 lg:px-0" aria-labelledby="tour-locations-title">
          <div className="text-center">
            <span data-aos="fade-down" className="inline-flex items-center gap-1 rounded-full bg-[#f5faff] px-3 py-[5px] text-[11px] font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)] sm:text-xs">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-soft-blue ring-1 ring-primary/25" />
              SCHOOL TOUR 360°
            </span>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-4 max-w-[760px] text-[28px] font-bold leading-9 text-ink sm:text-[38px] sm:leading-[48px]" id="tour-locations-title">
              Jelajahi Setiap <span className="bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">Sudut Sekolah</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-2 max-w-[640px] text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Pilih lokasi untuk mengenal lebih dekat lingkungan, fasilitas, dan ruang aktivitas SMKN 26 Jakarta melalui panorama interaktif.
            </p>
          </div>
          <div data-aos="fade-up" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tourLocations.map((location, index) => (
              <a
                className="group overflow-hidden rounded-2xl border border-[#dce8f5] bg-white shadow-[0_4px_12px_rgba(15,23,42,.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary"
                href={location.href}
                key={location.id}
              >
                <img alt={location.name} className="h-[132px] w-full object-cover transition-transform duration-300 group-hover:scale-105" src={location.image} />
                <div className="p-3.5">
                  <h3 className="font-[Inter,sans-serif] text-[17px] font-semibold leading-[22px] text-ink">{String(index + 1).padStart(2, "0")} — {location.name}</h3>
                  <p className="mt-1 min-h-[32px] font-[Inter,sans-serif] text-[11px] font-normal leading-4 text-muted">Area {location.name} yang menjadi bagian dari lingkungan dan aktivitas sekolah.</p>
                  <span className="mt-2 inline-flex items-center gap-1 font-[Inter,sans-serif] text-[11px] font-normal leading-4 text-primary">
                    Jelajahi Panorama
                    <img className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5" src={figmaAssets.secondaryButton.arrowRight} alt="" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-16 text-center sm:px-10 sm:py-24">
          <div ref={aboutLeftShapeRef} aria-hidden="true" className="pointer-events-none absolute left-8 top-20 size-7 rounded-full bg-gradient-to-br from-primary to-soft-blue [will-change:transform] sm:left-16 sm:size-10" />
          <div ref={aboutRightShapeRef} aria-hidden="true" className="pointer-events-none absolute right-8 top-14 size-7 rounded-full bg-gradient-to-br from-primary to-soft-blue [will-change:transform] sm:right-16 sm:size-10" />
           <span data-aos="fade-down" className="relative inline-flex items-center gap-1 rounded-full bg-[#f5faff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-sm">
             <span aria-hidden="true" className="size-2 rounded-full bg-soft-blue ring-1 ring-primary/25" />
             TENTANG SMK NEGERI 26 JAKARTA
          </span>
           <h2 data-aos="fade-up" data-aos-delay="100" className="relative mx-auto mt-4 max-w-[760px] text-[28px] font-bold leading-9 text-ink sm:max-w-none sm:whitespace-nowrap sm:text-[clamp(24px,4.4vw,38px)] sm:leading-[48px]">
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
