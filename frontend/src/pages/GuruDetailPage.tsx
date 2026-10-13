import { figmaAssets } from "../assets/figmaAssets";
import { PublicFooter } from "../components/public/PublicFooter";
import { PublicNavbar } from "../components/public/PublicNavbar";
import type { StaffMember } from "../data/organization";

const gradientText =
  "bg-[linear-gradient(90deg,#006CDC,#0092FF)] bg-clip-text text-transparent";

export type StaffCategory =
  | "normatif"
  | "kejuruan"
  | "kependidikan"
  | "pendukung";

type CategoryContent = {
  badge: string;
  intro: string;
  detailLabels: [string, string, string, string];
  detailValues: [string, string, string, string];
  sectionBadge: string;
  sectionTitle: string;
  sectionAccent: string;
  sectionDescription: string;
  cards: [string, string][];
  backHref: string;
};

const categoryContent: Record<StaffCategory, CategoryContent> = {
  normatif: {
    badge: "GURU NORMATIF & ADAPTIF",
    intro:
      "Membimbing peserta didik dalam membangun pengetahuan, karakter, dan keterampilan dasar sebagai bekal untuk berkembang di dunia kerja maupun pendidikan lanjutan.",
    detailLabels: ["Pendidikan Terakhir", "Jabatan/Posisi", "Mata Pelajaran", "Masa Mengajar"],
    detailValues: ["Pendidikan bidang terkait", "Guru Normatif & Adaptif", "Bahasa Indonesia, Bahasa Inggris, dan Matematika", "Sesuai penugasan sekolah"],
    sectionBadge: "TENTANG PENDIDIK",
    sectionTitle: "Tentang",
    sectionAccent: "Pendidik",
    sectionDescription: "Mengenal lebih dekat peran dan kontribusi guru dalam mendampingi proses pembelajaran peserta didik di SMK Negeri 26 Jakarta.",
    cards: [
      ["Bidang Pengajaran", "Mata pelajaran yang dibimbing dan kompetensi yang dikembangkan."],
      ["Peran di Sekolah", "Kontribusi dalam kegiatan pembelajaran dan pendampingan peserta didik."],
      ["Fokus Pembelajaran", "Pendekatan pembelajaran yang diterapkan untuk mendukung perkembangan siswa."],
    ],
    backHref: "/guru-normatif-adaptif",
  },
  kejuruan: {
    badge: "GURU KEJURUAN",
    intro:
      "Membimbing peserta didik mengembangkan kompetensi sesuai bidang keahlian melalui pembelajaran berbasis praktik, proyek, dan kebutuhan dunia kerja.",
    detailLabels: ["Pendidikan Terakhir", "Jabatan/Posisi", "Kompetensi Keahlian", "Masa Mengajar"],
    detailValues: ["Pendidikan bidang keahlian", "Guru Kejuruan", "Sistem Informasi, Jaringan & Aplikasi", "Sesuai penugasan sekolah"],
    sectionBadge: "KOMPETENSI YANG DIBIMBING",
    sectionTitle: "Kompetensi yang",
    sectionAccent: "Dibimbing",
    sectionDescription: "Kompetensi yang dipelajari peserta didik melalui pembelajaran teori, praktik, dan proyek nyata.",
    cards: [
      ["Kompetensi Utama", "Jaringan komputer, pemrograman, sistem informasi, dan kompetensi bidang keahlian."],
      ["Pembelajaran Praktik", "Laboratorium, workshop, dan project-based learning."],
      ["Keterkaitan Industri", "Pembelajaran yang diarahkan pada kebutuhan dunia usaha dan dunia industri."],
    ],
    backHref: "/guru-kejuruan",
  },
  kependidikan: {
    badge: "TENAGA KEPENDIDIKAN",
    intro:
      "Mendukung kelancaran administrasi dan pengelolaan sekolah agar seluruh layanan pendidikan dapat berjalan secara efektif dan terorganisir.",
    detailLabels: ["Unit Kerja", "Bidang Layanan", "Jabatan / Posisi", "Masa Jabatan"],
    detailValues: ["Tata Usaha, keuangan, dan sarana prasarana", "Administrasi dan layanan sekolah", "Tenaga kependidikan", "Sesuai penugasan sekolah"],
    sectionBadge: "PERAN & TANGGUNG JAWAB",
    sectionTitle: "Peran &",
    sectionAccent: "Tanggung Jawab",
    sectionDescription: "Berperan dalam memastikan kebutuhan administrasi dan layanan operasional sekolah berjalan dengan tertib, tepat, dan mendukung aktivitas seluruh warga sekolah.",
    cards: [
      ["Administrasi", "Pengelolaan dokumen dan kebutuhan administrasi sekolah."],
      ["Layanan Internal", "Mendukung kebutuhan guru, peserta didik, dan unit kerja."],
      ["Operasional Sekolah", "Memastikan proses kerja berjalan sesuai kebutuhan sekolah."],
    ],
    backHref: "/tenaga-kependidikan",
  },
  pendukung: {
    badge: "TIM PENDUKUNG SEKOLAH",
    intro:
      "Berkontribusi menjaga lingkungan sekolah tetap aman, nyaman, bersih, dan siap mendukung aktivitas seluruh warga SMK Negeri 26 Jakarta.",
    detailLabels: ["Peran", "Area Tugas", "Unit", "Masa Tugas"],
    detailValues: ["Keamanan dan kebersihan lingkungan", "Lingkungan sekolah", "Sarana dan prasarana", "Sesuai penugasan sekolah"],
    sectionBadge: "PERAN DI BALIK LAYAR",
    sectionTitle: "Peran di",
    sectionAccent: "Balik Layar",
    sectionDescription: "Setiap aktivitas di sekolah membutuhkan lingkungan yang aman, nyaman, dan terjaga. Mereka hadir untuk memastikan semuanya berjalan sebagaimana mestinya.",
    cards: [
      ["Keamanan", "Menjaga keamanan dan ketertiban lingkungan sekolah."],
      ["Kenyamanan", "Mendukung lingkungan sekolah yang bersih dan nyaman."],
      ["Kesiapan", "Memastikan fasilitas dan area sekolah siap digunakan setiap hari."],
    ],
    backHref: "/tim-pendukung-sekolah",
  },
};

function DetailCard({ title, description, index = 0 }: { title: string; description: string; index?: number }) {
  return (
    <article data-aos="fade-up" data-aos-delay={index * 90} className="flex h-[200px] w-full max-w-[400px] shrink-0 flex-col items-start gap-8 rounded-[24px] border-2 border-[#EAF5FA] bg-white p-[18px]">
      <div className="grid size-[50px] shrink-0 place-items-center">
        <img alt="" className="size-[50px] object-contain" src="/assets/pages/guru/bookicon.png" />
      </div>
      <div>
        <h3 className="m-0 text-[24px] font-bold leading-[30px] text-primary">{title}</h3>
        <p className="m-0 text-[12px] font-normal leading-[18px] text-[#0B1324]">{description}</p>
      </div>
    </article>
  );
}

export function GuruDetailPage({
  teacher,
  category,
}: {
  teacher: StaffMember;
  category: StaffCategory;
}) {
  const content = categoryContent[category];
  const [nameLead, ...nameRemainder] = teacher.name.split(" ");
  const [sectionLead, ...sectionRemainder] = content.sectionTitle.split(" ");
  const isVicePrincipal = [
    "Muhafiz Dwi Azhari",
    "Slamet",
    "Dimas Ahmad",
    "Riky Hamdan",
  ].includes(teacher.name);
  const backHref = isVicePrincipal ? "/struktur-unit-kerja" : content.backHref;

  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#f3f8ff] text-ink">
      <PublicNavbar />
      <main className="px-6 pb-16 pt-[132px] sm:px-8 lg:px-12">
        <section className="relative mx-auto max-w-[1180px] overflow-visible">
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[calc((1180px-100vw)/2)] top-0 z-0 hidden h-[480px] w-auto max-w-none select-none sm:block lg:h-[560px]"
            draggable={false}
            src={figmaAssets.detailGuru.cornerCircles}
          />
          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-9">
            <img
              data-aos="fade-right"
              alt={`Foto ${teacher.name}`}
              className="h-[420px] w-full max-w-[350px] shrink-0 rounded-[24px] object-cover object-top"
              draggable={false}
              src={teacher.photo}
            />
            <div className="min-w-0 max-w-[700px]" data-aos="fade-left">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
                <img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />{isVicePrincipal ? teacher.role.toUpperCase() : content.badge}
              </span>
              <h1 className="mt-6 text-3xl font-bold leading-9 sm:text-4xl">
                <span className="text-[#006CDC]">{nameLead}</span>{" "}
                {nameRemainder.length > 0 && (
                  <span className="text-ink">{nameRemainder.join(" ")}</span>
                )}
              </h1>
              <p className="mt-8 max-w-[700px] text-sm leading-6 text-muted">
                {content.intro}
              </p>
              <dl className="mt-6 grid max-w-[700px] grid-cols-1 gap-x-10 gap-y-4 text-xs sm:grid-cols-2">
                {content.detailLabels.map((label, index) => (
                  <div key={label}>
                    <dt className="bg-[linear-gradient(90deg,#006CDC_0%,#0092FF_100%)] bg-clip-text text-[20px] font-bold not-italic leading-[30px] text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{label}</dt>
                    <dd className="mt-1 leading-5 text-muted">{index === 1 ? teacher.role : content.detailValues[index]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <section className="mx-auto mt-12 max-w-[1180px]">
          <div className="mb-4 text-left">
            <div data-aos="fade-down">
              <span className="flex w-fit items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-medium text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)] mx-auto">
                <img className="h-[17px] w-[13.6px]" src="/assets/shared/icons/section-badge.svg" alt="" aria-hidden="true" />{content.sectionBadge}
              </span>
            </div>
            <h2 data-aos="fade-up" data-aos-delay="100" className="mt-8 text-3xl font-bold leading-9 text-ink sm:text-4xl">
              <span className="text-ink">{sectionLead}</span>{" "}
              <span className={gradientText}>
                {sectionRemainder.join(" ")} {content.sectionAccent}
              </span>
            </h2>
              <p data-aos="fade-up" data-aos-delay="180" className="mt-4 max-w-[760px] text-sm leading-6 text-muted">{content.sectionDescription}</p>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3 md:gap-6">
            {content.cards.map(([title, description], index) => (
              <DetailCard description={description} index={index} key={title} title={title} />
            ))}
          </div>
          <a className="mt-7 inline-flex rounded-full bg-[linear-gradient(90deg,#006cdc,#0092ff,#4cbaf5)] px-5 py-2.5 text-sm font-bold text-white hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary" href={backHref}>
            Kembali ke daftar
          </a>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
