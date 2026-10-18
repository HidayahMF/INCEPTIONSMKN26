import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { SectionBadge } from "../components/public/SectionBadge";

const base = "/assets/pages/bkk/";
const newsDetailAssets = "/assets/pages/berita/isiberita/";

const checklist = [
  "Mengenal alur proses produksi.",
  "Memahami fungsi mesin dan peralatan produksi.",
  "Mengamati proses pengemasan produk.",
  "Mempelajari pemeriksaan kualitas hasil produksi.",
  "Menerapkan prosedur kebersihan dan keselamatan kerja.",
];

const qualifications = [
  "Siswa jurusan yang sesuai dengan kebutuhan program.",
  "Memiliki ketertarikan pada proses produksi.",
  "Teliti, disiplin, dan mampu bekerja sama.",
  "Mematuhi standar kebersihan dan keselamatan kerja.",
  "Bersedia mengikuti ketentuan dan proses seleksi perusahaan.",
];

const documents = [
  "Curriculum Vitae (CV).",
  "Surat pengantar sekolah.",
  "Fotokopi kartu pelajar.",
  "Rapor atau transkrip nilai jika diperlukan.",
  "Dokumen pendukung sesuai ketentuan perusahaan.",
];

const companyHighlights = [
  ["Produk Utama", "Makanan dan Minuman", "produkutamaicon.png"],
  ["Lokasi Pabrik", "Tangerang, Banten", "lokasiicon.png"],
  ["Skala Industri", "Nasional & Internasional", "skalaicon.png"],
  ["Bidang Usaha", "Industri Makanan & Minuman", "Button shortcut (4).png"],
] as const;

const opportunityInfo = [
  ["Jenis Peluang", "Program PKL", `${newsDetailAssets}berita.png`],
  ["Posisi", "Produksi", "posisiicon.png"],
  ["Jurusan yang Dibutuhkan", "Teknik Pemesinan (TPM)", "jurusanicon.png"],
  ["Lokasi", "Tangerang, Banten", "boxicons_location-filled.png"],
  ["Periode", "Januari 2026 – April 2026", "lets-icons_date-fill.png"],
  ["Batas Pendaftaran", "5 Januari 2026", "mingcute_time-fill.png"],
] as const;

function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item) => (
        <li className="flex items-start gap-2 text-sm leading-5 text-[#15213a]" key={item}>
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#078cf0] text-xs font-bold text-white">
            ✓
          </span>
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
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex min-h-[68px] items-center gap-3 rounded-2xl border border-[#dcecf9] bg-white px-3 py-2.5 sm:px-4">
      <img className="size-10 shrink-0 object-contain" src={`${base}${icon}`} alt="" />
      <div className="min-w-0">
        <strong className="block text-base font-bold leading-5 text-[#078cf0] sm:text-lg">{title}</strong>
        <p className="mt-1 text-xs leading-4 text-[#15213a] sm:text-sm">{description}</p>
      </div>
    </div>
  );
}

export function BkkOpportunityDetailPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative overflow-hidden bg-[#f1f6ff] px-5 pb-10 pt-[122px] sm:px-10 md:min-h-[351px] md:pb-14">
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-start gap-7 md:grid-cols-[320px_1fr] lg:gap-8">
            <img
              className="h-[220px] w-full rounded-[18px] border border-white/70 object-cover shadow-sm md:mt-[70px] md:h-[230px] md:w-[320px]"
              src={`${base}mayora/mayora.png`}
              alt="Gedung PT Mayora Indah Tbk."
            />
            <div className="max-w-[700px] md:mt-8">
              <SectionBadge>INFORMASI PELUANG</SectionBadge>
              <h1 className="mt-3 text-[27px] font-bold leading-tight tracking-[-.02em] sm:text-4xl">
                Program PKL Produksi
              </h1>
              <h2 className="mt-1 text-lg font-semibold sm:text-xl">PT Mayora Indah Tbk.</h2>
              <p className="mt-1 max-w-[650px] text-sm leading-5 text-[#596d92] sm:text-base sm:leading-6">
                Perusahaan yang bergerak di bidang industri makanan dan minuman dengan proses produksi,
                pengemasan, serta pengendalian kualitas produk.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-12 gap-y-3">
                <div className="flex items-center gap-2">
                  <img className="size-[38px] object-contain" src={`${base}posisiicon.png`} alt="" />
                  <span>
                    <small className="block text-sm font-normal text-[#71819d]">Industri</small>
                    <strong className="text-xl font-bold text-[#078cf0]">Makanan &amp; Minuman</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img className="size-[38px] object-contain" src={`${base}boxicons_location-filled.png`} alt="" />
                  <span>
                    <small className="block text-sm font-normal text-[#71819d]">Lokasi</small>
                    <strong className="text-xl font-bold text-[#078cf0]">Tangerang, Banten</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span className="detail-shape absolute right-[16%] top-[195px] size-15 rounded-full bg-gradient-to-r from-[#007ce9] to-[#b8eaff]" aria-hidden="true" />
          <span className="detail-shape detail-shape-large absolute right-[8%] bottom-10 size-[130px] rounded-full bg-gradient-to-r from-[#007ce9] to-[#b8eaff]" aria-hidden="true" />
        </section>

        <section className="mx-auto grid w-[min(1170px,calc(100%-32px))] gap-12 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1.15fr)]">
          <div>
            <SectionBadge>TENTANG PERUSAHAAN</SectionBadge>
            <h2 className="mt-5 text-[26px] font-bold leading-tight sm:text-3xl">
              Sekilas <span className="text-[#078cf0]">PT Mayora Indah Tbk.</span>
            </h2>
            <p className="mt-2 max-w-[690px] text-sm leading-6 text-[#607292] sm:text-base">
              PT Mayora Indah Tbk. merupakan perusahaan industri makanan dan minuman yang menjalankan berbagai
              proses manufaktur, mulai dari pengolahan bahan hingga pengemasan produk. Perusahaan ini menjadi salah
              satu bagian dari industri yang membutuhkan tenaga kerja dengan kompetensi teknis, ketelitian, dan
              kedisiplinan.
            </p>
            <div className="mt-4 grid max-w-[560px] gap-3 sm:grid-cols-2">
              {companyHighlights.map(([title, description, icon]) => (
                <HighlightCard description={description} icon={icon} key={title} title={title} />
              ))}
            </div>
          </div>

          <aside>
            <div className="overflow-hidden rounded-2xl border border-[#dcecf7]">
              <h3 className="bg-gradient-to-r from-primary-dark to-primary p-3 text-center text-sm font-bold text-white">
                Informasi Peluang
              </h3>
              <dl className="divide-y divide-[#e8f0f8] p-2 text-xs">
                {opportunityInfo.map(([label, value, icon]) => (
                  <div className="flex items-center gap-2 px-3 py-3" key={label}>
                    <img className="size-5 shrink-0 object-contain" src={icon.startsWith("/") ? icon : `${base}${icon}`} alt="" aria-hidden="true" />
                    <dt className="min-w-0 flex-1 text-[#53698e]">{label}</dt>
                    <dd className="max-w-[155px] text-right font-medium leading-3 text-[#15213a]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 rounded-2xl bg-[#eef6ff] p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[#078cf0]">
                <img className="size-7 object-contain" src={`${base}siapmelamanicon.png`} alt="" />
                Siap Melamar?
              </h3>
              <p className="mt-1 text-[9px] leading-4 text-[#15213a]">
                Pastikan kamu telah membaca informasi peluang dan memenuhi persyaratan sebelum mengajukan lamaran.
              </p>
              <button className="mt-3 w-full rounded-full bg-gradient-to-r from-[#39aef2] to-[#007ce9] py-2 text-[10px] font-bold text-white" disabled>
                Pendaftaran belum tersedia
              </button>
            </div>
          </aside>
        </section>

        <section className="mx-auto grid max-w-[1180px] gap-12 px-5 pb-16 sm:px-10 lg:grid-cols-[1fr_390px]">
          <div>
            <SectionBadge>DESKRIPSI PEKERJAAN</SectionBadge>
            <h2 className="mt-5 text-3xl font-bold">
              Tentang <span className="text-[#078cf0]">Posisi Produksi</span>
            </h2>
            <p className="mt-3 leading-6 text-[#607292]">
              Program PKL ini memperkenalkan siswa pada alur produksi, penggunaan mesin, proses pengemasan, serta pentingnya menjaga kualitas dan kebersihan produk.
            </p>
            <div className="mt-6 rounded-2xl bg-[#edf5ff] p-6">
              <h3 className="text-xl font-bold">Ruang Lingkup Pekerjaan</h3>
              <Checks items={checklist} />
            </div>
          </div>
          <img className="h-[320px] w-full rounded-2xl object-cover" src={`${base}mayora/mayorapict.png`} alt="Pekerja produksi PT Mayora Indah Tbk." />
        </section>

        <section className="bg-white px-5 py-16 sm:px-10">
          <div className="mx-auto max-w-[1180px] text-center">
            <SectionBadge>PERSYARATAN</SectionBadge>
            <h2 className="mt-5 text-3xl font-bold">
              Kualifikasi <span className="text-[#078cf0]">dan Dokumen</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[650px] text-[#607292]">
              Persyaratan berikut merupakan gambaran umum. Kualifikasi akhir harus mengikuti pengumuman resmi perusahaan.
            </p>
            <div className="mt-7 grid gap-4 text-left md:grid-cols-2">
              <div className="rounded-2xl bg-[#edf5ff] p-6">
                <h3 className="text-xl font-bold">Kualifikasi Peserta</h3>
                <Checks items={qualifications} />
              </div>
              <div className="rounded-2xl bg-[#edf5ff] p-6">
                <h3 className="text-xl font-bold">Dokumen yang Perlu Disiapkan</h3>
                <Checks items={documents} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
