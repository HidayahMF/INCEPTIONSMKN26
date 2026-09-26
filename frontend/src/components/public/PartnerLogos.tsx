import { figmaAssets } from '../../assets/figmaAssets';

export function PartnerLogos() {
  const orderedPartners = [
    { name: 'AZKO', src: figmaAssets.partners.azko },
    { name: 'PLN', src: figmaAssets.partners.pln },
    { name: 'Toyota', src: figmaAssets.partners.toyota },
    { name: 'WIKA', src: figmaAssets.partners.wika },
    { name: 'Panasonic', src: figmaAssets.partners.panasonic },
  ];
  return <section className="h-[306px] overflow-hidden bg-white pt-[78px]"><div className="mx-auto w-[calc(100%-32px)] max-w-[1272px]"><h2 className="text-center text-4xl font-bold text-primary-dark">100+ Mitra Industri yang Berkolaborasi Bersama</h2><div className="mt-[42px] flex h-[118px] gap-6 overflow-hidden">{orderedPartners.map((partner) => <div className="flex h-[118px] min-w-[235px] items-center justify-center rounded-2xl border border-[#eaf5fa] bg-white p-4 shadow-sm" key={partner.name}><img className="max-h-[92px] w-full object-contain" src={partner.src} alt={`${partner.name} logo`} /></div>)}</div></div></section>;
}
