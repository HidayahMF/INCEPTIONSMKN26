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
  const renderPartnerSet = (hidden = false) => (
    <div className="partner-set" aria-hidden={hidden}>
      {partners.map((partner) => (
        <div className="partner-slot" data-partner-key={partner.key} key={`${hidden ? "duplicate-" : ""}${partner.key}`}>
          <img src={partner.src} alt={`${partner.name} logo`} />
        </div>
      ))}
    </div>
  );
  return (
    <section className="partners-section mt-[88px] h-[218px] overflow-hidden bg-[#F4F8FF]">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1272px]">
           <h2 className="text-center text-4xl font-bold text-primary-dark">
           <span>100+ Mitra Industri</span> yang Berkolaborasi Bersama
        </h2>
        <div className="partner-viewport mt-[42px]">
          <div className="partner-track">
            {renderPartnerSet()}
            {renderPartnerSet(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
