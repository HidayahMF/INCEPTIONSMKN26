import { useEffect, useState } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type Props = { onAskAi: () => void };
const bludCards = [
  ["KGStudio", "Mengasah keterampilan melalui produksi dan layanan kreatif."],
  ["UPTECHNO", "Mengembangkan solusi teknologi sesuai kebutuhan industri."],
  ["E-MAN", "Menerapkan kompetensi kelistrikan dalam praktik nyata."],
  ["Manufaktur26", "Mengenal proses produksi dan pembuatan komponen manufaktur."],
  ["Garage26", "Praktik langsung dalam perawatan dan perbaikan kendaraan."],
  ["GADIZ VOKASI", "Mengubah kompetensi vokasi menjadi produk dan layanan."],
] as const;
const achievementCards = [
  ["Tim Basket", "Juara 1 kategori student Ciara Student Orienteering 4 - Tingkat nasional", "/assets/figma/achievements/achievements-raw-08.png"],
  ["Tim Futsal", "Juara 1 Kofesse Cup - Tingkat Provinsi", "/assets/figma/achievements/achievements-raw-02.png"],
  ["Paskibra Swabhangun", "Harapan 3 | Juara Make Up 2 | Juara Utama 1 | Variasi Formasi Terbaik", "/assets/figma/achievements/achievements-raw-05.png"],
  ["Tim Pramuka", "Juara Umum 3 Putra | Juara 2 Tari Tradisional Putra - Kwartir JakTim", "/assets/figma/achievements/achievements-raw-06.png"],
  ["Tim Voli", "Juara 2 Galaxy Cup 2025 - Tingkat Wilayah", "/assets/figma/achievements/achievements-raw-07.png"],
] as const;
const newsCards = [
  { category: "Kegiatan", title: "Workshop Pengembangan Soft Skill Siswa", date: "28 September 2026", image: "/assets/figma/news/news-raw-03.png" },
  { category: "Prestasi", title: "Siswa SMKN 26 Raih Prestasi di LKS", date: "20 September 2026", image: "/assets/figma/news/news-raw-04.png" },
  { category: "Kegiatan Sekolah", title: "Workshop Pengembangan Soft Skill Siswa", date: "18 September 2026", image: "/assets/figma/news/news-raw-01.png" },
  { category: "Kemitraan & Kerja Sama", title: "Kolaborasi SMKN 26 dengan Dunia Industri", date: "12 September 2026", image: "/assets/figma/news/news-raw-09.png" },
  { category: "Karya & Inovasi", title: "SMKN 26 Hadirkan Karya Inovatif Berbasis Teknologi", date: "09 September 2026", image: "/assets/figma/news/news-raw-07.png" },
] as const;
const programRightCards = [
  ["Lembaga Sertifikasi Profesi", "Validasi kompetensi, siapkan diri untuk dunia kerja.", "/assets/figma/programs/programs-raw-07.png"],
  ["OSIS & MPK", "Tempat belajar memimpin, berkolaborasi, dan berkontribusi.", "/assets/figma/programs/programs-raw-10.png"],
  ["Bursa Kerja Khusus", "Menghubungkan kompetensi siswa dengan peluang kerja.", "/assets/figma/programs/programs-raw-02.png"],
] as const;
const programPanels = [
  "/assets/figma/programs/programs-raw-04.png",
  "/assets/figma/programs/programs-raw-06.png",
  "/assets/figma/programs/programs-raw-03.png",
] as const;

export function HomepageSections({ onAskAi }: Props) {
  return <>
    <VideoProfileSection />
    <ProgramsSection />
    <BludSection />
    <AchievementsSection />
    <NewsSection />
    <AiCtaSection onAskAi={onAskAi} />
  </>;
}

function VideoProfileSection() {
  const youtubeUrl = "https://www.youtube.com/watch?si=IP1NH2avF07GO1DZ&v=BAWRtymSpNg&feature=youtu.be";
  return <section id="video-profile" className="video-profile" aria-labelledby="video-profile-title">
    <img className="video-profile-decoration-left" src={figmaAssets.videoProfile.decorationLeft} alt="" aria-hidden="true" />
    <img className="video-profile-decoration-right" src={figmaAssets.videoProfile.decorationRight} alt="" aria-hidden="true" />
    <img className="video-profile-lower-shape" src={figmaAssets.videoProfile.lowerShape} alt="" aria-hidden="true" />
    <div className="video-profile-content">
      <span className="video-profile-badge"><img src={figmaAssets.videoProfile.badgeIcon} alt="" />VIDEO PROFILE</span>
      <h2 id="video-profile-title">Kenali SMKN 26 Jakarta lebih Dekat</h2>
      <p>Satu sekolah, banyak cerita, dan langkah nyata untuk belajar, bekerja, dan membangun masa depan.</p>
    </div>
    <div className="video-profile-frame">
      <img className="video-profile-image" src={figmaAssets.videoProfile.preview} alt="Pratinjau video profil SMKN 26 Jakarta" />
      <div className="video-profile-overlay" aria-hidden="true" />
      <a className="video-play" href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Tonton Video Profil SMKN 26 Jakarta di YouTube">
        <span className="video-play-pulse" aria-hidden="true" />
        <img className="video-play-ring" src={figmaAssets.videoProfile.playRing} alt="" />
        <span className="video-play-button"><img src={figmaAssets.videoProfile.playIcon} alt="" /></span>
      </a>
    </div>
  </section>;
}

function ProgramsSection() {
  const [slide, setSlide] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setSlide(true), 800); return () => window.clearTimeout(timer); }, []);
  return <section className="homepage-section programs-section" aria-labelledby="programs-title"><div className="section-intro"><span className="section-badge">Program SMK Negeri 26 Jakarta</span><h2 id="programs-title">Berkembang di Dalam dan <span>di Luar Kelas</span></h2><p>Ruang bagi siswa untuk mengembangkan kompetensi, pengalaman, kepemimpinan, dan potensi melalui berbagai program sekolah.</p></div><div className="program-grid"><article className="program-slider program-feature-card"><div className={`program-panel-track ${slide ? "is-shifted" : ""}`}>{programPanels.map((src, index) => <img key={src} src={src} alt={`Panel ekstrakurikuler ${index + 1}`} />)}</div><div className="program-feature-copy"><h3>Ekstrakurikuler</h3><p>Temukan ruang untuk berkembang sesuai minat dan bakatmu.</p><a className="primary-button" href="/programs">Jelajahi Esktrakurikuler <img src={figmaAssets.icons.arrowRight} alt="" width="20" height="20" /></a></div></article><div className="program-cards">{programRightCards.map(([title, description, image]) => <article className="program-card" key={title}><img src={image} alt="" /><div><span>Program</span><h3>{title}</h3><p>{description}</p></div><a href="/programs" aria-label={`Lihat ${title}`}><img src="/assets/figma/programs/programs-svg-01.svg" alt="" /></a></article>)}</div></div></section>;
}

function BludSection() {
  const defaultShapes = [figmaAssets.blud.defaultShapes.kgs, figmaAssets.blud.defaultShapes.tek, figmaAssets.blud.defaultShapes.titl, figmaAssets.blud.defaultShapes.tflm, figmaAssets.blud.defaultShapes.tkr, figmaAssets.blud.defaultShapes.sija];
  const shadowCards = new Set([0, 2, 3, 4]);
  return <section className="homepage-section blud-section" aria-labelledby="blud-title"><div className="section-intro blud-intro"><span className="section-badge">BELAJAR • BERKARYA • MENGHASILKAN</span><h2 id="blud-title">Belajar Melalui <span>Pengalaman Nyata</span></h2><p>Menghubungkan pembelajaran dengan pengalaman kerja melalui unit produksi dan layanan yang dikelola oleh SMK Negeri 26 Jakarta.</p><a className="blud-cta primary-button" href="/programs">Jelajahi BLUD <img src={figmaAssets.icons.arrowRight} alt="" /></a></div><div className="blud-grid">{bludCards.map(([name, description], index) => <a className={`blud-card ${shadowCards.has(index) ? "has-hover-shadow" : ""}`} href="/blud" key={name}><span className="blud-shape-wrap"><img className="blud-shape blud-default-shape" src={defaultShapes[index]} alt="" /><img className="blud-shape blud-hover-shape" src={figmaAssets.blud.hoverShape} alt="" /></span><span className="blud-icon"><img src={figmaAssets.blud.icons[index]} alt="" /></span><h3>{name}</h3><p>{description}</p></a>)}</div></section>;
}

function AchievementsSection() {
  return <section className="homepage-section achievements-section" aria-labelledby="achievements-title"><div className="section-intro"><span className="section-badge">Prestasi SMK Negeri 26 Jakarta</span><h2 id="achievements-title">Karya dan <span>Prestasi Siswa</span></h2><p>Berbagai pencapaian siswa menjadi bagian dari perjalanan SMK Negeri 26 Jakarta dalam mengembangkan talenta dan potensi generasi muda.</p></div><div className="achievement-carousel"><button type="button" aria-label="Prestasi sebelumnya"><img src="/assets/figma/news/news-svg-02.svg" alt="" /></button><div className="achievement-track">{achievementCards.map(([title, description, src]) => <article className="achievement-card" tabIndex={0} key={src}><img src={src} alt="" /><div className="achievement-card-content"><span>Prestasi</span><h3>{title}</h3><p>{description}</p><a href="/achievements">Lihat Detail <img src={figmaAssets.secondaryButton.arrowRight} alt="" /></a></div></article>)}</div><button type="button" aria-label="Prestasi berikutnya"><img src="/assets/figma/news/news-svg-02.svg" alt="" /></button></div><div className="achievement-stats">{[["100+", "Prestasi", "/assets/figma/achievements/achievements-svg-12.svg"], ["10", "Tingkat Internasional", "/assets/figma/achievements/achievements-svg-03.svg"], ["56", "Tingkat Nasional", "/assets/figma/achievements/achievements-svg-03.svg"], ["24", "Tingkat Provinsi", "/assets/figma/achievements/achievements-svg-03.svg"], ["30", "Tingkat Kota", "/assets/figma/achievements/achievements-svg-03.svg"]].map(([value, label, icon]) => <div key={label}><span className="stat-icon"><img src={icon} alt="" /></span><strong>{value}</strong><p>{label}</p></div>)}</div></section>;
}

function NewsSection() {
  return <section className="homepage-section news-section" aria-labelledby="news-title"><div className="section-intro"><span className="section-badge">Berita SMK Negeri 26 Jakarta</span><h2 id="news-title">Berita &amp; Informasi Terkini<br /><span>SMK Negeri 26 Jakarta</span></h2></div><div className="news-viewport"><div className="news-track">{newsCards.map((card) => <article className="news-card" tabIndex={0} key={card.title + card.date}><img src={card.image} alt="" /><div><span>{card.category}</span><h3>{card.title}</h3><time>{card.date}</time></div></article>)}</div></div><div className="news-controls"><button type="button" aria-label="Berita sebelumnya"><img src="/assets/figma/news/news-svg-02.svg" alt="" /></button><button type="button" aria-label="Berita berikutnya"><img src="/assets/figma/news/news-svg-02.svg" alt="" /></button></div></section>;
}

function AiCtaSection({ onAskAi }: Props) {
  const [botSettled, setBotSettled] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setBotSettled(true), 1); return () => window.clearTimeout(timer); }, []);
  return <section className={`ai-cta ${botSettled ? "is-bot-settled" : ""}`} aria-labelledby="ai-cta-title"><span className="ai-cta-badge">Tanya Pembangunan.AI</span><div className="ai-cta-copy"><h2 id="ai-cta-title">Punya Pertanyaan tentang<br /><span>SMK Negeri 26 Jakarta?</span></h2><p>Temukan informasi tentang jurusan, program sekolah, fasilitas, pendaftaran, hingga berbagai layanan SMK Negeri 26 Jakarta bersama <strong>Pembangunan.AI</strong>.</p><button className="primary-button" type="button" onClick={onAskAi}>Mulai Bertanya <img src={figmaAssets.icons.arrowRight} alt="" /></button></div><span className="ai-circle ai-circle-small" /><span className="ai-circle ai-circle-large" /><div className="ai-cta-art" aria-label="Ilustrasi Pembangunan.AI"><img className="ai-cta-layer ai-cta-fill" src={figmaAssets.aiCtaLayers.fill} alt="" /><img className="ai-cta-layer ai-cta-ring" src={figmaAssets.aiCtaLayers.ring} alt="" /><img className="ai-cta-layer ai-cta-outline" src={figmaAssets.aiCtaLayers.outline} alt="" /><img className="ai-cta-bot" src={figmaAssets.aiCtaLayers.bot} alt="" /></div></section>;
}
