import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiatanprestasi";
const photos = ["Dokumentasi Kegiatan (3).png", "Dokumentasi Kegiatan (4).png", "Dokumentasi Kegiatan (5).png", "Foto kegiatan (8).png", "Foto kegiatan (9).png", "Foto kegiatan (10).png", "Foto kegiatan (12).png", "Foto kegiatan (13).png"];

export function NewsAchievementDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi prestasi siswa SMK Negeri 26 Jakarta dalam Lomba Kompetensi Siswa." />;
}
