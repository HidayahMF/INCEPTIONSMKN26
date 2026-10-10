import { PanoramaViewer } from "../components/tour/PanoramaViewer";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { tourLocations, type TourLocation } from "../data/tourLocations";

export function LapanganTourPage({ location = tourLocations[0] }: { location?: TourLocation }) {
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-white text-ink">
      <PublicNavbar />
      <main className="mx-auto w-full max-w-[1272px] px-4 pb-20 pt-36 md:pb-28 md:pt-40">
        <section className="mx-auto w-full min-w-0 max-w-4xl text-center">
          <span data-aos="fade-down" className="inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
            Virtual Tour
          </span>
          <h1 data-aos="fade-up" data-aos-delay="100" className="mx-auto mt-6 w-full max-w-full break-words text-[34px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-5xl">
            {location.name}
          </h1>
          <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-4 w-full max-w-2xl break-words text-base font-medium leading-7 text-muted md:text-lg md:leading-[30px]">
            {location.description}
          </p>
        </section>
        <section data-aos="zoom-in" data-aos-delay="200" className="mt-10 min-w-0 max-w-full md:mt-14">
          <PanoramaViewer locationName={location.name} panorama={location.image} />
          <p className="mt-4 text-center text-sm font-medium text-muted">Geser untuk melihat area sekitar.</p>
        </section>
        <div data-aos="fade-up" className="mt-7 flex flex-wrap gap-3">
          <a className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-primary shadow-[0_4px_16px_rgba(15,23,42,.08)] ring-1 ring-light-blue transition hover:-translate-y-0.5 hover:shadow-lg" href="/tour">
            <span aria-hidden="true" className="text-xl leading-none">←</span>
            Kembali ke Virtual Tour
          </a>
          <a className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-dark via-primary to-soft-blue px-5 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(15,23,42,.12)] transition hover:-translate-y-0.5 hover:shadow-lg" href="#tour-locations">
            Pilih Lokasi Lain
          </a>
        </div>
        <section data-aos="fade-up" className="mt-12 border-t border-light-blue pt-8" id="tour-locations">
          <h2 className="text-xl font-bold text-ink">Lokasi Panorama Lainnya</h2>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {tourLocations.map((item, index) => (
              <a data-aos="fade-up" data-aos-delay={index * 60} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${item.id === location.id ? "bg-primary text-white" : "bg-[#f6fbff] text-primary"}`} href={item.href} key={item.id}>
                {item.name}
              </a>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
