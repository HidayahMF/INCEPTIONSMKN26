export type TourLocation = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

const screenshotPath = (file: string) =>
  `/assets/panorama/school_tour/Upscaled/${file}.jpg`;

const locations: [string, string, string][] = [
  ["lapangan", "lapangan", "Lapangan SMKN 26 Jakarta"],
  ["gerbang", "gerbang", "Gerbang SMKN 26 Jakarta"],
  ["depan-aula", "depan_aula", "Depan Aula"],
  ["depan-lsp", "depan_lsp", "Depan LSP"],
  ["depan-masjid", "depan_masjid", "Depan Masjid"],
  ["dalam-masjid", "dalam_masjid", "Dalam Masjid"],
  ["depan-tek", "depan_tek", "Depan TEK"],
  ["bengkel", "bengkel", "Bengkel"],
  ["bengkel-kgs", "bengkel_kgs", "Bengkel KGS"],
  ["bengkel-sija", "bengkel_sija", "Bengkel SIJA"],
  ["bengkel-titl", "bengkel_titl", "Bengkel TITL"],
  ["bengkel-tkr", "bengkel_tkr", "Bengkel TKR"],
  ["jogging-track", "jogging_track", "Jogging Track"],
  ["kantin", "kantin", "Kantin"],
  ["pedestrian", "pedestrian", "Pedestrian"],
  ["pedestrian-rbtra", "pedestrian_rbtra", "Pedestrian RBTRA"],
  ["rbtra", "RBTRA", "RBTRA"],
  ["pendopo-kgs", "pendopo_kgs", "Pendopo KGS"],
  ["perpustakaan", "perpustakaan", "Perpustakaan"],
  ["ruang-piket", "ruang_piket", "Ruang Piket"],
  ["satpam", "satpam", "Pos Satpam"],
  ["toilet1", "toilet1", "Toilet"],
];

export const tourLocations: TourLocation[] = locations.map(([id, file, name]) => ({
  id,
  name,
  description: `Jelajahi area ${name} secara interaktif melalui panorama School Tour SMKN 26 Jakarta.`,
  image: screenshotPath(file),
  href: `/tour/${id}`,
}));
