import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { NewsCard } from "../components/public/NewsCard";
import { newsItems } from "../data/news";

const detailAssets = "/assets/pages/berita/isiberita";

export function NewsDetailPage({ slug }: { slug: string }) {
  const news = newsItems.find((item) => item.slug === slug) ?? newsItems[0];
  const related = newsItems.filter((item) => item.slug !== news.slug).slice(0, 3);
  const workshop = slug === "workshop-pengembangan-soft-skill-siswa";

  return <div className="min-h-screen overflow-x-clip bg-white text-ink"><PublicNavbar />
    <main>
      <header className="relative overflow-hidden bg-[#f3f8ff] px-4 pb-10 pt-28 sm:px-8 lg:px-[7.3%] lg:pt-32">
        <div className="relative z-10 max-w-[900px]"><span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-sm"><img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />{news.category}</span>
          <h1 className="mt-3 max-w-[850px] text-3xl font-bold leading-[1.18] sm:text-4xl">{news.title}<br className="hidden sm:block" />{workshop && " SMK Negeri 26 Jakarta"}</h1>
          <p className="mt-3 max-w-[650px] leading-7 text-[#53698e]">{news.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-[#53698e]"><span className="inline-flex items-center gap-1.5"><img className="size-4 object-contain" src="/assets/pages/berita/lets-icons_date-fill.png" alt="" aria-hidden="true" />{news.date}</span><span className="inline-flex items-center gap-1.5"><img className="size-4 object-contain" src={`${detailAssets}/icon-park-solid_people.png`} alt="" aria-hidden="true" />Jurnalistik SMK Negeri 26 Jakarta</span><span className="inline-flex items-center gap-1.5"><img className="size-4 object-contain" src={`${detailAssets}/IShow (1).png`} alt="" aria-hidden="true" />1000 Dilihat</span></div>
        </div><img className="detail-shape detail-shape-small absolute right-[10%] top-35" src={`${detailAssets}/shapeataskecil.png`} alt="" aria-hidden="true" /><img className="detail-shape detail-shape-large absolute right-[15%] bottom-8" src={`${detailAssets}/shapebawahbesar.png`} alt="" aria-hidden="true" />
      </header>
      <div className="mx-auto grid w-[min(1170px,100%-32px)] gap-12 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1.15fr)]">
        <article>
          <img className="h-[280px] w-full rounded-2xl object-cover sm:h-[390px]" src={workshop ? `${detailAssets}/Workshop.png` : news.image} alt={news.title} />
          <div className="mt-7 space-y-6 text-[15px] leading-7 text-[#53698e]"><p>{news.description} Kegiatan ini menjadi bagian dari upaya sekolah mempersiapkan generasi yang kompeten, percaya diri, dan siap menghadapi dunia kerja.</p><p>Dalam kegiatan ini, siswa mendapatkan materi dan pengalaman yang relevan melalui sesi interaktif, diskusi, serta praktik. Peserta juga diajak untuk mengembangkan kemampuan bekerja sama dan berkomunikasi dalam berbagai situasi.</p><p>Kegiatan diharapkan dapat memberikan bekal penting bagi siswa untuk terus berkembang dan memberikan kontribusi positif di masa depan.</p></div>
          <blockquote className="mt-7 rounded-2xl border-l-4 border-primary bg-[#f1f7ff] p-5 font-medium italic leading-7 text-[#53698e]">“Soft skill menjadi bekal penting bagi siswa untuk sukses di masa depan. Kami berharap kegiatan ini memberikan pengalaman yang bermanfaat.”<footer className="mt-3 not-italic">— Kepala SMKN 26 Jakarta</footer></blockquote>
          <h2 className="mt-9 text-2xl font-bold">Dokumentasi <span className="text-primary">Kegiatan</span></h2><div className="mt-4 grid grid-cols-3 gap-4">{["Frame 36467.png","IShow (1).png","Workshop.png"].map((asset) => <img key={asset} className="h-24 w-full rounded-xl object-cover" src={`${detailAssets}/${asset}`} alt="Dokumentasi kegiatan" />)}</div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs"><strong>▣ &nbsp;Tag</strong>{["Workshop","Softskill","Siswa","Pengembangan Diri","Kegiatan Sekolah"].map((tag) => <span className="rounded bg-[#f1f7ff] px-3 py-2 text-[#53698e]" key={tag}>{tag}</span>)}</div>
        </article>
        <aside><div className="overflow-hidden rounded-2xl border border-[#dcecf7]"><h2 className="bg-gradient-to-r from-primary-dark to-primary p-3 text-center text-sm font-bold text-white">Informasi Berita</h2><dl className="divide-y divide-[#e8f0f8] p-2 text-xs">{[["Kategori",news.category],["Tanggal Publikasi",news.date],["Penulis","Jurnalistik SMK Negeri 26 Jakarta"],["Jumlah Dilihat","1000 kali"],["Waktu Baca","3 Menit"],["Topik","Soft Skill & Pengembangan Diri"]].map(([label,value]) => <div className="flex justify-between gap-4 px-3 py-3" key={label}><dt className="text-[#53698e]">{label}</dt><dd className="text-right font-medium">{value}</dd></div>)}</dl></div><h2 className="mt-8 mb-3 font-bold">Berita Terkait</h2><div className="grid gap-4">{related.map((item) => <NewsCard key={item.slug} news={item} variant="homepage" />)}</div></aside>
      </div>
      <section className="bg-[#f3f8ff] px-4 py-10 sm:px-8 lg:px-[7.3%]"><div className="mx-auto max-w-[1170px]"><h2 className="text-2xl font-bold"><span className="text-primary">Berita</span> Lainnya</h2><div className="mt-5 grid justify-items-center gap-6 md:grid-cols-3">{related.map((item) => <NewsCard key={item.slug} news={item} variant="homepage" />)}</div></div></section>
    </main><PublicFooter /></div>;
}
