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
import { Link } from "../routes/compat";

export function DashboardPage() {
  const { me, hasPermission } = useAuth();
  const [learning, setLearning] = useState<LearningSummary | null>(null);
  const isStudent = me?.profile.account_type === "STUDENT";

  useEffect(() => {
    if (isStudent) getLearningSummary().then(setLearning).catch(() => setLearning(null));
  }, [isStudent]);

  return <RequireAuth>{isStudent ? <StudentDashboard me={me} learning={learning} /> : <StaffDashboard me={me} hasPermission={hasPermission} />}</RequireAuth>;
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
  return <PortalLayout><div className="portal-intro"><div><p className="text-sm font-medium text-primary">Ruang kerja internal</p><h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Selamat datang, {me?.profile.display_name}</h1><p className="mt-3 max-w-2xl text-base leading-7 text-muted">Akses pembelajaran dan tugas sekolah yang ditugaskan untuk akun Anda.</p></div><div className="hidden rounded-2xl bg-white/80 p-4 sm:block"><p className="text-xs font-medium uppercase tracking-[.12em] text-muted">Akun aktif</p><p className="mt-2 text-lg font-bold text-primary-dark">{me?.profile.account_type}</p></div></div><div className="mt-8 grid gap-5 md:grid-cols-2">{hasPermission("grades:manage") && <StaffCard to="/dashboard/grades" eyebrow="Kompetensi siswa" title="Input Nilai" copy="Kelola assessment hanya pada kelas dan mata pelajaran yang ditugaskan." />}{hasPermission("content:manage") && <StaffCard to="/admin/knowledge" eyebrow="Konten publik" title="Knowledge Base" copy="Tinjau sumber informasi sebelum digunakan chatbot publik." />}</div></PortalLayout>;
}

function StaffCard({ to, eyebrow, title, copy }: { to: string; eyebrow: string; title: string; copy: string }) {
  return <Link to={to} className="group relative overflow-hidden rounded-[24px] border border-light-blue bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,.1)]"><p className="relative text-sm font-medium text-primary">{eyebrow}</p><h2 className="relative mt-8 text-2xl font-bold text-ink">{title}</h2><p className="relative mt-2 max-w-sm text-sm leading-6 text-muted">{copy}</p><span className="relative mt-6 inline-flex text-sm font-bold text-primary">Buka modul <span className="ml-2 transition group-hover:translate-x-1">→</span></span></Link>;
}
