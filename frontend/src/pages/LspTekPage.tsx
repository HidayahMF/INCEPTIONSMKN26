import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const asset = (name: string) => `/assets/figma/lsp/skemalsptek/${name}`;
const photos = ["Foto kegiatan.png", "Foto kegiatan (1).png", "Foto kegiatan (2).png", "Foto kegiatan (3).png", "Foto kegiatan (4).png", "Foto kegiatan (5).png", "Foto kegiatan (6).png", "Foto kegiatan (7).png"];

function Label({ children }: { children: string }) {
  return <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]"><img className="h-[17px] w-[13.6px]" src="/assets/figma/majors/icon-section-badge.svg" alt="" aria-hidden="true" />{children}</span>;
}

export function LspTekPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#71819b] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img className="absolute inset-0 -z-10 size-full object-cover object-center" src={asset("Hero Section (12).png")} alt="Siswa skema sertifikasi TEK" />
          <div className="mx-auto flex w-full max-w-[1272px] px-5 pb-36 sm:px-8 lg:px-16 lg:pb-44"><div className="max-w-[620px] pt-10 text-white sm:pt-16 lg:pt-20"><Label>SKEMA SERTIFIKASI</Label><h1 className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[52px]">Skema Sertifikasi TEK</h1><p className="mt-4 max-w-[600px] text-sm leading-6 text-white/95 sm:text-base sm:leading-7">Siswa Teknik Elektronika &amp; Komunikasi dapat mengikuti sertifikasi kompetensi yang sesuai dengan bidang keahlian dan keterampilan yang dipelajari selama proses pembelajaran.</p></div></div>
        </section>
        <section className="relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[1200px] grid-cols-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#48b9f0] via-[#0874d1] to-[#0053a6] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10 sm:grid-cols-4">
          {[['6+', 'Jurusan Bidang Keahlian'], ['13+', 'Skema Sertifikasi'], ['500+', 'Peserta Tersertifikasi'], ['10+ Tahun', 'Pengalaman']].map(([value, label]) => <div className="border-b border-r border-dashed border-white/70 px-2 py-3 last:border-r-0 sm:py-4" key={label}><strong className="block text-xl font-bold sm:text-2xl">{value}</strong><span className="text-[9px] sm:text-xs">{label}</span></div>)}
        </section>
        <section className="mx-auto grid max-w-[1100px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[320px_1fr] lg:py-20">
          <article className="rounded-2xl bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,.06)]"><img className="size-11 rounded-full" src={asset("Button shortcut (9).png")} alt="" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold leading-6 text-[#0874d1]">Skema Sertifikasi Okupasi Teknisi Elektronika</h2><p className="mt-3 text-xs leading-5 text-[#172033]">Skema sertifikasi untuk mengukur dan mengakui kompetensi dalam melaksanakan pekerjaan elektronika dan komunikasi sesuai standar yang ditetapkan.</p><span className="mt-5 block text-xs font-medium text-[#0874d1]">PDF · Dokumen Skema</span><a className="mt-2 inline-flex rounded-full bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] px-4 py-2.5 text-xs font-bold text-white" href="#dokumentasi">Unduh Skema <span className="ml-2">→</span></a></article>
          <div><Label>SKEMA YANG TERSEDIA</Label><h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">Skema Sertifikasi <span className="text-[#0874d1]">Teknik Elektronika &amp; Komunikasi</span></h2><p className="mt-4 text-sm leading-6 text-[#61708b] sm:text-base">Pilih dan pelajari dokumen skema sertifikasi yang tersedia untuk mengetahui kompetensi dan persyaratan yang perlu dipersiapkan sebelum mengikuti uji kompetensi.</p></div>
        </section>
        <section id="dokumentasi" className="px-5 py-12 sm:px-10 lg:py-16"><div className="mx-auto max-w-[1100px] text-center"><Label>DOKUMENTASI</Label><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Di Balik <span className="text-[#0874d1]">Setiap Kompetensi</span></h2><p className="mx-auto mt-3 max-w-[800px] text-sm leading-6 text-[#61708b] sm:text-base">Lihat dokumentasi siswa TEK dalam proses mempersiapkan dan mengikuti kegiatan uji kompetensi. Setiap proses menjadi bagian dari pengalaman untuk membuktikan keterampilan yang telah dipelajari.</p><div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{photos.map((photo) => <img className="aspect-[1.12] w-full rounded-2xl object-cover" src={asset(photo)} alt="Kegiatan sertifikasi TEK" key={photo} />)}</div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}
