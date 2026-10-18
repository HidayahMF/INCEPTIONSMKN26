import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { NewsCard } from "../components/public/NewsCard";
import { newsItems } from "../data/news";
import { figmaAssets } from "../assets/figmaAssets";

const detailAssets = "/assets/pages/berita/isiberita";
const workshopDocs = `${detailAssets}/dokumentasikegiatanworkshop`;
const achievementDocs = `${detailAssets}/dokumentasikegiatanprestasi`;
const collaborationDocs = `${detailAssets}/dokumentasikegiatankolaborasi`;
const alumniDocs = `${detailAssets}/dokumentasikegiatanalumni`;
const innovationDocs = `${detailAssets}/dokumentasikegiataninovatif`;

const detailContent: Record<string, string[]> = {
  "workshop-pengembangan-soft-skill-siswa": [
    "SMKN 26 Jakarta mengadakan workshop pengembangan soft skill untuk seluruh siswa sebagai bagian dari upaya mempersiapkan generasi yang tidak hanya kompeten secara teknis, tetapi juga memiliki keterampilan interpersonal yang kuat. Kegiatan ini berlangsung pada 26 September 2026 di Aula SMKN 26 Jakarta dengan menghadirkan narasumber dari praktisi industri dan bidang pengembangan diri.",
    "Dalam workshop ini, siswa mendapatkan materi mengenai komunikasi efektif, kerja sama tim, kepemimpinan, manajemen waktu, serta cara menghadapi tantangan di lingkungan kerja. Melalui berbagai sesi interaktif seperti diskusi kelompok, studi kasus, dan simulasi, siswa diajak untuk lebih aktif berpartisipasi dan mengembangkan potensi diri.",
    "Kegiatan ini diharapkan dapat memberikan bekal penting bagi siswa dalam menghadapi dunia industri maupun pendidikan lanjut, serta membentuk karakter yang adaptif, percaya diri, dan mampu bekerja sama dalam berbagai situasi.",
  ],
  "informasi-terbaru-untuk-warga-sekolah": [
    "SMKN 26 Jakarta menyediakan informasi sekolah sebagai sarana bagi siswa, guru, tenaga kependidikan, dan orang tua untuk mengikuti perkembangan kegiatan serta layanan pendidikan.",
    "Melalui penyampaian informasi yang terstruktur, warga sekolah dapat memperoleh referensi mengenai agenda sekolah, kegiatan pembelajaran, layanan administrasi, serta berbagai pemberitahuan yang perlu diperhatikan.",
    "Warga sekolah diimbau untuk membaca setiap informasi dengan saksama, memperhatikan tanggal publikasi, dan mengikuti petunjuk yang tercantum apabila terdapat persyaratan atau tindakan yang perlu dilakukan.",
    "Untuk mengakses layanan dan informasi tertentu, pengguna juga dapat memanfaatkan portal sekolah yang tersedia, seperti SIMAK 26 dan Perpustakaan 26, serta memeriksa informasi SPMB, KJP, dan PIP sesuai kebutuhan.",
    "Pastikan untuk mengutamakan kanal resmi sekolah agar informasi yang diterima lebih jelas dan dapat dipertanggungjawabkan. Tetap terhubung dengan informasi SMKN 26 Jakarta untuk mengikuti perkembangan kegiatan dan layanan sekolah.",
  ],
  "siswa-smkn-26-raih-prestasi-di-lks": [
    "Prestasi merupakan salah satu bentuk pencapaian dari proses belajar, latihan, dan pengembangan kompetensi siswa. Melalui ajang Lomba Kompetensi Siswa (LKS), peserta didik sekolah vokasi memiliki kesempatan untuk menunjukkan keterampilan sesuai bidang keahlian yang ditekuni.",
    "Persiapan menghadapi kompetisi membutuhkan kedisiplinan, ketelitian, serta bimbingan yang berkelanjutan. Siswa perlu menguasai keterampilan teknis sekaligus mampu menyelesaikan tantangan sesuai standar dan ketentuan perlombaan.",
    "Pengalaman mengikuti kompetisi juga menjadi ruang belajar yang berharga. Siswa dapat mengukur kemampuan diri, memperoleh pengalaman baru, dan memahami pentingnya kesiapan dalam menghadapi tantangan dunia industri.",
    "Pencapaian dalam ajang kompetisi diharapkan dapat menjadi motivasi bagi seluruh siswa SMKN 26 Jakarta untuk terus mengembangkan potensi, menghasilkan karya berkualitas, dan berani mengambil kesempatan untuk berprestasi.",
    "Bagi siswa lainnya, perjalanan menuju prestasi dapat dimulai dari hal sederhana: tekun berlatih, aktif mengikuti kegiatan sesuai bidang keahlian, dan terus terbuka untuk belajar. Terus berkarya, kembangkan kompetensi, dan jadikan setiap pengalaman sebagai langkah menuju masa depan.",
  ],
  "kolaborasi-smkn-26-dengan-dunia-industri": [
    "Hubungan antara pendidikan vokasi dan dunia industri memiliki peran penting dalam mempersiapkan siswa menghadapi kebutuhan dunia kerja. Melalui kolaborasi yang relevan, proses pembelajaran dapat terus dikembangkan agar selaras dengan perkembangan teknologi, standar profesional, dan kebutuhan kompetensi di lapangan.",
    "Sebagai sekolah yang berfokus pada pendidikan kejuruan, SMK Negeri 26 Jakarta menempatkan keterhubungan dengan dunia industri sebagai salah satu aspek penting dalam pengembangan kompetensi peserta didik.",
    "Kolaborasi sekolah dan industri dapat diwujudkan melalui berbagai bentuk kegiatan, seperti praktik kerja lapangan (PKL), pengenalan lingkungan kerja, pembelajaran bersama praktisi, pengembangan kompetensi, serta informasi peluang karier bagi siswa dan lulusan.",
    "Pengalaman tersebut membantu siswa memahami bagaimana keterampilan yang dipelajari di sekolah diterapkan dalam situasi profesional. Selain meningkatkan kemampuan teknis, siswa juga dapat mengembangkan kedisiplinan, komunikasi, tanggung jawab, dan kemampuan beradaptasi.",
    "Melalui hubungan yang berkelanjutan antara sekolah dan dunia industri, pendidikan vokasi diharapkan mampu membuka lebih banyak kesempatan belajar dan mempersiapkan lulusan yang kompeten serta siap menghadapi tantangan masa depan. Membangun kompetensi hari ini, mempersiapkan peluang masa depan.",
  ],
  "karya-inovatif-berbasis-teknologi": [
    "Perkembangan teknologi membuka peluang bagi siswa untuk menciptakan karya yang kreatif dan bermanfaat. Melalui pembelajaran berbasis proyek, siswa SMKN 26 Jakarta dapat mengembangkan ide sekaligus menerapkan keterampilan sesuai bidang keahlian masing-masing.",
    "Proses pengembangan karya melatih siswa untuk berpikir kritis, memecahkan masalah, bekerja sama, dan memahami penerapan teknologi dalam kehidupan sehari-hari maupun dunia industri.",
    "Selain memperkuat kompetensi teknis, kegiatan ini juga mendorong siswa untuk berani bereksperimen, mengevaluasi hasil, dan terus menyempurnakan solusi yang dikembangkan.",
    "Melalui semangat inovasi, siswa diharapkan mampu menghasilkan karya yang relevan dengan kebutuhan masyarakat serta menjadi bekal untuk menghadapi tantangan masa depan. Dari ide menjadi inovasi, dari keterampilan menjadi solusi nyata.",
  ],
};

const detailQuotes: Record<string, string> = {
  "workshop-pengembangan-soft-skill-siswa": "Soft skill menjadi bekal penting bagi siswa untuk sukses di masa depan. Kami berharap workshop ini dapat memberikan pengalaman yang bermanfaat dan memotivasi siswa untuk terus berkembang.",
  "informasi-terbaru-untuk-warga-sekolah": "Pastikan kamu memperoleh informasi dari kanal resmi sekolah dan membaca setiap pengumuman dengan teliti agar tidak melewatkan informasi penting.",
  "siswa-smkn-26-raih-prestasi-di-lks": "Prestasi bukan hanya tentang hasil yang diraih, tetapi juga tentang proses belajar, kedisiplinan, dan keberanian untuk terus berkembang.",
  "kolaborasi-smkn-26-dengan-dunia-industri": "Pendidikan vokasi menjadi semakin relevan ketika kompetensi yang dipelajari di sekolah dapat terhubung dengan kebutuhan dan perkembangan dunia industri.",
  "karya-inovatif-berbasis-teknologi": "Inovasi dimulai dari rasa ingin tahu, dikembangkan melalui proses belajar, dan diwujudkan menjadi solusi yang bermanfaat.",
  "alumni-berprestasi-inspirasi-generasi": "Perjalanan tidak berhenti saat kelulusan. Ilmu, keterampilan, dan pengalaman yang diperoleh menjadi bekal untuk terus berkembang dan menciptakan peluang baru.",
};

export function NewsDetailPage({ slug }: { slug: string }) {
  const news = newsItems.find((item) => item.slug === slug) ?? newsItems[0];
  const workshop = slug === "workshop-pengembangan-soft-skill-siswa";
  const information = slug === "informasi-terbaru-untuk-warga-sekolah";
  const achievement = slug === "siswa-smkn-26-raih-prestasi-di-lks";
  const collaboration = slug === "kolaborasi-smkn-26-dengan-dunia-industri";
  const alumni = slug === "alumni-berprestasi-inspirasi-generasi";
  const innovation = slug === "karya-inovatif-berbasis-teknologi";
  const related = (workshop
    ? ["kolaborasi-smkn-26-dengan-dunia-industri", "alumni-berprestasi-inspirasi-generasi", "karya-inovatif-berbasis-teknologi"]
    : information
      ? ["siswa-smkn-26-raih-prestasi-di-lks", "workshop-pengembangan-soft-skill-siswa", "kolaborasi-smkn-26-dengan-dunia-industri"]
      : achievement
        ? ["kolaborasi-smkn-26-dengan-dunia-industri", "karya-inovatif-berbasis-teknologi", "informasi-terbaru-untuk-warga-sekolah"]
        : collaboration
          ? ["karya-inovatif-berbasis-teknologi", "workshop-pengembangan-soft-skill-siswa", "informasi-terbaru-untuk-warga-sekolah"]
        : alumni ? ["siswa-smkn-26-raih-prestasi-di-lks", "workshop-pengembangan-soft-skill-siswa", "karya-inovatif-berbasis-teknologi"]
        : innovation ? ["informasi-terbaru-untuk-warga-sekolah", "siswa-smkn-26-raih-prestasi-di-lks", "alumni-berprestasi-inspirasi-generasi"]
        : newsItems.filter((item) => item.slug !== news.slug).map((item) => item.slug).slice(0, 3)
  ).map((relatedSlug) => newsItems.find((item) => item.slug === relatedSlug)).filter((item): item is (typeof newsItems)[number] => Boolean(item));
  const paragraphs = detailContent[slug] ?? detailContent["kolaborasi-smkn-26-dengan-dunia-industri"];
  const detailImage = {
    "workshop-pengembangan-soft-skill-siswa": "Workshop.png",
    "informasi-terbaru-untuk-warga-sekolah": "informasi.png",
    "siswa-smkn-26-raih-prestasi-di-lks": "prestasi.png",
    "kolaborasi-smkn-26-dengan-dunia-industri": "kolaborasi.png",
    "karya-inovatif-berbasis-teknologi": "inovatif.png",
    "alumni-berprestasi-inspirasi-generasi": "alumni.png",
  }[slug] ?? "Workshop.png";
  // Urutan navigasi mengikuti alur editorial pada desain detail berita, bukan
  // urutan array data (yang dipakai untuk daftar/grid berita).
  const detailOrder = [
    "karya-inovatif-berbasis-teknologi",
    "workshop-pengembangan-soft-skill-siswa",
    "informasi-terbaru-untuk-warga-sekolah",
    "siswa-smkn-26-raih-prestasi-di-lks",
    "kolaborasi-smkn-26-dengan-dunia-industri",
    "alumni-berprestasi-inspirasi-generasi",
  ];
  const currentIndex = detailOrder.indexOf(news.slug);
  const previousSlug = detailOrder[(currentIndex - 1 + detailOrder.length) % detailOrder.length];
  const nextSlug = detailOrder[(currentIndex + 1) % detailOrder.length];
  const previousNews = newsItems.find((item) => item.slug === previousSlug) ?? newsItems[0];
  const nextNews = newsItems.find((item) => item.slug === nextSlug) ?? newsItems[1];

  return <div className="min-h-screen overflow-x-clip bg-white text-ink"><PublicNavbar />
    <main>
      <header className="relative overflow-hidden bg-[#f3f8ff] px-4 pb-10 pt-28 max-md:pb-12 max-md:pt-[128px] sm:px-8 lg:pt-32">
        <div data-aos="fade-up" className="relative z-10 mx-auto w-full max-w-[1170px]"><div className="max-w-[900px] max-md:max-w-full"><span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-sm"><img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />{news.category}</span>
          <h1 className="mt-3 max-w-[850px] text-3xl font-bold leading-[1.18] max-md:text-[28px] max-md:leading-[1.2] sm:text-4xl">{news.title}<br className="hidden sm:block" />{workshop && " SMK Negeri 26 Jakarta"}</h1>
          <p className="mt-3 max-w-[650px] leading-7 text-[#53698e] max-md:mt-4 max-md:text-[15px] max-md:leading-6">{news.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-[#53698e] max-md:mt-7 max-md:flex-col max-md:items-start max-md:gap-3"><span className="inline-flex items-center gap-2"><img className="size-5 object-contain" src="/assets/pages/berita/lets-icons_date-fill.png" alt="" aria-hidden="true" />{news.date}</span><span className="inline-flex items-center gap-2"><img className="size-5 object-contain" src={`${detailAssets}/icon-park-solid_people.png`} alt="" aria-hidden="true" />Jurnalistik SMK Negeri 26 Jakarta</span><span className="inline-flex items-center gap-2"><img className="size-5 object-contain" src={`${detailAssets}/IShow (1).png`} alt="" aria-hidden="true" />1000 Dilihat</span></div>
         </div><img className="detail-shape detail-shape-small absolute right-0 top-5 max-md:hidden" src={`${detailAssets}/shapeataskecil.png`} alt="" aria-hidden="true" /><img className="detail-shape detail-shape-large absolute right-[82px] bottom-0 max-md:hidden" src={`${detailAssets}/shapebawahbesar.png`} alt="" aria-hidden="true" /></div>
      </header>
      <div className="mx-auto grid w-[min(1170px,100%-32px)] gap-12 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1.15fr)]">
        <article>
          <img data-aos="fade-right" data-aos-delay="100" className="h-[280px] w-full rounded-2xl object-cover sm:h-[390px]" src={`${detailAssets}/${detailImage}`} alt={news.title} />
          <div data-aos="fade-up" data-aos-delay="180" className="mt-7 space-y-6 text-[15px] leading-7 text-[#53698e]">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {detailQuotes[slug] && <blockquote data-aos="fade-up" data-aos-delay="260" className="mt-7 rounded-[24px] border-l-[7px] border-[#dceaff] bg-[#f1f6ff] px-5 py-4 text-lg font-semibold italic leading-8 text-[#5b6f95] sm:px-6 sm:py-4">“{detailQuotes[slug]}”<footer className="mt-4 not-italic">— Kepala SMKN 26 Jakarta</footer></blockquote>}
          {(!information || workshop) && <><div data-aos="fade-up" data-aos-delay="320" className="mt-10 flex flex-wrap items-center justify-between gap-5"><h2 className="text-3xl font-bold">Dokumentasi <span className="text-primary">Kegiatan</span></h2><a href={workshop ? "/news/workshop-pengembangan-soft-skill-siswa/dokumentasi" : achievement ? "/news/siswa-smkn-26-raih-prestasi-di-lks/dokumentasi" : collaboration ? "/news/kolaborasi-smkn-26-dengan-dunia-industri/dokumentasi" : alumni ? "/news/alumni-berprestasi-inspirasi-generasi/dokumentasi" : innovation ? "/news/karya-inovatif-berbasis-teknologi/dokumentasi" : "#dokumentasi"} className="group inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none">Lihat Semua <span className="relative inline-flex size-5 shrink-0"><img className="absolute inset-0 size-5 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0" src={figmaAssets.icons.arrowRight} alt="" /><img className="absolute inset-0 size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" src={figmaAssets.secondaryButton.arrowRight} alt="" /></span></a></div><div id="dokumentasi" className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">{(workshop ? ["Dokumentasi Kegiatan.png", "Dokumentasi Kegiatan (1).png", "Dokumentasi Kegiatan (2).png"] : achievement ? ["Dokumentasi Kegiatan (3).png", "Dokumentasi Kegiatan (4).png", "Dokumentasi Kegiatan (5).png"] : collaboration ? ["Dokumentasi Kegiatan (6).png", "Dokumentasi Kegiatan (7).png", "Dokumentasi Kegiatan (8).png"] : alumni ? ["Dokumentasi Kegiatan (9).png", "Dokumentasi Kegiatan (10).png", "Dokumentasi Kegiatan (11).png"] : innovation ? ["Dokumentasi Kegiatan (12).png", "Dokumentasi Kegiatan (13).png", "Dokumentasi Kegiatan (14).png"] : ["Workshop.png", "informasi.png", "kolaborasi.png"]).map((asset) => <img key={asset} className="h-[190px] w-full rounded-[22px] border-4 border-[#edf3fc] object-cover transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,42,.14)]" src={`${workshop ? workshopDocs : achievement ? achievementDocs : collaboration ? collaborationDocs : alumni ? alumniDocs : innovation ? innovationDocs : detailAssets}/${asset}`} alt="Dokumentasi kegiatan" />)}</div></>}
          <div data-aos="fade-up" data-aos-delay="400" className="mt-7 flex flex-wrap items-center gap-2 text-sm"><img className="mr-1 size-8 object-contain" src="/assets/pages/berita/lets-icons_date-fill.png" alt="" aria-hidden="true" /><strong className="mr-2 text-2xl">Tag</strong>{["Workshop","Softskill","Siswa","Pengembangan Diri","Kegiatan Sekolah"].map((tag) => <span className="rounded-xl bg-[#f1f7ff] px-4 py-2.5 text-[#53698e]" key={tag}>{tag}</span>)}</div>
          <div data-aos="fade-up" data-aos-delay="460" className="mt-9 flex flex-wrap items-center gap-5"><strong className="mr-5 text-xl">Bagikan Berita</strong>{["Frame 36467.png","logos_whatsapp-icon.png","selfhst_instagram.png","logos_facebook.png","devicon_twitter.png","logos_linkedin-icon.png"].map((asset) => <a href="#share" key={asset} aria-label="Bagikan berita"><img className="size-9 object-contain" src={`${detailAssets}/${asset}`} alt="" /></a>)}</div>

        </article>
        <aside data-aos="fade-left" data-aos-delay="120"><div className="overflow-hidden rounded-2xl border border-[#dcecf7]"><h2 className="bg-gradient-to-r from-primary-dark to-primary p-3 text-center text-sm font-bold text-white">Informasi Berita</h2><dl className="divide-y divide-[#e8f0f8] p-2 text-xs">{[["kategori.png","Kategori",news.category],["berita.png","Tanggal Publikasi",news.date],["icon-park-solid_people.png","Penulis","Jurnalistik SMK Negeri 26 Jakarta"],["IShow (1).png","Jumlah Dilihat","1000 kali"],["jam.png","Waktu Baca","3 Menit"],["book.png","Topik","Soft Skill & Pengembangan Diri"]].map(([icon,label,value]) => <div className="flex items-center gap-2 px-3 py-3" key={label}><img className="size-5 shrink-0 object-contain" src={`${detailAssets}/${icon}`} alt="" aria-hidden="true" /><dt className="min-w-0 flex-1 text-[#53698e]">{label}</dt><dd className="text-right font-medium">{value}</dd></div>)}</dl></div><h2 className="mt-8 mb-3 flex items-center gap-2 font-bold"><img className="size-6" src={`${detailAssets}/berita.png`} alt="" />Berita Terkait</h2><div className="grid gap-4">{related.map((item) => <a className="group grid min-h-[154px] grid-cols-[123px_1fr] gap-4 rounded-2xl border border-[#dcecf7] p-[14px] no-underline transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_rgba(15,23,42,.12)] focus-visible:outline-2 focus-visible:outline-primary" href={`/news/${item.slug}`} key={item.slug}><img className="h-[123px] w-[123px] rounded-xl object-cover" src={item.image} alt="" /><span className="min-w-0 py-0.5"><small className="inline-block rounded-full bg-gradient-to-r from-[#4cbaf5] via-[#0092ff] to-[#006cdc] px-3 py-1.5 text-xs font-medium text-white">{item.category}</small><strong className="mt-2 block text-[15px] leading-[18px] text-ink">{item.title}</strong><time className="mt-2 flex items-center gap-1 text-[10px] text-muted"><img className="size-5 shrink-0 object-contain" src="/assets/pages/berita/lets-icons_date-fill.png" alt="" aria-hidden="true" />{item.date}</time></span></a>)}</div></aside>
      </div>
      <div className="mx-auto mb-16 w-[min(1170px,100%-32px)]">
          <nav className="mt-16 box-border grid w-full min-w-0 self-stretch min-h-[130px] items-center rounded-[22px] bg-[#f3f7ff] px-4 py-5 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] sm:gap-0 sm:px-7" aria-label="Navigasi berita"><a className="group flex min-w-0 items-center gap-4 text-left no-underline sm:pr-7" href={`/news/${previousNews.slug}`}><span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dcecf7] bg-white text-2xl leading-none text-primary transition-colors group-hover:bg-primary group-hover:text-white">‹</span><span className="min-w-0"><small className="block text-sm text-[#5b6f95]">Berita Sebelumnya</small><strong className="mt-1 block text-lg font-bold leading-6 text-ink">{previousNews.title}</strong><time className="mt-1 block text-sm text-[#5b6f95]">{previousNews.date}</time></span></a><span className="hidden h-16 w-px bg-white sm:block" /><a className="group flex min-w-0 items-center justify-end gap-4 text-right no-underline sm:pl-7" href={`/news/${nextNews.slug}`}><span className="min-w-0"><small className="block text-sm text-[#5b6f95]">Berita Selanjutnya</small><strong className="mt-1 block text-lg font-bold leading-6 text-ink">{nextNews.title}</strong><time className="mt-1 block text-sm text-[#5b6f95]">{nextNews.date}</time></span><span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dcecf7] bg-white text-2xl leading-none text-primary transition-colors group-hover:bg-primary group-focus-visible:bg-primary group-hover:text-white">›</span></a></nav>
      </div>
       <section data-aos="fade-up" className="bg-[#f3f8ff] px-4 py-10 max-md:py-12 sm:px-8 lg:px-[7.3%]"><div className="mx-auto max-w-[1272px]"><div className="flex flex-wrap items-center justify-between gap-4 max-md:items-start max-md:gap-5"><h2 className="text-3xl font-bold max-md:text-[28px]"> <span className="text-primary">Berita</span> Lainnya</h2><a className="group inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none" href="/news">Lihat Semua Berita <span className="relative inline-flex size-5 shrink-0"><img className="absolute inset-0 size-5 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0" src={figmaAssets.icons.arrowRight} alt="" /><img className="absolute inset-0 size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" src={figmaAssets.secondaryButton.arrowRight} alt="" /></span></a></div><div className="mt-5 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">{related.map((item) => <NewsCard key={item.slug} news={item} variant="homepage" />)}</div></div></section>
    </main><PublicFooter /></div>;
}


















