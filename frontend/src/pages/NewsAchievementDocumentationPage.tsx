import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiatanprestasi";
const photos = [
  "Dokumentasi Kegiatan (3).png",
  "Dokumentasi Kegiatan (4).png",
  "Dokumentasi Kegiatan (5).png",
  "Foto kegiatan (29).png",
  "Foto kegiatan (30).png",
  "Foto kegiatan (31).png",
  "Foto kegiatan (32).png",
  "Foto kegiatan (33).png",
];

export function NewsAchievementDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi prestasi siswa SMK Negeri 26 Jakarta dalam Lomba Kompetensi Siswa." />;
}
