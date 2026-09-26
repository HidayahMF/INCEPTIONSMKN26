import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { tourLocations } from "../data/tourLocations";

export function TourPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-ink">
      <PublicNavbar />
      <main>
        <section className="relative isolate flex min-h-[clamp(460px,62vh,640px)] items-center overflow-hidden bg-white px-4 py-24 sm:px-6 md:py-28">
          <img
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.72]"
            src="/assets/figma/hero/hero-background.png"
            alt=""
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,.08)_0%,rgba(255,255,255,.18)_25%,rgba(255,255,255,.55)_60%,rgba(255,255,255,.92)_85%,#fff_100%)]"
          />
          <div className="relative z-10 mx-auto w-full max-w-[1272px] text-center">
            <span className="inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
              Jelajahi Sekolah
            </span>
            <h1 className="mx-auto mt-7 max-w-4xl text-[38px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-5xl md:text-[56px]">
              <span className="text-primary-dark">Virtual Tour</span> SMKN 26
              Jakarta
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-muted md:text-lg md:leading-[30px]">
              Kenali lingkungan SMKN 26 Jakarta lebih dekat melalui pengalaman
              visual yang interaktif.
            </p>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-[1272px] min-w-0 px-4 pb-28 md:pb-40">
          {tourLocations.map((location, index) => (
            <article
              className="grid w-full min-w-0 items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-20"
              key={location.id}
            >
              <div className="relative order-2 min-w-0 max-w-full md:order-1 md:py-8">
                <span className="inline-flex rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
                  Virtual Tour
                </span>
                <span className="mt-6 block text-sm font-bold tracking-[0.16em] text-primary">
                  0{index + 1} / LOKASI
                </span>
                <h2 className="mt-5 max-w-lg text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
                  {location.name}
                </h2>
                <p className="mt-4 max-w-lg text-base font-medium leading-7 text-muted md:text-lg md:leading-[30px]">
                  {location.description}
                </p>
                <a
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(15,23,42,.12)] transition hover:-translate-y-0.5 hover:shadow-lg"
                  href={location.href}
                >
                  Jelajahi Virtual Tour
                  <span aria-hidden="true" className="text-xl leading-none">
                    →
                  </span>
                </a>
              </div>
              <div className="relative order-1 min-w-0 max-w-full md:order-2">
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 -z-0 size-[260px] rounded-full bg-gradient-to-br from-primary-dark/25 via-primary/10 to-transparent md:-right-12 md:-top-12 md:size-[360px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-7 -left-7 z-0 size-24 rounded-full border-2 border-primary/30 md:-bottom-10 md:-left-10 md:size-32"
                />
                <img
                  className="relative z-10 block aspect-[4/3] w-full max-w-full rounded-3xl border-2 border-white object-cover shadow-[0_4px_16px_rgba(15,23,42,.12)] md:aspect-[16/10]"
                  src={location.image}
                  alt={location.name}
                />
              </div>
            </article>
          ))}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
