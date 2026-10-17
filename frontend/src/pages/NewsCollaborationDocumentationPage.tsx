import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiatankolaborasi";
const photos = ["Dokumentasi Kegiatan (6).png", "Dokumentasi Kegiatan (7).png", "Dokumentasi Kegiatan (8).png", "Foto kegiatan (15).png", "Foto kegiatan (16).png", "Foto kegiatan (18).png", "Foto kegiatan (19).png", "Foto kegiatan (21).png"];

export function NewsCollaborationDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi kolaborasi SMK Negeri 26 Jakarta dengan dunia industri." />;
}
