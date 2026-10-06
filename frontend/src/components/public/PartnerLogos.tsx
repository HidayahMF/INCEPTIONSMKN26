import { useRef } from "react";
import { useFloatShapes } from "../../lib/useFloatShapes";
import { partnerLogos as partners, type PartnerLogo as Partner } from "../../data/partners";
import { CtaLink } from "./CtaLink";
import { Marquee } from "./Marquee";

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="grid h-[117.737px] w-[235.475px] shrink-0 place-items-center rounded-[24px] border-2 border-[#EAF5FA] bg-white p-5">
      <img
        className="max-h-[70px] max-w-[190px] object-contain"
        src={partner.src}
        alt={`${partner.name} logo`}
        draggable={false}
      />
    </div>
  );
}

function PartnerCards({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <Marquee ariaLabel="Daftar mitra industri">
        {partners.map((partner) => <PartnerCard partner={partner} key={partner.key} />)}
      </Marquee>
    );
  }

  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{partners.map((partner) => <PartnerCard partner={partner} key={partner.key} />)}</div>;
}

const partnerDetails = [
  ["AZKO", "azko", "Mitra industri di bidang retail yang mendukung pengembangan kompetensi kerja dan keterampilan siswa dalam dunia bisnis dan layanan."],
  ["PLN", "pln", "Kolaborasi di bidang energi dan ketenagalistrikan untuk memperkenalkan lingkungan kerja serta kompetensi yang relevan dengan kebutuhan industri."],
  ["Toyota", "toyota", "Mitra industri otomotif yang membuka ruang pembelajaran berbasis praktik dan mengenalkan standar kerja profesional kepada siswa."],
  ["WIKA", "wika", "Kolaborasi bersama perusahaan konstruksi dan infrastruktur untuk memperluas pengalaman siswa melalui pembelajaran yang dekat dengan dunia kerja."],
  ["Panasonic", "panasonic", "Mitra di bidang elektronik dan teknologi yang mendukung pengembangan kompetensi siswa sesuai perkembangan industri."],
  ["Komatsu", "komatsu", "Mitra industri manufaktur dan alat berat yang mendukung pembelajaran teknis serta pengenalan standar kerja industri."],
  ["Microvision", "microvision", "Mitra industri yang bergerak di bidang teknologi dan solusi multimedia, mendukung pengembangan keterampilan siswa berbasis teknologi."],
  ["Astra Otoparts", "astra", "Kolaborasi di bidang komponen otomotif dan manufaktur untuk memperkuat pengalaman pembelajaran siswa melalui praktik kerja."],
] as const;

function DetailPartnerCard({ name, keyName, description, index }: { name: string; keyName: string; description: string; index: number }) {
  const partner = partners.find((item) => item.key === keyName);
  if (!partner) return null;
  return (
    <article className="group flex min-h-[300px] flex-col rounded-[24px] border-2 border-[#EAF5FA] bg-white p-6 shadow-[0_4px_16px_rgba(15,23,42,.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,.1)]">
      <div className="grid h-[92px] place-items-center">
        <img className="max-h-[70px] max-w-[190px] object-contain" src={partner.src} alt={`${name} logo`} draggable={false} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{String(index + 1).padStart(2, "0")} — {name}</h3>
      <p className="mt-2 text-xs leading-[18px] text-muted">{description}</p>
      <a className="mt-auto pt-6 text-xs font-medium text-primary no-underline hover:underline" href={`/partners/${keyName}`}>Baca selengkapnya <span aria-hidden="true">→</span></a>
    </article>
  );
}

export function PartnerLogos() {
  return (
    <section
      id="partners"
      className="mt-[88px] overflow-hidden bg-[#F4F8FF] py-8"
      aria-labelledby="homepage-partners-title"
    >
      <div className="mx-auto w-full max-w-[1272px] px-4 sm:px-6 lg:px-0">
        <h2 id="homepage-partners-title" className="text-center text-3xl font-bold leading-[54px] text-ink sm:text-4xl">
          <span className="text-primary-dark">100+ Mitra Industri</span> yang Berkolaborasi Bersama
        </h2>
        <div className="mt-8">
          <PartnerCards compact />
        </div>
      </div>
    </section>
  );
}

export function PartnerIndustryPage() {
  const shapeLeftRef = useRef<HTMLImageElement>(null);
  const shapeRightRef = useRef<HTMLImageElement>(null);

  useFloatShapes([
    { ref: shapeLeftRef, duration: 3400, distance: -14 },
    { ref: shapeRightRef, duration: 4200, distance: 16 },
  ]);

  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 text-ink">
      <section
        className="relative isolate flex h-[700px] items-start overflow-visible bg-[#EAF5FA] px-4 pt-[125px] text-center sm:px-6 sm:pt-[135px] min-[1280px]:h-[max(720px,53.93vw)] lg:px-0 lg:pt-[138px]"
        aria-labelledby="partners-page-title"
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-[1280px]:hidden">
          <img className="absolute inset-0 size-full object-cover object-[center_bottom]" src="/assets/figma/mitra-industri/hero.png" alt="" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,245,250,.94)_0%,rgba(234,245,250,.36)_34%,rgba(234,245,250,0)_55%)]" aria-hidden="true" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden aspect-[1374/741] w-full min-[1280px]:block">
          <img className="absolute inset-0 size-full object-cover object-bottom" src="/assets/figma/mitra-industri/hero.png" alt="" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,245,250,.94)_0%,rgba(234,245,250,.36)_34%,rgba(234,245,250,0)_55%)]" aria-hidden="true" />
          <img ref={shapeLeftRef} className="absolute left-[10.1%] top-[38.4%] w-[5.68%] max-w-none" src="/assets/figma/decorations/shapekirimitra.png" alt="" aria-hidden="true" />
          <img ref={shapeRightRef} className="absolute left-[84.5%] top-[26.8%] w-[5.68%] max-w-none" src="/assets/figma/decorations/shapekananmitra.png" alt="" aria-hidden="true" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-[1272px] flex-col items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-primary shadow-[0_4px_16px_rgba(15,23,42,.08)]">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            MITRA INDUSTRI
          </span>
          <h1 id="partners-page-title" className="mt-4 max-w-[1100px] text-4xl font-bold leading-[1.1] text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.2)] sm:text-5xl lg:text-[50px]">
            Membangun Koneksi, <span className="text-primary">Membuka Peluang</span>
          </h1>
          <p className="mt-4 max-w-[860px] text-sm leading-6 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.25)] sm:text-base sm:leading-7">
            Mengenal berbagai mitra industri yang berkolaborasi bersama SMK Negeri 26 Jakarta dalam mendukung pembelajaran dan kesiapan siswa menuju dunia kerja.
          </p>
          <CtaLink className="mt-5" href="#partners-list-title">Jelajahi Mitra</CtaLink>
        </div>
        <div className="absolute bottom-[-45px] left-1/2 z-20 grid w-[min(1080px,100%)] -translate-x-1/2 grid-cols-2 overflow-hidden rounded-[12px] bg-gradient-to-r from-primary-dark via-primary to-soft-blue text-white shadow-[0_8px_24px_rgba(15,23,42,.16)] sm:grid-cols-4 max-sm:bottom-[-62px]">
          {[["50+", "Mitra Industri"], ["6", "Kompetensi Keahlian"], ["6", "Bidang Kolaborasi"], ["24", "Program & Kegiatan"]].map(([value, label]) => (
            <div className="border-b border-r border-dashed border-white/70 px-3 py-4 last:border-r-0 sm:py-3" key={label}>
              <strong className="block text-2xl font-bold sm:text-3xl">{value}</strong>
              <span className="text-[11px] sm:text-xs">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1272px] px-4 sm:px-6 lg:px-0">
        <section className="grid items-center gap-10 pt-[125px] pb-16 sm:pt-[145px] sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]" aria-labelledby="partners-intro-title">
           <img className="order-2 h-auto max-h-[360px] w-full object-contain lg:order-1" src="/assets/figma/mitra-industri/image 2 (1).png" alt="Siswa SMKN 26 melakukan praktik teknis" />
          <div className="order-1 lg:order-2">
            <h2 id="partners-intro-title" className="text-3xl font-bold leading-[1.25] sm:text-4xl sm:leading-[1.35]">Mitra Industri<br /><span className="text-primary">SMK Negeri 26 Jakarta</span></h2>
            <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">Membangun kolaborasi antara SMKN 26 Jakarta dan dunia industri untuk menghadirkan pembelajaran yang relevan, praktik nyata, serta kesiapan kerja bagi siswa.</p>
            <CtaLink className="mt-5" href="#partners-list-title">Jelajahi Mitra</CtaLink>
          </div>
        </section>
      </div>

      <section className="w-full bg-[#F4F8FF] px-4 py-14 sm:px-8 sm:py-16" aria-labelledby="partners-list-title">
        <div className="mx-auto w-full max-w-[1272px]">
          <h2 id="partners-list-title" className="mx-auto max-w-[820px] text-center text-3xl font-bold leading-[1.3] sm:text-4xl sm:leading-[54px]"><span className="text-primary-dark">100+ Mitra Industri</span> yang Berkolaborasi Bersama</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {partnerDetails.map(([name, keyName, description], index) => <DetailPartnerCard key={keyName} name={name} keyName={keyName} description={description} index={index} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
