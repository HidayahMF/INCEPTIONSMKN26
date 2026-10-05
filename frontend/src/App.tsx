import { useEffect, useState, type ReactNode } from "react";
import { PublicNavbar } from "./components/public/PublicNavbar";
import { HeroSection } from "./components/public/HeroSection";
import { ShortcutMenu } from "./components/public/ShortcutMenu";
import { SchoolOverview } from "./components/public/SchoolOverview";
import { SchoolAdvantages } from "./components/public/SchoolAdvantages";
import { PartnerIndustryPage, PartnerLogos } from "./components/public/PartnerLogos";
import { TourPage } from "./pages/TourPage";
import { LapanganTourPage } from "./pages/LapanganTourPage";
import { AuthProvider } from "./features/auth/AuthProvider";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminKnowledgePage } from "./pages/AdminKnowledgePage";
import { LearningRecommendationPage } from "./features/learning/pages/LearningRecommendationPage";
import { TeacherGradesPage } from "./features/learning/pages/TeacherGradesPage";
import { usePathname } from "./routes/compat";
import { api } from "./lib/api";
import { FloatingChatbot } from "./components/public/FloatingChatbot";
import { PublicChatProvider } from "./features/chat/ChatProvider";
import { PublicChatRoom } from "./features/chat/PublicChatRoom";
import { AOSInitializer } from "./components/public/AOSInitializer";
import { SchoolMajors } from "./components/public/SchoolMajors";
import { MajorsPage } from "./pages/MajorsPage";
import { KgsPage } from "./pages/KgsPage";
import { TekPage } from "./pages/TekPage";
import { TitlPage } from "./pages/TitlPage";
import { TflmPage } from "./pages/TflmPage";
import { TkrPage } from "./pages/TkrPage";
import { SijaPage } from "./pages/SijaPage";
import { KgStudioPage } from "./pages/KgStudioPage";
import { UptechnoPage } from "./pages/UptechnoPage";
import { EmanPage } from "./pages/EmanPage";
import { BludServicePage } from "./pages/BludServicePage";
import { HomepageSections } from "./components/public/HomepageSections";
import { PublicFooter } from "./components/public/PublicFooter";
import { ProfilePage } from "./pages/ProfilePage";
import { MarsPage } from "./pages/MarsPage";
import { StrukturUnitKerjaPage } from "./pages/StrukturUnitKerjaPage";
import {
  GuruNormatifAdaptifPage,
} from "./pages/GuruNormatifAdaptifPage";
import { GuruKejuruanPage } from "./pages/GuruKejuruanPage";
import { TenagaKependidikanPage } from "./pages/TenagaKependidikanPage";
import { TimPendukungSekolahPage } from "./pages/TimPendukungSekolahPage";
import { AdvantageDetailPage } from "./pages/AdvantageDetailPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { newsItems } from "./data/news";
import { majors } from "./data/majors";
import { advantages } from "./data/advantages";
import { tourLocations } from "./data/tourLocations";
import { GuruDetailPage, type StaffCategory } from "./pages/GuruDetailPage";
import { staffSlug } from "./pages/TeacherDirectoryPage";
import {
  educationStaff,
  normativeTeachers,
  supportTeam,
  vocationalTeachers,
} from "./data/organization";

type Page = {
  id: string;
  slug: string;
  section: string;
  title: string;
  summary: string;
  body: string;
  metadata: Record<string, unknown>;
};

const informationPortals = [
  {
    title: "Portal LMS-SIMAK26",
    image: "SIMAK 26.png",
    href: "https://lms.smkn26jkt.sch.id/",
  },
  {
    title: "Portal Perpus26",
    image: "Perpustakaan Digital.png",
    href: "https://perpus.smkn26jkt.sch.id/",
  },
  {
    title: "Portal SPMB",
    image: "SPMB.png",
    href: "https://spmb.jakarta.go.id/",
  },
  {
    title: "Portal KJP",
    image: "kjp.png",
    href: "https://edu.jakarta.go.id/kjp/login",
  },
  {
    title: "Portal PIP",
    image: "pip.png",
    href: "https://pip.kemendikdasmen.go.id/home_v1",
  },
] as const;

const majorHeroImages: Record<string, string> = {
  KGS: "/assets/figma/KGS/Hero%20Section.png",
  TEK: "/assets/figma/TEK/Hero%20Section.png",
  TITL: "/assets/figma/TITL/Hero%20Section%20(1).png",
  TFLM: "/assets/figma/TFLM/Hero%20Section%20(2).png",
  TKR: "/assets/figma/TKR/Hero%20Section%20(3).png",
  SIJA: "/assets/figma/SIJA/Hero%20Section%20(5).png",
};

const searchableInformation = [
  { title: "Profil SMK Negeri 26 Jakarta", category: "Profil", summary: "Mengenal sekolah, visi misi, sejarah, identitas, dan perjalanan SMK Negeri 26 Jakarta.", href: "/profile", image: undefined },
  { title: "Program Sekolah", category: "Program", summary: "Informasi program sekolah, LSP, organisasi, ekstrakurikuler, dan BKK.", href: "/programs", image: undefined },
  { title: "Prestasi Siswa", category: "Prestasi", summary: "Karya dan prestasi siswa SMK Negeri 26 Jakarta.", href: "/achievements", image: undefined },
  ...majors.map((major) => ({ title: major.name, category: `Jurusan ${major.code}`, summary: major.description, href: major.href, image: majorHeroImages[major.id] })),
  ...advantages.map((advantage) => ({ title: advantage.title, category: "Keunggulan", summary: advantage.summary, href: `/advantages/${advantage.slug}`, image: advantage.image })),
  ...newsItems.map((news) => ({ title: news.title, category: news.category, summary: news.description, href: `/news/${news.slug}`, image: news.image })),
  ...informationPortals.map((portal) => ({ title: portal.title, category: "Portal Informasi", summary: "Akses portal resmi yang digunakan untuk layanan dan informasi sekolah.", href: portal.href, image: `/assets/figma/portalinformasi/${encodeURIComponent(portal.image)}`, external: true })),
];

function EmptyState({
  message = "Konten resmi belum tersedia.",
}: {
  message?: string;
}) {
  return (
    <div className="rounded-3xl border border-school-bg bg-white px-7 py-14 text-center shadow-[0_4px_16px_rgba(15,23,42,.08)]">
      <strong className="block text-lg text-ink">Belum ada informasi</strong>
      <p className="mx-auto mt-2 max-w-[520px] text-sm leading-[24px] text-muted">
        {message}
      </p>
    </div>
  );
}

function PublicPage({
  section,
  title,
  intro,
}: {
  section: string;
  title: string;
  intro: string;
}) {
  const [pages, setPages] = useState<Page[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get("q")?.trim() ?? "");
  useEffect(() => {
    api<Page[]>(`/api/public/pages?section=${section}`)
      .then(setPages)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Konten gagal dimuat."),
      );
  }, [section]);
  return (
    <div className="min-h-screen bg-[#F4F8FF]">
      <PublicNavbar />
      <main className="mx-auto w-[min(1272px,100%-32px)] pt-[132px] pb-24">
        <section className="mx-auto w-[min(872px,100%)] text-center">
          <span className="section-badge inline-flex items-center gap-1 rounded-full bg-[#f6fbff] px-3 py-[5px] text-sm font-semibold text-soft-blue shadow-[0_4px_16px_rgba(15,23,42,.08)]">
            <img
              className="h-[17px] w-[13.6px]"
              src="/assets/figma/majors/icon-section-badge.svg"
              alt=""
            />
            SMK NEGERI 26 JAKARTA
          </span>
          <h1 className="mt-5 mb-2.5 text-4xl leading-[54px] font-bold text-ink max-md:text-[32px] max-md:leading-[1.2]">
            {title}
          </h1>
          <p className="mx-auto w-[774px] max-w-full text-lg leading-[30px] text-muted">
            {intro}
          </p>
        </section>
        {section === "information" && (
          <form
            className="mx-auto mt-10 flex h-12 w-full max-w-[720px] gap-2 rounded-full border-2 border-school-bg bg-white p-1.5 shadow-[0_4px_16px_rgba(15,23,42,.06)] focus-within:border-primary"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              const value = query.trim();
              window.location.href = value ? `/information?q=${encodeURIComponent(value)}` : "/information";
            }}
          >
            <label className="sr-only" htmlFor="information-search">Cari informasi sekolah</label>
            <input id="information-search" className="min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-ink outline-none placeholder:text-muted" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari jurusan, berita, prestasi, portal..." />
            <button className="rounded-full bg-gradient-to-r from-primary-dark via-primary to-soft-blue px-6 text-sm font-semibold text-white transition hover:bg-white hover:bg-none hover:text-primary" type="submit">Cari</button>
          </form>
        )}
        <section className="mt-14">
          {section === "information" && query ? (
            (() => {
              const normalizedQuery = query.toLocaleLowerCase();
              const staticResults = searchableInformation.filter((item) => `${item.title} ${item.category} ${item.summary}`.toLocaleLowerCase().includes(normalizedQuery));
              const apiResults = pages.filter((page) => `${page.title} ${page.summary} ${page.body}`.toLocaleLowerCase().includes(normalizedQuery)).map((page) => ({ title: page.title, category: "Informasi sekolah", summary: page.summary || page.body, href: "/information", image: undefined }));
              const results = [...staticResults, ...apiResults];
              return results.length ? (
                <div>
                  <p className="mb-6 text-sm text-muted">Menampilkan {results.length} hasil untuk <strong className="text-ink">“{query}”</strong></p>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {results.map((result, index) => (
                      <a className="group rounded-3xl border border-school-bg bg-white p-6 no-underline shadow-[0_4px_16px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:border-primary hover:shadow-xl" href={result.href} target={"external" in result && result.external ? "_blank" : undefined} rel={"external" in result && result.external ? "noreferrer" : undefined} key={`${result.href}-${result.title}-${index}`}>
                        {result.image && <div className="-mx-6 -mt-6 mb-6 h-48 overflow-hidden rounded-t-3xl bg-school-bg"><img className="block size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" src={result.image} alt={result.title} /></div>}
                        <span className="text-xs font-semibold text-primary">{result.category}</span>
                        <h2 className="mt-3 text-xl font-bold text-ink">{result.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-muted">{result.summary}</p>
                        <span className="mt-5 inline-block text-sm font-semibold text-primary group-hover:underline">Lihat informasi →</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-school-bg bg-white px-7 py-14 text-center shadow-[0_4px_16px_rgba(15,23,42,.08)]">
                  <strong className="block text-lg text-ink">Informasi belum ditemukan</strong>
                  <p className="mx-auto mt-2 max-w-[520px] text-sm leading-6 text-muted">Coba gunakan kata kunci seperti jurusan, berita, prestasi, portal, atau profil.</p>
                </div>
              );
            })()
          ) : section === "information" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {informationPortals.map((portal) => (
                <a
                  className="group overflow-hidden rounded-3xl border border-school-bg bg-white shadow-[0_4px_16px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
                  href={portal.href}
                  key={portal.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={`/assets/figma/portalinformasi/${encodeURIComponent(portal.image)}`}
                    alt={portal.title}
                  />
                  <h2 className="p-5 text-xl font-bold text-ink">{portal.title}</h2>
                </a>
              ))}
            </div>
          ) : section === "news" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {newsItems.map((news) => (
                <a
                  className="group overflow-hidden rounded-3xl border border-school-bg bg-white no-underline shadow-[0_4px_16px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
                  href={`/news/${news.slug}`}
                  key={news.slug}
                >
                  <img
                    className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={news.image}
                    alt={news.title}
                  />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary">{news.category}</span>
                    <h2 className="mt-2 text-xl leading-7 font-bold text-ink">{news.title}</h2>
                    <time className="mt-3 block text-xs text-muted">{news.date}</time>
                    <p className="mt-3 text-sm leading-6 text-muted">{news.description}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-3xl border border-red-200 bg-white px-7 py-6 text-sm text-red-700 shadow-[0_4px_16px_rgba(15,23,42,.08)]"
            >
              {error}
            </div>
          ) : pages.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pages.map((page) => (
                <article
                  className="rounded-3xl border border-school-bg bg-white p-7 shadow-[0_4px_16px_rgba(15,23,42,.08)]"
                  key={page.id}
                >
                  <h2 className="text-xl leading-[30px] font-bold text-ink">
                    {page.title}
                  </h2>
                  {page.summary && (
                    <p className="mt-3 text-sm leading-[22px] text-muted">
                      {page.summary}
                    </p>
                  )}
                  <div className="mt-4 text-sm leading-[24px] text-muted">
                    {page.body}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="Admin dapat menambahkan konten melalui dashboard knowledge base dan memublikasikannya setelah verifikasi." />
          )}
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

function Home() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api<Page[]>("/api/public/pages?section=home")
      .then(setPages)
      .catch(() => setPages([]))
      .finally(() => setLoading(false));
  }, []);
  const askAi = () => window.dispatchEvent(new Event("open-chat"));
  return (
    <div className="min-h-screen min-w-0 max-w-full overflow-x-clip bg-[#F4F8FF]">
      <PublicNavbar />
      <main>
        <HeroSection onAskAi={askAi} />
        <ShortcutMenu onAskAi={askAi} />
        <SchoolOverview pages={pages} loading={loading} />
        <SchoolAdvantages />
        <PartnerLogos />
        <SchoolMajors />
        <HomepageSections onAskAi={askAi} />
      </main>
      <PublicFooter />
    </div>
  );
}

function PublicExperience({ children }: { children: ReactNode }) {
  return <PublicChatProvider><AOSInitializer /><div className="min-w-0 max-w-full overflow-x-clip">{children}</div><FloatingChatbot /><PublicChatRoom /></PublicChatProvider>;
}

export function LegacyApp() {
  const path = window.location.pathname;
  if (path === "/") return <Home />;
  if (path === "/tour") return <TourPage />;
  if (path === "/tour/lapangan") return <LapanganTourPage />;
  const details: Record<string, [string, string, string]> = {
    "/profile": [
      "profile",
      "Profil Sekolah",
      "Profil, visi, misi, sejarah, struktur organisasi, dan unit kerja akan ditampilkan dari konten terverifikasi.",
    ],
    "/organization": [
      "organization",
      "Struktur Organisasi",
      "Struktur organisasi dan unit kerja akan ditampilkan dari sumber resmi.",
    ],
    "/majors": [
      "majors",
      "Jurusan",
      "Informasi kompetensi keahlian dan perjalanan belajar akan ditampilkan setelah disetujui.",
    ],
    "/partners": [
      "partners",
      "Mitra Industri",
      "Mitra industri SMKN 26 Jakarta.",
    ],
    "/blud": [
      "blud",
      "BLUD",
      "Informasi unit BLUD terverifikasi akan ditampilkan setelah tersedia.",
    ],
    "/programs": [
      "programs",
      "Program Sekolah",
      "LSP, OSIS/MPK, ekstrakurikuler, BKK, dan BLUD akan ditampilkan dari sumber resmi.",
    ],
    "/achievements": [
      "achievements",
      "Prestasi",
      "Prestasi sekolah yang telah diverifikasi akan tersedia di halaman ini.",
    ],
    "/news": [
      "news",
      "Berita",
      "Berita sekolah yang telah diverifikasi akan tersedia di halaman ini.",
    ],
    "/information": [
      "information",
      "Portal Informasi",
      "Informasi publik sekolah yang telah diverifikasi.",
    ],
    "/contact": [
      "contact",
      "Kontak dan Lokasi",
      "Alamat, kontak, dan lokasi resmi sekolah akan ditampilkan setelah dikonfirmasi.",
    ],
  };
  const detail = details[path] || details["/information"];
  return <PublicPage section={detail[0]} title={detail[1]} intro={detail[2]} />;
}

export function App() {
  const path = usePathname();
  if (path.startsWith("/guru/")) {
    const slug = decodeURIComponent(path.slice("/guru/".length));
    const groups: [StaffCategory, typeof normativeTeachers][] = [
      ["normatif", normativeTeachers],
      ["kejuruan", vocationalTeachers],
      ["kependidikan", educationStaff],
      ["pendukung", supportTeam],
    ];
    for (const [category, members] of groups) {
      const teacher = members.find((member) => staffSlug(member) === slug);
      if (teacher) return <PublicExperience><GuruDetailPage category={category} teacher={teacher} /></PublicExperience>;
    }
  }
  if (path.startsWith("/advantages/")) {
    return <PublicExperience><AdvantageDetailPage slug={path.slice("/advantages/".length)} /></PublicExperience>;
  }
  if (path.startsWith("/news/")) {
    return <PublicExperience><NewsDetailPage slug={path.slice("/news/".length)} /></PublicExperience>;
  }
  if (path.startsWith("/tour/")) {
    const locationId = path.slice("/tour/".length);
    const location = tourLocations.find((item) => item.id === locationId);
    if (location) return <PublicExperience><LapanganTourPage location={location} /></PublicExperience>;
  }
  if (path === "/majors") return <PublicExperience><MajorsPage /></PublicExperience>;
  if (path === "/majors/kgs") return <PublicExperience><KgsPage /></PublicExperience>;
  if (path === "/majors/tek") return <PublicExperience><TekPage /></PublicExperience>;
  if (path === "/majors/titl") return <PublicExperience><TitlPage /></PublicExperience>;
  if (path === "/majors/tflm") return <PublicExperience><TflmPage /></PublicExperience>;
  if (path === "/majors/tkr") return <PublicExperience><TkrPage /></PublicExperience>;
  if (path === "/majors/sija") return <PublicExperience><SijaPage /></PublicExperience>;
  if (path === "/blud/kgstudio") return <PublicExperience><KgStudioPage /></PublicExperience>;
  if (path === "/blud/uptechno") return <PublicExperience><UptechnoPage /></PublicExperience>;
  if (path === "/blud/e-man") return <PublicExperience><EmanPage /></PublicExperience>;
  if (path === "/blud/manufaktur26") return <PublicExperience><BludServicePage service="manufaktur26" /></PublicExperience>;
  if (path === "/blud/garage26") return <PublicExperience><BludServicePage service="garage26" /></PublicExperience>;
  if (path === "/blud/gadiz-vokasi") return <PublicExperience><BludServicePage service="gadizVokasi" /></PublicExperience>;
  if (path === "/profile") return <PublicExperience><ProfilePage /></PublicExperience>;
  if (path === "/mars") return <PublicExperience><MarsPage /></PublicExperience>;
  if (path === "/struktur-unit-kerja") return <PublicExperience><StrukturUnitKerjaPage /></PublicExperience>;
  if (path === "/guru-normatif-adaptif") return <PublicExperience><GuruNormatifAdaptifPage /></PublicExperience>;
  if (path === "/guru-kejuruan") return <PublicExperience><GuruKejuruanPage /></PublicExperience>;
  if (path === "/tenaga-kependidikan") return <PublicExperience><TenagaKependidikanPage /></PublicExperience>;
  if (path === "/tim-pendukung-sekolah") return <PublicExperience><TimPendukungSekolahPage /></PublicExperience>;
  if (path === "/partners") return <PublicExperience><div className="min-h-screen bg-white"><PublicNavbar /><PartnerIndustryPage /><PublicFooter /></div></PublicExperience>;
  if (path === "/" || path === "/tour" || path === "/tour/lapangan" || ["/profile", "/organization", "/blud", "/programs", "/achievements", "/news", "/information", "/contact"].includes(path)) return <PublicExperience><LegacyApp /></PublicExperience>;
  if (!["/login", "/dashboard", "/dashboard/learning", "/dashboard/grades", "/admin/knowledge"].includes(path)) return <LegacyApp />;
  return <AuthProvider>
    {path === "/login" && <LoginPage />}
    {path === "/dashboard" && <DashboardPage />}
    {path === "/dashboard/learning" && <LearningRecommendationPage />}
    {path === "/dashboard/grades" && <TeacherGradesPage />}
    {path === "/admin/knowledge" && <AdminKnowledgePage />}
  </AuthProvider>;
}
