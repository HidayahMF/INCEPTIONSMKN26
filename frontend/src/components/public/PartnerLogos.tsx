export function PartnerLogos() {
  const orderedPartners = [
    '/assets/figma/partners/partner-logo-03.png',
    '/assets/figma/partners/partner-logo-01.png',
    '/assets/figma/partners/partner-logo-04.png',
    '/assets/figma/partners/partner-logo-05.png',
    '/assets/figma/partners/partner-logo-02.png',
  ];
  return <section className="h-[306px] overflow-hidden bg-white pt-[78px]"><div className="mx-auto w-[calc(100%-32px)] max-w-[1272px]"><h2 className="text-center text-4xl font-bold text-primary-dark">100+ Mitra Industri yang Berkolaborasi Bersama</h2><div className="mt-[42px] flex h-[118px] gap-6 overflow-hidden">{orderedPartners.map((src, index) => <div className="flex h-[118px] min-w-[235px] items-center justify-center rounded-2xl border border-[#eaf5fa] bg-white p-4 shadow-sm" key={`${src}-${index}`}><img className="max-h-[92px] w-full object-contain" src={src} alt={`Logo mitra industri ${index + 1}`} /></div>)}</div></div></section>;
}
