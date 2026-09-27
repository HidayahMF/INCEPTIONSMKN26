import { figmaAssets } from "../assets/figmaAssets";

export type Major = {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
  hoverSide: "left" | "right";
  hoverShiftX: number;
  hoverStudentX: number;
  href: string;
};

export const majors: Major[] = [
  { id: "kgs", code: "KGS", name: "Konstruksi Gedung & Sanitasi", description: "Mempelajari perancangan, pembangunan,perawatan gedung, serta pengelolaan sistem sanitasi.", image: figmaAssets.majors.kgs, gradientFrom: "#D40009", gradientTo: "#FF464E", hoverSide: "right", hoverShiftX: 0, hoverStudentX: 0, href: "/majors?major=kgs" },
  { id: "tek", code: "TEK", name: "Teknik Elektronika & Komunikasi", description: "Mempelajari perakitan, perawatan perangkat elektronika, serta sistem komunikasi dan elektronika daya.", image: figmaAssets.majors.tek, gradientFrom: "#004E9E", gradientTo: "#0876E7", hoverSide: "right", hoverShiftX: 0, hoverStudentX: 0, href: "/majors?major=tek" },
  { id: "titl", code: "TITL", name: "Teknik Instalasi Tenaga Listrik", description: "Mempelajari instalasi tenaga listrik dan sistem kontrol untuk kebutuhan industri.", image: figmaAssets.majors.titl, gradientFrom: "#FFC533", gradientTo: "#FFD56B", hoverSide: "right", hoverShiftX: 0, hoverStudentX: 0, href: "/majors?major=titl" },
  { id: "tflm", code: "TFLM", name: "Teknik Fabrikasi Logam & Manufaktur", description: "Mempelajari pemesinan, pengelasan, dan pembuatan komponen untuk kebutuhan manufaktur.", image: figmaAssets.majors.tflm, gradientFrom: "#AB0001", gradientTo: "#C10102", hoverSide: "left", hoverShiftX: -224, hoverStudentX: 224, href: "/majors?major=tflm" },
  { id: "tkr", code: "TKR", name: "Teknik Kendaraan Ringan", description: "Mempelajari perawatan dan perbaikan mesin serta sistem kendaraan bermotor roda empat.", image: figmaAssets.majors.tkr, gradientFrom: "#B9C5E0", gradientTo: "#A9ADB4", hoverSide: "left", hoverShiftX: -224, hoverStudentX: 224, href: "/majors?major=tkr" },
  { id: "sija", code: "SIJA", name: "Sistem Informasi, Jaringan & Aplikasi", description: "Mempelajari pengembangan perangkat lunak, desain grafis, jaringan, dan infrastruktur teknologi informasi.", image: figmaAssets.majors.sija, gradientFrom: "#FF7700", gradientTo: "#FF9E49", hoverSide: "left", hoverShiftX: -230, hoverStudentX: 230, href: "/majors?major=sija" },
];
