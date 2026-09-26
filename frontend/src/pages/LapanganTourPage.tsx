import { PanoramaViewer } from "../components/tour/PanoramaViewer";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { tourLocations } from "../data/tourLocations";

const lapangan = tourLocations[0];

export function LapanganTourPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <PublicNavbar />
      <main className="mx-auto w-full max-w-[1272px] px-4 pb-20 pt-36 md:pb-28 md:pt-40">
        <section className="mx-auto w-full min-w-0 max-w-4xl text-center">
          <span className="inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
            Virtual Tour
          </span>
          <h1 className="mx-auto mt-6 w-full max-w-full break-words text-[34px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-5xl">
              Lapangan SMKN 26
              <br className="sm:hidden" /> Jakarta
          </h1>
          <p className="mx-auto mt-4 w-full max-w-2xl break-words text-base font-medium leading-7 text-muted md:text-lg md:leading-[30px]">
            Jelajahi area lapangan utama SMKN 26 Jakarta secara interaktif.
          </p>
        </section>
        <section className="mt-10 min-w-0 max-w-full md:mt-14">
          <PanoramaViewer panorama={lapangan.image} />
          <p className="mt-4 text-center text-sm font-medium text-muted">
            Geser untuk melihat area sekitar.
          </p>
        </section>
        <a
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary shadow-[0_4px_16px_rgba(15,23,42,.08)] ring-1 ring-light-blue transition hover:-translate-y-0.5 hover:shadow-lg"
          href="/tour"
        >
          <span aria-hidden="true" className="text-xl leading-none">←</span>
          Kembali ke Virtual Tour
        </a>
      </main>
      <PublicFooter />
    </div>
  );
}
