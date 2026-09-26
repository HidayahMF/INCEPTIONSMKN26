export type TourHotspot = {
  id: string;
  label: string;
  targetSceneId: string;
  yaw: number;
  pitch: number;
};
export type TourScene = {
  id: string;
  name: string;
  panorama: string;
  description: string;
  hotspots: TourHotspot[];
};

// Current files are wide photos, not validated 2:1 equirectangular panoramas.
// Hotspot positions are provisional until spherical captures are available.
export const tourScenes: TourScene[] = [
  {
    id: "lapangan-1",
    name: "Lapangan 1",
    panorama: "/assets/panorama/LapanganSMKN261.jpeg",
    description: "Area lapangan SMKN 26 Jakarta.",
    hotspots: [
      {
        id: "to-lapangan-2",
        label: "Ke Lapangan 2",
        targetSceneId: "lapangan-2",
        yaw: 0,
        pitch: 0,
      },
    ],
  },
  {
    id: "lapangan-2",
    name: "Lapangan 2",
    panorama: "/assets/panorama/LapanganSMKN262.jpeg",
    description: "Sudut lain area lapangan sekolah.",
    hotspots: [
      {
        id: "to-lapangan-1",
        label: "Kembali ke Lapangan 1",
        targetSceneId: "lapangan-1",
        yaw: -1.2,
        pitch: 0,
      },
      {
        id: "to-lapangan-3",
        label: "Ke Lapangan 3",
        targetSceneId: "lapangan-3",
        yaw: 1.2,
        pitch: 0,
      },
    ],
  },
  {
    id: "lapangan-3",
    name: "Lapangan 3",
    panorama: "/assets/panorama/LapanganSMKN263.jpeg",
    description: "Area lapangan dari sudut pandang ketiga.",
    hotspots: [
      {
        id: "to-lapangan-2",
        label: "Kembali ke Lapangan 2",
        targetSceneId: "lapangan-2",
        yaw: 0,
        pitch: 0,
      },
    ],
  },
];
