import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { SectionBadge } from "../components/public/SectionBadge";

const base = "/assets/pages/bkk/";
const newsDetailAssets = "/assets/pages/berita/isiberita/";

type BkkOpportunity = {
  heroImage: string;
  heroImageAlt: string;
  title: string;
  company: string;
  heroDescription: string;
  industry: string;
  location: string;
  companyDescription: string;
  companyHighlights: readonly (readonly [string, string, string])[];
  opportunityInfo: readonly (readonly [string, string, string])[];
  position: string;
  positionDescription: string;
  positionImage: string;
  positionImageAlt: string;
  checklist: readonly string[];
  qualifications: readonly string[];
  documents: readonly string[];
};

const mayoraOpportunity: BkkOpportunity = {
  heroImage: `${base}mayora/mayora.png`,
  heroImageAlt: "Gedung PT Mayora Indah Tbk.",
  title: "Program PKL Produksi",
  company: "PT Mayora Indah Tbk.",
  heroDescription: "Perusahaan yang bergerak di bidang industri makanan dan minuman dengan proses produksi, pengemasan, serta pengendalian kualitas produk.",
  industry: "Makanan & Minuman",
  location: "Tangerang, Banten",
  companyDescription: "PT Mayora Indah Tbk. merupakan perusahaan industri makanan dan minuman yang menjalankan berbagai proses manufaktur, mulai dari pengolahan bahan hingga pengemasan produk. Perusahaan ini menjadi salah satu bagian dari industri yang membutuhkan tenaga kerja dengan kompetensi teknis, ketelitian, dan kedisiplinan.",
  companyHighlights: [
    ["Produk Utama", "Makanan dan Minuman", "produkutamaicon.png"],
    ["Lokasi Pabrik", "Tangerang, Banten", "lokasiicon.png"],
    ["Skala Industri", "Nasional & Internasional", "skalaicon.png"],
    ["Bidang Usaha", "Industri Makanan & Minuman", "Button shortcut (4).png"],
  ],
  opportunityInfo: [
    ["Jenis Peluang", "Program PKL", `${newsDetailAssets}berita.png`],
    ["Posisi", "Produksi", "posisiicon.png"],
    ["Jurusan yang Dibutuhkan", "Teknik Pemesinan (TPM)", "jurusanicon.png"],
    ["Lokasi", "Tangerang, Banten", "boxicons_location-filled.png"],
    ["Periode", "Januari 2026 – April 2026", "lets-icons_date-fill.png"],
    ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
  ],
  position: "Produksi",
  positionDescription: "Program PKL ini memperkenalkan siswa pada alur produksi, penggunaan mesin, proses pengemasan, serta pentingnya menjaga kualitas dan kebersihan produk.",
  positionImage: `${base}mayora/mayorapict.png`,
  positionImageAlt: "Pekerja produksi PT Mayora Indah Tbk.",
  checklist: [
    "Mengenal alur proses produksi.",
    "Memahami fungsi mesin dan peralatan produksi.",
    "Mengamati proses pengemasan produk.",
    "Mempelajari pemeriksaan kualitas hasil produksi.",
    "Menerapkan prosedur kebersihan dan keselamatan kerja.",
  ],
  qualifications: [
    "Siswa jurusan yang sesuai dengan kebutuhan program.",
    "Memiliki ketertarikan pada proses produksi.",
    "Teliti, disiplin, dan mampu bekerja sama.",
    "Mematuhi standar kebersihan dan keselamatan kerja.",
    "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
  ],
  documents: [
    "Curriculum Vitae (CV).",
    "Surat pengantar sekolah.",
    "Fotokopi kartu pelajar.",
    "Rapor atau transkrip nilai jika diperlukan.",
    "Dokumen pendukung sesuai ketentuan perusahaan.",
  ],
};

const yamahaOpportunity: BkkOpportunity = {
  heroImage: `${base}yamaha/gedungyamaha.png`,
  heroImageAlt: "Gedung PT Yamaha Indonesia Motor MFG.",
  title: "Operator Produksi",
  company: "PT Yamaha Indonesia Motor MFG",
  heroDescription: "Perusahaan manufaktur otomotif terkemuka di Indonesia yang memproduksi sepeda motor berkualitas untuk pasar global.",
  industry: "Otomotif & Manufaktur",
  location: "Karawang, Jawa Barat",
  companyDescription: "PT Yamaha Indonesia Motor Mfg. merupakan perusahaan manufaktur otomotif yang bergerak di bidang produksi sepeda motor dan komponennya. Perusahaan ini menjadi salah satu bagian dari industri yang membutuhkan tenaga kerja dengan kompetensi teknis, ketelitian, dan kedisiplinan.",
  companyHighlights: [
    ["Produk Utama", "Sepeda Motor", "produkutamaicon.png"],
    ["Lokasi Pabrik", "Karawang, Jawa Barat", "lokasiicon.png"],
    ["Skala Industri", "Nasional & Global", "skalaicon.png"],
    ["Bidang Usaha", "Otomotif & Manufaktur", "Button shortcut (4).png"],
  ],
  opportunityInfo: [
    ["Jenis Peluang", "Rekrutmen", `${newsDetailAssets}berita.png`],
    ["Posisi", "Operator Produksi", "posisiicon.png"],
    ["Jurusan yang Dibutuhkan", "Teknik Pemesinan (TPM), Teknik Kendaraan Ringan (TKR)", "jurusanicon.png"],
    ["Lokasi", "Karawang, Jawa Barat", "boxicons_location-filled.png"],
    ["Periode", "Januari 2026 – April 2026", "lets-icons_date-fill.png"],
    ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
  ],
  position: "Operator Produksi",
  positionDescription: "PT Yamaha Indonesia Motor Mfg. merupakan perusahaan manufaktur otomotif yang bergerak di bidang produksi sepeda motor dan komponennya. Perusahaan ini menjadi salah satu bagian dari industri yang membutuhkan tenaga kerja dengan kompetensi teknis, ketelitian, dan kedisiplinan.",
  positionImage: `${base}yamaha/tentangoperator.png`,
  positionImageAlt: "Operator produksi PT Yamaha Indonesia Motor MFG.",
  checklist: [
    "Mengoperasikan mesin dan peralatan produksi sesuai instruksi kerja.",
    "Melaksanakan proses produksi berdasarkan standar operasional.",
    "Memastikan kualitas produk sesuai ketentuan.",
    "Menjaga kebersihan dan keselamatan area kerja.",
    "Bekerja sama dengan tim untuk mencapai target produksi.",
  ],
  qualifications: [
    "Siswa atau lulusan yang memenuhi kriteria rekrutmen.",
    "Memiliki kedisiplinan dan tanggung jawab.",
    "Mampu bekerja secara teliti dan mengikuti instruksi.",
    "Mampu bekerja sama dalam tim.",
    "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
  ],
  documents: [
    "Curriculum Vitae (CV).",
    "Fotokopi ijazah atau transkrip nilai, jika dipersyaratkan.",
    "Fotokopi KTP atau kartu identitas.",
    "Pas foto terbaru.",
    "Dokumen pendukung lain sesuai ketentuan perusahaan.",
  ],
};

const astraOpportunity: BkkOpportunity = {
  heroImage: `${base}astra/gedungastra.png`,
  heroImageAlt: "Gedung PT Astra International Tbk.",
  title: "Program PKL Teknik Otomotif",
  company: "PT Astra International Tbk.",
  heroDescription: "Perusahaan yang bergerak di bidang otomotif dan berbagai sektor industri, dengan ekosistem bisnis yang luas di Indonesia.",
  industry: "Otomotif & Manufaktur",
  location: "Jakarta Utara",
  companyDescription: "PT Astra International Tbk. merupakan perusahaan yang bergerak di berbagai bidang usaha, termasuk otomotif, jasa keuangan, dan layanan pendukung industri.",
  companyHighlights: [
    ["Produk Utama", "Kendaraan dan layanan otomotif", "produkutamaicon.png"],
    ["Lokasi Kantor", "Jakarta Utara", "lokasiicon.png"],
    ["Skala Industri", "Nasional & Global", "skalaicon.png"],
    ["Bidang Usaha", "Otomotif & Manufaktur", "Button shortcut (4).png"],
  ],
  opportunityInfo: [
    ["Jenis Peluang", "Program PKL", `${newsDetailAssets}berita.png`],
    ["Posisi", "Teknik Otomotif", "posisiicon.png"],
    ["Jurusan yang Dibutuhkan", "Teknik Kendaraan Ringan (TKR)", "jurusanicon.png"],
    ["Lokasi", "Jakarta Utara", "boxicons_location-filled.png"],
    ["Periode", "Januari 2026 – Januari 2027", "lets-icons_date-fill.png"],
    ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
  ],
  position: "Teknik Otomotif",
  positionDescription: "Program PKL ini memberikan pengalaman praktik kepada siswa untuk mengenal proses perawatan kendaraan, penggunaan peralatan kerja, serta penerapan standar keselamatan di lingkungan industri.",
  positionImage: `${base}astra/tentangposisi.png`,
  positionImageAlt: "Siswa melakukan praktik teknik otomotif.",
  checklist: [
    "Mengenal prosedur pemeriksaan dan perawatan kendaraan.",
    "Membantu pekerjaan teknis sesuai arahan pembimbing.",
    "Mengidentifikasi komponen dan sistem kendaraan.",
    "Menerapkan standar keselamatan kerja.",
    "Mengembangkan ketelitian dan kedisiplinan.",
  ],
  qualifications: [
    "Siswa jurusan Teknik Kendaraan Ringan (TKR).",
    "Memiliki minat di bidang otomotif.",
    "Teliti, disiplin, dan bertanggung jawab.",
    "Bersedia mengikuti arahan pembimbing.",
    "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
  ],
  documents: [
    "Curriculum Vitae (CV).",
    "Surat pengantar sekolah.",
    "Fotokopi kartu pelajar.",
    "Rapor atau transkrip nilai jika diperlukan.",
    "Dokumen pendukung sesuai ketentuan perusahaan.",
  ],
};

const azkoOpportunity: BkkOpportunity = {
  heroImage: `${base}azko/Foto Detail BKK (4).png`,
  heroImageAlt: "Gedung AZKO.",
  title: "Program PKL Retail Operations",
  company: "PT AZKO",
  heroDescription: "Perusahaan ritel yang menyediakan berbagai produk kebutuhan rumah tangga dan solusi gaya hidup melalui kegiatan operasional toko.",
  industry: "Retail & Home Living",
  location: "Jakarta Utara",
  companyDescription: "AZKO bergerak di bidang ritel perlengkapan rumah dan gaya hidup. Aktivitas operasionalnya mencakup pengelolaan produk, pelayanan pelanggan, penataan barang, dan pengelolaan persediaan toko.",
  companyHighlights: [
    ["Produk Utama", "Perlengkapan rumah dan gaya hidup", "produkutamaicon.png"],
    ["Lokasi Toko", "Jakarta Utara", "lokasiicon.png"],
    ["Skala Industri", "Ritel", "skalaicon.png"],
    ["Bidang Usaha", "Retail & Home Living", "Button shortcut (4).png"],
  ],
  opportunityInfo: [
    ["Jenis Peluang", "Program PKL", `${newsDetailAssets}berita.png`],
    ["Posisi", "Retail Operations", "posisiicon.png"],
    ["Jurusan yang Dibutuhkan", "Semua Jurusan", "jurusanicon.png"],
    ["Lokasi", "Jakarta Utara", "boxicons_location-filled.png"],
    ["Periode", "Januari 2026 – Oktober 2026", "lets-icons_date-fill.png"],
    ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
  ],
  position: "Retail Operations",
  positionDescription: "Program PKL ini memperkenalkan siswa pada kegiatan operasional toko, mulai dari penataan produk hingga pelayanan pelanggan, sekaligus mengembangkan keterampilan komunikasi dan administrasi.",
  positionImage: `${base}azko/Pict Posisi Pekerjaan (1).png`,
  positionImageAlt: "Pekerja AZKO menata produk di toko.",
  checklist: [
    "Membantu penataan dan pengelompokan produk.",
    "Mengenal pengelolaan stok barang.",
    "Membantu penyampaian informasi produk kepada pelanggan.",
    "Memahami prosedur operasional toko.",
    "Mengembangkan kemampuan komunikasi dan pelayanan.",
  ],
  qualifications: [
    "Siswa dari jurusan yang sesuai dengan program.",
    "Memiliki komunikasi yang baik.",
    "Ramah, teliti, dan bertanggung jawab.",
    "Mampu bekerja sama dalam tim.",
    "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
  ],
  documents: [
    "Curriculum Vitae (CV).",
    "Surat pengantar sekolah.",
    "Fotokopi kartu pelajar.",
    "Rapor atau transkrip nilai jika diperlukan.",
    "Dokumen pendukung sesuai ketentuan perusahaan.",
  ],
};

const gotoOpportunity: BkkOpportunity = {
  heroImage: `${base}goto/Foto Detail BKK (5).png`,
  heroImageAlt: "Gedung GoTo Gojek Tokopedia Tbk.",
  title: "Program PKL IT Support",
  company: "PT GoTo Gojek Tokopedia Tbk.",
  heroDescription: "Perusahaan dalam ekosistem teknologi digital yang menghadirkan berbagai layanan berbasis teknologi dan membutuhkan dukungan sistem serta perangkat IT.",
  industry: "Teknologi Digital",
  location: "Jakarta Selatan",
  companyDescription: "PT GoTo Gojek Tokopedia Tbk. bergerak dalam ekosistem layanan teknologi informasi berperan dalam mendukung operasional sistem, perangkat, dan layanan digital perusahaan.",
  companyHighlights: [
    ["Produk Utama", "Layanan dan ekosistem digital", "produkutamaicon.png"],
    ["Lokasi Kantor", "Jakarta Selatan", "lokasiicon.png"],
    ["Skala Industri", "Nasional", "skalaicon.png"],
    ["Bidang Usaha", "Teknologi Digital", "Button shortcut (4).png"],
  ],
  opportunityInfo: [
    ["Jenis Peluang", "Program PKL", `${newsDetailAssets}berita.png`],
    ["Posisi", "IT Support", "posisiicon.png"],
    ["Jurusan yang Dibutuhkan", "Rekayasa Perangkat Lunak (RPL)", "jurusanicon.png"],
    ["Lokasi", "Jakarta Selatan", "boxicons_location-filled.png"],
    ["Periode", "Januari 2026 – Juni 2026", "lets-icons_date-fill.png"],
    ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
  ],
  position: "IT Support",
  positionDescription: "Posisi IT Support berfokus pada dukungan teknis untuk membantu memastikan perangkat dan sistem teknologi dapat digunakan dengan baik. Peserta dapat mengenal identifikasi masalah, pemeriksaan perangkat, serta dokumentasi kendala teknis.",
  positionImage: `${base}goto/Pict Posisi Pekerjaan (2).png`,
  positionImageAlt: "Peserta melakukan pekerjaan IT Support.",
  checklist: [
    "Membantu pemeriksaan perangkat komputer.",
    "Mengenal proses identifikasi kendala teknis.",
    "Membantu instalasi dan konfigurasi perangkat sesuai arahan.",
    "Mencatat dan mendokumentasikan masalah teknis.",
    "Memahami prosedur keamanan dan pemeliharaan perangkat.",
  ],
  qualifications: [
    "Siswa jurusan RPL atau TJKT.",
    "Memahami dasar perangkat komputer dan sistem operasi.",
    "Memiliki kemampuan pemecahan masalah.",
    "Teliti, komunikatif, dan bertanggung jawab.",
    "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
  ],
  documents: [
    "Curriculum Vitae (CV).",
    "Surat pengantar sekolah.",
    "Fotokopi kartu pelajar.",
    "Rapor atau transkrip nilai jika diperlukan.",
    "Dokumen pendukung sesuai ketentuan perusahaan.",
  ],
};

const telkomOpportunity: BkkOpportunity = {
  heroImage: `${base}telkom/Foto Detail BKK (6).png`,
  heroImageAlt: "Gedung PT Telkom Indonesia (Persero) Tbk.",
  title: "Program PKL CS Support",
  company: "PT Telkom Indonesia (Persero) Tbk.",
  heroDescription: "Perusahaan yang bergerak di bidang telekomunikasi dan teknologi informasi, termasuk layanan konektivitas, infrastruktur jaringan, dan solusi digital.",
  industry: "Telekomunikasi & Teknologi",
  location: "Jakarta Selatan",
  companyDescription: "PT Telkom Indonesia (Persero) Tbk. merupakan perusahaan telekomunikasi yang menyediakan layanan konektivitas dan berbagai solusi teknologi informasi untuk masyarakat maupun bisnis.",
  companyHighlights: [
    ["Produk Utama", "Layanan telekomunikasi dan digital", "produkutamaicon.png"],
    ["Lokasi Kantor", "Jakarta Selatan", "lokasiicon.png"],
    ["Skala Industri", "Nasional", "skalaicon.png"],
    ["Bidang Usaha", "Telekomunikasi & Teknologi", "Button shortcut (4).png"],
  ],
  opportunityInfo: [
    ["Jenis Peluang", "Program PKL", `${newsDetailAssets}berita.png`],
    ["Posisi", "IT Support", "posisiicon.png"],
    ["Jurusan yang Dibutuhkan", "Semua Jurusan", "jurusanicon.png"],
    ["Lokasi", "Jakarta Selatan", "boxicons_location-filled.png"],
    ["Periode", "Januari 2026 – Februari 2027", "lets-icons_date-fill.png"],
    ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
  ],
  position: "CS Support",
  positionDescription: "Posisi Customer Service Support berfokus pada pemberian informasi, penanganan pertanyaan, serta dukungan kebutuhan pelanggan. Peserta dapat mengembangkan keterampilan komunikasi, administrasi, dan pemahaman layanan telekomunikasi.",
  positionImage: `${base}telkom/Pict Posisi Pekerjaan (3).png`,
  positionImageAlt: "Petugas Customer Service Support PT Telkom Indonesia.",
  checklist: [
    "Membantu memberikan informasi terkait layanan.",
    "Mencatat pertanyaan dan kendala pelanggan.",
    "Membantu proses administrasi layanan.",
    "Mempelajari prosedur penanganan keluhan.",
    "Mengembangkan komunikasi profesional dan orientasi pelayanan.",
  ],
  qualifications: [
    "Siswa dari jurusan yang sesuai dengan program.",
    "Memiliki komunikasi lisan dan tulisan yang baik.",
    "Mampu bekerja sama dan melayani dengan ramah.",
    "Teliti dalam pencatatan informasi.",
    "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
  ],
  documents: [
    "Curriculum Vitae (CV).",
    "Surat pengantar sekolah.",
    "Fotokopi kartu pelajar.",
    "Rapor atau transkrip nilai jika diperlukan.",
    "Dokumen pendukung sesuai ketentuan perusahaan.",
  ],
};

function Checks({ items, compact = false }: { items: readonly string[]; compact?: boolean }) {
  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item, index) => (
        <li data-aos="fade-up" data-aos-delay={Math.min(index * 60, 240)} className={`flex items-center gap-2 font-normal text-[#15213a] ${compact ? "whitespace-nowrap text-[11px] leading-5" : "text-base leading-6"}`} key={item}>
          <img className={`${compact ? "size-7" : "size-8"} shrink-0 object-contain`} src={`${base}checklisticon.png`} alt="" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function HighlightCard({
  title,
  description,
  icon,
  singleLine = false,
  aosDelay = 0,
}: {
  title: string;
  description: string;
  icon: string;
  singleLine?: boolean;
  aosDelay?: number;
}) {
  return (
    <div data-aos="fade-up" data-aos-delay={aosDelay} className="flex h-[84px] items-center gap-3 rounded-2xl border border-[#dcecf9] bg-white px-3 py-2.5 shadow-[0_4px_16px_rgba(15,23,42,.04)] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_10px_24px_rgba(15,23,42,.12)] max-md:h-auto max-md:min-h-[84px] sm:px-4">
      <img className="size-11 shrink-0 object-contain" src={`${base}${icon}`} alt="" />
      <div className="min-w-0">
        <strong className="block text-xl font-bold leading-6 text-[#078cf0]">{title}</strong>
        <p className={`mt-1 text-sm font-normal leading-5 text-[#15213a] ${singleLine ? "sm:whitespace-nowrap" : ""}`}>
          {description}
        </p>
      </div>
    </div>
  );
}

export function BkkOpportunityDetailPage({ opportunity: selectedOpportunity = mayoraOpportunity }: { opportunity?: BkkOpportunity | "astra" | "azko" | "goto" | "telkom" | "yamaha" }) {
  const opportunity = selectedOpportunity === "astra"
    ? astraOpportunity
    : selectedOpportunity === "azko"
      ? azkoOpportunity
      : selectedOpportunity === "goto"
        ? gotoOpportunity
        : selectedOpportunity === "telkom"
          ? telkomOpportunity
    : selectedOpportunity === "yamaha"
      ? yamahaOpportunity
      : selectedOpportunity;

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden bg-[#f1f6ff] px-5 pb-10 pt-[122px] max-md:pt-[128px] sm:px-10 md:min-h-[351px] md:pb-14">
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-start gap-7 max-md:gap-10 md:grid-cols-[320px_1fr] lg:gap-8">
              <img
                data-aos="fade-right"
                className="h-[220px] w-full rounded-[18px] border border-white/70 object-cover shadow-sm max-md:h-[200px] md:mt-[55px] md:h-[230px] md:w-[320px]"
              src={opportunity.heroImage}
              alt={opportunity.heroImageAlt}
            />
             <div className="max-w-[700px] max-md:max-w-none md:mt-4">
               <div data-aos="fade-down"><SectionBadge>INFORMASI PELUANG</SectionBadge></div>
                <h1 data-aos="fade-up" data-aos-delay="100" className="mt-3 text-[27px] font-bold leading-tight tracking-[-.02em] max-md:text-[25px] sm:text-4xl">
                 {opportunity.title}
              </h1>
                <h2 data-aos="fade-up" data-aos-delay="140" className="mt-1 text-lg font-semibold sm:text-xl">{opportunity.company}</h2>
                <p data-aos="fade-up" data-aos-delay="180" className="mt-2 max-w-[650px] text-sm leading-5 text-[#596d92] sm:text-base sm:leading-6">
                 {opportunity.heroDescription}
              </p>
                <div className="mt-6 flex flex-wrap gap-x-12 gap-y-4 max-md:flex-col max-md:gap-3">
                 <div data-aos="fade-up" data-aos-delay="240" className="flex items-center gap-2">
                  <img className="size-[38px] object-contain" src={`${base}posisiicon.png`} alt="" />
                  <span>
                    <small className="block text-sm font-normal text-[#71819d]">Industri</small>
                    <strong className="text-xl font-bold text-[#078cf0] max-md:text-base">{opportunity.industry}</strong>
                  </span>
                </div>
                 <div data-aos="fade-up" data-aos-delay="300" className="flex items-center gap-2">
                  <img className="size-[38px] object-contain" src={`${base}boxicons_location-filled.png`} alt="" />
                  <span>
                    <small className="block text-sm font-normal text-[#71819d]">Lokasi</small>
                    <strong className="text-xl font-bold text-[#078cf0] max-md:text-base">{opportunity.location}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span className="detail-shape absolute right-[16%] top-[177px] size-15 rounded-full bg-gradient-to-r from-[#007ce9] to-[#b8eaff] max-md:hidden" aria-hidden="true" />
          <span className="detail-shape detail-shape-large absolute right-[8%] bottom-10 size-[130px] rounded-full bg-gradient-to-r from-[#007ce9] to-[#b8eaff] max-md:hidden" aria-hidden="true" />
        </section>

        <section className="mx-auto grid w-[min(1170px,calc(100%-32px))] gap-12 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1.15fr)]">
          <div>
             <div data-aos="fade-down"><SectionBadge>TENTANG PERUSAHAAN</SectionBadge></div>
             <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-[26px] font-bold leading-tight sm:text-3xl">
               Sekilas <span className="text-[#078cf0]">{opportunity.company}</span>
            </h2>
             <p data-aos="fade-up" data-aos-delay="180" className="mt-2 max-w-[690px] text-sm leading-6 text-[#607292] sm:text-base">
               {opportunity.companyDescription}
            </p>
            <div className="mt-4 grid max-w-[560px] gap-3 sm:grid-cols-2">
               {opportunity.companyHighlights.map(([title, description, icon], index) => (
                <HighlightCard
                  aosDelay={index * 80}
                  description={description}
                  icon={icon}
                  key={title}
                  singleLine={title === "Skala Industri"}
                  title={title}
                />
              ))}
            </div>
          </div>

          <aside>
             <div data-aos="fade-left" className="overflow-hidden rounded-2xl border border-[#dcecf7]">
               <h3 className="flex h-[44px] items-center justify-center bg-gradient-to-r from-primary-dark to-primary px-3 text-xs font-bold text-white">
                Informasi Peluang
              </h3>
              <dl className="divide-y divide-[#e8f0f8] p-1 text-xs">
                  {opportunity.opportunityInfo.map(([label, value, icon], index) => (
                   <div data-aos="fade-left" data-aos-delay={Math.min(index * 60, 240)} className="flex min-h-[42px] items-center gap-2 px-2 py-2" key={label}>
                    <img className="size-[18px] shrink-0 object-contain" src={icon.startsWith("/") ? icon : `${base}${icon}`} alt="" aria-hidden="true" />
                    <dt className="min-w-0 flex-1 leading-4 text-[#53698e]">{label}</dt>
                    <dd className="max-w-[155px] text-right font-medium leading-4 text-[#15213a]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
             <div data-aos="fade-left" data-aos-delay="180" className="mt-3 h-auto rounded-[24px] bg-[#f3f7ff] p-4">
              <div className="flex items-start gap-2">
                <img className="size-10 shrink-0 object-contain" src={`${base}siapmelamanicon.png`} alt="" />
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-5 text-[#078cf0]">Siap Melamar?</h3>
                  <p className="mt-1 text-[10px] font-normal leading-4 text-[#15213a]">
                    Pastikan kamu telah membaca informasi peluang dan memenuhi persyaratan sebelum mengajukan lamaran.
                  </p>
                </div>
              </div>
              <button className="group mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#39aef2] to-[#007ce9] py-2 text-xs font-semibold text-white shadow-[0_3px_7px_rgba(0,124,233,.25)] transition-[background,color,box-shadow] duration-300 hover:bg-white hover:bg-none hover:text-[#007ce9] hover:shadow-none" disabled>
                Daftar / Lamar Sekarang
                <span
                  className="size-4 bg-current"
                  style={{
                    maskImage: `url(${base}majesticons_open.png)`,
                    maskPosition: "center",
                    maskRepeat: "no-repeat",
                    maskSize: "contain",
                    WebkitMaskImage: `url(${base}majesticons_open.png)`,
                    WebkitMaskPosition: "center",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                  }}
                  aria-hidden="true"
                />
              </button>
            </div>
          </aside>
        </section>

        <section className="mx-auto grid items-stretch max-w-[1180px] gap-12 px-5 pb-8 sm:px-10 lg:grid-cols-[1fr_390px]">
          <div>
             <div data-aos="fade-down"><SectionBadge>DESKRIPSI PEKERJAAN</SectionBadge></div>
             <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-4xl font-bold">
               Tentang <span className="text-[#078cf0]">Posisi {opportunity.position}</span>
            </h2>
             <p data-aos="fade-up" data-aos-delay="180" className="mt-3 leading-6 text-[#607292]">
               {opportunity.positionDescription}
            </p>
              <div data-aos="fade-up" data-aos-delay="240" className="mt-6 max-w-[430px] rounded-2xl bg-[#edf5ff] p-5">
              <h3 className="text-xl font-bold leading-6">Ruang Lingkup Pekerjaan</h3>
               <Checks compact items={opportunity.checklist} />
            </div>
          </div>
           <div data-aos="fade-left" className="relative h-[320px] min-h-0 w-full overflow-hidden rounded-2xl lg:h-full">
              <img className="absolute inset-0 size-full object-cover" src={opportunity.positionImage} alt={opportunity.positionImageAlt} />
          </div>
        </section>

        <section className="bg-white px-5 pt-8 pb-16 sm:px-10">
          <div className="mx-auto max-w-[1180px] text-center">
             <div data-aos="fade-down"><SectionBadge>PERSYARATAN</SectionBadge></div>
             <h2 data-aos="fade-up" data-aos-delay="100" className="mt-5 text-3xl font-bold">
              Kualifikasi <span className="text-[#078cf0]">dan Dokumen</span>
            </h2>
             <p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-3 max-w-[650px] text-[#607292]">
              Persyaratan berikut merupakan gambaran umum. Kualifikasi akhir harus mengikuti pengumuman resmi perusahaan.
            </p>
            <div className="mt-7 grid gap-4 text-left md:grid-cols-2">
               <div data-aos="fade-right" data-aos-delay="240" className="rounded-2xl bg-[#edf5ff] p-6">
                <h3 className="text-xl font-bold">Kualifikasi Peserta</h3>
                 <Checks items={opportunity.qualifications} />
              </div>
               <div data-aos="fade-left" data-aos-delay="240" className="rounded-2xl bg-[#edf5ff] p-6">
                <h3 className="text-xl font-bold">Dokumen yang Perlu Disiapkan</h3>
                 <Checks items={opportunity.documents} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
