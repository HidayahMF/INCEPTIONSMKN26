import { useEffect, useState, type ReactNode } from "react";
import { PublicNavbar } from "./components/public/PublicNavbar";
import { HeroSection } from "./components/public/HeroSection";
import { ShortcutMenu } from "./components/public/ShortcutMenu";
import { SchoolOverview } from "./components/public/SchoolOverview";
import { SchoolAdvantages } from "./components/public/SchoolAdvantages";
import { PartnerLogos } from "./components/public/PartnerLogos";
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

type Page = {
  id: string;
  slug: string;
  section: string;
  title: string;
  summary: string;
  body: string;
  metadata: Record<string, unknown>;
};
const publicLinks = [
  { path: "/profile", label: "Profil" },
  { path: "/majors", label: "Jurusan" },
  { path: "/programs", label: "Program" },
  { path: "/news", label: "Berita" },
  { path: "/contact", label: "Kontak" },
];

function Header() {
  return (
    <header className="container nav mx-auto">
      <a className="logo" href="/">
        SMK NEGERI 26 JAKARTA
      </a>
      <nav className="links" aria-label="Navigasi utama">
        {publicLinks.map((link) => (
          <a
            className="transition-colors hover:text-primary"
            key={link.path}
            href={link.path}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <a
        className="button transition-colors hover:bg-primary-dark"
        href="/login"
      >
        Masuk Portal
      </a>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container">
        <strong>SMK Negeri 26 Jakarta</strong>
        <p className="note">
          Informasi resmi sekolah akan ditampilkan setelah diverifikasi dan
          dipublikasikan.
        </p>
      </div>
    </footer>
  );
}
function EmptyState({
  message = "Konten resmi belum tersedia.",
}: {
  message?: string;
}) {
  return (
    <div className="empty-state">
      <strong>Belum ada informasi</strong>
      <p>{message}</p>
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
  useEffect(() => {
    api<Page[]>(`/api/public/pages?section=${section}`)
      .then(setPages)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Konten gagal dimuat."),
      );
  }, [section]);
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="pill">SMK Negeri 26 Jakarta</div>
            <h1>{title}</h1>
            <p className="lead">{intro}</p>
          </div>
        </section>
        <section className="section container">
          {error ? (
            <div className="error-state">{error}</div>
          ) : pages.length ? (
            <div className="content-grid">
              {pages.map((page) => (
                <article className="card content-card" key={page.id}>
                  <h2>{page.title}</h2>
                  {page.summary && <p className="lead">{page.summary}</p>}
                  <div className="rich-text">{page.body}</div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="Admin dapat menambahkan konten melalui dashboard knowledge base dan memublikasikannya setelah verifikasi." />
          )}
        </section>
      </main>
      <Footer />
    </>
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
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <main>
        <HeroSection onAskAi={askAi} />
        <ShortcutMenu onAskAi={askAi} />
        <SchoolOverview pages={pages} loading={loading} />
        <SchoolAdvantages />
        <PartnerLogos />
        <SchoolMajors />
      </main>
    </div>
  );
}

function PublicExperience({ children }: { children: ReactNode }) {
  return <PublicChatProvider><AOSInitializer />{children}<FloatingChatbot /><PublicChatRoom /></PublicChatProvider>;
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
      "Mitra industri akan ditampilkan setelah data dan hak publikasi dikonfirmasi.",
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
  if (path === "/majors") return <PublicExperience><MajorsPage /></PublicExperience>;
  if (path === "/" || path === "/tour" || path === "/tour/lapangan" || ["/profile", "/organization", "/partners", "/blud", "/programs", "/achievements", "/news", "/information", "/contact"].includes(path)) return <PublicExperience><LegacyApp /></PublicExperience>;
  if (!["/login", "/dashboard", "/dashboard/learning", "/dashboard/grades", "/admin/knowledge"].includes(path)) return <LegacyApp />;
  return <AuthProvider>
    {path === "/login" && <LoginPage />}
    {path === "/dashboard" && <DashboardPage />}
    {path === "/dashboard/learning" && <LearningRecommendationPage />}
    {path === "/dashboard/grades" && <TeacherGradesPage />}
    {path === "/admin/knowledge" && <AdminKnowledgePage />}
  </AuthProvider>;
}
