export type TourLocation = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export const tourLocations: TourLocation[] = [
  {
    id: "lapangan",
    name: "Lapangan SMKN 26 Jakarta",
    description:
      "Area lapangan utama SMKN 26 Jakarta yang menjadi ruang untuk kegiatan sekolah, olahraga, upacara, dan berbagai aktivitas siswa.",
    image: "/assets/panorama/LapanganSMKN261.jpeg",
    href: "/tour/lapangan",
  },
];
