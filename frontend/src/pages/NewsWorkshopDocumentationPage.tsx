import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { SectionBadge } from "../components/public/SectionBadge";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiatanworkshop";
const photos = ["Dokumentasi Kegiatan.png", "Foto kegiatan (1).png", "Foto kegiatan (2).png", "Foto kegiatan (4).png", "Foto kegiatan (6).png", "Dokumentasi Kegiatan (1).png", "Dokumentasi Kegiatan (2).png", "Foto kegiatan (7).png"];

export type NewsDocumentationProps = { docsPath?: string; photos?: string[]; description?: string };

export function NewsWorkshopDocumentationPage({ docsPath: activePath = docsPath, photos: activePhotos = photos, description = "Kumpulan dokumentasi kegiatan Workshop Pengembangan Soft Skill Siswa SMK Negeri 26 Jakarta." }: NewsDocumentationProps = {}) {
  return <div className="min-h-screen overflow-x-clip bg-[#f3f7ff] text-ink"><PublicNavbar /><main className="relative overflow-hidden pb-20 pt-24 sm:pt-28">
    <span className="detail-shape detail-shape-small pointer-events-none absolute left-[6%] top-[120px] z-0 size-[100px] rounded-full bg-gradient-to-br from-[#b9e8ff] to-[#0077e8]" aria-hidden="true" /><span className="detail-shape detail-shape-large pointer-events-none absolute right-[6%] top-[250px] z-0 size-[80px] rounded-full bg-gradient-to-br from-[#b9e8ff] to-[#0077e8]" aria-hidden="true" />
    <section className="relative z-10 mx-auto w-[min(1140px,100%-32px)] text-center"><div data-aos="fade-down"><SectionBadge>DOKUMENTASI BERITA</SectionBadge></div><h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">Dokumentasi <span className="text-primary">Kegiatan Berita</span></h1><p data-aos="fade-up" data-aos-delay="180" className="mx-auto mt-4 max-w-[760px] text-base leading-7 text-[#5b6f95] sm:text-xl">{description}</p><div className="mx-auto mt-9 grid max-w-[1140px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{activePhotos.map((photo, index) => <figure data-aos="fade-up" data-aos-delay={Math.min(index * 70, 350)} className="group aspect-[1.12/1] overflow-hidden rounded-[22px] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,.18)]" key={photo}><img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={`${activePath}/${photo}`} alt={`Dokumentasi kegiatan ${index + 1}`} /></figure>)}</div></section>
  </main><PublicFooter /></div>;
}
