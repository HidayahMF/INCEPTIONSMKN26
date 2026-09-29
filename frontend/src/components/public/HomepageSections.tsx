import { useEffect, useState } from "react";
import { figmaAssets } from "../../assets/figmaAssets";

type Props = { onAskAi: () => void };
const bludNames = ["KGStudio", "UPTECHNO", "E-MAN", "Manufaktur26", "Garage26", "GADIZ VOKASI"];
const achievementTitles = ["Kompetensi dan karya siswa", "Juara kompetensi keahlian", "Inovasi untuk masa depan", "Prestasi tingkat nasional", "Kolaborasi dan dedikasi"];
const newsTitles = ["Pengumuman", "Prestasi", "Kegiatan", "Kemitraan", "Karya"];

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
  return <section className="video-profile" aria-labelledby="video-profile-title"><div className="video-profile-overlay" /><div className="video-profile-content"><span className="section-badge">Video Profil</span><h2 id="video-profile-title">Kenali SMKN 26 Jakarta Lebih Dekat</h2><p>Melihat lebih dekat lingkungan belajar, karya, dan semangat warga SMKN 26 Jakarta.</p><button className={`video-play ${playing ? "is-playing" : ""}`} type="button" aria-label="Putar video profil" onClick={() => setPlaying(true)}><img src={playing ? figmaAssets.videoProfile.playActive : figmaAssets.videoProfile.playIdle} alt="" /></button></div></section>;
}

function ProgramsSection() {
  const [slide, setSlide] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setSlide(true), 800); return () => window.clearTimeout(timer); }, []);
  const cards = ["LSP", "Organisasi Sekolah", "Ekstrakurikuler"];
  return <section className="homepage-section programs-section" aria-labelledby="programs-title"><div className="section-intro"><span className="section-badge">Program SMK</span><h2 id="programs-title">Program untuk Mendukung <span>Masa Depanmu</span></h2><p>Beragam program dirancang untuk mengembangkan kompetensi, karakter, dan pengalaman siswa.</p></div><div className="program-grid"><div className="program-slider"><div className={`program-panel-track ${slide ? "is-shifted" : ""}`}>{figmaAssets.programs.panels.map((src, index) => <img key={src} src={src} alt={`Panel program ${index + 1}`} />)}</div></div><div className="program-cards">{cards.map((title, index) => <article className="program-card" key={title}><img src={figmaAssets.programs.cards[index]} alt="" /><div><span>Program</span><h3>{title}</h3></div><a href="/programs" aria-label={`Lihat ${title}`}>↗</a></article>)}</div></div></section>;
}

function BludSection() {
  return <section className="homepage-section blud-section" aria-labelledby="blud-title"><div className="section-intro"><span className="section-badge">BLUD SMK</span><h2 id="blud-title">Belajar melalui <span>Teaching Factory</span></h2><p>Unit produksi dan layanan SMKN 26 Jakarta menjadi ruang belajar yang dekat dengan dunia kerja.</p></div><div className="blud-grid">{bludNames.map((name, index) => <a className="blud-card" href="/blud" key={name}>{figmaAssets.blud.shapes[index] && <img className="blud-shape" src={figmaAssets.blud.shapes[index]} alt="" />}<span className="blud-icon"><img src={figmaAssets.blud.icons[index]} alt="" /></span><h3>{name}</h3><p>Unit layanan dan pembelajaran vokasi SMKN 26 Jakarta.</p><span className="card-arrow">↗</span></a>)}</div></section>;
}

function AchievementsSection() {
  return <section className="homepage-section achievements-section" aria-labelledby="achievements-title"><div className="section-intro"><span className="section-badge">Prestasi SMK</span><h2 id="achievements-title">Karya dan Prestasi <span>Warga Sekolah</span></h2></div><div className="achievement-track">{figmaAssets.achievements.map((src, index) => <article className="achievement-card" key={src}><img src={src} alt="" /><div><span>Prestasi</span><h3>{achievementTitles[index]}</h3></div></article>)}</div><div className="achievement-stats"><strong>1750<span>+</span></strong><p>Siswa aktif yang terus bertumbuh melalui pembelajaran dan pengalaman nyata.</p><strong>50<span>+</span></strong><p>Mitra dan kolaborasi untuk memperluas pengalaman belajar.</p><button type="button" aria-label="Prestasi berikutnya">→</button></div></section>;
}

function NewsSection() {
  return <section className="homepage-section news-section" aria-labelledby="news-title"><div className="section-intro"><span className="section-badge">Berita SMK</span><h2 id="news-title">Cerita Terbaru dari <span>SMKN 26 Jakarta</span></h2></div><div className="news-viewport"><div className="news-track">{figmaAssets.news.map((src, index) => <article className="news-card" key={src}><img src={src} alt="" /><div><span>{newsTitles[index]}</span><h3>{newsTitles[index]} SMKN 26 Jakarta</h3><p>Informasi dan kabar terbaru sekolah.</p></div></article>)}</div></div><div className="news-controls"><button type="button" aria-label="Berita sebelumnya">←</button><button type="button" aria-label="Berita berikutnya">→</button></div></section>;
}

function AiCtaSection({ onAskAi }: Props) {
  return <section className="ai-cta" aria-labelledby="ai-cta-title"><div className="ai-cta-copy"><span className="section-badge">Pembangunan.AI</span><h2 id="ai-cta-title">Punya Pertanyaan tentang SMK Negeri 26 Jakarta?</h2><p>Tanyakan apa saja tentang sekolah kepada asisten informasi kami.</p><button type="button" onClick={onAskAi}>Tanya AI <span>→</span></button></div><img className="ai-cta-art" src={figmaAssets.aiCta} alt="Ilustrasi Tanya AI" /></section>;
}
