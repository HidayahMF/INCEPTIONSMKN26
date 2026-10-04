import { useEffect, useRef } from "react";

const partners = [
  { key: "partner-logo-09", name: "Partner logo 09", src: "/assets/figma/partners/partner-logo-09.png" },
  { key: "partner-logo-07", name: "Partner logo 07", src: "/assets/figma/partners/partner-logo-07.jpeg" },
  { key: "partner-logo-05", name: "Partner logo 05", src: "/assets/figma/partners/partner-logo-05.png" },
  { key: "partner-logo-04", name: "Partner logo 04", src: "/assets/figma/partners/partner-logo-04.png" },
  { key: "partner-logo-16", name: "Partner logo 16", src: "/assets/figma/partners/partner-logo-16.png" },
  { key: "partner-logo-12", name: "Partner logo 12", src: "/assets/figma/partners/partner-logo-12.png" },
  { key: "partner-logo-10", name: "Partner logo 10", src: "/assets/figma/partners/partner-logo-10.png" },
  { key: "partner-pln", name: "PLN", src: "/assets/figma/partners/partner-pln.png" },
  { key: "partner-panasonic", name: "Panasonic", src: "/assets/figma/partners/partner-panasonic.png" },
  { key: "partner-wika", name: "WIKA", src: "/assets/figma/partners/partner-wika.png" },
] as const;

export function PartnerLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Replaces the previous @keyframes partner-marquee (10s linear infinite,
    // translateX(0) -> translateX(-50%)). Two identical sets are rendered, so
    // -50% is exactly one set width and the loop is seamless.
    const animation = track.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
      { duration: 10000, iterations: Infinity, easing: "linear" },
    );
    return () => animation.cancel();
  }, []);

  const renderPartnerSet = (hidden = false) => (
    <div className="flex shrink-0 gap-[23.551px] pr-[23.551px]" aria-hidden={hidden}>
      {partners.map((partner) => (
        <div className="grid h-[117.737px] w-[235.475px] shrink-0 place-items-center rounded-[24px] border-2 border-school-bg bg-white" data-partner-key={partner.key} key={`${hidden ? "duplicate-" : ""}${partner.key}`}>
          <img className="max-h-[70px] max-w-[190px] object-contain" src={partner.src} alt={`${partner.name} logo`} draggable={false} />
        </div>
      ))}
    </div>
  );
  return (
    <section className="partners-section mt-[88px] h-[218px] overflow-hidden bg-[#F4F8FF]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1272px]">
<h2 className="text-center text-4xl font-bold text-ink">
           <span className="text-primary-dark">100+ Mitra Industri</span> yang Berkolaborasi Bersama
        </h2>
        <div className="mt-[42px] h-[140px] w-full overflow-hidden">
          <div ref={trackRef} className="flex w-max">
            {renderPartnerSet()}
            {renderPartnerSet(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
