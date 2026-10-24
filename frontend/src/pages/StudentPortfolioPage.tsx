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
import { getCachedApi } from "../lib/api";
import type { ApiError } from "../lib/api";
import { ActionModal } from "../components/shared/ActionModal";
import { useToast } from "../components/shared/ToastProvider";
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
  getAchievement,
  getPortfolioProject,
  getSignedPortfolioFile,
  uploadPortfolioFile,
} from "../components/student/portfolio/portfolio.api";

type PortfolioTab = "projects" | "achievements" | "pkl";
type UploadStatus = "ready" | "uploading" | "uploaded" | "failed";
type UploadItem = { id: string; file: File; previewUrl: string; status: UploadStatus };
const portfolioIcon = "/assets/pages/siswapages/portofolioprestasi.png";
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
  const [tab, setTab] = useState<PortfolioTab>("projects");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [year, setYear] = useState("all");
  const [projects, setProjects] = useState<PortfolioProject[]>(() => getCachedApi<PortfolioProject[]>("/api/student/portfolio") || []);
  const [achievements, setAchievements] = useState<StudentAchievement[]>(() => getCachedApi<StudentAchievement[]>("/api/student/achievements") || []);
  const [loading, setLoading] = useState(() => !getCachedApi("/api/student/portfolio") && !getCachedApi("/api/student/achievements"));
  const [loadError, setLoadError] = useState("");
  async function refreshPortfolio() {
    const [nextProjects, nextAchievements] = await Promise.all([getPortfolioProjects(), getAchievements()]);
    setProjects(nextProjects);
    setAchievements(nextAchievements);
  }
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
                 <ProjectGrid projects={filteredProjects} onChanged={refreshPortfolio} />
               ) : (
                 <AchievementGrid
                   achievements={filteredAchievements}
                   onChanged={refreshPortfolio}
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
            ? ["DRAFT", "SUBMITTED", "VERIFIED", "REJECTED"]
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
  onChanged,
}: {
  projects: PortfolioProject[];
  onChanged: () => Promise<void>;
}) {
  if (!projects.length)
    return (
      <EmptyPortfolio
        title="Belum ada karya yang sesuai"
        copy={
          "Karya dan proyekmu akan tampil di sini setelah ditambahkan."
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
        <ProjectCard key={project.id} project={project} onChanged={onChanged} />
      ))}
    </section>
  );
}

function ProjectCard({ project, onChanged }: { project: PortfolioProject; onChanged: () => Promise<void> }) {
  const [pending, setPending] = useState<"submit" | "delete" | null>(null);
  const [busy, setBusy] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");
  const { addToast } = useToast();
  useEffect(() => {
    const file = project.files?.[0];
    if (!file) {
      setCoverUrl("");
      return;
    }
    let active = true;
    getSignedPortfolioFile("portfolio", file.id).then((result) => {
      if (active) setCoverUrl(result.url);
    }).catch(() => {
      if (active) setCoverUrl("");
    });
    return () => { active = false; };
  }, [project.files]);
  async function confirmAction() {
    if (!pending) return;
    setBusy(true);
    try {
      const action = pending;
      if (pending === "submit") {
        await submitPortfolio(project.id);
      } else {
        await removePortfolio(project.id);
      }
      await onChanged();
      setPending(null);
      addToast(action === "submit"
        ? { variant: "success", title: "Karya berhasil dikirim", description: "Portofolio masuk ke proses verifikasi." }
        : { variant: "success", title: "Karya berhasil dihapus", description: "Karya telah dihapus dari portofolio." });
    } catch (reason) {
      addToast({ variant: "error", title: pending === "submit" ? "Karya gagal dikirim" : "Karya gagal dihapus", description: reason instanceof Error ? reason.message : "Permintaan gagal diproses.", duration: null });
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
             src={coverUrl || portfolioIcon}
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
  onChanged,
}: {
  achievements: StudentAchievement[];
  onChanged: () => Promise<void>;
}) {
  if (!achievements.length)
    return (
      <EmptyPortfolio
        title="Belum ada prestasi yang sesuai"
        copy={
          "Prestasi dan sertifikatmu akan tampil di sini setelah ditambahkan."
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
        <AchievementCard key={achievement.id} achievement={achievement} onChanged={onChanged} />
      ))}
    </section>
  );
}

function AchievementCard({ achievement, onChanged }: { achievement: StudentAchievement; onChanged: () => Promise<void> }) {
  const status = achievement.verificationStatus;
  const [pending, setPending] = useState<"submit" | "delete" | null>(null);
  const [busy, setBusy] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");
  const { addToast } = useToast();
  useEffect(() => {
    const file = achievement.files?.[0];
    if (!file) {
      setCoverUrl("");
      return;
    }
    let active = true;
    getSignedPortfolioFile("achievement", file.id).then((result) => {
      if (active) setCoverUrl(result.url);
    }).catch(() => {
      if (active) setCoverUrl("");
    });
    return () => { active = false; };
  }, [achievement.files]);
  async function confirmAction() {
    if (!pending) return;
    setBusy(true);
    try {
      const action = pending;
      if (pending === "submit") {
        await submitAchievement(achievement.id);
      } else {
        await removeAchievement(achievement.id);
      }
      await onChanged();
      setPending(null);
      addToast(action === "submit"
        ? { variant: "success", title: "Prestasi berhasil dikirim", description: "Pengajuan prestasi sedang menunggu verifikasi." }
        : { variant: "success", title: "Data prestasi berhasil dihapus" });
    } catch (reason) {
      addToast({ variant: "error", title: pending === "submit" ? "Prestasi gagal dikirim" : "Prestasi gagal dihapus", description: reason instanceof Error ? reason.message : "Permintaan gagal diproses.", duration: null });
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <article className="flex min-w-0 gap-4 rounded-2xl border border-[#e1e9f4] bg-white p-4 shadow-[0_2px_8px_rgba(25,63,112,.02)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.08)]">
        <img
          className="size-24 shrink-0 rounded-xl bg-[#eef6fc] object-cover"
             src={coverUrl || portfolioIcon}
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
                image={portfolioIcon}
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
               image={achievement.image || portfolioIcon}
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
  const pathname = usePathname();
  const id = decodeURIComponent(
    pathname.slice("/dashboard/portfolio/projects/".length),
  );
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setProject(null);
    setFileUrls({});
    getPortfolioProject(id)
      .then(async (next) => {
        if (!active) return;
        setProject(next);
        const signedFiles = await Promise.all(
          (next.files || []).map(async (file) => {
            try {
              const signed = await getSignedPortfolioFile("portfolio", file.id);
              return [file.id, signed.url] as const;
            } catch {
              // Keep the record visible when an individual private image fails.
              return null;
            }
          }),
        );
        if (active) {
          setFileUrls(Object.fromEntries(signedFiles.filter(Boolean) as [string, string][]));
        }
      })
      .catch((reason) => {
        if (active) setError(reason as ApiError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Karya">
      {loading ? (
        <PortfolioDetailLoading />
      ) : project ? (
        <ImprovedProjectDetail project={project} fileUrls={fileUrls} />
      ) : (
        <PortfolioNotFound type="karya" error={error} />
      )}
    </StudentPortalLayout>
  );
}

function ImprovedProjectDetail({
  project,
  fileUrls,
}: {
  project: PortfolioProject;
  fileUrls: Record<string, string>;
}) {
  const { addToast } = useToast();
  const [status, setStatus] = useState(project.status);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const files = project.files || [];
  const coverFile = files[0];
  const additionalFiles = files.slice(1);
  const canChange = status === "DRAFT" || status === "REJECTED";

  useEffect(() => {
    setStatus(project.status);
  }, [project.status]);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  async function submitForReview() {
    setSubmitting(true);
    try {
      await submitPortfolio(project.id);
      setStatus("SUBMITTED");
      setSubmitOpen(false);
      addToast({
        variant: "success",
        title: "Karya berhasil dikirim",
        description: "Portofolio masuk ke proses verifikasi.",
      });
    } catch (reason) {
      addToast({
        variant: "error",
        title: "Karya gagal dikirim",
        description: reason instanceof Error ? reason.message : "Permintaan gagal diproses.",
        duration: null,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-w-0 gap-7">
      <Link
        to="/dashboard/portfolio"
        className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-primary transition hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span aria-hidden="true" className="text-lg leading-none">←</span>
        Kembali ke Portofolio
      </Link>
      <header className="grid min-w-0 gap-4">
        <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-primary">
              Detail karya
            </p>
            <h1 className="mt-2 break-words text-[30px] font-bold leading-tight tracking-[-.035em] text-ink sm:text-[38px]">
              {project.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#607296]">
              {project.summary}
            </p>
          </div>
          <ProjectStatus status={status} />
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#eaf6ff] px-3 py-1.5 text-[11px] font-semibold text-primary">
            {project.category}
          </span>
          {canChange && (
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Link
                to={`/dashboard/portfolio/projects/${project.id}/edit`}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#b9dafa] bg-white px-4 text-[12px] font-semibold text-primary transition hover:bg-[#edf7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Edit Karya
              </Link>
              <button
                type="button"
                onClick={() => setSubmitOpen(true)}
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-[12px] font-semibold text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Kirim untuk Verifikasi
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-[#e1e9f4] bg-white shadow-[0_8px_24px_rgba(25,63,112,.05)]">
        <PortfolioImage
          src={coverFile ? fileUrls[coverFile.id] : undefined}
          alt={`Cover dokumentasi ${project.title}`}
          className="aspect-[16/9] max-h-[420px] min-h-[220px] w-full"
          onPreview={(src, alt) => setLightbox({ src, alt })}
        />
      </section>

      <div className="grid min-w-0 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0">
          <article className="rounded-2xl border border-[#e1e9f4] bg-white px-5 py-2 shadow-[0_4px_16px_rgba(25,63,112,.035)] sm:px-8">
            <EditorialSection title="Tentang Proyek / Tujuan">
              <p>{project.description}</p>
              {project.purpose && <p><strong>Tujuan:</strong> {project.purpose}</p>}
              {project.background && <p><strong>Latar belakang:</strong> {project.background}</p>}
            </EditorialSection>
            {project.features?.length ? (
              <EditorialListSection title="Fitur & Implementasi" items={project.features} />
            ) : null}
            {project.role && <EditorialSection title="Peran dan Kontribusi Siswa"><p>{project.role}</p></EditorialSection>}
            {project.outputs?.length ? (
              <EditorialListSection title="Hasil / Output" items={project.outputs} />
            ) : null}
            {project.skills.length ? (
              <EditorialSection title="Teknologi yang Digunakan">
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill} className="rounded-lg bg-[#edf7ff] px-3 py-1.5 text-[11px] font-medium text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </EditorialSection>
            ) : null}
            {project.lessonsLearned && (
              <EditorialSection title="Catatan / Pembelajaran"><p>{project.lessonsLearned}</p></EditorialSection>
            )}
            {additionalFiles.length > 0 && (
              <EditorialSection title="Dokumentasi Tambahan" last>
                <div className="grid gap-3 sm:grid-cols-2">
                  {additionalFiles.map((file) => (
                    <PortfolioImage
                      key={file.id}
                      src={fileUrls[file.id]}
                      alt={`Dokumentasi tambahan ${project.title}`}
                      className="aspect-[4/3] w-full rounded-xl border border-[#e1e9f4]"
                      onPreview={(src, alt) => setLightbox({ src, alt })}
                    />
                  ))}
                </div>
              </EditorialSection>
            )}
          </article>
        </main>

        <aside className="min-w-0 xl:sticky xl:top-24">
          <section className="rounded-2xl border border-[#e1e9f4] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.035)]">
            <h2 className="text-[15px] font-bold text-ink">Informasi Proyek</h2>
            <div className="mt-4">
              <MetaLine label="Jenis karya" value="Proyek pembelajaran siswa" />
              <MetaLine label="Tanggal dibuat" value={project.date} />
              <MetaLine label="Kategori" value={project.category} />
              {project.github && <ProjectLink href={project.github} label="Buka GitHub" />}
              {project.demoUrl && <ProjectLink href={project.demoUrl} label="Buka demo" />}
            </div>
            {canChange && (
              <p className="mt-4 border-t border-[#e7edf5] pt-4 text-[11px] leading-5 text-[#607296]">
                {status === "REJECTED"
                  ? "Perbaiki catatan reviewer sebelum mengirim ulang karya."
                  : "Tinjau kembali isi dan dokumentasi sebelum mengirim karya."}
                {project.reviewerNote && <><br /><strong className="text-ink">Catatan reviewer:</strong> {project.reviewerNote}</>}
              </p>
            )}
            {!canChange && project.reviewerNote && (
              <p className="mt-4 border-t border-[#e7edf5] pt-4 text-[11px] leading-5 text-[#607296]">
                <strong className="text-ink">Catatan reviewer:</strong> {project.reviewerNote}
              </p>
            )}
          </section>
        </aside>
      </div>
      <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1d33]/80 p-4" role="dialog" aria-modal="true" aria-label="Pratinjau gambar" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(null); }}>
          <div className="relative max-h-[92vh] max-w-6xl rounded-2xl bg-white p-2 shadow-2xl">
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[86vh] max-w-full rounded-xl object-contain" />
            <button type="button" onClick={() => setLightbox(null)} className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-white/95 text-lg font-semibold text-ink shadow" aria-label="Tutup pratinjau">×</button>
            <p className="px-2 pb-1 pt-2 text-[11px] text-muted">Tekan Escape untuk menutup</p>
          </div>
        </div>
      )}
      <ActionModal
        open={submitOpen}
        variant="save"
        title="Kirim karya untuk verifikasi?"
        description="Karya akan masuk ke antrean verifikasi petugas sekolah dan tidak dapat diedit sampai ditinjau."
        confirmLabel="Kirim Karya"
        busy={submitting}
        onClose={() => {
          if (!submitting) setSubmitOpen(false);
        }}
        onConfirm={submitForReview}
      />
    </div>
  );
}

function ProjectStatus({ status }: { status: PortfolioProject["status"] }) {
  const tone = status === "VERIFIED"
    ? "bg-[#dcf7e8] text-[#16834a]"
    : status === "SUBMITTED"
      ? "bg-[#fff7df] text-[#a66b00]"
      : status === "REJECTED"
        ? "bg-[#fff0f1] text-[#b42332]"
        : "bg-[#f1f5f9] text-[#64748b]";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold ${tone}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel(status)}
    </span>
  );
}

function EditorialSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section className={`py-6 sm:py-7 ${last ? "" : "border-b border-[#e7edf5]"}`}>
      <h2 className="text-[17px] font-bold tracking-[-.01em] text-ink">{title}</h2>
      <div className="mt-3 max-w-3xl space-y-3 text-[13px] leading-7 text-[#607296]">{children}</div>
    </section>
  );
}
function EditorialListSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="border-b border-[#e7edf5] py-6 sm:py-7">
      <h2 className="text-[17px] font-bold tracking-[-.01em] text-ink">{title}</h2>
      <ul className="mt-3 grid gap-2 pl-5 text-[13px] leading-7 text-[#607296] marker:text-primary">
        {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
      </ul>
    </section>
  );
}
function PortfolioImage({
  src,
  alt,
  className,
  fit = "contain",
  onPreview,
}: {
  src?: string;
  alt: string;
  className: string;
  fit?: "contain" | "cover";
  onPreview?: (src: string, alt: string) => void;
}) {
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(!src);
  useEffect(() => {
    setFailed(!src);
    setLoaded(!src);
  }, [src]);
  const imageSrc = failed ? portfolioIcon : src;
  const image = (
    <img
      src={imageSrc}
      alt={alt}
      className={`size-full object-${fit} ${fit === "contain" ? "p-3" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setFailed(true);
        setLoaded(true);
      }}
    />
  );
  return (
    <div className={`relative overflow-hidden bg-[#eef6fc] ${className}`}>
      {!loaded && <span className="absolute inset-0 animate-pulse bg-[#e8f2fc]" aria-hidden="true" />}
      {src && !failed && onPreview ? (
        <button type="button" onClick={() => onPreview(src, alt)} className="block size-full cursor-zoom-in text-left" aria-label={`Buka pratinjau ${alt}`}>
          {image}
        </button>
      ) : src && !failed ? (
        <a href={src} target="_blank" rel="noreferrer" aria-label={`Buka pratinjau ${alt}`} className="block size-full">
          {image}
        </a>
      ) : image}
    </div>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="border-b border-[#e7edf5] py-2.5 last:border-0">
      <a href={href} target="_blank" rel="noreferrer" className="text-[12px] font-semibold text-primary hover:text-primary-dark">
        {label} <span aria-hidden="true">↗</span>
      </a>
    </p>
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
  const pathname = usePathname();
  const id = decodeURIComponent(
    pathname.slice("/dashboard/portfolio/achievements/".length),
  );
  const [achievement, setAchievement] = useState<StudentAchievement | null>(null);
  const [fileUrls, setFileUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setAchievement(null);
    setFileUrls({});
    getAchievement(id)
      .then(async (next) => {
        if (!active) return;
        setAchievement(next);
        const signedFiles = await Promise.all(
          (next.files || []).map(async (file) => {
            try {
              const signed = await getSignedPortfolioFile("achievement", file.id);
              return [file.id, signed.url] as const;
            } catch {
              return null;
            }
          }),
        );
        if (active) {
          setFileUrls(Object.fromEntries(signedFiles.filter(Boolean) as [string, string][]));
        }
      })
      .catch((reason) => {
        if (active) setError(reason as ApiError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Prestasi"><PortfolioDetailLoading /></StudentPortalLayout>;
  }
  if (!achievement) {
    return <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Prestasi"><PortfolioNotFound type="prestasi" error={error} /></StudentPortalLayout>;
  }
  return <AchievementDetailContent achievement={achievement} fileUrls={fileUrls} />;
}

function AchievementDetailContent({
  achievement,
  fileUrls,
}: {
  achievement: StudentAchievement;
  fileUrls: Record<string, string>;
}) {
  const { addToast } = useToast();
  const [status, setStatus] = useState(achievement.verificationStatus);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const files = achievement.files || [];
  const coverFile = files[0];
  const additionalFiles = files.slice(1);
  const canChange = status === "DRAFT" || status === "REJECTED";

  useEffect(() => {
    setStatus(achievement.verificationStatus);
  }, [achievement.verificationStatus]);

  async function submitForReview() {
    setSubmitting(true);
    try {
      await submitAchievement(achievement.id);
      setStatus("SUBMITTED");
      setSubmitOpen(false);
      addToast({
        variant: "success",
        title: "Prestasi berhasil dikirim",
        description: "Pengajuan prestasi sedang menunggu verifikasi.",
      });
    } catch (reason) {
      addToast({
        variant: "error",
        title: "Prestasi gagal dikirim",
        description: reason instanceof Error ? reason.message : "Permintaan gagal diproses.",
        duration: null,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <StudentPortalLayout breadcrumb="Portofolio & Prestasi / Detail Prestasi">
      <div className="grid min-w-0 gap-7">
        <Link to="/dashboard/portfolio" className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-primary hover:text-primary-dark">
          <span aria-hidden="true" className="text-lg leading-none">←</span>
          Kembali ke Portofolio
        </Link>
        <header className="grid min-w-0 gap-4">
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-primary">Detail prestasi</p>
              <h1 className="mt-2 break-words text-[30px] font-bold leading-tight tracking-[-.035em] text-ink sm:text-[38px]">{achievement.title}</h1>
              <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#607296]">{achievement.description}</p>
            </div>
            <StatusBadge status={status} />
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eaf6ff] px-3 py-1.5 text-[11px] font-semibold text-primary">{achievement.type}</span>
            <span className="rounded-full bg-[#f3f6fb] px-3 py-1.5 text-[11px] font-medium text-[#607296]">{achievement.level}</span>
            {canChange && (
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Link to={`/dashboard/portfolio/achievements/${achievement.id}/edit`} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#b9dafa] bg-white px-4 text-[12px] font-semibold text-primary hover:bg-[#edf7ff]">Edit Prestasi</Link>
                <button type="button" onClick={() => setSubmitOpen(true)} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 text-[12px] font-semibold text-white hover:bg-primary-dark">Kirim untuk Verifikasi</button>
              </div>
            )}
          </div>
        </header>
        <section className="overflow-hidden rounded-2xl border border-[#e1e9f4] bg-white shadow-[0_8px_24px_rgba(25,63,112,.05)]">
          <PortfolioImage src={coverFile ? fileUrls[coverFile.id] : achievement.image} alt={`Dokumentasi ${achievement.title}`} className="aspect-[16/9] max-h-[420px] min-h-[220px] w-full" />
        </section>
        <div className="grid min-w-0 items-start gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
          <main className="min-w-0">
            <article className="rounded-2xl border border-[#e1e9f4] bg-white px-5 py-2 shadow-[0_4px_16px_rgba(25,63,112,.035)] sm:px-8">
              <EditorialSection title="Kompetisi atau Kegiatan"><p>{achievement.competition}</p></EditorialSection>
              <EditorialSection title="Penyelenggara"><p>{achievement.organizer}</p></EditorialSection>
              {additionalFiles.length > 0 && <EditorialSection title="Dokumentasi Tambahan" last><div className="grid gap-3 sm:grid-cols-2">{additionalFiles.map((file) => <PortfolioImage key={file.id} src={fileUrls[file.id]} alt={`Dokumentasi tambahan ${achievement.title}`} className="aspect-[4/3] w-full rounded-xl border border-[#e1e9f4]" />)}</div></EditorialSection>}
            </article>
          </main>
          <aside className="min-w-0 xl:sticky xl:top-24">
            <section className="rounded-2xl border border-[#e1e9f4] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.035)]">
              <h2 className="text-[15px] font-bold text-ink">Informasi Pencapaian</h2>
              <div className="mt-4"><MetaLine label="Jenis prestasi" value={achievement.type} /><MetaLine label="Tingkat" value={achievement.level} /><MetaLine label="Peringkat" value={achievement.rank} /><MetaLine label="Tanggal" value={achievement.date} /></div>
              {achievement.verificationNote && <p className="mt-4 border-t border-[#e7edf5] pt-4 text-[11px] leading-5 text-[#607296]"><strong className="text-ink">Catatan verifikasi:</strong> {achievement.verificationNote}</p>}
            </section>
          </aside>
        </div>
        <footer className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Siswa</footer>
        <ActionModal open={submitOpen} variant="save" title="Kirim prestasi untuk verifikasi?" description="Prestasi akan masuk ke antrean verifikasi petugas sekolah dan tidak dapat diedit sampai ditinjau." confirmLabel="Kirim Prestasi" busy={submitting} onClose={() => { if (!submitting) setSubmitOpen(false); }} onConfirm={submitForReview} />
      </div>
    </StudentPortalLayout>
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
function PortfolioDetailLoading() {
  return <div className="grid gap-5" aria-label="Memuat detail portofolio"><div className="h-5 w-40 animate-pulse rounded bg-white" /><div className="h-12 w-64 animate-pulse rounded bg-white" /><div className="h-[420px] animate-pulse rounded-2xl bg-white" /></div>;
}

function PortfolioNotFound({ type, error }: { type: "karya" | "prestasi"; error?: ApiError | null }) {
  const status = error?.status;
  const message = status === 401
    ? "Sesi akun sudah berakhir. Silakan masuk kembali."
    : status === 403
      ? "Akun ini tidak memiliki akses ke data tersebut."
      : status === 404
        ? "Data tidak ditemukan atau bukan milik akun ini."
        : error?.message || "Data tidak tersedia atau belum dapat diakses oleh akun ini.";
  return (
    <section className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-16 text-center">
      <h1 className="text-xl font-bold text-ink">
        Detail {type} tidak ditemukan
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {message}
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
  const { addToast } = useToast();
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const uploadUrls = useRef(new Set<string>());
  const [saveOpen, setSaveOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => () => {
    uploadUrls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);
  const project = kind === "project";
  const splitList = (value: FormDataEntryValue | null) => String(value || "").split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    event.target.value = "";
    if (!selected.length) return;
    const invalid = selected.find((file) => !/image\/(jpeg|png|webp)/i.test(file.type));
    if (invalid) {
      setErrors((current) => ({
        ...current,
        file: "File harus JPG, PNG, atau WebP.",
      }));
      return;
    }
    const oversized = selected.find((file) => file.size > 4 * 1024 * 1024);
    if (oversized) {
      setErrors((current) => ({
        ...current,
        file: "Ukuran file maksimal 4 MB agar kompatibel dengan serverless upload.",
      }));
      return;
    }
    if (uploads.length + selected.length > 6) {
      setErrors((current) => ({ ...current, file: "Maksimal 6 gambar per karya." }));
      return;
    }
    const next = selected.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      uploadUrls.current.add(previewUrl);
      return {
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl,
      status: "ready" as const,
      };
    });
    setUploads((current) => [...current, ...next]);
    setErrors((current) => ({ ...current, file: "" }));
    addToast({ variant: "info", title: "File siap diunggah", description: `${selected.length} file akan disimpan ke server saat draf dikonfirmasi.` });
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    const required = project
      ? ["title", "category", "summary", "description", "role", "date"]
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
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaveOpen(true);
  };
  const saveDraft = async () => {
    const form = formRef.current ? new FormData(formRef.current) : null;
    if (!form) return;
    setSaving(true);
    setNotice("Menyimpan...");
    try {
      const created = project
        ? await createPortfolio({
            title: String(form.get("title")),
            category: String(form.get("category")),
             summary: String(form.get("summary")),
             description: String(form.get("description")),
             skills: splitList(form.get("skills")),
             role: String(form.get("role")),
             purpose: String(form.get("purpose") || ""),
             background: String(form.get("background") || ""),
             features: splitList(form.get("features")),
             outputs: splitList(form.get("outputs")),
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
      setNotice(uploads.length ? `Mengunggah 0/${uploads.length} gambar...` : "Menyelesaikan penyimpanan...");
      for (let index = 0; index < uploads.length; index += 1) {
        const item = uploads[index];
        setUploads((current) => current.map((upload) => upload.id === item.id ? { ...upload, status: "uploading" } : upload));
        try {
          await uploadPortfolioFile(project ? "portfolio" : "achievement", created.id, item.file);
          setUploads((current) => current.map((upload) => upload.id === item.id ? { ...upload, status: "uploaded" } : upload));
          setNotice(`Mengunggah ${index + 1}/${uploads.length} gambar...`);
        } catch (reason) {
          setUploads((current) => current.map((upload) => upload.id === item.id ? { ...upload, status: "failed" } : upload));
          throw reason;
        }
      }
      setSaveOpen(false);
      addToast({
        variant: "success",
        title: project ? "Draf berhasil disimpan" : "Prestasi berhasil disimpan",
        description: project ? `${uploads.length ? `${uploads.length} gambar berhasil diunggah. ` : ""}Karya bisa dilanjutkan atau dikirim untuk verifikasi.` : `${uploads.length ? `${uploads.length} gambar berhasil diunggah. ` : ""}Prestasi siap dikirim untuk verifikasi.`,
      });
      setNotice("");
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Data gagal disimpan.";
      setNotice(message);
      setSaveOpen(false);
      addToast({ variant: "error", title: project ? "Draf gagal disimpan" : "Prestasi gagal disimpan", description: message, duration: null });
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
              {project && <FormField id="summary" label="Ringkasan" error={errors.summary}>
                <textarea name="summary" id="summary" className={`${inputClass} h-20 resize-y py-3`} placeholder="Ringkasan singkat yang tampil pada daftar dan bagian atas detail karya." />
              </FormField>}
            </div>
            <div className="sm:col-span-2">
              <FormField
                id="description"
                label={project ? "Deskripsi proyek" : "Deskripsi"}
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
                <div className="sm:col-span-2 mt-2 rounded-xl border border-[#dce8f5] bg-[#f8fbff] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Detail proyek</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted">Bagian ini opsional. Isi hanya informasi yang benar-benar ingin ditampilkan pada detail karya.</p>
                </div>
                <FormField id="purpose" label="Tujuan proyek · opsional">
                  <textarea name="purpose" id="purpose" className={`${inputClass} h-24 resize-y py-3`} placeholder="Apa tujuan proyek ini dibuat?" />
                </FormField>
                <FormField id="background" label="Latar belakang · opsional">
                  <textarea name="background" id="background" className={`${inputClass} h-24 resize-y py-3`} placeholder="Kebutuhan atau konteks yang melatarbelakangi proyek." />
                </FormField>
                <FormField id="features" label="Fitur / implementasi · opsional">
                  <textarea name="features" id="features" className={`${inputClass} h-28 resize-y py-3`} placeholder="Satu item per baris, atau pisahkan dengan koma." />
                </FormField>
                <FormField id="outputs" label="Hasil / output · opsional">
                  <textarea name="outputs" id="outputs" className={`${inputClass} h-28 resize-y py-3`} placeholder="Satu hasil per baris, atau pisahkan dengan koma." />
                </FormField>
                <FormField id="lessonsLearned" label="Catatan pembelajaran · opsional">
                  <textarea name="lessonsLearned" id="lessonsLearned" className={`${inputClass} h-24 resize-y py-3`} placeholder="Apa yang dipelajari dari proyek ini?" />
                </FormField>
              </>
            )}
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
                     JPG, PNG, atau WebP · Maksimal 4 MB per file · Maksimal 6 gambar
                  </span>
                  <input
                    id="file"
                    type="file"
                    multiple={project}
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onFile}
                    className="sr-only"
                  />
                </label>
                  {uploads.length > 0 && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                       {uploads.map((upload, index) => (
                          <div key={upload.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-[#d7e9f8] bg-[#f7fcff] p-3">
                            <img className="size-16 shrink-0 rounded-lg object-cover" src={upload.previewUrl} alt={`Pratinjau ${upload.file.name}`} />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[11px] text-muted">{upload.file.name}</p>
                              <p className={`mt-1 text-[10px] ${upload.status === "failed" ? "text-[#b42332]" : upload.status === "uploaded" ? "text-[#16834a]" : "text-primary"}`}>
                                {upload.status === "ready" ? "Siap diunggah" : upload.status === "uploading" ? "Mengunggah..." : upload.status === "uploaded" ? "Berhasil diunggah" : "Gagal diunggah"}
                              </p>
                            </div>
                             {upload.status === "ready" && <div className="flex shrink-0 gap-1"><button type="button" disabled={index === 0} onClick={() => setUploads((current) => { const next = [...current]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; return next; })} className="rounded border border-[#b9dafa] px-2 py-1 text-[10px] text-primary disabled:opacity-40" aria-label="Pindah ke atas">↑</button><button type="button" disabled={index === uploads.length - 1} onClick={() => setUploads((current) => { const next = [...current]; [next[index], next[index + 1]] = [next[index + 1], next[index]]; return next; })} className="rounded border border-[#b9dafa] px-2 py-1 text-[10px] text-primary disabled:opacity-40" aria-label="Pindah ke bawah">↓</button><button type="button" onClick={() => setUploads((current) => current.filter((item) => item.id !== upload.id))} className="text-[11px] font-semibold text-[#d62929]">Hapus</button></div>}
                          </div>
                      ))}
                    </div>
                  )}
              </FormField>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-[#e7edf5] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[11px] leading-5 text-muted">
              {project
                ? "Data akan disimpan ke server sebagai draf. Kamu dapat mengirimkannya untuk verifikasi setelah disimpan."
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
