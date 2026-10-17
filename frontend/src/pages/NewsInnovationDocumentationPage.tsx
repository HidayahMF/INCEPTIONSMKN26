import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiataninovatif";
const photos = ["Dokumentasi Kegiatan (12).png", "Dokumentasi Kegiatan (13).png", "Dokumentasi Kegiatan (14).png", "Foto kegiatan (24).png", "Foto kegiatan (25).png", "Foto kegiatan (26).png", "Foto kegiatan (27).png", "Foto kegiatan (28).png"];

export function NewsInnovationDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi karya inovatif berbasis teknologi dari siswa SMK Negeri 26 Jakarta." />;
}
