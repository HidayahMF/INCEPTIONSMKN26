import { figmaAssets } from "../../assets/figmaAssets";

const columns = [
  ["Tentang Kami", ["Profil Sekolah", "Struktur & Unit Kerja", "School Tour", "Mitra Industri"]],
  ["Jurusan", ["Konstruksi Gedung & Sanitasi", "Teknik Elektronika & Komunikasi", "Teknik Instalasi Tenaga Listrik", "Teknik Fabrikasi Logam & Manufaktur", "Teknik Kendaraan Ringan", "Sistem Informasi, Jaringan & Aplikasi"]],
  ["Program", ["LSP", "Organisasi Sekolah", "Ekstrakurikuler", "BKK"]],
  ["BLUD", ["KGStudio", "UPTECHNO", "E-MAN", "Manufaktur26", "Garage26", "GADIZ VOKASI"]],
  ["Informasi", ["Berita", "Prestasi", "Portal Informasi", "Pembangunan.AI"]],
] as const;

export function PublicFooter() {
  return <footer className="figma-footer">
    <div className="footer-newsletter">
      <div><p className="footer-eyebrow">Tetap terhubung dengan kami</p><h2>Dapatkan Informasi SMKN 26 Jakarta</h2></div>
      <form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><input aria-label="Email" placeholder="Ketik Email disini..." type="email" /><button type="submit">Kirim</button></form>
    </div>
    <div className="footer-divider" />
    <div className="footer-grid">
      <div className="footer-brand"><img src={figmaAssets.branding.schoolLogo} alt="SMK Negeri 26 Jakarta" /><strong>Belajar, Bekerja, Membangun</strong><p>SMK Negeri 26 Jakarta membentuk generasi yang kompeten, berkarakter, dan siap memasuki dunia kerja.</p><a href="tel:+62214720310">(021) 4720310</a><a href="mailto:smkn26jkt@gmail.com">smkn26jkt@gmail.com</a><address>Jl. Balai Pustaka Baru No. 1, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, DKI Jakarta 13220</address></div>
      {columns.map(([title, links]) => <div className="footer-column" key={title}><h3>{title}</h3>{links.map((link) => <a href={title === "Tentang Kami" && link === "Profil Sekolah" ? "/profile" : title === "Tentang Kami" && link === "School Tour" ? "/tour" : title === "Jurusan" ? "/majors" : "/information"} key={link}>{link}</a>)}</div>)}
    </div>
    <div className="footer-bottom"><span>© SMK Negeri 26 Jakarta</span><span>Belajar, Bekerja, Membangun</span><div id="footer-social" className="footer-social"><a href="#footer-social" aria-label="Instagram">Instagram</a><a href="#footer-social" aria-label="WhatsApp">WhatsApp</a></div></div>
  </footer>;
}
