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
      <h2>Dapatkan Informasi<br />SMKN 26 Jakarta</h2>
      <form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><input aria-label="Email" placeholder="Ketik Email disini..." type="email" /><button type="submit">Kirim</button></form>
      <div className="footer-top-social"><a href="#footer-social" aria-label="Instagram"><img src="/assets/figma/footer/footer-svg-07.svg" alt="" /></a><a href="#footer-social" aria-label="WhatsApp"><img src="/assets/figma/footer/footer-svg-03.svg" alt="" /></a></div>
    </div>
    <div className="footer-divider" />
    <div className="footer-grid">
      <div className="footer-brand"><img src={figmaAssets.branding.schoolLogo} alt="SMK Negeri 26 Jakarta" /><strong>Belajar, Bekerja, Membangun</strong><p>Membentuk generasi yang kompeten melalui pembelajaran vokasi, pengalaman nyata, dan semangat untuk terus berkarya serta membangun masa depan.</p><a href="tel:+62214720310">☎ (021) 4720310</a><a href="mailto:smkn26jkt@gmail.com">✉ smkn26jkt@gmail.com</a><address>⌖ Jl. Balai Pustaka Baru No. 1, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, DKI Jakarta 13220</address></div>
      <div className="footer-columns">{columns.map(([title, links]) => <div className="footer-column" key={title}><h3>{title}</h3>{links.map((link) => <a href={title === "Tentang Kami" && link === "Profil Sekolah" ? "/profile" : title === "Tentang Kami" && link === "School Tour" ? "/tour" : title === "Jurusan" ? "/majors" : "/information"} key={link}>{link}</a>)}</div>)}</div>
      <div className="footer-map"><h3>Lokasi Sekolah</h3><img src="/assets/figma/footer/footer-raw-02.png" alt="Peta lokasi SMK Negeri 26 Jakarta" /></div>
    </div>
    <div className="footer-bottom"><span>© 2026 SMKN 26 Jakarta. Semua Hak Dilindungi.</span></div>
  </footer>;
}
