import { Marquee } from "./Marquee";

const partners = [
  ["azko.png", "AZKO"],
  ["pln.png", "PLN"],
  ["toyota.jpeg", "Toyota"],
  ["wika.png", "WIKA"],
  ["panasonic.png", "Panasonic"],
] as const;

export function IndustryPartnersMarquee({
  accent = "text-primary-dark",
  barClass = "bg-primary-dark",
  labelClass = "",
  stats = [
    ["8+", "Mitra Industri"],
    ["12+", "Program Kolaborasi"],
    ["20+", "Kegiatan Industri"],
  ],
}: {
  accent?: string;
  barClass?: string;
  labelClass?: string;
  stats?: readonly (readonly [string, string])[];
}) {
  return (
    <section className="px-6 py-14 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-[1140px] text-center">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[.04em] shadow-[0_2px_8px_rgba(15,23,42,.08)] ${labelClass || "bg-white text-primary"}`}>{labelClass && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}MITRA INDUSTRI</span>
        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Terhubung dengan <span className={accent}>Dunia Industri</span></h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted">Kolaborasi dengan dunia industri memberikan kesempatan untuk mengenal lingkungan kerja secara lebih dekat dan mengembangkan kompetensi yang relevan dengan kebutuhan profesional.</p>
        <div className={`mx-auto mt-8 grid max-w-[800px] grid-cols-3 overflow-hidden rounded-lg text-white ${barClass}`}>
          {stats.map(([value, label]) => (
            <div className="border-r border-dashed border-white/60 px-2 py-3 last:border-r-0 sm:py-4" key={label}>
              <strong className="block text-lg font-bold sm:text-2xl">{value}</strong>
              <span className="text-[8px] sm:text-[10px]">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Marquee ariaLabel="Mitra industri" gapClass="gap-4">
            {partners.map(([file, name]) => (
              <div className="flex h-20 w-[180px] shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,.05)]" key={name}>
                <img className="max-h-12 w-full object-contain" src={`/assets/figma/partners/${file}`} alt={`${name} logo`} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
