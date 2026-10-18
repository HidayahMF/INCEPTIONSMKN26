import { NewsWorkshopDocumentationPage } from "./NewsWorkshopDocumentationPage";

const docsPath = "/assets/pages/berita/isiberita/dokumentasikegiatanalumni";
const photos = [
  "Dokumentasi Kegiatan (9).png",
  "Dokumentasi Kegiatan (10).png",
  "Dokumentasi Kegiatan (11).png",
  "Foto kegiatan (34).png",
  "Foto kegiatan (35).png",
  "Foto kegiatan (36).png",
  "Foto kegiatan (37).png",
  "Foto kegiatan (38).png",
];

export function NewsAlumniDocumentationPage() {
  return <NewsWorkshopDocumentationPage docsPath={docsPath} photos={photos} description="Kumpulan dokumentasi alumni berprestasi SMK Negeri 26 Jakarta yang menjadi inspirasi bagi generasi berikutnya." />;
}
