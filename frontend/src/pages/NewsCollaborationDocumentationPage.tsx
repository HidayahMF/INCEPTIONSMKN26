import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiatankolaborasi";
const photos = [
  "Dokumentasi Kegiatan (6).png",
  "Dokumentasi Kegiatan (7).png",
  "Dokumentasi Kegiatan (8).png",
  "Foto kegiatan (44).png",
  "Foto kegiatan (45).png",
  "Foto kegiatan (46).png",
  "Foto kegiatan (47).png",
  "Foto kegiatan (48).png",
];

export function NewsCollaborationDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi kolaborasi SMK Negeri 26 Jakarta dengan dunia industri." />;
}
