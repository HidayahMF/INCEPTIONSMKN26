import { useEffect, useState } from "react";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { getLearningSummary } from "../features/learning/learning.api";
import type { LearningSummary } from "../features/learning/learning.types";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { StudentGreeting } from "../components/student/StudentGreeting";
import {
  AspirationsCard,
  LearningCard,
  LostFoundCard,
  NextActionCard,
  PklApplicationsCard,
  PortfolioCard,
  RecentActivityCard,
} from "../components/student/StudentDashboardSections";
import { PortalLayout } from "../layouts/PortalLayout";
import { Link, Navigate } from "../routes/compat";
import { TeacherDashboardPage } from "./TeacherDashboardPage";
import { getActiveRolePresentation } from "../features/auth/rolePresentation";
import { getCachedApi } from "../lib/api";

export function DashboardPage() {
  const { me, hasPermission } = useAuth();
  const [learning, setLearning] = useState<LearningSummary | null>(() => getCachedApi<LearningSummary>("/api/student/learning") || null);
  const isStudentAccount = me?.profile.account_type === "STUDENT";
  const isStudentPortal = isStudentAccount && !["aspirations:review", "portfolio:review", "pkl:manage", "lost_found:manage", "merchant:manage", "content:manage", "admin:manage"].some((permission) => hasPermission(permission));

  useEffect(() => {
    if (isStudentPortal) getLearningSummary().then(setLearning).catch(() => undefined);
  }, [isStudentPortal]);

  return <RequireAuth>{isStudentPortal ? <StudentDashboard me={me} learning={learning} /> : hasPermission("admin:manage") ? <Navigate to="/admin/management" replace /> : me?.profile.account_type === "TEACHER" && hasPermission("grades:manage") ? <TeacherDashboardPage /> : <StaffDashboard me={me} hasPermission={hasPermission} />}</RequireAuth>;
}

function StudentDashboard({ me, learning }: { me: ReturnType<typeof useAuth>["me"]; learning: LearningSummary | null }) {
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const preview = { isDemo };
  return (
    <StudentPortalLayout>
      <div className="grid gap-6">
        <StudentGreeting me={me} isDemo={isDemo} />
        <NextActionCard preview={preview} />
        <PklApplicationsCard preview={preview} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.78fr)]">
          <PortfolioCard preview={preview} />
          <AspirationsCard preview={preview} />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <LostFoundCard preview={preview} />
          <LearningCard preview={preview} learning={learning} />
        </div>
        <RecentActivityCard preview={preview} />
        <p className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</p>
      </div>
    </StudentPortalLayout>
  );
}

function StaffDashboard({ me, hasPermission }: { me: ReturnType<typeof useAuth>["me"]; hasPermission: (permission: string) => boolean }) {
  const rolePresentation = getActiveRolePresentation(me);
  const cards = [
    hasPermission("grades:manage") && { to: "/dashboard/grades", eyebrow: "Kompetensi siswa", title: "Input Nilai", copy: "Kelola assessment hanya pada kelas dan mata pelajaran yang ditugaskan." },
    hasPermission("content:manage") && { to: "/admin/knowledge", eyebrow: "Konten publik", title: "Knowledge Base", copy: "Tinjau sumber informasi sebelum digunakan chatbot publik." },
    hasPermission("portfolio:review") && { to: "/dashboard/teacher/portfolio-review", eyebrow: "Bukti kompetensi", title: "Review Portofolio", copy: "Tinjau karya dan prestasi siswa sesuai kewenangan Anda." },
    hasPermission("pkl:manage") && { to: "/dashboard/teacher/pkl", eyebrow: "Dunia industri", title: "BKK & PKL", copy: "Kelola lowongan dan tinjau proses lamaran siswa." },
    hasPermission("lost_found:manage") && { to: "/dashboard/teacher/lost-found", eyebrow: "Layanan siswa", title: "Lost & Found", copy: "Verifikasi laporan dan proses klaim barang siswa." },
    hasPermission("aspirations:review") && { to: "/dashboard/teacher/aspirations", eyebrow: "Suara siswa", title: "Aspirasi Kelas", copy: "Tinjau dan tindak lanjuti aspirasi yang masuk." },
    hasPermission("merchant:manage") && { to: "/dashboard/teacher/canteen", eyebrow: "Operasional", title: "Kantin Digital", copy: "Kelola produk dan pesanan merchant yang ditugaskan." },
  ].filter(Boolean) as Array<{ to: string; eyebrow: string; title: string; copy: string }>;
  return <PortalLayout breadcrumb="Beranda"><div className="grid min-w-0 gap-6"><header className="flex min-w-0 flex-col gap-2"><p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">{rolePresentation.portalContextLabel}</p><h1 className="break-words text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Selamat datang, {me?.profile.display_name || "Akun sekolah"}</h1><p className="max-w-2xl text-[13px] leading-6 text-muted">Akses modul sesuai peran dan penugasan akun Anda.</p></header><div className="grid gap-4 md:grid-cols-2">{cards.map((card) => <StaffCard key={card.to} {...card} />)}</div>{cards.length === 0 && <p className="rounded-2xl border border-dashed border-[#cbd9e8] bg-white p-6 text-[13px] text-muted">Belum ada modul yang ditugaskan untuk akun ini.</p>}</div></PortalLayout>;
}

function StaffCard({ to, eyebrow, title, copy }: { to: string; eyebrow: string; title: string; copy: string }) {
  return <Link to={to} className="group relative overflow-hidden rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.08)]"><p className="relative text-[11px] font-semibold uppercase tracking-[.08em] text-primary">{eyebrow}</p><h2 className="relative mt-4 text-[19px] font-bold text-ink">{title}</h2><p className="relative mt-2 max-w-sm text-[12px] leading-5 text-muted">{copy}</p><span className="relative mt-5 inline-flex text-[12px] font-bold text-primary">Buka modul <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link>;
}
