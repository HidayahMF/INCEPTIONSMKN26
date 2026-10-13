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
    <a data-aos="fade-up" data-aos-delay={Math.min(index * 80, 320)} className="group relative flex h-[320px] w-full max-w-[305px] flex-col rounded-[24px] border-2 border-[#EAF5FA] bg-white px-[18px] pb-[18px] pt-[150px] no-underline shadow-[0_4px_16px_rgba(15,23,42,.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(15,23,42,.1)] focus-visible:outline-2 focus-visible:outline-primary" href={`/partners/${keyName}`}>
      <div className="pointer-events-none absolute mt-[-132px] flex h-[114px] w-[265px] items-center justify-center">
        <img className="max-h-[70px] max-w-[190px] object-contain" src={partner.src} alt={`${name} logo`} draggable={false} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-ink">{String(index + 1).padStart(2, "0")} — {name}</h3>
      <p className="mt-2 line-clamp-4 min-h-[60px] text-xs leading-[15px] text-muted">{description}</p>
      <span className="mt-auto pb-1 pt-3 text-xs font-medium text-primary group-hover:underline">Baca selengkapnya <span aria-hidden="true">→</span></span>
    </a>
  );
}

export function PartnerLogos() {
  return (
    <section
      id="partners"
      className="mt-[88px] overflow-hidden bg-[#F4F8FF] py-8"
      aria-labelledby="homepage-partners-title"
    >
      <div className="mx-auto w-full max-w-[1272px] bg-white px-4 sm:px-6 lg:px-0">
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
    <main className="min-h-screen overflow-hidden bg-[#F4F8FF] pb-24 text-ink">
      <section
        className="relative isolate flex h-[700px] items-start overflow-visible bg-[#EAF5FA] px-4 pt-[125px] text-center sm:px-6 sm:pt-[135px] min-[1280px]:h-[max(720px,53.93vw)] lg:px-0 lg:pt-[138px]"
        aria-labelledby="partners-page-title"
      >
        <div className="pointer-events-none absolute inset-0 z-0 min-[1280px]:hidden">
          <img className="absolute inset-0 size-full object-cover object-[center_bottom]" src="/assets/pages/mitra-industri/hero.png" alt="" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,245,250,.94)_0%,rgba(234,245,250,.36)_34%,rgba(234,245,250,0)_55%)]" aria-hidden="true" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden aspect-[1374/741] w-full min-[1280px]:block">
          <img className="absolute inset-0 size-full object-cover object-bottom" src="/assets/pages/mitra-industri/hero.png" alt="" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(234,245,250,.94)_0%,rgba(234,245,250,.36)_34%,rgba(234,245,250,0)_55%)]" aria-hidden="true" />
          <img ref={shapeLeftRef} className="absolute left-[10.1%] top-[38.4%] w-[5.68%] max-w-none" src="/assets/shared/decorations/shapekirimitra.png" alt="" aria-hidden="true" />
          <img ref={shapeRightRef} className="absolute left-[84.5%] top-[26.8%] w-[5.68%] max-w-none" src="/assets/shared/decorations/shapekananmitra.png" alt="" aria-hidden="true" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-[1272px] flex-col items-center">
          <span data-aos="fade-down" className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-primary shadow-[0_4px_16px_rgba(15,23,42,.08)]">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            MITRA INDUSTRI
          </span>
          <h1 data-aos="fade-up" data-aos-delay="100" id="partners-page-title" className="mt-4 max-w-[1100px] text-4xl font-bold leading-[1.1] text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.2)] sm:text-5xl lg:text-[50px]">
            Membangun Koneksi, <span className="text-primary">Membuka Peluang</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[860px] text-sm leading-6 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.25)] sm:text-base sm:leading-7">
            Mengenal berbagai mitra industri yang berkolaborasi bersama SMK Negeri 26 Jakarta dalam mendukung pembelajaran dan kesiapan siswa menuju dunia kerja.
          </p>
           <CtaLink data-aos="fade-up" data-aos-delay="260" className="mt-5" href="#partners-list-title">Jelajahi Mitra</CtaLink>
        </div>
        <div className="absolute bottom-[-45px] left-1/2 z-20 grid w-[min(1080px,100%)] -translate-x-1/2 grid-cols-2 overflow-hidden rounded-[12px] bg-gradient-to-r from-primary-dark via-primary to-soft-blue text-white shadow-[0_8px_24px_rgba(15,23,42,.16)] sm:grid-cols-4 max-sm:bottom-[-62px]">
          {[["50+", "Mitra Industri"], ["6", "Kompetensi Keahlian"], ["6", "Bidang Kolaborasi"], ["24", "Program & Kegiatan"]].map(([value, label]) => (
            <div data-aos="fade-up" className="border-b border-r border-dashed border-white/70 px-3 py-4 last:border-r-0 sm:py-3" key={label}>
              <strong className="block text-2xl font-bold sm:text-3xl">{value}</strong>
              <span className="text-[11px] sm:text-xs">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full bg-white">
        <section className="mx-auto grid max-w-[1272px] items-center gap-10 bg-white px-4 py-[125px] sm:px-6 sm:py-[145px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]" aria-labelledby="partners-intro-title">
           <img data-aos="fade-right" className="order-2 h-auto max-h-[360px] w-full object-contain lg:order-1" src="/assets/shared/illustrations/berkembang.png" alt="Siswa SMKN 26 melakukan praktik teknis" />
          <div className="order-1 lg:order-2">
             <h2 data-aos="fade-left" id="partners-intro-title" className="text-3xl font-bold leading-[1.25] sm:text-4xl sm:leading-[1.35]">Mitra Industri<br /><span className="text-primary">SMK Negeri 26 Jakarta</span></h2>
             <p data-aos="fade-left" data-aos-delay="100" className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">Membangun kolaborasi antara SMKN 26 Jakarta dan dunia industri untuk menghadirkan pembelajaran yang relevan, praktik nyata, serta kesiapan kerja bagi siswa.</p>
             <CtaLink data-aos="fade-left" data-aos-delay="180" className="mt-5" href="#partners-list-title">Jelajahi Mitra</CtaLink>
          </div>
        </section>
      </div>

      <section className="w-full flex-1 bg-[#F4F8FF] px-4 py-14 sm:px-8 sm:py-16" aria-labelledby="partners-list-title">
        <div className="mx-auto w-full max-w-[1272px]">
          <div className="text-center">
            <span data-aos="fade-down" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
              <span className="size-1.5 rounded-full bg-soft-blue" aria-hidden="true" />
              KERJASAMA MITRA
            </span>
            <h2 data-aos="fade-up" data-aos-delay="100" id="partners-list-title" className="mx-auto mt-4 max-w-[820px] text-3xl font-bold leading-[1.3] sm:text-4xl sm:leading-[54px]">
              Terhubung dengan <span className="text-primary-dark">Dunia Industri.</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-2 max-w-[760px] text-sm leading-6 text-muted sm:text-base">
              Kenali perusahaan dan institusi yang menjadi bagian dari kolaborasi SMK Negeri 26 Jakarta dalam mendukung kesiapan siswa menghadapi dunia kerja.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {partnerDetails.map(([name, keyName, description], index) => <DetailPartnerCard key={keyName} name={name} keyName={keyName} description={description} index={index} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
