import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { Link, usePathname } from "../routes/compat";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { ActionModal } from "../components/shared/ActionModal";
import {
  demoPortfolioProjects,
  demoStudentAchievements,
} from "../components/student/portfolio/portfolio.data";
import type {
  PortfolioProject,
  StudentAchievement,
  VerificationStatus,
} from "../components/student/portfolio/portfolio.types";
import {
  createAchievement,
  createPortfolio,
  getAchievements,
  getPortfolioProjects,
  removeAchievement,
  removePortfolio,
  statusLabel,
  submitAchievement,
  submitPortfolio,
  uploadPortfolioFile,
} from "../components/student/portfolio/portfolio.api";

type PortfolioTab = "projects" | "achievements" | "pkl";
const portfolioIcon = "/assets/pages/siswapages/portofolioprestasi.png";
const achievementImage = "/assets/pages/siswapages/finalis.png";
const workIcon = "/assets/pages/portofoliodanprestasi/total-karya.png";
const inputClass =
  "h-11 w-full rounded-xl border border-[#cbd9ea] bg-white px-3 text-[12px] text-ink outline-none transition placeholder:text-[#9aaac2] focus:border-primary focus:ring-2 focus:ring-[#d7edff]";

export function StudentPortfolioPage() {
  const { me } = useAuth();
  return (
    <RequireAuth>
      {me?.profile.account_type === "STUDENT" ? (
        <StudentPortfolioContent />
      ) : (
        <StudentOnlyMessage />
      )}
    </RequireAuth>
  );
}

function StudentPortfolioContent() {
  const { me } = useAuth();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const [tab, setTab] = useState<PortfolioTab>("projects");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [year, setYear] = useState("all");
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [achievements, setAchievements] = useState<StudentAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    Promise.all([getPortfolioProjects(), getAchievements()])
      .then(([nextProjects, nextAchievements]) => {
        if (!active) return;
        setProjects(nextProjects);
        setAchievements(nextAchievements);
      })
      .catch((reason) => {
        if (active)
          setLoadError(
            reason instanceof Error
              ? reason.message
              : "Portofolio gagal dimuat.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);
  const categories = useMemo(
    () => [...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const years = useMemo(
    () => [
      ...new Set([
        ...projects.map((project) => project.date.slice(-4)),
        ...achievements.map((achievement) => achievement.date.slice(-4)),
      ]),
    ],
    [achievements, projects],
  );
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const haystack =
          `${project.title} ${project.category} ${project.summary} ${project.skills.join(" ")}`.toLowerCase();
        return (
          (!query.trim() || haystack.includes(query.trim().toLowerCase())) &&
          (category === "all" || project.category === category) &&
          (status === "all" || project.status === status) &&
          (year === "all" || project.date.endsWith(year))
        );
      }),
    [category, projects, query, status, year],
  );
  const filteredAchievements = useMemo(
    () =>
      achievements.filter((achievement) => {
        const haystack =
          `${achievement.title} ${achievement.competition} ${achievement.organizer} ${achievement.level} ${achievement.type}`.toLowerCase();
        return (
          (!query.trim() || haystack.includes(query.trim().toLowerCase())) &&
          (status === "all" || achievement.verificationStatus === status) &&
          (year === "all" || achievement.date.endsWith(year))
        );
      }),
    [achievements, query, status, year],
  );
  return (
    <StudentPortalLayout breadcrumb="Portofolio & Prestasi">
      <div className="grid min-w-0 gap-6">
        <header className="flex min-w-0 flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="break-words text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
                Portofolio &amp; Prestasi
              </h1>
              {isDemo && (
                <span className="rounded-full bg-[#fff7df] px-3 py-1 text-[10px] font-semibold text-[#b77a00]">
                  Data contoh
                </span>
              )}
            </div>
            <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">
              Kelola karya, dokumentasikan pencapaian, dan tunjukkan
              kompetensimu untuk masa depan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard/portfolio/new"
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-4 text-[12px] font-semibold text-white shadow-[0_5px_12px_rgba(0,126,233,.14)] transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border-[#b9dafa] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#b9dafa] focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              + Tambah Portofolio
            </Link>
            <Link
              to="/dashboard/portfolio/achievements/new"
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#b9dafa] bg-white px-4 text-[12px] font-semibold text-primary transition-[background-color,color,border-color,box-shadow] duration-300 hover:border-primary hover:bg-[#edf7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              + Tambah Prestasi
            </Link>
          </div>
        </header>

        {loadError && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]"
          >
            <span>{loadError}</span>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg border border-[#e6aab1] px-3 py-2 font-semibold hover:bg-white"
            >
              Coba lagi
            </button>
          </div>
        )}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="h-28 animate-pulse rounded-2xl bg-white" />
            <div className="h-28 animate-pulse rounded-2xl bg-white" />
            <div className="h-28 animate-pulse rounded-2xl bg-white" />
            <div className="h-28 animate-pulse rounded-2xl bg-white" />
          </div>
        ) : (
          <SummaryCards
            projects={projects}
            achievements={achievements}
            published={
              projects.filter(
                (project) => project.status === "VERIFIED" && project.isPublic,
              ).length
            }
            pending={
              achievements.filter(
                (achievement) => achievement.verificationStatus === "SUBMITTED",
              ).length
            }
          />
        )}
        <PortfolioTabs selected={tab} onChange={setTab} />
        {!loading && tab === "pkl" ? (
          <PklPortfolioDraft projects={projects} achievements={achievements} />
        ) : (
          !loading && (
            <>
              <FilterBar
                query={query}
                category={category}
                status={status}
                year={year}
                categories={categories}
                years={years}
                tab={tab}
                onQuery={setQuery}
                onCategory={setCategory}
                onStatus={setStatus}
                onYear={setYear}
              />
              {tab === "projects" ? (
                <ProjectGrid projects={filteredProjects} isDemo={isDemo} />
              ) : (
                <AchievementGrid
                  achievements={filteredAchievements}
                  isDemo={isDemo}
                />
              )}
            </>
          )
        )}
        <footer className="pb-1 text-[11px] text-muted">
          SMK Negeri 26 Jakarta · Portal Internal Siswa
        </footer>
      </div>
    </StudentPortalLayout>
  );
}

function SummaryCards({
  projects,
  achievements,
  published,
  pending,
}: {
  projects: PortfolioProject[];
  achievements: StudentAchievement[];
  published: number;
  pending: number;
}) {
  const cards = [
    {
      label: "Total Karya",
      value: projects.length,
      copy: "Proyek yang terdokumentasi",
    },
    {
      label: "Total Prestasi",
      value: achievements.length,
      copy: "Prestasi dan sertifikat",
    },
    {
      label: "Menunggu Verifikasi",
      value: pending,
      copy: "Perlu ditinjau petugas",
    },
    {
      label: "Dipublikasikan",
      value: published,
      copy: "Karya yang siap ditampilkan",
    },
  ];
  return (
    <section
      aria-label="Ringkasan portofolio"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => (
        <section
          key={card.label}
          className="min-w-0 rounded-2xl border border-[#e1e9f4] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.08)]"
        >
          <strong className="block text-[30px] font-bold leading-none text-ink">
            {card.value}
          </strong>
          <h2 className="mt-3 text-[13px] font-medium text-[#52658a]">
            {card.label}
          </h2>
          <p className="mt-2 break-words text-[11px] text-muted">{card.copy}</p>
        </section>
      ))}
    </section>
  );
}

function PortfolioTabs({
  selected,
  onChange,
}: {
  selected: PortfolioTab;
  onChange: (tab: PortfolioTab) => void;
}) {
  const tabs: { id: PortfolioTab; label: string }[] = [
    { id: "projects", label: "Karya & Proyek" },
    { id: "achievements", label: "Prestasi & Sertifikat" },
    { id: "pkl", label: "Portofolio PKL" },
  ];
  return (
    <div
      role="tablist"
      aria-label="Konten portofolio siswa"
      className="flex min-w-0 overflow-x-auto rounded-2xl border border-[#e1e9f4] bg-white [scrollbar-width:none]"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`portfolio-tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={selected === tab.id}
          aria-controls={`portfolio-panel-${tab.id}`}
          onClick={() => onChange(tab.id)}
          className={`min-h-12 shrink-0 border-b-2 px-5 text-[12px] font-semibold transition-colors sm:px-8 sm:text-[13px] ${selected === tab.id ? "border-primary text-primary" : "border-transparent text-[#637495] hover:border-[#b9dfff] hover:text-primary"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function FilterBar({
  query,
  category,
  status,
  year,
  categories,
  years,
  tab,
  onQuery,
  onCategory,
  onStatus,
  onYear,
}: {
  query: string;
  category: string;
  status: string;
  year: string;
  categories: string[];
  years: string[];
  tab: PortfolioTab;
  onQuery: (value: string) => void;
  onCategory: (value: string) => void;
  onStatus: (value: string) => void;
  onYear: (value: string) => void;
}) {
  return (
    <section className="grid gap-3 rounded-2xl border border-[#e1e9f4] bg-white p-4 shadow-[0_2px_8px_rgba(25,63,112,.02)] lg:grid-cols-[minmax(0,1fr)_180px_160px_140px]">
      <label className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-[#cbd9ea] px-3 text-muted focus-within:border-primary">
        <img
          className="size-4 object-contain"
          src="/assets/pages/siswapages/search.png"
          alt=""
          aria-hidden="true"
        />
        <span className="sr-only">Cari karya, prestasi, atau teknologi</span>
        <input
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#9aaac2]"
          placeholder="Cari karya, prestasi, atau teknologi..."
        />
      </label>
      <SelectFilter
        value={category}
        onChange={onCategory}
        options={categories}
        placeholder="Semua kategori"
        disabled={tab === "achievements"}
      />
      <SelectFilter
        value={status}
        onChange={onStatus}
        options={
          tab === "projects"
            ? ["DRAFT", "PUBLISHED"]
            : ["DRAFT", "PENDING", "VERIFIED", "REJECTED"]
        }
        placeholder="Semua status"
      />
      <SelectFilter
        value={year}
        onChange={onYear}
        options={years}
        placeholder="Semua tahun"
      />
    </section>
  );
}

function SelectFilter({
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 min-w-0 rounded-xl border border-[#cbd9ea] bg-white px-3 text-[11px] text-ink outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-[#f5f8fc] disabled:text-[#a2afc3]"
    >
      <option value="all">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {statusLabel(option as VerificationStatus)}
        </option>
      ))}
    </select>
  );
}

function ProjectGrid({
  projects,
  isDemo,
}: {
  projects: PortfolioProject[];
  isDemo: boolean;
}) {
  if (!projects.length)
    return (
      <EmptyPortfolio
        title="Belum ada karya yang sesuai"
        copy={
          isDemo
            ? "Coba ubah pencarian atau filter untuk melihat karya lainnya."
            : "Karya dan proyekmu akan tampil di sini setelah ditambahkan."
        }
        action="Tambah Portofolio"
        to="/dashboard/portfolio/new"
      />
    );
  return (
    <section
      id="portfolio-panel-projects"
      role="tabpanel"
      aria-labelledby="portfolio-tab-projects"
      className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const image = project.thumbnail || portfolioIcon;
  const [pending, setPending] = useState<"submit" | "delete" | null>(null);
  const [busy, setBusy] = useState(false);
  async function confirmAction() {
    if (!pending) return;
    setBusy(true);
    try {
      if (pending === "submit") await submitPortfolio(project.id);
      else await removePortfolio(project.id);
      window.location.reload();
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e1e9f4] bg-white shadow-[0_2px_8px_rgba(25,63,112,.02)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.1)]">
        <div className="relative h-40 overflow-hidden bg-[#eef6fc]">
          <img
            className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
            src={image}
            alt={`Dokumentasi ${project.title}`}
          />
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-[#64748b]">
            {statusLabel(project.status)}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
            {project.category}
          </span>
          <h2 className="mt-2 break-words text-[16px] font-bold leading-6 text-ink">
            {project.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-[#607296]">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-[#edf7ff] px-2 py-1 text-[10px] font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e7edf5] pt-3 text-[10px] text-muted">
            <span>{project.date}</span>
            <div className="flex items-center gap-3">
              <Link
                to={`/dashboard/portfolio/projects/${project.id}`}
                className="font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Detail <span aria-hidden="true">→</span>
              </Link>
              {["DRAFT", "REJECTED"].includes(project.status) && (
                <button
                  type="button"
                  onClick={() => setPending("submit")}
                  className="font-semibold text-primary hover:text-primary-dark"
                >
                  Kirim
                </button>
              )}
              {["DRAFT", "REJECTED"].includes(project.status) && (
                <button
                  type="button"
                  onClick={() => setPending("delete")}
                  className="font-semibold text-[#b42332] hover:underline"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
      <ActionModal
        open={Boolean(pending)}
        variant={pending === "delete" ? "delete" : "save"}
        title={
          pending === "delete"
            ? "Hapus karya ini?"
            : "Kirim karya untuk verifikasi?"
        }
        description={
          pending === "delete"
            ? "Karya akan dihapus dari portofolio siswa."
            : "Karya akan masuk ke antrean verifikasi petugas sekolah."
        }
        confirmLabel={pending === "delete" ? "Hapus" : "Kirim"}
        busy={busy}
        onClose={() => {
          if (!busy) setPending(null);
        }}
        onConfirm={confirmAction}
      />
    </>
  );
}

function AchievementGrid({
  achievements,
  isDemo,
}: {
  achievements: StudentAchievement[];
  isDemo: boolean;
}) {
  if (!achievements.length)
    return (
      <EmptyPortfolio
        title="Belum ada prestasi yang sesuai"
        copy={
          isDemo
            ? "Coba ubah pencarian atau filter untuk melihat prestasi lainnya."
            : "Prestasi dan sertifikatmu akan tampil di sini setelah ditambahkan."
        }
        action="Tambah Prestasi"
        to="/dashboard/portfolio/achievements/new"
      />
    );
  return (
    <section
      id="portfolio-panel-achievements"
      role="tabpanel"
      aria-labelledby="portfolio-tab-achievements"
      className="grid min-w-0 gap-5 md:grid-cols-2"
    >
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </section>
  );
}

function AchievementCard({ achievement }: { achievement: StudentAchievement }) {
  const status = achievement.verificationStatus;
  const [pending, setPending] = useState<"submit" | "delete" | null>(null);
  const [busy, setBusy] = useState(false);
  async function confirmAction() {
    if (!pending) return;
    setBusy(true);
    try {
      if (pending === "submit") await submitAchievement(achievement.id);
      else await removeAchievement(achievement.id);
      window.location.reload();
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <article className="flex min-w-0 gap-4 rounded-2xl border border-[#e1e9f4] bg-white p-4 shadow-[0_2px_8px_rgba(25,63,112,.02)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.08)]">
        <img
          className="size-24 shrink-0 rounded-xl bg-[#eef6fc] object-cover"
          src={achievement.image || achievementImage}
          alt={`Dokumentasi ${achievement.title}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              {achievement.type}
            </span>
            <StatusBadge status={status} />
          </div>
          <h2 className="mt-2 break-words text-[15px] font-bold leading-5 text-ink">
            {achievement.title}
          </h2>
          <p className="mt-1 break-words text-[11px] text-[#607296]">
            {achievement.competition}
          </p>
          <div className="mt-3 grid gap-1 text-[10px] text-muted">
            <span>{achievement.organizer}</span>
            <span>
              {achievement.level} · {achievement.rank} · {achievement.date}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              to={`/dashboard/portfolio/achievements/${achievement.id}`}
              className="inline-flex text-[11px] font-semibold text-primary hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Detail{" "}
              <span className="ml-1" aria-hidden="true">
                →
              </span>
            </Link>
            {["DRAFT", "REJECTED"].includes(achievement.verificationStatus) && (
              <button
                type="button"
                onClick={() => setPending("submit")}
                className="text-[11px] font-semibold text-primary"
              >
                Kirim
              </button>
            )}
            {["DRAFT", "REJECTED"].includes(achievement.verificationStatus) && (
              <button
                type="button"
                onClick={() => setPending("delete")}
                className="text-[11px] font-semibold text-[#b42332]"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      </article>
      <ActionModal
        open={Boolean(pending)}
        variant={pending === "delete" ? "delete" : "save"}
        title={
          pending === "delete"
            ? "Hapus prestasi ini?"
            : "Kirim prestasi untuk verifikasi?"
        }
        description={
          pending === "delete"
            ? "Prestasi akan dihapus dari daftar pencapaianmu."
            : "Prestasi akan masuk ke antrean verifikasi petugas sekolah."
        }
        confirmLabel={pending === "delete" ? "Hapus" : "Kirim"}
        busy={busy}
        onClose={() => {
          if (!busy) setPending(null);
        }}
        onConfirm={confirmAction}
      />
    </>
  );
}

function StatusBadge({ status }: { status: VerificationStatus }) {
  const labels: Record<VerificationStatus, string> = {
    DRAFT: "Draf",
    PENDING: "Menunggu Verifikasi",
    SUBMITTED: "Menunggu Verifikasi",
    VERIFIED: "Terverifikasi",
    REJECTED: "Ditolak",
  };
  const classes: Record<VerificationStatus, string> = {
    DRAFT: "bg-[#f1f5f9] text-[#64748b]",
    PENDING: "bg-[#fff7df] text-[#b77a00]",
    SUBMITTED: "bg-[#fff7df] text-[#b77a00]",
    VERIFIED: "bg-[#dcf7e8] text-[#20aa65]",
    REJECTED: "bg-[#fff0f0] text-[#d62929]",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-semibold ${classes[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function PklPortfolioDraft({
  projects,
  achievements,
}: {
  projects: PortfolioProject[];
  achievements: StudentAchievement[];
}) {
  const [selectedProjects, setSelectedProjects] = useState<string[]>(() =>
    projects.slice(0, 2).map((project) => project.id),
  );
  const [selectedAchievements, setSelectedAchievements] = useState<string[]>(
    () => achievements.slice(0, 1).map((achievement) => achievement.id),
  );
  const toggle = (id: string, type: "project" | "achievement") =>
    type === "project"
      ? setSelectedProjects((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        )
      : setSelectedAchievements((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id],
        );
  const total = selectedProjects.length + selectedAchievements.length;
  return (
    <section
      id="portfolio-panel-pkl"
      role="tabpanel"
      aria-labelledby="portfolio-tab-pkl"
      className="grid min-w-0 gap-6 rounded-2xl border border-[#e1e9f4] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px]"
    >
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              Draf lokal perangkat ini
            </p>
            <h2 className="mt-2 text-[20px] font-bold text-ink">
              Siapkan Portofolio untuk PKL
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-5 text-muted">
              Pilih karya dan prestasi yang paling relevan untuk ditunjukkan
              saat mempersiapkan diri menuju PKL.
            </p>
          </div>
          <span className="rounded-full bg-[#fff7df] px-3 py-1 text-[10px] font-semibold text-[#a66b00]">
            Belum tersimpan ke server
          </span>
        </div>
        <div className="mt-6 grid gap-3">
          {projects.length ? (
            projects.map((project) => (
              <SelectionRow
                key={project.id}
                checked={selectedProjects.includes(project.id)}
                onChange={() => toggle(project.id, "project")}
                image={project.thumbnail}
                title={project.title}
                copy={`${project.category} · ${project.date}`}
              />
            ))
          ) : (
            <p className="rounded-xl bg-[#f7faff] p-4 text-[12px] text-muted">
              Belum ada karya untuk dipilih.
            </p>
          )}
          {achievements.map((achievement) => (
            <SelectionRow
              key={achievement.id}
              checked={selectedAchievements.includes(achievement.id)}
              onChange={() => toggle(achievement.id, "achievement")}
              image={achievement.image || achievementImage}
              title={achievement.title}
              copy={`${achievement.type} · ${achievement.date}`}
            />
          ))}
        </div>
      </div>
      <aside className="h-fit rounded-2xl border border-[#d7e9f8] bg-[#f5fbff] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
          Ringkasan portofolio
        </p>
        <strong className="mt-2 block text-[28px] font-bold text-ink">
          {total} item
        </strong>
        <p className="mt-1 text-[11px] leading-5 text-muted">
          {selectedProjects.length} karya · {selectedAchievements.length}{" "}
          prestasi dipilih untuk draf.
        </p>
        <div className="mt-5 rounded-xl border border-[#f1d99b] bg-[#fff9e9] p-3 text-[11px] leading-5 text-[#856b37]">
          Pilihan ini hanya tersimpan selama halaman dibuka dan belum dikirim ke
          perusahaan atau server.
        </div>
        <Link
          to="/dashboard/pkl"
          className="mt-5 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-4 text-[12px] font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border-[#b9dafa] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#b9dafa] focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Jelajahi Peluang PKL
        </Link>
      </aside>
    </section>
  );
}

function SelectionRow({
  checked,
  onChange,
  image,
  title,
  copy,
}: {
  checked: boolean;
  onChange: () => void;
  image?: string;
  title: string;
  copy: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${checked ? "border-primary bg-[#f5fbff]" : "border-[#e1e9f4] bg-white hover:border-[#b9dafa]"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[#0092ff]"
      />
      <img
        className="size-12 shrink-0 rounded-lg object-cover"
        src={image}
        alt=""
      />
      <span className="min-w-0">
        <strong className="block break-words text-[12px] text-ink">
          {title}
        </strong>
        <span className="mt-1 block break-words text-[10px] text-muted">
          {copy}
        </span>
      </span>
    </label>
  );
}

function EmptyPortfolio({
  title,
  copy,
  action,
  to,
}: {
  title: string;
  copy: string;
  action: string;
  to: string;
}) {
  return (
    <section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-14 text-center">
      <img
        className="mx-auto size-12 rounded-xl bg-[#edf7ff] p-2 object-contain"
        src={portfolioIcon}
        alt=""
      />
      <h2 className="mt-4 text-[17px] font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-[12px] leading-5 text-muted">
        {copy}
      </p>
      <Link
        to={to}
        className="mt-5 inline-flex min-h-10 items-center rounded-xl border border-transparent bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-4 text-[12px] font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border-[#b9dafa] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#b9dafa] focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {action}
      </Link>
    </section>
  );
}

export function StudentPortfolioProjectDetailPage() {
  const { me } = useAuth();
  return (
    <RequireAuth>
      {me?.profile.account_type === "STUDENT" ? (
        <PortfolioProjectDetailContent />
      ) : (
        <StudentOnlyMessage />
      )}
    </RequireAuth>
  );
}

function PortfolioProjectDetailContent() {
  const { me } = useAuth();
  const pathname = usePathname();
  const id = decodeURIComponent(
    pathname.slice("/dashboard/portfolio/projects/".length),
  );
  const project = me?.profile.school_identifier?.startsWith("DEMO-")
    ? demoPortfolioProjects.find((item) => item.id === id)
    : undefined;
  if (!project)
    return (
      <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Karya">
        <PortfolioNotFound type="karya" />
      </StudentPortalLayout>
    );
  return <ImprovedProjectDetail project={project} />;
}

function ImprovedProjectDetail({ project }: { project: PortfolioProject }) {
  const documentationImages = project.documentationImages?.length
    ? project.documentationImages
    : [project.thumbnail || portfolioIcon];
  const isPublished = project.status === "PUBLISHED";
  return (
    <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Karya">
      <div className="grid min-w-0 gap-5">
        <Link
          to="/dashboard/portfolio"
          className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-primary transition hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ←
          </span>
          Kembali ke Portofolio
        </Link>
        <header>
          <h1 className="text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
            Detail Karya
          </h1>
          <p className="mt-2 text-[13px] text-muted">
            Informasi lengkap yang tersimpan pada portofolio siswa.
          </p>
        </header>
        <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <main className="grid min-w-0 gap-6">
            <section className="overflow-hidden rounded-2xl border border-[#dce8f5] bg-white shadow-[0_4px_16px_rgba(25,63,112,.04)]">
              <div className="relative h-[230px] overflow-hidden bg-[#eef6fc] sm:h-[310px]">
                <img
                  className="size-full object-cover"
                  src={project.thumbnail}
                  alt={`Dokumentasi ${project.title}`}
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071c3c]/70 to-transparent" />
                <span className="absolute bottom-4 left-5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-primary sm:left-6">
                  {project.category}
                </span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words text-[25px] font-bold leading-tight tracking-[-.025em] text-ink sm:text-[29px]">
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[13px] leading-6 text-[#607296]">
                      {project.summary}
                    </p>
                  </div>
                  <ProjectStatus status={project.status} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#cfe6f8] bg-[#f5fbff] px-3 py-1.5 text-[11px] font-medium text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
            <ProjectSection title="Tujuan Proyek" text={project.purpose} />
            {project.background && (
              <ProjectSection
                title="Latar Belakang / Masalah"
                text={project.background}
              />
            )}
            <ProjectListSection
              title="Fitur / Pekerjaan yang Dikerjakan"
              items={project.features || []}
            />
            <ProjectSection title="Peran Siswa" text={project.role} />
            <ProjectListSection
              title="Hasil / Output"
              items={project.outputs || []}
            />
            <ProjectListSection
              title="Teknologi & Tools"
              items={project.skills}
              compact
            />
            <DocumentationSection
              images={documentationImages}
              title={project.title}
            />
            {project.lessonsLearned && (
              <ProjectSection
                title="Catatan / Pembelajaran"
                text={project.lessonsLearned}
                tone="blue"
              />
            )}
          </main>
          <aside className="grid h-fit gap-5 xl:sticky xl:top-24">
            <DetailInfo title="Status Publikasi">
              <ProjectStatus status={project.status} />
              <p className="mt-3 text-[11px] leading-5 text-muted">
                {isPublished
                  ? "Karya ini berstatus dipublikasikan pada portofolio demo."
                  : "Karya ini masih berupa draf dan belum ditampilkan sebagai karya publik."}
              </p>
            </DetailInfo>
            <DetailInfo title="Informasi Karya">
              <MetaLine label="Tanggal dibuat" value={project.date} />
              <MetaLine label="Kategori" value={project.category} />
              <MetaLine label="Jenis karya" value="Proyek pembelajaran siswa" />
              <MetaLine
                label="Teknologi utama"
                value={project.skills[0] || "Belum dicantumkan"}
              />
            </DetailInfo>
            <DetailInfo title="Tautan">
              <div className="grid gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-semibold text-primary hover:text-primary-dark"
                  >
                    Buka GitHub <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className="text-[12px] leading-5 text-muted">
                    Link GitHub belum ditambahkan.
                  </p>
                )}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-semibold text-primary hover:text-primary-dark"
                  >
                    Buka demo <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <p className="text-[12px] leading-5 text-muted">
                    Link demo belum ditambahkan.
                  </p>
                )}
              </div>
            </DetailInfo>
            <DetailInfo title="Kesiapan PKL">
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-semibold ${isPublished ? "bg-[#dcf7e8] text-[#20aa65]" : "bg-[#fff7df] text-[#a66b00]"}`}
              >
                {isPublished
                  ? "Siap ditampilkan"
                  : "Perlu dokumentasi tambahan"}
              </span>
              <p className="mt-3 text-[11px] leading-5 text-muted">
                {isPublished
                  ? "Status ini menunjukkan karya sudah memiliki ringkasan dan dokumentasi pada portofolio demo."
                  : "Lengkapi dokumentasi dan tinjau kembali isi karya sebelum digunakan untuk persiapan PKL."}
              </p>
            </DetailInfo>
          </aside>
        </div>
        <footer className="pb-1 text-[11px] text-muted">
          SMK Negeri 26 Jakarta · Portal Internal Siswa
        </footer>
      </div>
    </StudentPortalLayout>
  );
}

function ProjectStatus({ status }: { status: PortfolioProject["status"] }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold ${status === "PUBLISHED" ? "bg-[#dcf7e8] text-[#20aa65]" : "bg-[#f1f5f9] text-[#64748b]"}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
    </span>
  );
}
function ProjectSection({
  title,
  text,
  tone = "white",
}: {
  title: string;
  text: string;
  tone?: "white" | "blue";
}) {
  return (
    <section
      className={`rounded-2xl border border-[#dce8f5] p-5 sm:p-6 ${tone === "blue" ? "bg-[#f5fbff]" : "bg-white"}`}
    >
      <h2 className="text-[16px] font-bold text-ink">{title}</h2>
      <p className="mt-3 max-w-3xl text-[13px] leading-6 text-[#607296]">
        {text}
      </p>
    </section>
  );
}
function ProjectListSection({
  title,
  items,
  compact = false,
}: {
  title: string;
  items: string[];
  compact?: boolean;
}) {
  return (
    <section className="rounded-2xl border border-[#dce8f5] bg-white p-5 sm:p-6">
      <h2 className="text-[16px] font-bold text-ink">{title}</h2>
      {items.length ? (
        <div
          className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}
        >
          {items.map((item, index) => (
            <div
              key={item}
              className="flex min-w-0 gap-3 rounded-xl border border-[#e1e9f4] bg-[#f8fbff] p-3.5"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[#e8f5ff] text-[10px] font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] leading-5 text-[#52658a]">
                {item}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-[12px] text-muted">
          Belum ada informasi yang dicantumkan.
        </p>
      )}
    </section>
  );
}
function DocumentationSection({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-[#dce8f5] bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-ink">Dokumentasi Karya</h2>
          <p className="mt-1 text-[11px] text-muted">
            Visual yang tersimpan pada record karya ini.
          </p>
        </div>
        <span className="rounded-full bg-[#edf7ff] px-3 py-1 text-[10px] font-semibold text-primary">
          {images.length} gambar
        </span>
      </div>
      <div
        className={`mt-5 grid gap-3 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}
      >
        {images.map((image) => (
          <img
            key={image}
            className="max-h-[360px] w-full rounded-xl border border-[#e1e9f4] bg-[#eef6fc] object-cover"
            src={image}
            alt={`Dokumentasi ${title}`}
          />
        ))}
      </div>
    </section>
  );
}

export function StudentPortfolioAchievementDetailPage() {
  const { me } = useAuth();
  return (
    <RequireAuth>
      {me?.profile.account_type === "STUDENT" ? (
        <PortfolioAchievementDetailContent />
      ) : (
        <StudentOnlyMessage />
      )}
    </RequireAuth>
  );
}

function PortfolioAchievementDetailContent() {
  const { me } = useAuth();
  const pathname = usePathname();
  const id = decodeURIComponent(
    pathname.slice("/dashboard/portfolio/achievements/".length),
  );
  const achievement = me?.profile.school_identifier?.startsWith("DEMO-")
    ? demoStudentAchievements.find((item) => item.id === id)
    : undefined;
  if (!achievement)
    return (
      <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Prestasi">
        <PortfolioNotFound type="prestasi" />
      </StudentPortalLayout>
    );
  return (
    <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Prestasi">
      <DetailShell
        back="/dashboard/portfolio"
        backLabel="Kembali ke Portofolio"
        title="Detail Prestasi"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <main className="grid min-w-0 gap-6 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6">
            <section className="grid gap-5 sm:grid-cols-[220px_minmax(0,1fr)]">
              <img
                className="aspect-square w-full rounded-2xl bg-[#eef6fc] object-cover"
                src={achievement.image || achievementImage}
                alt={`Dokumentasi ${achievement.title}`}
              />
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {achievement.type}
                </span>
                <h2 className="mt-3 break-words text-[24px] font-bold leading-tight text-ink">
                  {achievement.title}
                </h2>
                <p className="mt-3 text-[13px] leading-6 text-[#607296]">
                  {achievement.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-[#edf7ff] px-2.5 py-1.5 text-[10px] font-medium text-primary">
                    {achievement.level}
                  </span>
                  <span className="rounded-md bg-[#f3f6fb] px-2.5 py-1.5 text-[10px] font-medium text-[#607296]">
                    {achievement.rank}
                  </span>
                </div>
              </div>
            </section>
            <DetailBlock
              title="Kompetisi atau Kegiatan"
              text={achievement.competition}
            />
            <DetailBlock title="Penyelenggara" text={achievement.organizer} />
          </main>
          <aside className="grid h-fit gap-5 xl:sticky xl:top-24">
            <DetailInfo title="Status Verifikasi">
              <StatusBadge status={achievement.verificationStatus} />
              <p className="mt-3 text-[11px] leading-5 text-muted">
                Badge verifikasi hanya dapat diberikan oleh petugas sekolah,
                bukan diubah oleh siswa.
              </p>
            </DetailInfo>
            <DetailInfo title="Informasi Pencapaian">
              <MetaLine label="Tingkat" value={achievement.level} />
              <MetaLine label="Peringkat" value={achievement.rank} />
              <MetaLine label="Tanggal" value={achievement.date} />
            </DetailInfo>
          </aside>
        </div>
      </DetailShell>
    </StudentPortalLayout>
  );
}

function DetailShell({
  back,
  backLabel,
  title,
  children,
}: {
  back: string;
  backLabel: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-5">
      <Link
        to={back}
        className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-primary hover:text-primary-dark"
      >
        <span aria-hidden="true" className="text-lg leading-none">
          ←
        </span>
        {backLabel}
      </Link>
      <header>
        <h1 className="text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
          {title}
        </h1>
        <p className="mt-2 text-[13px] text-muted">
          Informasi lengkap yang tersimpan pada portofolio siswa.
        </p>
      </header>
      {children}
      <footer className="pb-1 text-[11px] text-muted">
        SMK Negeri 26 Jakarta · Portal Internal Siswa
      </footer>
    </div>
  );
}

function DetailBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-xl border border-[#dce8f5] bg-[#f5fbff] p-5">
      <h2 className="text-[14px] font-bold text-ink">{title}</h2>
      <p className="mt-3 text-[12px] leading-6 text-[#607296]">{text}</p>
    </section>
  );
}
function DetailInfo({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#dce8f5] bg-white p-5">
      <h2 className="text-[15px] font-bold text-ink">{title}</h2>
      <div className="mt-4 text-[12px] text-[#607296]">{children}</div>
    </section>
  );
}
function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="border-b border-[#e7edf5] py-2.5 last:border-0">
      <span className="block text-[10px] uppercase tracking-wide text-[#8492aa]">
        {label}
      </span>
      <strong className="mt-1 block break-words text-[12px] text-ink">
        {value}
      </strong>
    </p>
  );
}
function PortfolioNotFound({ type }: { type: "karya" | "prestasi" }) {
  return (
    <section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-16 text-center">
      <h1 className="text-xl font-bold text-ink">
        Detail {type} tidak ditemukan
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        Data tidak tersedia atau belum dapat diakses oleh akun ini.
      </p>
      <Link
        to="/dashboard/portfolio"
        className="mt-6 inline-flex min-h-11 items-center rounded-xl border border-transparent bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-sm font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border-[#b9dafa] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#b9dafa] focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Kembali ke Portofolio
      </Link>
    </section>
  );
}

export function StudentPortfolioProjectFormPage() {
  return <StudentPortfolioFormPage kind="project" />;
}
export function StudentPortfolioAchievementFormPage() {
  return <StudentPortfolioFormPage kind="achievement" />;
}

function StudentPortfolioFormPage({
  kind,
}: {
  kind: "project" | "achievement";
}) {
  const { me } = useAuth();
  return (
    <RequireAuth>
      {me?.profile.account_type === "STUDENT" ? (
        <PortfolioFormContent kind={kind} />
      ) : (
        <StudentOnlyMessage />
      )}
    </RequireAuth>
  );
}

function PortfolioFormContent({ kind }: { kind: "project" | "achievement" }) {
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  const project = kind === "project";
  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0] || null;
    event.target.value = "";
    if (!next) return;
    if (!/image\/(jpeg|png|webp)/i.test(next.type)) {
      setErrors((current) => ({
        ...current,
        file: "File harus JPG, PNG, atau WebP.",
      }));
      return;
    }
    if (next.size > 5 * 1024 * 1024) {
      setErrors((current) => ({
        ...current,
        file: "Ukuran file maksimal 5 MB.",
      }));
      return;
    }
    setFile(next);
    setErrors((current) => ({ ...current, file: "" }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const required = project
      ? ["title", "category", "description", "skills", "role", "date"]
      : [
          "title",
          "type",
          "competition",
          "organizer",
          "level",
          "rank",
          "date",
          "description",
        ];
    required.forEach((key) => {
      if (!String(form.get(key) || "").trim())
        next[key] = "Kolom ini wajib diisi.";
    });
    if (!file) next.file = "Dokumentasi wajib diunggah.";
    setErrors(next);
    if (Object.keys(next).length || !file) return;
    setSaveOpen(true);
  };
  const saveDraft = async () => {
    const form = formRef.current ? new FormData(formRef.current) : null;
    if (!form || !file) return;
    setSaving(true);
    setNotice("Menyimpan...");
    try {
      const created = project
        ? await createPortfolio({
            title: String(form.get("title")),
            category: String(form.get("category")),
            summary: String(form.get("description")),
            description: String(form.get("description")),
            skills: String(form.get("skills"))
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
            role: String(form.get("role")),
            purpose: String(form.get("purpose") || ""),
            background: String(form.get("background") || ""),
            features: [],
            outputs: [],
            lessonsLearned: String(form.get("lessonsLearned") || ""),
            github: String(form.get("github") || ""),
            demoUrl: String(form.get("demoUrl") || ""),
            date: String(form.get("date")),
          })
        : await createAchievement({
            title: String(form.get("title")),
            type: String(form.get("type")),
            competition: String(form.get("competition")),
            organizer: String(form.get("organizer")),
            level: String(form.get("level")),
            rank: String(form.get("rank")),
            date: String(form.get("date")),
            description: String(form.get("description")),
            evidence: "",
          });
      await uploadPortfolioFile(
        project ? "portfolio" : "achievement",
        created.id,
        file,
      );
      setNotice(
        `${project ? "Karya" : "Prestasi"} tersimpan sebagai draf. Kamu dapat mengirimkannya untuk verifikasi dari halaman portofolio.`,
      );
      setSaveOpen(false);
    } catch (reason) {
      setNotice(
        reason instanceof Error ? reason.message : "Data gagal disimpan.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <StudentPortalLayout
      breadcrumb={`Portofolio & Prestasi / ${project ? "Tambah Karya" : "Tambah Prestasi"}`}
    >
      <div className="grid min-w-0 gap-5">
        <Link
          to="/dashboard/portfolio"
          className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-primary hover:text-primary-dark"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ←
          </span>
          Kembali ke Portofolio
        </Link>
        <header>
          <h1 className="text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
            {project ? "Tambah Portofolio" : "Tambah Prestasi"}
          </h1>
          <p className="mt-2 text-[13px] text-muted">
            {project
              ? "Dokumentasikan karya dan kompetensi yang ingin kamu tampilkan."
              : "Tambahkan pencapaian untuk diperiksa oleh petugas sekolah."}
          </p>
        </header>
        <form
          ref={formRef}
          onSubmit={submit}
          noValidate
          className="grid min-w-0 gap-6 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="title"
              label={project ? "Judul proyek" : "Nama prestasi"}
              error={errors.title}
            >
              <input
                name="title"
                id="title"
                className={inputClass}
                placeholder={
                  project
                    ? "Contoh: Website Helpdesk Sekolah"
                    : "Contoh: Finalis LKS"
                }
              />
            </FormField>
            {project ? (
              <FormField id="category" label="Kategori" error={errors.category}>
                <input
                  name="category"
                  id="category"
                  className={inputClass}
                  placeholder="Pengembangan Website"
                />
              </FormField>
            ) : (
              <FormField id="type" label="Jenis prestasi" error={errors.type}>
                <input
                  name="type"
                  id="type"
                  className={inputClass}
                  placeholder="Kompetisi keterampilan"
                />
              </FormField>
            )}
            {project ? (
              <FormField
                id="skills"
                label="Teknologi / keahlian"
                error={errors.skills}
              >
                <input
                  name="skills"
                  id="skills"
                  className={inputClass}
                  placeholder="HTML, CSS, JavaScript"
                />
              </FormField>
            ) : (
              <FormField
                id="competition"
                label="Nama kompetisi atau kegiatan"
                error={errors.competition}
              >
                <input
                  name="competition"
                  id="competition"
                  className={inputClass}
                  placeholder="Nama kompetisi"
                />
              </FormField>
            )}
            {project ? (
              <FormField id="role" label="Peran siswa" error={errors.role}>
                <input
                  name="role"
                  id="role"
                  className={inputClass}
                  placeholder="Peran dalam proyek"
                />
              </FormField>
            ) : (
              <FormField
                id="organizer"
                label="Penyelenggara"
                error={errors.organizer}
              >
                <input
                  name="organizer"
                  id="organizer"
                  className={inputClass}
                  placeholder="Nama penyelenggara"
                />
              </FormField>
            )}
            {project && (
              <FormField id="status" label="Status karya">
                <select
                  name="status"
                  id="status"
                  className={`${inputClass} appearance-none`}
                >
                  <option value="DRAFT">Draf</option>
                  <option value="PUBLISHED">Publikasikan</option>
                </select>
              </FormField>
            )}
            {!project && (
              <>
                <FormField
                  id="level"
                  label="Tingkat kompetisi"
                  error={errors.level}
                >
                  <input
                    name="level"
                    id="level"
                    className={inputClass}
                    placeholder="Sekolah, kota, provinsi, atau nasional"
                  />
                </FormField>
                <FormField
                  id="rank"
                  label="Peringkat / pencapaian"
                  error={errors.rank}
                >
                  <input
                    name="rank"
                    id="rank"
                    className={inputClass}
                    placeholder="Juara 1, finalis, lulus"
                  />
                </FormField>
              </>
            )}
            <FormField id="date" label="Tanggal" error={errors.date}>
              <input name="date" id="date" type="date" className={inputClass} />
            </FormField>
            <div className="sm:col-span-2">
              <FormField
                id="description"
                label="Deskripsi"
                error={errors.description}
              >
                <textarea
                  name="description"
                  id="description"
                  className={`${inputClass} h-28 resize-y py-3`}
                  placeholder="Jelaskan karya atau pencapaianmu secara singkat."
                />
              </FormField>
            </div>
            {project && (
              <>
                <FormField id="github" label="Link GitHub (opsional)">
                  <input
                    name="github"
                    id="github"
                    type="url"
                    className={inputClass}
                    placeholder="https://github.com/..."
                  />
                </FormField>
                <FormField id="demoUrl" label="Link demo / website (opsional)">
                  <input
                    name="demoUrl"
                    id="demoUrl"
                    type="url"
                    className={inputClass}
                    placeholder="https://..."
                  />
                </FormField>
              </>
            )}
            <div className="sm:col-span-2">
              <FormField
                id="file"
                label={
                  project
                    ? "Foto atau dokumentasi (opsional)"
                    : "Dokumen sertifikat / foto (opsional)"
                }
                error={errors.file}
              >
                <label
                  htmlFor="file"
                  className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c5dced] bg-[#f5fbff] px-4 text-center hover:border-primary"
                >
                  <img
                    className="size-8 object-contain"
                    src={workIcon}
                    alt=""
                  />
                  <strong className="mt-2 text-[12px] font-semibold text-primary">
                    Unggah file
                  </strong>
                  <span className="mt-1 text-[10px] text-muted">
                    JPG, PNG, atau WebP · Maksimal 5 MB
                  </span>
                  <input
                    id="file"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onFile}
                    className="sr-only"
                  />
                </label>
                {preview && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#d7e9f8] bg-[#f7fcff] p-3">
                    <img
                      className="size-16 rounded-lg object-cover"
                      src={preview}
                      alt="Pratinjau file"
                    />
                    <span className="min-w-0 truncate text-[11px] text-muted">
                      {file?.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="ml-auto text-[11px] font-semibold text-[#d62929]"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </FormField>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#e7edf5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[11px] leading-5 text-muted">
              {project
                ? "Data hanya akan menjadi draf lokal sampai backend tersedia."
                : "Prestasi akan berstatus menunggu verifikasi dan tidak dapat diberi badge terverifikasi oleh siswa."}
            </p>
            <button
              type="submit"
              className="min-h-11 rounded-xl border border-transparent bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-[13px] font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border-[#b9dafa] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:border-[#b9dafa] focus-visible:bg-white focus-visible:bg-none focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Simpan sebagai draf
            </button>
          </div>
          {notice && (
            <p
              role="status"
              className="rounded-xl border border-[#ffe5a5] bg-[#fffaf0] px-4 py-3 text-[12px] leading-5 text-[#896400]"
            >
              {notice}
            </p>
          )}
        </form>
        <ActionModal
          open={saveOpen}
          variant="save"
          title="Simpan sebagai Draf?"
          description={`${project ? "Karya" : "Prestasi"} akan disimpan sebagai draf dan belum dikirim untuk verifikasi. Kamu masih bisa mengeditnya nanti.`}
          confirmLabel="Simpan Draf"
          busy={saving}
          onClose={() => {
            if (!saving) setSaveOpen(false);
          }}
          onConfirm={saveDraft}
        />
        <footer className="pb-1 text-[11px] text-muted">
          SMK Negeri 26 Jakarta · Portal Internal Siswa
        </footer>
      </div>
    </StudentPortalLayout>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="grid gap-2 text-[11px] font-medium text-ink">
      <span>{label}</span>
      {children}
      {error && (
        <small role="alert" className="text-[10px] font-medium text-[#d62929]">
          {error}
        </small>
      )}
    </label>
  );
}
function StudentOnlyMessage() {
  return (
    <main className="min-h-screen bg-school-bg p-8 text-muted">
      Halaman ini hanya tersedia untuk akun siswa.
    </main>
  );
}
