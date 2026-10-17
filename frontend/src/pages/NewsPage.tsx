import { useMemo, useState } from "react";
import { figmaAssets } from "../assets/figmaAssets";
import { newsItems } from "../data/news";
import { NewsCard } from "../components/public/NewsCard";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const categories = ["Semua", "Prestasi", "Kegiatan Sekolah", "Pengumuman", "Kemitraan & Kerja Sama", "Karya & Inovasi Siswa", "Artikel & Edukasi", "Alumni"] as const;

function categoryMatches(category: string, filter: string) {
  if (filter === "Semua") return true;
  if (filter === "Kegiatan Sekolah") return category === "Kegiatan" || category === filter;
  if (filter === "Karya & Inovasi Siswa") return category === "Karya & Inovasi" || category === filter;
  return category === filter;
}

export function NewsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Semua");
  const filteredNews = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return newsItems.filter((news) => categoryMatches(news.category, activeCategory) && (!normalized || `${news.title} ${news.category} ${news.description}`.toLocaleLowerCase().includes(normalized)));
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-ink">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[590px] overflow-hidden bg-[#d8edff] text-white md:min-h-[610px]">
          <img className="absolute inset-0 size-full object-cover object-center" src={figmaAssets.hero.schoolBuilding} alt="Gedung SMK Negeri 26 Jakarta" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/50 via-primary/35 to-primary/35" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/60 to-transparent" />
          <div className="relative z-10 mx-auto flex min-h-[520px] w-[min(100%-32px,1100px)] flex-col items-center justify-center px-2 pt-24 text-center sm:px-5">
            <span data-aos="fade-down" className="flex items-center gap-1 rounded-full bg-[#f5faff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-sm"><span className="size-2 rounded-full bg-soft-blue ring-1 ring-primary/25" />BERITA SMK NEGERI 26 JAKARTA</span>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-5 max-w-[850px] text-4xl font-bold leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,.12)] sm:text-5xl md:text-[52px]">Informasi Terkini &amp; Cerita dari<br className="hidden sm:block" /> SMK Negeri 26 Jakarta</h1>
            <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[720px] text-base leading-7 drop-shadow-[0_4px_8px_rgba(0,0,0,.12)] sm:text-lg">Ikuti informasi, prestasi, kegiatan, dan berbagai karya inspiratif dari keluarga besar SMK Negeri 26 Jakarta.</p>
          </div>
          <form data-aos="fade-up" data-aos-delay="260" role="search" onSubmit={(event) => event.preventDefault()} className="group absolute bottom-12 left-1/2 z-20 flex h-12 w-[calc(100%-32px)] max-w-[840px] -translate-x-1/2 items-center rounded-full border-2 border-[#e5e7eb] bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 text-sm text-white transition-colors hover:border-primary-dark hover:bg-white hover:bg-none hover:text-primary focus-within:border-primary-dark focus-within:bg-white focus-within:bg-none focus-within:text-primary">
            <label className="sr-only" htmlFor="news-search">Cari berita</label>
            <input id="news-search" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white group-hover:text-primary group-hover:placeholder:text-primary group-focus-within:text-primary group-focus-within:placeholder:text-primary" placeholder="Cari berita, kegiatan, atau informasi..." />
            <button type="submit" aria-label="Cari" className="grid size-7 shrink-0 place-items-center rounded-full bg-white"><img className="size-4" src={figmaAssets.icons.search} alt="" /></button>
          </form>
        </section>
        <section className="mx-auto w-[min(1248px,100%-32px)] py-10 sm:py-14">
          <div data-aos="fade-up" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
             {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-xl text-sm font-medium transition-colors ${activeCategory === category ? "border-0 bg-gradient-to-r from-[#4cbaf5] via-[#0092ff] to-[#006cdc] px-[21px] py-[11px] text-white shadow-[0_4px_12px_rgba(0,146,255,.18)]" : "border px-5 py-2.5 border-[#e5edf8] bg-white text-[#61708b] hover:border-primary hover:text-primary"}`}>{category}</button>)}
          </div>
           {filteredNews.length ? <div className="mt-4 grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">{filteredNews.map((news, index) => <NewsCard key={news.slug} news={news} variant="homepage" aosDelay={Math.min(index * 80, 400)} />)}</div> : <div className="mt-8 rounded-3xl border border-school-bg bg-white px-7 py-14 text-center"><strong className="block text-lg">Berita belum ditemukan</strong><p className="mt-2 text-sm text-muted">Coba gunakan kata kunci atau kategori lain.</p></div>}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}





