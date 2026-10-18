import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiataninovatif";
const photos = [
  "Dokumentasi Kegiatan (12).png",
  "Dokumentasi Kegiatan (13).png",
  "Dokumentasi Kegiatan (14).png",
  "Foto kegiatan (39).png",
  "Foto kegiatan (40).png",
  "Foto kegiatan (41).png",
  "Foto kegiatan (42).png",
  "Foto kegiatan (43).png",
];

export function NewsInnovationDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi karya inovatif berbasis teknologi dari siswa SMK Negeri 26 Jakarta." />;
}
