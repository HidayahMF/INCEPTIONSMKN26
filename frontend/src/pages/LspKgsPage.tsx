import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const ASSET_OVERRIDES: Record<string, string> = {
  "Button shortcut (8).png": "/assets/majors/KGSAssets/kgs-shortcut.png",
  "Hero Section (11).png": "/assets/majors/KGSAssets/kgs-hero.png",
};
const asset = (name: string) => ASSET_OVERRIDES[name] ?? `/assets/pages/lsp/kgs/${name}`;
const photos = ["Foto kegiatan.png", "Foto kegiatan (1).png", "Foto kegiatan (2).png", "Foto kegiatan (3).png", "Foto kegiatan (4).png", "Foto kegiatan (5).png", "Foto kegiatan (6).png", "Foto kegiatan (7).png"];

function Label({ children }: { children: string }) { return <span data-aos="fade-up" className="inline-flex items-center gap-2 rounded-full px-3 py-[5px] text-[14px] font-semibold not-italic leading-[21px] tracking-[0%] align-middle shadow-[0_4px_16px_rgba(15,23,42,.08)]" style={{ color: "#D40009", backgroundColor: "#FFF0F0" }}><span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />{children}</span>; }

export function LspKgsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]">
      <PublicNavbar />
      <main>
        <section className="relative isolate min-h-[620px] overflow-hidden bg-[#6f626d] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32">
          <img className="absolute inset-0 -z-10 size-full object-cover object-center" src={asset("Hero Section (11).png")} alt="Siswa skema sertifikasi KGS" />
          <div className="mx-auto flex w-full max-w-[1272px] px-5 pb-36 sm:px-8 lg:px-16 lg:pb-44"><div className="max-w-[620px] pt-10 text-white sm:pt-16 lg:pt-20"><Label>SKEMA SERTIFIKASI</Label><h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[52px]">Skema Sertifikasi KGS</h1><p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[600px] text-sm leading-6 text-white/95 sm:text-base sm:leading-7">Siswa Konstruksi Gedung &amp; Sanitasi dapat mengikuti sertifikasi kompetensi yang sesuai dengan bidang keahlian dan keterampilan yang dipelajari selama proses pembelajaran.</p></div></div>
        </section>
        <section className="relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[1200px] grid-cols-2 overflow-hidden rounded-[10px] border-2 border-white bg-[linear-gradient(90deg,#FF333A_0%,#B50008_100%)] text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10 sm:grid-cols-4">
          {[['6+', 'Jurusan Bidang Keahlian'], ['13+', 'Skema Sertifikasi'], ['500+', 'Peserta Tersertifikasi'], ['10+ Tahun', 'Pengalaman']].map(([value, label], index) => <div data-aos="fade-up" data-aos-delay={index * 80} className="border-b border-r border-dashed border-white/80 px-2 py-3 last:border-r-0 sm:py-4" key={label}><strong className="block text-[32px] font-bold leading-8">{value}</strong><span className="font-[Inter,sans-serif] text-[16px] font-medium leading-4">{label}</span></div>)}
        </section>
        <section className="mx-auto grid max-w-[1140px] items-center gap-8 px-6 py-14 sm:px-10 md:grid-cols-[370px_minmax(0,1fr)] lg:gap-[30px] lg:py-20">
          <article data-aos="fade-right" className="rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,.06)]"><img className="size-11 rounded-full" src={asset("Button shortcut (8).png")} alt="" aria-hidden="true" /><h2 className="mt-4 text-xl font-bold leading-6 text-[#ed1c24]">Skema Sertifikasi Okupasi Tukang Bangunan Gedung</h2><p className="mt-3 text-xs leading-5 text-[#172033]">Skema sertifikasi untuk mengukur dan mengakui kompetensi dalam melaksanakan pekerjaan konstruksi bangunan gedung sesuai standar yang ditetapkan.</p><span className="mt-5 block text-xs font-medium text-[#ed1c24]">PDF · Dokumen Skema</span><a className="mt-2 inline-flex rounded-full bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 ease-out hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none" href="#dokumentasi">Unduh Skema <span className="ml-2">→</span></a></article>
          <div className="min-w-0"><Label>SKEMA YANG TERSEDIA</Label><h2 data-aos="fade-up" className="mt-4 max-w-[640px] text-3xl font-bold leading-[1.12] sm:text-4xl">Skema Sertifikasi <span className="text-[#ed1c24]">Konstruksi Gedung &amp; Sanitasi</span></h2><p data-aos="fade-up" data-aos-delay="130" className="mt-4 max-w-[600px] text-sm leading-6 text-[#61708b] sm:text-base">Pilih dan pelajari dokumen skema sertifikasi yang tersedia untuk mengetahui kompetensi dan persyaratan yang perlu dipersiapkan sebelum mengikuti uji kompetensi.</p></div>
        </section>
        <section id="dokumentasi" className="px-5 pb-12 pt-6 sm:px-10 lg:pb-16 lg:pt-8"><div className="mx-auto max-w-[1100px] text-center"><Label>DOKUMENTASI</Label><h2 data-aos="fade-up" className="mt-4 text-3xl font-bold sm:text-4xl">Di Balik <span className="text-[#ed1c24]">Setiap Kompetensi</span></h2><p data-aos="fade-up" data-aos-delay="130" className="mx-auto mt-3 max-w-[800px] text-sm leading-6 text-[#61708b] sm:text-base">Lihat dokumentasi siswa KGS dalam proses mempersiapkan dan mengikuti kegiatan uji kompetensi. Setiap proses menjadi bagian dari pengalaman untuk membuktikan keterampilan yang telah dipelajari.</p><div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{photos.map((photo, index) => <img data-aos="zoom-in" data-aos-delay={index * 60} className="aspect-[1.12] w-full rounded-2xl object-cover" src={asset(photo)} alt="Kegiatan sertifikasi KGS" key={photo} />)}</div></div></section>
      </main>
      <PublicFooter />
    </div>
  );
}








