import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { Marquee } from "../components/public/Marquee";
import { partnerLogos } from "../data/partners";
import { figmaAssets } from "../assets/figmaAssets";

const asset = (name: string) => `/assets/figma/BKK/${name}`;

const services = [
  ["Informasi Peluang", "Menyediakan informasi peluang PKL dan rekrutmen yang relevan dengan kompetensi siswa."],
  ["Koneksi Industri", "Menghubungkan siswa dengan mitra industri dan peluang pengembangan karier."],
  ["Persiapan Karier", "Membantu siswa mempersiapkan CV, portofolio, dan kebutuhan sebelum memasuki dunia kerja."],
  ["Pantau Perkembangan", "Memudahkan siswa memantau proses lamaran dan status pengajuan secara lebih terstruktur."],
] as const;

const steps = [
  ["01", "Temukan Peluang", "Jelajahi lowongan PKL dan peluang industri yang tersedia."],
  ["02", "Siapkan Profil", "Lengkapi CV dan portofolio sesuai kebutuhan."],
  ["03", "Ajukan Lamaran", "Kirim lamaran pada peluang yang sesuai dengan kompetensi."],
  ["04", "Pantau Status", "Pantau proses dan perkembangan lamaran melalui platform."],
] as const;

const opportunities = [
  ["PT Astra International Tbk", "Otomotif & Manufaktur", "Program PKL – Teknik Otomotif", "Teknik Kendaraan Ringan (TKR)", "Jakarta Utara", "Januari 2026 – April 2026", "Deadline: 31 Desember 2025", "Frame 36448.png", "astra.png"],
  ["PT Mayora Indah Tbk", "Industri Makanan & Minuman", "Program PKL – Produksi", "Teknik Mesin (TPM)", "Tangerang, Banten", "Januari 2026 – April 2026", "Deadline: 20 Desember 2025", "Frame 36448 (1).png", "mayora.png"],
  ["PT AZKO", "Retail & Home Living", "Program PKL – Retail & Store Operations", "Semua Jurusan", "Jakarta Utara", "Januari 2026 – April 2026", "Deadline: 10 Januari 2026", "Frame 36448 (2).png", "azko.png"],
  ["PT GoTo Gojek Tokopedia Tbk", "Teknologi Digital", "IT Support", "Rekayasa Perangkat Lunak (RPL)", "Jakarta Selatan", "Mulai Februari 2026", "Deadline: 12 Januari 2026", "Frame 36448 (3).png", "goje.png"],
  ["PT Yamaha Indonesia Motor", "Otomotif & Manufaktur", "Operator Produksi", "Teknik Pemesinan (TPM), Teknik Otomotif (TKRO)", "Karawang, Jawa Barat", "Mulai Januari 2026", "Deadline: 5 Januari 2026", "Frame 36448 (4).png", "yamaha.png"],
  ["PT Telkom Indonesia", "Telekomunikasi & Teknologi", "Customer Service Support", "Semua Jurusan (Diutamakan RPL, TJKT)", "Jakarta Selatan", "Mulai Februari 2026", "Deadline: 15 Januari 2026", "Rectangle 89 (12).png", "telkom.png"],
] as const;

function Badge({ children }: { children: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-[#39aef2] shadow-[0_4px_12px_rgba(15,23,42,.08)]"><span className="size-1.5 rounded-full bg-[#39aef2]" />{children}</span>;
}

export function BkkPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#bfe2ff] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img className="absolute inset-0 -z-10 size-full object-cover object-center" src={asset("Group 1813.png")} alt="Siswa BKK SMKN 26 Jakarta" />
          <div className="absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(225,241,255,.9)_0%,rgba(225,241,255,.08)_42%,rgba(0,108,220,.12)_100%)]" />
          <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1272px] flex-col items-center px-5 pb-36 pt-5 text-center sm:min-h-[700px] sm:px-8 sm:pt-9 lg:min-h-[760px] lg:px-16 lg:pt-12">
            <Badge>BURSA KERJA KHUSUS</Badge>
            <h1 className="mt-4 max-w-[1100px] text-[28px] font-bold leading-tight text-white drop-shadow-[0_3px_6px_rgba(15,23,42,.2)] sm:text-4xl lg:text-[52px]">Buka Jalan Menuju <span className="text-primary">Dunia Industri</span></h1>
            <p className="mt-4 max-w-[760px] text-sm leading-6 text-white drop-shadow-[0_2px_4px_rgba(15,23,42,.2)] sm:text-base">BKK SMK Negeri 26 Jakarta menjadi jembatan antara siswa dan dunia kerja melalui informasi peluang PKL, rekrutmen, serta koneksi dengan mitra industri.</p>
            <a className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-4 py-2.5 text-sm font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 ease-out hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-white motion-reduce:transition-none" href="#peluang">
              Jelajahi BKK
              <span className="relative inline-flex size-5 shrink-0" aria-hidden="true">
                <img className="absolute inset-0 size-5 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none" src={figmaAssets.icons.arrowRight} alt="" />
                <img className="absolute inset-0 size-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none" src={figmaAssets.secondaryButton.arrowRight} alt="" />
              </span>
            </a>
          </div>
        </section>
        <section className="relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[980px] grid-cols-3 overflow-hidden rounded-lg bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10">
          {[['20+', 'Ekstrakurikuler'], ['6', 'Bidang Keahlian'], ['1', 'Komunitas Sekolah']].map(([value, label]) => <div className="border-r border-dashed border-white/70 px-2 py-3 last:border-r-0 sm:py-4" key={label}><strong className="block text-xl font-bold sm:text-2xl">{value}</strong><span className="text-[9px] sm:text-xs">{label}</span></div>)}
        </section>
        <section className="mx-auto grid max-w-[1100px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[.9fr_1.1fr] lg:py-20">
          <img className="mx-auto w-full max-w-[470px] object-contain" src={asset("Dynamic Youth Activities Group Portrait 1 (2).png")} alt="Siswa BKK SMKN 26 Jakarta" />
          <div><h2 className="text-3xl font-bold leading-tight sm:text-4xl">Bursa Kerja Khusus <span className="block text-primary">SMK Negeri 26 Jakarta</span></h2><p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">BKK merupakan layanan sekolah yang membantu siswa mempersiapkan diri dan menemukan peluang untuk terhubung dengan dunia industri. Melalui informasi yang terarah dan proses yang terstruktur, BKK mendukung siswa dalam membangun pengalaman serta kesiapan memasuki dunia profesional.</p></div>
        </section>
        <section className="bg-[#f3f7ff] px-5 py-14 sm:px-10 lg:py-[72px]"><div className="mx-auto max-w-[930px] text-center"><Badge>PERAN BKK</Badge><h2 className="mt-4 text-[26px] font-bold leading-tight sm:text-[32px]">Peran BKK <span className="text-primary">SMK Negeri 26 Jakarta</span></h2><p className="mx-auto mt-3 max-w-[700px] text-sm leading-6 text-[#61708b] sm:text-base">Menghadirkan layanan yang membantu siswa mempersiapkan diri dan terhubung dengan dunia industri.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{services.map(([title, copy]) => <article className="flex min-h-[112px] items-start gap-4 rounded-[20px] bg-white px-4 py-4 text-left sm:px-5 sm:py-5" key={title}><img className="size-11 shrink-0" src={asset("Button shortcut (13).png")} alt="" aria-hidden="true" /><div><h3 className="text-[23px] font-bold leading-tight text-primary">{title}</h3><p className="mt-2 text-sm leading-5 text-[#172033]">{copy}</p></div></article>)}</div></div></section>
        <section className="bg-[#f3f7ff] px-5 py-14 sm:px-10 lg:py-[72px]"><div className="mx-auto max-w-[1110px] text-center"><Badge>ALUR BKK</Badge><h2 className="mt-4 text-[26px] font-bold leading-tight sm:text-[30px]">Langkah Menuju <span className="text-primary">Dunia Industri</span></h2><p className="mx-auto mt-3 max-w-[700px] text-sm leading-6 text-[#61708b] sm:text-base">Ikuti proses BKK mulai dari menemukan peluang hingga memantau perkembangan lamaran.</p><div className="relative mt-10 grid gap-8 sm:mt-14 sm:grid-cols-4 sm:gap-0"><div className="absolute left-[4%] right-[4%] top-[122px] hidden h-1 rounded-full bg-[#48b9f0] sm:block" />{steps.map(([number, title, copy], index) => <article className={`relative z-10 text-left sm:px-3 ${index % 2 === 1 ? "sm:pt-[160px]" : "sm:pb-[100px]"}`} key={number}><div className="hidden sm:block"><span className="absolute left-1/2 top-[113px] size-6 -translate-x-1/2 rounded-full border-2 border-[#bde9ff] bg-[#48b9f0]" /></div><div className="sm:mx-auto sm:max-w-[220px]"><h3 className="text-[20px] font-bold leading-tight text-[#10182b] sm:text-[21px]">{number} — {title}</h3><p className="mt-2 max-w-[205px] text-xs leading-5 text-[#61708b] sm:text-[13px]">{copy}</p></div></article>)}</div></div></section>
        <section id="peluang" className="bg-white px-5 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1240px] text-center"><Badge>PELUANG BKK</Badge><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Temukan Peluang <span className="text-primary">untuk Berkembang</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm text-[#61708b]">Temukan berbagai peluang PKL, kerja, dan program industri yang sesuai dengan kompetensi kamu.</p><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{opportunities.map(([company, field, role, competency, location, period, deadline, image, logo]) => <article className="overflow-hidden rounded-[22px] border border-[#dce8f3] bg-white text-left shadow-[0_4px_12px_rgba(15,23,42,.08)]" key={company}><img className="h-[198px] w-full rounded-t-[22px] object-cover" src={asset(image)} alt={company} /><div className="p-4"><div className="flex items-center gap-3"><div className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#e4edf5] bg-white"><img className="max-h-9 max-w-10 object-contain" src={asset(logo)} alt={`${company} logo`} /></div><div><h3 className="text-[17px] font-bold leading-tight text-[#10182b]">{company}</h3><p className="mt-1 text-xs text-[#61708b]">{field}</p></div></div><h4 className="mt-4 text-[16px] font-bold leading-tight text-[#10182b]">{role}</h4><div className="mt-2 grid gap-2 text-xs text-[#61708b]"><p className="flex items-center gap-2"><img className="size-4 object-contain" src={asset("mdi_book-education (1).png")} alt="" aria-hidden="true" />{competency}</p><p className="flex items-center gap-2"><img className="size-4 object-contain" src={asset("boxicons_location-filled.png")} alt="" aria-hidden="true" />{location}</p><p className="flex items-center gap-2"><img className="size-4 object-contain" src={asset("lets-icons_date-fill.png")} alt="" aria-hidden="true" />{period}</p><p className="flex items-center gap-2"><img className="size-4 object-contain" src={asset("mingcute_time-fill.png")} alt="" aria-hidden="true" />{deadline}</p></div><a className="mt-4 block rounded-full border border-white/35 bg-gradient-to-br from-primary-dark via-primary to-soft-blue py-2.5 text-center text-xs font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 ease-out hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none" href="#kontak">Lihat Detail <span aria-hidden="true">→</span></a></div></article>)}</div></div></section>
        <section className="px-5 py-14 sm:px-10 lg:py-20"><div className="mx-auto max-w-[1100px] text-center"><Badge>MITRA INDUSTRI</Badge><h2 className="mt-4 text-2xl font-bold sm:text-3xl">Terhubung dengan <span className="text-primary">Dunia Industri</span></h2><p className="mx-auto mt-3 max-w-2xl text-sm text-[#61708b]">Membangun koneksi antara siswa, sekolah, dan mitra industri untuk membuka peluang masa depan.</p><div className="mt-8"><Marquee ariaLabel="Daftar mitra industri BKK" gapClass="gap-3">{partnerLogos.map((partner) => <div className="flex h-20 w-[211px] shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,.04)]" key={partner.key}><img className="max-h-12 w-full object-contain" src={partner.src} alt={`${partner.name} logo`} /></div>)}</Marquee></div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
