import { useEffect, useRef } from "react";

const partners = [
  ["astra.png", "Astra"],
  ["azko.png", "AZKO"],
  ["compnet.png", "Compnet"],
  ["komatsu.png", "Komatsu"],
  ["mandiri.png", "Mandiri"],
  ["microvision.png", "Microvision"],
  ["panasonic.png", "Panasonic"],
  ["pln.png", "PLN"],
  ["wika.png", "WIKA"],
  ["toyota.jpeg", "Toyota"],
] as const;

export function IndustryPartnersMarquee({ accent = "text-primary-dark" }: { accent?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const animation = trackRef.current.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
      { duration: 32000, iterations: Infinity, easing: "linear" },
    );
    return () => animation.cancel();
  }, []);

  return (
    <section className="px-6 py-14 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1140px] text-center">
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.04em] text-primary shadow-[0_2px_8px_rgba(15,23,42,.08)]">MITRA INDUSTRI</span>
        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Terhubung dengan <span className={accent}>Dunia Industri</span></h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">Kolaborasi dengan dunia industri memberikan kesempatan untuk mengenal lingkungan kerja secara lebih dekat dan mengembangkan kompetensi yang relevan dengan kebutuhan profesional.</p>
        <div className="mt-8 overflow-hidden" aria-label="Mitra industri">
          <div ref={trackRef} className="flex w-max gap-4 will-change-transform">
            {[0, 1].map((copy) => <div className="flex gap-4" aria-hidden={copy === 1} key={copy}>{partners.map(([file, name]) => <div className="flex h-20 w-[180px] shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,.05)]" key={`${copy}-${name}`}><img className="max-h-12 w-full object-contain" src={`/assets/figma/partners/${file}`} alt={`${name} logo`} /></div>)}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
