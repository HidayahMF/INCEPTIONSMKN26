import { useEffect, useMemo, useState } from "react";
import { RequireAuth } from "../features/auth/RequireAuth";
import { useAuth } from "../features/auth/AuthProvider";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { PklFilterBar } from "../components/student/pkl/PklFilterBar";
import { PklOpportunityCard } from "../components/student/pkl/PklOpportunityCard";
import { PklPreparationCard } from "../components/student/pkl/PklPreparationCard";
import { PklSummaryCards } from "../components/student/pkl/PklSummaryCards";
import { PklTabs } from "../components/student/pkl/PklTabs";
import { demoPklOpportunities } from "../components/student/pkl/pkl.data";
import {
  applyPkl,
  getPklApplications,
  getPklVacancies,
} from "../components/student/pkl/pkl.api";
import { getPortfolioProjects } from "../components/student/portfolio/portfolio.api";
import type { PortfolioProject } from "../components/student/portfolio/portfolio.types";
import type {
  PklApplication,
  PklOpportunity,
} from "../components/student/pkl/pkl.types";
import type { PklTab } from "../components/student/pkl/pkl.types";
import { ActionModal } from "../components/shared/ActionModal";
import { getCachedApi } from "../lib/api";
import { useToast } from "../components/shared/ToastProvider";

export function StudentPklPage() {
  const { me } = useAuth();
  const isStudent = me?.profile.account_type === "STUDENT";

  return (
    <RequireAuth>
      {isStudent ? (
        <StudentPklContent />
      ) : (
        <main className="min-h-screen bg-school-bg p-8 text-muted">
          Halaman ini hanya tersedia untuk akun siswa.
        </main>
      )}
    </RequireAuth>
  );
}

function StudentPklContent() {
  const { addToast } = useToast();
  const { me } = useAuth();
  const isDemo = Boolean(me?.profile.school_identifier?.startsWith("DEMO-"));
  const [opportunities, setOpportunities] = useState<PklOpportunity[]>(() => getCachedApi<PklOpportunity[]>("/api/student/pkl/vacancies") || []);
  const [applications, setApplications] = useState<PklApplication[]>(() => getCachedApi<PklApplication[]>("/api/student/pkl/applications") || []);
  const [portfolios, setPortfolios] = useState<PortfolioProject[]>(() => getCachedApi<PortfolioProject[]>("/api/student/portfolio") || []);
  const [selected, setSelected] = useState<PklOpportunity | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(() => !getCachedApi("/api/student/pkl/vacancies") && !getCachedApi("/api/student/pkl/applications") && !getCachedApi("/api/student/portfolio"));
  useEffect(() => {
    Promise.all([
      getPklVacancies(),
      getPklApplications(),
      getPortfolioProjects(),
    ])
      .then(([next, submitted, projects]) => {
        setOpportunities(
          next.length ? next : isDemo ? demoPklOpportunities : [],
        );
        setApplications(submitted);
        setPortfolios(projects);
      })
      .catch((reason) =>
        setNotice(
          reason instanceof Error ? reason.message : "Data PKL gagal dimuat.",
        ),
      )
      .finally(() => setLoading(false));
  }, [isDemo]);
  const [tab, setTab] = useState<PklTab>("opportunities");
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const [major, setMajor] = useState("all");
  const [location, setLocation] = useState("all");
  const fields = useMemo(
    () => unique(opportunities.map((item) => item.field)),
    [opportunities],
  );
  const majors = useMemo(
    () => unique(opportunities.map((item) => item.major)),
    [opportunities],
  );
  const locations = useMemo(
    () => unique(opportunities.map((item) => item.location)),
    [opportunities],
  );
  const filteredOpportunities = useMemo(
    () =>
      opportunities.filter((item) => {
        const normalizedQuery = query.trim().toLowerCase();
        const matchesQuery =
          !normalizedQuery ||
          [
            item.company,
            item.program,
            item.industry,
            item.major,
            item.location,
          ].some((value) => value.toLowerCase().includes(normalizedQuery));
        const matchesField = field === "all" || item.field === field;
        const matchesMajor = major === "all" || item.major === major;
        const matchesLocation =
          location === "all" || item.location === location;
        return matchesQuery && matchesField && matchesMajor && matchesLocation;
      }),
    [field, location, major, opportunities, query],
  );

  const date = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <StudentPortalLayout breadcrumb="PKL & Lamaran">
      <div className="grid min-w-0 gap-6">
        <header className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="break-words text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
                BKK &amp; PKL
              </h1>
              <span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-semibold text-primary">
                Portal siswa SMK Negeri 26 Jakarta
              </span>
            </div>
            <p className="mt-2 break-words text-[13px] text-[#607296]">
              Temukan peluang Praktik Kerja Lapangan yang sesuai dengan jurusan
              dan minatmu.
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <strong className="block text-[12px] font-semibold capitalize text-ink">
              {date}
            </strong>
            <span className="mt-1 block text-[11px] text-muted">
              Semester ganjil 2026/2027
            </span>
          </div>
        </header>

        <PklSummaryCards isDemo={isDemo} />
        {notice && (
          <p
            role="alert"
            className="rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]"
          >
            {notice}
          </p>
        )}
        <PklTabs selected={tab} onChange={setTab} />
        <div
          id={`pkl-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`pkl-tab-${tab}`}
        >
          {tab === "opportunities" ? (
            <>
              <PklFilterBar
                query={query}
                field={field}
                major={major}
                location={location}
                fields={fields}
                majors={majors}
                locations={locations}
                onQueryChange={setQuery}
                onFieldChange={setField}
                onMajorChange={setMajor}
                onLocationChange={setLocation}
              />
              <section className="mt-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-[19px] font-bold text-ink">
                        Peluang PKL untukmu
                      </h2>
                      <span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-semibold text-primary">
                        Peluang PKL
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] text-[#607296]">
                      Periksa detail peluang untuk mengetahui persyaratan,
                      periode, dan informasi pendaftaran.
                    </p>
                  </div>
                  <span className="text-[12px] text-[#607296]">
                    {filteredOpportunities.length} peluang ditampilkan
                  </span>
                </div>
                {loading ? (
                  <div className="h-48 animate-pulse rounded-2xl bg-white" />
                ) : filteredOpportunities.length ? (
                  <div className="mt-4 grid min-w-0 gap-5 lg:grid-cols-2">
                    {filteredOpportunities.map((opportunity) => (
                      <PklOpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        onDetail={() => setSelected(opportunity)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyPklState
                    text={
                      isDemo
                        ? "Tidak ada peluang yang sesuai dengan filtermu."
                        : "Peluang PKL belum tersedia untuk akunmu."
                    }
                  />
                )}
              </section>
            </>
          ) : tab === "applications" ? (
            <Applications applications={applications} />
          ) : (
            <EmptyPklState
              id={`pkl-panel-${tab}`}
              text="Belum ada peluang yang tersimpan."
            />
          )}
        </div>
        <PklPreparationCard />
        <footer className="flex flex-col justify-between gap-2 pb-1 text-[11px] text-muted sm:flex-row">
          <span>SMK Negeri 26 Jakarta · Portal Internal Siswa</span>
          <span>Portal Internal Siswa · SMK Negeri 26 Jakarta</span>
        </footer>
      </div>
      {selected && (
        <ApplyDialog
          opportunity={selected}
          portfolios={portfolios}
          onClose={() => setSelected(null)}
          onApplied={(message) => {
            setNotice(message);
            addToast({ variant: "success", title: "Lamaran PKL berhasil dikirim", description: "Lamaran masuk ke review BKK." });
            setSelected(null);
            void getPklApplications().then(setApplications);
          }}
        />
      )}
    </StudentPortalLayout>
  );
}

function Applications({ applications }: { applications: PklApplication[] }) {
  return applications.length ? (
    <section className="grid gap-3">
      {applications.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-[#e1e9f4] bg-white p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-bold text-ink">
                {item.vacancy?.company || "Lowongan PKL"}
              </h2>
              <p className="mt-1 text-[12px] text-muted">
                {item.vacancy?.program}
              </p>
            </div>
            <span className="rounded-full bg-[#edf7ff] px-3 py-1 text-[10px] font-semibold text-primary">
              {item.status}
            </span>
          </div>
          {item.reviewerNote && (
            <p className="mt-3 rounded-xl bg-[#fff9e9] p-3 text-[11px] text-[#856b37]">
              Catatan reviewer: {item.reviewerNote}
            </p>
          )}
        </article>
      ))}
    </section>
  ) : (
    <EmptyPklState text="Belum ada data lamaran yang tersedia." />
  );
}
function ApplyDialog({
  opportunity,
  portfolios,
  onClose,
  onApplied,
}: {
  opportunity: PklOpportunity;
  portfolios: PortfolioProject[];
  onClose: () => void;
  onApplied: (message: string) => void;
}) {
  const { addToast } = useToast();
  const [portfolioId, setPortfolioId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  useEffect(() => {
    if (file) addToast({ variant: "info", title: "File siap diunggah", description: `${file.name} akan disimpan bersama lamaran saat dikirim.` });
  }, [addToast, file]);
  async function submit() {
    if (!portfolioId || !file) {
      setError("Pilih portofolio terverifikasi dan lampirkan CV PDF.");
      return;
    }
    setConfirmOpen(true);
  }
  async function confirmSubmit() {
    if (!portfolioId || !file) return;
    setBusy(true);
    try {
      await applyPkl(opportunity.id, portfolioId, file);
      onApplied("Lamaran PKL berhasil dikirim.");
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Lamaran gagal dikirim.";
      setConfirmOpen(false);
      addToast({ variant: "error", title: "Lamaran PKL gagal dikirim", description: message, duration: null });
      setError(
        message,
      );
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  }
  return (
    <div className="portal-modal-backdrop fixed inset-0 z-[110] grid place-items-center bg-ink/35 p-4">
      <section
        role="dialog"
        aria-modal="true"
        className="portal-modal-panel max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"
      >
        <h2 className="text-[18px] font-bold text-ink">
          Lamar {opportunity.program}
        </h2>
        <p className="mt-2 text-[12px] text-muted">
          {opportunity.company} · pilih portofolio yang sudah terverifikasi.
        </p>
        <label className="mt-5 grid gap-2 text-[11px] font-medium text-ink">
          <span>Portofolio VERIFIED</span>
          <select
            value={portfolioId}
            onChange={(event) => setPortfolioId(event.target.value)}
            className="h-11 rounded-xl border border-[#cbd9ea] px-3"
          >
            <option value="">Pilih portofolio</option>
            {portfolios
              .filter((item) => item.status === "VERIFIED")
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
        </label>
        <label className="mt-4 grid gap-2 text-[11px] font-medium text-ink">
          <span>CV PDF · maksimal 5 MB</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
        </label>
        {error && (
          <p role="alert" className="mt-3 text-[11px] text-[#b42332]">
            {error}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#b9dafa] px-4 py-2.5 text-[12px] font-semibold text-primary"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void submit()}
            className="rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-white disabled:opacity-50"
          >
            {busy ? "Mengirim..." : "Kirim Lamaran"}
          </button>
        </div>
      </section>
      <ActionModal
        open={confirmOpen}
        variant="save"
        title="Kirim lamaran PKL?"
        description={`Lamaran ke ${opportunity.company} untuk program ${opportunity.program} akan dikirim ke reviewer BKK.`}
        confirmLabel="Kirim Lamaran"
        busy={busy}
        onClose={() => {
          if (!busy) setConfirmOpen(false);
        }}
        onConfirm={confirmSubmit}
      />
    </div>
  );
}

function EmptyPklState({ text, id }: { text: string; id?: string }) {
  return (
    <section
      id={id}
      className="mt-5 rounded-2xl border border-dashed border-[#cbd8e8] bg-white px-5 py-12 text-center"
    >
      <p className="text-sm text-muted">{text}</p>
    </section>
  );
}

function unique(values: string[]) {
  return [...new Set(values)];
}
