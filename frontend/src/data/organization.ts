import { figmaAssets } from "../assets/figmaAssets";

export type StaffMember = {
  name: string;
  role: string;
  photo: string;
};

export type PrincipalFact = {
  label: string;
  value: string;
};

/**
 * DRAFT CONTENT - NOT YET VERIFIED AGAINST AN OFFICIAL SCHOOL SOURCE.
 *
 * Names, titles, and the tenure period below are transcribed verbatim from the
 * approved Figma frame `508:2153` (`Struktur &  Unit Kerja`) so the layout can
 * be reviewed against the design. They are NOT sourced from
 * `https://smkn26jkt.sch.id/` and are still awaiting confirmation by the
 * school content owner. Several names repeat across different roles in the
 * Figma frame (for example "Rizky Maulana" appears as Guru Bahasa Indonesia,
 * Guru Kejuruan TEK, and Staf Administrasi Sekolah), which indicates the frame
 * still carries placeholder content.
 *
 * Replace every entry below with verified data before this page is presented
 * as official school information, then remove `isDraftContent` so the page
 * stops rendering its "Data DRAFT" notice.
 */
export const isDraftContent = true;

export const principal: {
  name: string;
  nameLeadGradient: string;
  nameRemainder: string;
  summary: string;
  photo: string;
  facts: PrincipalFact[];
} = {
  name: "Darminto, M.Par.",
  nameLeadGradient: "Darminto,",
  nameRemainder: " M.Par.",
  summary:
    "Memimpin penyelenggaraan pendidikan dan pengembangan sekolah dalam mewujudkan lulusan yang kompeten, berkarakter, dan siap menghadapi dunia kerja.",
  photo: figmaAssets.struktur.principalPhoto,
  facts: [
    { label: "Pendidikan Terakhir", value: "S2 Pariwisata" },
    { label: "Jabatan/Posisi", value: "Kepala Sekolah SMK Negeri 26 Jakarta" },
    { label: "Bidang Kepemimpinan", value: "Manajemen Sekolah" },
    { label: "Masa Jabatan / Periode", value: "2026-2027" },
  ],
};

/**
 * Order and text transcribed from Figma node `563:2358`:
 * Kesiswaan, Kurikulum, HUMAS, SAPRAS. Portrait-to-person binding is
 * UNVERIFIED - see `docs/FIGMA_ASSET_MANIFEST.md`.
 */
export const vicePrincipals: StaffMember[] = [
  {
    name: "Muhafiz Dwi Azhari",
    role: "Wakil Kepala Sekolah Bidang Kesiswaan",
    photo: figmaAssets.struktur.vicePrincipals[0],
  },
  {
    name: "Slamet",
    role: "Wakil Kepala Sekolah Bidang Akademik",
    photo: figmaAssets.struktur.vicePrincipals[3],
  },
  {
    name: "Dimas Ahmad",
    role: "Wakil Kepala Sekolah Bidang Hubungan Dunia Usaha & Dunia Industri",
    photo: figmaAssets.struktur.vicePrincipals[1],
  },
  {
    name: "Riky Hamdan",
    role: "Wakil Kepala Sekolah Bidang Sarana & Prasarana",
    photo: figmaAssets.struktur.vicePrincipals[2],
  },
];

export const normativeTeachers: StaffMember[] = [
  {
    name: "Rizky Maulana",
    role: "Guru Bahasa Indonesia",
    photo: figmaAssets.struktur.normativeTeachers[0],
  },
  {
    name: "Aulia Rahmawati",
    role: "Guru Bahasa Inggris",
    photo: figmaAssets.struktur.normativeTeachers[1],
  },
  {
    name: "Fajar Nugroho",
    role: "Guru Matematika",
    photo: figmaAssets.struktur.normativeTeachers[2],
  },
  {
    name: "Nadia Putri Lestari",
    role: "Guru Pendidikan Pancasila",
    photo: figmaAssets.struktur.normativeTeachers[3],
  },
  {
    name: "Muhammad Reza Pratama",
    role: "Guru Pendidikan Agama Islam",
    photo: "/assets/shared/struktur/Muhammad Reza Pratama.png",
  },
  {
    name: "Siti Nur Aisyah",
    role: "Guru Bahasa Indonesia",
    photo: "/assets/shared/struktur/Siti Nur Aisyah.png",
  },
  {
    name: "Dimas Arya Saputra",
    role: "Guru Matematika",
    photo: "/assets/shared/struktur/Dimas Arya Saputra.png",
  },
  {
    name: "Rangga Aditya",
    role: "Guru Pendidikan Pancasila",
    photo: "/assets/shared/struktur/Rangga Aditya.png",
  },
];

export const vocationalTeachers: StaffMember[] = [
  {
    name: "Kuri Asih",
    role: "Guru Kejuruan SIJA",
    photo: figmaAssets.struktur.vocationalTeachers[0],
  },
  {
    name: "Rizky Maulana",
    role: "Guru Kejuruan TEK",
    photo: figmaAssets.struktur.vocationalTeachers[1],
  },
  {
    name: "Nadia Putri Lestari",
    role: "Guru Kejuruan TITL",
    photo: figmaAssets.struktur.vocationalTeachers[2],
  },
  {
    name: "Fajar Nugraha",
    role: "Guru Kejuruan TFLM",
    photo: figmaAssets.struktur.vocationalTeachers[3],
  },
  {
    name: "Siti Nur Aisyah",
    role: "Guru Kejuruan KGS",
    photo: "/assets/shared/struktur/Siti Nur AisyahKGS.png",
  },
  {
    name: "Bella Lila",
    role: "Guru Kejuruan TEK",
    photo: "/assets/shared/struktur/Bella LilaTEK.png",
  },
  {
    name: "Dimas Arya Saputra",
    role: "Guru Kejuruan TKR",
    photo: "/assets/shared/struktur/Dimas Arya SaputraTKR.png",
  },
  {
    name: "Muhammad Reza",
    role: "Guru Kejuruan TFLM",
    photo: "/assets/shared/struktur/Muhammad RezaTFLM.png",
  },
];

export const educationStaff: StaffMember[] = [
  {
    name: "Aulia Rahmawati",
    role: "Staf Administrasi Sekolah",
    photo: figmaAssets.struktur.educationStaff[0],
  },
  {
    name: "Fikri Ramadhan",
    role: "Operator Sekolah",
    photo: figmaAssets.struktur.educationStaff[1],
  },
  {
    name: "Citra Maharani",
    role: "Staf Tata Usaha",
    photo: figmaAssets.struktur.educationStaff[2],
  },
  {
    name: "Rangga Pratama",
    role: "Staf Sarana & Prasarana",
    photo: figmaAssets.struktur.educationStaff[3],
  },
  {
    name: "Ade Firmansyah",
    role: "Staf Administrasi Keuangan",
    photo: "/assets/shared/struktur/Ade FirmansyahStaf Administrasi Keuangan.png",
  },
  {
    name: "Aditya Firmansyah",
    role: "Staf Administrasi Akademik",
    photo: "/assets/shared/struktur/Aditya FirmansyahStaf Administrasi Akademik.png",
  },
  {
    name: "Nabila Khairunnisa",
    role: "Staf Perpustakaan",
    photo: "/assets/shared/struktur/Nabila KhairunnisaStaf Perpustakaan.png",
  },
  {
    name: "Rizal Akabar",
    role: "Teknisi & Laboran",
    photo: "/assets/shared/struktur/Rizal AkabarTeknisi & Laboran.png",
  },
];

export const supportTeam: StaffMember[] = [
  {
    name: "Ardiansyah Putra",
    role: "Petugas Keamanan",
    photo: figmaAssets.struktur.supportTeam[0],
  },
  {
    name: "Bagus Setiawan",
    role: "Petugas Keamanan",
    photo: figmaAssets.struktur.supportTeam[1],
  },
  {
    name: "Rani Maharani",
    role: "Petugas Keamanan",
    photo: figmaAssets.struktur.supportTeam[2],
  },
  {
    name: "Deni Kurniawan",
    role: "Petugas Keamanan",
    photo: figmaAssets.struktur.supportTeam[3],
  },
  {
    name: "Eko Prasetyo",
    role: "Petugas Kebersihan",
    photo: "/assets/shared/struktur/Eko PrasetyoPetugas Kebersihan.png",
  },
  {
    name: "Lina Marline",
    role: "Petugas Kebersihan",
    photo: "/assets/shared/struktur/Lina MarlinePetugas Kebersihan.png",
  },
  {
    name: "Sari Wulandari",
    role: "Petugas Kebersihan",
    photo: "/assets/shared/struktur/Sari WulandariPetugas Kebersihan.png",
  },
  {
    name: "Wawan Supriyadi",
    role: "Petugas Kebersihan",
    photo: "/assets/shared/struktur/Wawan SupriyadiPetugas Kebersihan.png",
  },
];

/** Counts rendered in the hero statistics bar, transcribed from Figma node `559:1814`. */
export const statistics: readonly (readonly [string, string])[] = [
  ["6", "Jurusan"],
  ["20+", "Guru Kejuruan"],
  ["40+", "Guru Normatif"],
  ["29+", "Tenaga Kependidikan"],
  ["4", "Bidang Wakasek"],
];
