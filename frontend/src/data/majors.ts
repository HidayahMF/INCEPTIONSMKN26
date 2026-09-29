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
  hover: { x: number; y: number; width: number; height: number; image?: { width: string; height: string; left: string; top: string } } | null;
  href: string;
  figmaCrop: { aspect: string; width: string; height: string; left: string; top: string };
};

const cropTall = (width: string, height: string, left: string, top: string) => ({ aspect: "264 / 382", width, height, left, top });

export const majors: Major[] = [
  { id: "kgs", code: "KGS", name: "Konstruksi Gedung & Sanitasi", description: "Mempelajari perancangan, pembangunan,perawatan gedung, serta pengelolaan sistem sanitasi.", image: figmaAssets.majors.kgs, gradientFrom: "#D40009", gradientTo: "#FF464E", hoverSide: "right", hover: { x: 0, y: 42, width: 523, height: 471, image: { width: "99.6%", height: "123.82%", left: "0.2%", top: "-23.78%" } }, href: "/majors?major=kgs", figmaCrop: { aspect: "300 / 429", width: "99.6%", height: "123.82%", left: "0.2%", top: "-23.78%" } },
  { id: "tek", code: "TEK", name: "Teknik Elektronika & Komunikasi", description: "Mempelajari perakitan, perawatan perangkat elektronika, serta sistem komunikasi dan elektronika daya.", image: figmaAssets.majors.tek, gradientFrom: "#004E9E", gradientTo: "#0876E7", hoverSide: "right", hover: null, href: "/majors?major=tek", figmaCrop: cropTall("96.19%", "118.18%", "1.91%", "-18.18%") },
  { id: "titl", code: "TITL", name: "Teknik Instalasi Tenaga Listrik", description: "Mempelajari instalasi tenaga listrik dan sistem kontrol untuk kebutuhan industri.", image: figmaAssets.majors.titl, gradientFrom: "#FFC533", gradientTo: "#FFD56B", hoverSide: "left", hover: { x: 0, y: 33.91, width: 524, height: 468, image: { width: "95.67%", height: "117.54%", left: "2.17%", top: "-17.54%" } }, href: "/majors?major=titl", figmaCrop: cropTall("95.67%", "117.54%", "2.17%", "-17.54%") },
  { id: "tflm", code: "TFLM", name: "Teknik Fabrikasi Logam & Manufaktur", description: "Mempelajari pemesinan, pengelasan, dan pembuatan komponen untuk kebutuhan manufaktur.", image: figmaAssets.majors.tflm, gradientFrom: "#AB0001", gradientTo: "#C10102", hoverSide: "left", hover: null, href: "/majors?major=tflm", figmaCrop: cropTall("102.39%", "125.79%", "-0.48%", "-14.86%") },
  { id: "tkr", code: "TKR", name: "Teknik Kendaraan Ringan", description: "Mempelajari perawatan dan perbaikan mesin serta sistem kendaraan bermotor roda empat.", image: figmaAssets.majors.tkr, gradientFrom: "#B9C5E0", gradientTo: "#A9ADB4", hoverSide: "right", hover: { x: 224, y: 34.91, width: 524, height: 469, image: { width: "94.6%", height: "116.23%", left: "2.7%", top: "-16.23%" } }, href: "/majors?major=tkr", figmaCrop: cropTall("94.6%", "116.23%", "2.7%", "-16.23%") },
  { id: "sija", code: "SIJA", name: "Sistem Informasi, Jaringan & Aplikasi", description: "Mempelajari pengembangan perangkat lunak, desain grafis, jaringan, dan infrastruktur teknologi informasi.", image: figmaAssets.majors.sija, gradientFrom: "#FF7700", gradientTo: "#FF9E49", hoverSide: "left", hover: { x: 0, y: 21, width: 524, height: 503, image: { width: "98.41%", height: "106.83%", left: "0.23%", top: "-6.83%" } }, href: "/majors?major=sija", figmaCrop: cropTall("86.93%", "106.81%", "6.53%", "-6.81%") },
];
