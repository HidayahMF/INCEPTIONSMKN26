import { figmaAssets } from "../../assets/figmaAssets";

export function PartnerLogos() {
  const orderedPartners = [
    { name: "AZKO", src: figmaAssets.partners.azko },
    { name: "PLN", src: figmaAssets.partners.pln },
    { name: "Toyota", src: figmaAssets.partners.toyota },
    { name: "WIKA", src: figmaAssets.partners.wika },
    { name: "Panasonic", src: figmaAssets.partners.panasonic },
  ];
  return (
    <section className="partners-section mt-[88px] h-[218px] overflow-hidden bg-white">
      <div className="mx-auto w-[calc(100%-32px)] max-w-[1272px]">
           <h2 className="text-center text-4xl font-bold text-primary-dark">
           <span>100+ Mitra Industri</span> yang Berkolaborasi Bersama
        </h2>
        <div className="partner-viewport mt-[42px]">
          <div className="partner-track">
            {[...orderedPartners, ...orderedPartners, ...orderedPartners, ...orderedPartners].map((partner, index) => (
              <div className="partner-slot" key={`${partner.name}-${index}`}>
                <img src={partner.src} alt={`${partner.name} logo`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
