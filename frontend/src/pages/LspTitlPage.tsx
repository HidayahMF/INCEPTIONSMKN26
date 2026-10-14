import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";

const asset = (name: string) => `/assets/pages/lsp/titl/${name}`;
const photos = ["Foto kegiatan (1).png", "Foto kegiatan (2).png", "Foto kegiatan (3).png", "Foto kegiatan (4).png", "Foto kegiatan (5).png", "Foto kegiatan (6).png", "Foto kegiatan (7).png", "Foto kegiatan (8).png"];

function Label({ children }: { children: string }) { return <span data-aos="fade-up" className="inline-flex items-center gap-2 rounded-full px-3 py-[5px] text-[14px] font-semibold not-italic leading-[21px] tracking-[0%] align-middle shadow-[0_4px_16px_rgba(15,23,42,.08)]" style={{ color: "#F5A900", backgroundColor: "#FFF8E1" }}><span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />{children}</span>; }

export function LspTitlPage() {
  return <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-[#10182b]"><PublicNavbar /><main>
    <section className="relative isolate min-h-[620px] overflow-hidden bg-[#8d826c] pt-24 sm:min-h-[700px] lg:min-h-[760px] lg:pt-32"><img className="absolute inset-0 -z-10 size-full object-cover object-center" src={asset("Hero Section (13).png")} alt="Siswa skema sertifikasi TITL" /><div className="mx-auto flex w-full max-w-[1272px] px-5 pb-36 sm:px-8 lg:px-16 lg:pb-44"><div className="max-w-[620px] pt-10 text-white sm:pt-16 lg:pt-20"><Label>SKEMA SERTIFIKASI</Label><h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[52px]">Skema Sertifikasi TITL</h1><p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[600px] text-sm leading-6 text-white/95 sm:text-base sm:leading-7">Siswa Teknik Instalasi Tenaga Listrik dapat mengikuti sertifikasi kompetensi yang sesuai dengan bidang keahlian dan keterampilan yang dipelajari selama proses pembelajaran.</p></div></div></section>
    <Stats color="from-[#ffd34f] via-[#ffc533] to-[#e5a900]" />
    <section className="px-6 pb-8 pt-14 sm:px-10 lg:pb-10 lg:pt-20"><div className="mx-auto max-w-[1140px] text-center"><Label>SKEMA YANG TERSEDIA</Label><h2 data-aos="fade-up" className="mx-auto mt-4 max-w-[1000px] text-[30px] font-bold leading-[1.15] text-[#10182B] sm:text-[32px]">Skema Sertifikasi <span className="text-[#FFC533]">Teknik Instalasi Tenaga Listrik</span></h2><p data-aos="fade-up" data-aos-delay="130" className="mx-auto mt-4 max-w-[520px] text-base leading-6 text-[#61708b]">Kenali skema sertifikasi yang tersedia sesuai dengan kompetensi yang dipelajari siswa Teknik Instalasi Tenaga Listrik.</p><div className="mx-auto mt-8 grid max-w-[764px] gap-6 text-left md:grid-cols-2">
      {[['Operator Pemasangan Instalasi Listrik', 'Skema sertifikasi yang mengakui kompetensi siswa dalam melakukan pemasangan instalasi listrik sesuai dengan prosedur dan standar kerja yang ditetapkan.'], ['Pelaksana Madya\nPemeliharaan Instrumen\nControl Berbasis PLC', 'Pemeliharaan instrumen berbasis PLC.']].map(([title, copy], index) => <article data-aos="fade-up" data-aos-delay={index * 100} className="flex min-h-[300px] flex-col rounded-[22px] bg-white p-5 shadow-[0_4px_16px_rgba(15,23,42,.06)]" key={title}><img className="size-11 rounded-full" src={asset("Button shortcut (10).png")} alt="" aria-hidden="true" /><h3 className="mt-4 whitespace-pre-line text-xl font-bold leading-6 text-[#FFC533]">{title}</h3><p className="mt-3 text-xs leading-5 text-[#172033]">{copy}</p><div className="mt-auto pt-4"><span className="block text-xs font-medium text-[#E5A900]">PDF · Dokumen Skema</span><a className="mt-2 inline-flex w-fit rounded-full bg-gradient-to-r from-[#48b9f0] via-[#0092ff] to-[#006cdc] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-[background,color,border-color,box-shadow] duration-300 ease-out hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#CBD5E1] focus-visible:bg-[#F1F5F9] focus-visible:bg-none focus-visible:text-primary focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none" href="#dokumentasi">Unduh Skema <span className="ml-2">→</span></a></div></article>)}
    </div></div></section>
    <Documentation photos={photos} color="#e5a900" title="TITL" asset={asset} />
  </main><PublicFooter /></div>;
}

function Stats({ color }: { color: string }) { return <section className={`relative z-20 mx-auto -mt-8 grid w-[calc(100%-32px)] max-w-[1200px] grid-cols-2 overflow-hidden rounded-[10px] border-2 border-white bg-gradient-to-r ${color} text-center text-white shadow-[0_8px_24px_rgba(15,23,42,.18)] sm:-mt-10 sm:grid-cols-4`}>{[['6+', 'Jurusan Bidang Keahlian'], ['13+', 'Skema Sertifikasi'], ['500+', 'Peserta Tersertifikasi'], ['10+ Tahun', 'Pengalaman']].map(([value, label], index) => <div data-aos="fade-up" data-aos-delay={index * 80} className="border-b border-r border-dashed border-white/80 px-2 py-3 last:border-r-0 sm:py-4" key={label}><strong className="block text-[32px] font-bold leading-8">{value}</strong><span className="font-[Inter,sans-serif] text-[16px] font-medium leading-4">{label}</span></div>)}</section>; }
function Documentation({ photos, color, title, asset: getAsset }: { photos: string[]; color: string; title: string; asset: (name: string) => string }) { return <section id="dokumentasi" className="px-5 pb-12 pt-6 sm:px-10 lg:pb-16 lg:pt-8"><div className="mx-auto max-w-[1100px] text-center"><span className="inline-flex items-center gap-2 rounded-full px-3 py-[5px] text-[14px] font-semibold not-italic leading-[21px] tracking-[0%] align-middle shadow-[0_4px_16px_rgba(15,23,42,.08)]" style={{ color, backgroundColor: "#FFF8E1" }}><span className="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />DOKUMENTASI</span><h2 data-aos="fade-up" className="mt-4 text-3xl font-bold sm:text-4xl">Di Balik <span style={{ color }}>Setiap Kompetensi</span></h2><p data-aos="fade-up" data-aos-delay="130" className="mx-auto mt-3 max-w-[800px] text-sm leading-6 text-[#61708b] sm:text-base">Lihat dokumentasi siswa {title} dalam proses mempersiapkan dan mengikuti kegiatan uji kompetensi. Setiap proses menjadi bagian dari pengalaman untuk membuktikan keterampilan yang telah dipelajari.</p><div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">{photos.map((photo, index) => <img data-aos="zoom-in" data-aos-delay={index * 60} className="aspect-[1.12] w-full rounded-2xl object-cover" src={getAsset(photo)} alt={`Kegiatan sertifikasi ${title}`} key={photo} />)}</div></div></section>; }














