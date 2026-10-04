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
import { HomepageSections } from "./components/public/HomepageSections";
import { PublicFooter } from "./components/public/PublicFooter";
import { ProfilePage } from "./pages/ProfilePage";
import { MarsPage } from "./pages/MarsPage";

type Page = {
  id: string;
  slug: string;
  section: string;
  title: string;
  summary: string;
  body: string;
  metadata: Record<string, unknown>;
};
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
        <section className="mt-14">
          {error ? (
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
    <div className="min-h-screen bg-[#F4F8FF]">
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
  if (path === "/profile") return <PublicExperience><ProfilePage /></PublicExperience>;
  if (path === "/mars") return <PublicExperience><MarsPage /></PublicExperience>;
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
