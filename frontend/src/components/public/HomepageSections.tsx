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
  ["Tim Futsal", "Juara 1 Kofesse Cup - Tingkat Provinsi"],
  ["Tim Basket", "Juara 1 kategori student Ciara Student Orienteering 4 - Tingkat nasional"],
  ["Paskibra Swabhangun", "Harapan 3 | Juara Make Up 2 | Juara Utama 1 | Variasi Formasi Terbaik"],
  ["Tim Pramuka", "Juara Umum 3 Putra | Juara 2 Tari Tradisional Putra - Kwartir JakTim"],
  ["Tim Voli", "Juara 2 Galaxy Cup 2025 - Tingkat Wilayah"],
] as const;
const newsCards = [
  ["Kegiatan", "Workshop Pengembangan Soft Skill Siswa", "28 September 2026"],
  ["Prestasi", "Siswa SMKN 26 Raih Prestasi di LKS", "20 September 2026"],
  ["Kegiatan Sekolah", "Workshop Pengembangan Soft Skill Siswa", "18 September 2026"],
  ["Kemitraan & Kerja Sama", "Kolaborasi SMKN 26 dengan Dunia Industri", "12 September 2026"],
  ["Karya & Inovasi", "SMKN 26 Hadirkan Karya Inovatif Berbasis Teknologi", "09 September 2026"],
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
  const [playing, setPlaying] = useState(false);
  return <section id="video-profile" className="video-profile" aria-labelledby="video-profile-title"><div className="video-profile-overlay" /><div className="video-profile-content"><button className={`video-play ${playing ? "is-playing" : ""}`} type="button" aria-label="Putar video profil" onClick={() => setPlaying(true)}><img src={playing ? figmaAssets.videoProfile.playActive : figmaAssets.videoProfile.playIdle} alt="" /></button><h2 id="video-profile-title">Kenali SMKN 26 Jakarta lebih Dekat</h2><p>Satu sekolah, banyak cerita, dan langkah nyata untuk belajar, bekerja, dan membangun masa depan.</p></div></section>;
}

function ProgramsSection() {
  const [slide, setSlide] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setSlide(true), 800); return () => window.clearTimeout(timer); }, []);
  const cards = [["Lembaga Sertifikasi Profesi", "Validasi kompetensi, siapkan diri untuk dunia kerja."], ["OSIS & MPK", "Tempat belajar memimpin, berkolaborasi, dan berkontribusi."], ["Bursa Kerja Khusus", "Menghubungkan kompetensi siswa dengan peluang kerja."]];
  return <section className="homepage-section programs-section" aria-labelledby="programs-title"><div className="section-intro"><span className="section-badge">Program SMK Negeri 26 Jakarta</span><h2 id="programs-title">Berkembang di Dalam dan di Luar Kelas</h2><p>Ruang bagi siswa untuk mengembangkan kompetensi, pengalaman, kepemimpinan, dan potensi melalui berbagai program sekolah.</p></div><div className="program-grid"><article className="program-slider program-feature-card"><div className={`program-panel-track ${slide ? "is-shifted" : ""}`}>{figmaAssets.programs.panels.map((src, index) => <img key={src} src={src} alt={`Panel ekstrakurikuler ${index + 1}`} />)}</div><div className="program-feature-copy"><h3>Ekstrakurikuler</h3><p>Temukan ruang untuk berkembang sesuai minat dan bakatmu.</p><a href="/programs">Jelajahi Esktrakurikuler <span>→</span></a></div></article><div className="program-cards">{cards.map(([title, description], index) => <article className="program-card" key={title}><img src={figmaAssets.programs.cards[index + 3] || figmaAssets.programs.cards[index]} alt="" /><div><span>Program</span><h3>{title}</h3><p>{description}</p></div><a href="/programs" aria-label={`Lihat ${title}`}>↗</a></article>)}</div></div></section>;
}

function BludSection() {
  return <section className="homepage-section blud-section" aria-labelledby="blud-title"><div className="section-intro blud-intro"><span className="section-badge">BELAJAR • BERKARYA • MENGHASILKAN</span><h2 id="blud-title">Belajar Melalui Pengalaman Nyata</h2><p>Menghubungkan pembelajaran dengan pengalaman kerja melalui unit produksi dan layanan yang dikelola oleh SMK Negeri 26 Jakarta.</p><a className="blud-cta" href="/programs">Jelajahi Esktrakurikuler <span>→</span></a></div><div className="blud-grid">{bludCards.map(([name, description], index) => <a className="blud-card" href="/blud" key={name}><img className="blud-shape" src={figmaAssets.blud.shapes[index]} alt="" /><span className="blud-icon"><img src={figmaAssets.blud.icons[index]} alt="" /></span><h3>{name}</h3><p>{description}</p></a>)}</div></section>;
}

function AchievementsSection() {
  return <section className="homepage-section achievements-section" aria-labelledby="achievements-title"><div className="section-intro"><span className="section-badge">Prestasi SMK Negeri 26 Jakarta</span><h2 id="achievements-title">Karya dan Prestasi Siswa</h2><p>Berbagai pencapaian siswa menjadi bagian dari perjalanan SMK Negeri 26 Jakarta dalam mengembangkan talenta dan potensi generasi muda.</p></div><div className="achievement-carousel"><button type="button" aria-label="Prestasi sebelumnya">←</button><div className="achievement-track">{figmaAssets.achievements.slice(0, 5).map((src, index) => <article className="achievement-card" tabIndex={0} key={src}><img src={src} alt="" /><div className="achievement-card-content"><span>Prestasi</span><h3>{achievementCards[index][0]}</h3><p>{achievementCards[index][1]}</p><a href="/achievements">Lihat Detail <span aria-hidden="true">→</span></a></div></article>)}</div><button type="button" aria-label="Prestasi berikutnya">→</button></div><div className="achievement-stats">{[["100+", "Prestasi", "/assets/figma/achievements/achievements-svg-12.svg"], ["10", "Tingkat Internasional", "/assets/figma/achievements/achievements-svg-03.svg"], ["56", "Tingkat Nasional", "/assets/figma/achievements/achievements-svg-03.svg"], ["24", "Tingkat Provinsi", "/assets/figma/achievements/achievements-svg-03.svg"], ["30", "Tingkat Kota", "/assets/figma/achievements/achievements-svg-03.svg"]].map(([value, label, icon]) => <div key={label}><span className="stat-icon"><img src={icon} alt="" /></span><strong>{value}</strong><p>{label}</p></div>)}</div></section>;
}

function NewsSection() {
  return <section className="homepage-section news-section" aria-labelledby="news-title"><div className="section-intro"><span className="section-badge">Berita SMK Negeri 26 Jakarta</span><h2 id="news-title">Berita &amp; Informasi Terkini<br /><span>SMK Negeri 26 Jakarta</span></h2></div><div className="news-viewport"><div className="news-track">{figmaAssets.news.map((src, index) => <article className="news-card" key={src}><img src={src} alt="" /><div><span>{newsCards[index][0]}</span><h3>{newsCards[index][1]}</h3><time>{newsCards[index][2]}</time></div></article>)}</div></div><div className="news-controls"><button type="button" aria-label="Berita sebelumnya">←</button><button type="button" aria-label="Berita berikutnya">→</button></div></section>;
}

function AiCtaSection({ onAskAi }: Props) {
  return <section className="ai-cta" aria-labelledby="ai-cta-title"><div className="ai-cta-copy"><h2 id="ai-cta-title">Punya Pertanyaan tentang<br />SMK Negeri 26 Jakarta?</h2><p>Temukan informasi tentang jurusan, program sekolah, fasilitas, pendaftaran, hingga berbagai layanan SMK Negeri 26 Jakarta bersama <strong>Pembangunan.AI</strong>.</p><button type="button" onClick={onAskAi}>Mulai Bertanya <span>→</span></button></div><span className="ai-circle ai-circle-small" /><span className="ai-circle ai-circle-large" /><div className="ai-cta-art" aria-label="Ilustrasi Pembangunan.AI"><img className="ai-cta-layer ai-cta-fill" src={figmaAssets.aiCtaLayers.fill} alt="" /><img className="ai-cta-layer ai-cta-ring" src={figmaAssets.aiCtaLayers.ring} alt="" /><img className="ai-cta-layer ai-cta-outline" src={figmaAssets.aiCtaLayers.outline} alt="" /><img className="ai-cta-bot" src={figmaAssets.aiCtaLayers.bot} alt="" /></div></section>;
}
