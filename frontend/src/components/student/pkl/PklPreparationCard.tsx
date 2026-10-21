const preparationItems = [
  { icon: "/assets/pages/siswapages/BKK&PKL/fa-solid_user-cog.png", text: "CV — perbarui data diri, keahlian, dan pengalaman." },
  { icon: "/assets/pages/siswapages/BKK&PKL/ion_book%20(1).png", text: "Portofolio — sertakan proyek dan sertifikat yang relevan." },
  { icon: "/assets/pages/siswapages/BKK&PKL/material-symbols_mail-rounded%20(1).png", text: "Dokumen persyaratan — siapkan surat pengantar dan identitas." },
];

export function PklPreparationCard() {
  return <section className="grid gap-6 rounded-2xl border border-[#e1e9f4] bg-white p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center"><div><h2 className="text-[18px] font-bold text-ink">Siapkan dirimu sebelum melamar</h2><div className="mt-5 grid gap-4">{preparationItems.map((item) => <div key={item.text} className="flex items-center gap-4 text-[15px] text-[#607296]"><img className="size-8 shrink-0 object-contain" src={item.icon} alt="" aria-hidden="true" /><span>{item.text}</span></div>)}</div></div><div className="border-t border-[#e1e9f4] pt-5 text-sm leading-6 text-muted lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><p>Periksa kebutuhan setiap peluang. Lengkapi portofolio agar kemampuanmu lebih mudah dikenali.</p><button type="button" className="mt-5 font-semibold text-primary transition hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Kelola portofolio <span aria-hidden="true">→</span></button></div></section>;
}
