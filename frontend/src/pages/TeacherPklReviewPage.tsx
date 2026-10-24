import { useEffect, useState, type FormEvent } from "react";
import { RequirePermission } from "../features/auth/RequireAuth";
import { api } from "../lib/api";
import { TeacherPortalLayout } from "../layouts/TeacherPortalLayout";

type Vacancy = {
  id: string;
  company: string;
  position: string;
  status: string;
  major: string;
  location: string;
};
type Application = {
  id: string;
  status: string;
  reviewerNote: string;
  vacancy?: { company: string; program: string } | null;
};
const input =
  "h-10 rounded-xl border border-[#cbd9ea] px-3 text-[12px] text-ink outline-none focus:border-primary focus:ring-2 focus:ring-[#d7edff]";

export function TeacherPklReviewPage() {
  return (
    <RequirePermission permission="pkl:manage">
      <Content />
    </RequirePermission>
  );
}
function Content() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  async function load() {
    try {
      setVacancies(await api<Vacancy[]>("/api/reviewer/pkl/vacancies"));
      setApplications(
        await api<Application[]>("/api/reviewer/pkl/applications"),
      );
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Data BKK gagal dimuat.",
      );
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form);
    const payload = {
      ...values,
      requirements: String(values.requirements || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };
    try {
      await api("/api/reviewer/pkl/vacancies", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setNotice("Lowongan tersimpan sebagai draf.");
      event.currentTarget.reset();
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Lowongan gagal disimpan.",
      );
    }
  }
  async function publish(id: string) {
    try {
      await api(`/api/reviewer/pkl/vacancies/${id}/publish`, {
        method: "POST",
      });
      setNotice("Lowongan dipublikasikan.");
      await load();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Publikasi gagal.");
    }
  }
  async function status(id: string, next: string) {
    try {
      await api(`/api/reviewer/pkl/applications/${id}/status`, {
        method: "POST",
        body: JSON.stringify({
          status: next,
          note: next === "REJECTED" ? "Dokumen perlu dilengkapi." : "",
        }),
      });
      setNotice("Status lamaran diperbarui.");
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Status gagal diperbarui.",
      );
    }
  }
  return (
    <TeacherPortalLayout breadcrumb="BKK & PKL">
      <div className="grid min-w-0 gap-6">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
            Pengelolaan peluang industri
          </p>
          <h1 className="mt-2 text-[28px] font-bold tracking-[-.03em] text-ink">
            BKK &amp; PKL
          </h1>
          <p className="mt-2 text-[13px] leading-6 text-muted">
            Buat lowongan PKL dan tinjau lamaran siswa dengan alur yang
            terkontrol.
          </p>
        </header>
        {notice && (
          <p
            role="status"
            className="rounded-xl border border-[#bce8cf] bg-[#f2fbf5] p-4 text-[12px] text-[#147a42]"
          >
            {notice}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]"
          >
            {error}
          </p>
        )}
        <form
          onSubmit={create}
          className="grid gap-3 rounded-2xl border border-[#dce8f5] bg-white p-5 sm:grid-cols-2"
        >
          <h2 className="sm:col-span-2 text-[17px] font-bold text-ink">
            Buat Lowongan PKL
          </h2>
          {[
            ["company", "Perusahaan"],
            ["industry", "Industri"],
            ["position", "Posisi"],
            ["major", "Jurusan"],
            ["location", "Lokasi"],
            ["registrationStart", "Mulai pendaftaran"],
            ["registrationEnd", "Akhir pendaftaran"],
            ["internshipStart", "Mulai PKL"],
            ["internshipEnd", "Akhir PKL"],
          ].map(([name, label]) => (
            <label
              key={name}
              className="grid gap-1.5 text-[11px] font-medium text-ink"
            >
              <span>{label}</span>
              <input
                name={name}
                type={
                  name.toLowerCase().includes("start") ||
                  name.toLowerCase().includes("end")
                    ? "date"
                    : "text"
                }
                className={input}
                required
              />
            </label>
          ))}
          <label className="grid gap-1.5 text-[11px] font-medium text-ink sm:col-span-2">
            <span>Deskripsi</span>
            <textarea
              name="description"
              className={`${input} h-24 py-2`}
              required
            />
          </label>
          <label className="grid gap-1.5 text-[11px] font-medium text-ink sm:col-span-2">
            <span>Persyaratan, satu per baris</span>
            <textarea name="requirements" className={`${input} h-20 py-2`} />
          </label>
          <button className="min-h-10 w-fit rounded-xl bg-primary px-4 text-[12px] font-semibold text-white">
            Simpan Draf
          </button>
        </form>
        <section className="grid gap-3">
          <h2 className="text-[18px] font-bold text-ink">Lowongan</h2>
          {vacancies.length ? (
            vacancies.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dce8f5] bg-white p-4"
              >
                <div>
                  <strong className="text-[13px] text-ink">
                    {item.company} · {item.position}
                  </strong>
                  <p className="mt-1 text-[11px] text-muted">
                    {item.major} · {item.location} · {item.status}
                  </p>
                </div>
                {item.status === "DRAFT" && (
                  <button
                    type="button"
                    onClick={() => void publish(item.id)}
                    className="rounded-xl bg-primary px-3 py-2 text-[11px] font-semibold text-white"
                  >
                    Publikasikan
                  </button>
                )}
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[#cbd9e8] bg-white p-8 text-[12px] text-muted">
              Belum ada lowongan.
            </p>
          )}
        </section>
        <section className="grid gap-3">
          <h2 className="text-[18px] font-bold text-ink">Pelamar</h2>
          {applications.length ? (
            applications.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dce8f5] bg-white p-4"
              >
                <div>
                  <strong className="text-[13px] text-ink">
                    {item.vacancy?.company || "Lowongan"}
                  </strong>
                  <p className="mt-1 text-[11px] text-muted">
                    {item.vacancy?.program} · {item.status}
                  </p>
                  {item.reviewerNote && (
                    <p className="mt-2 text-[11px] text-[#856b37]">
                      {item.reviewerNote}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void status(item.id, "REVIEWING")}
                    className="rounded-xl border border-[#b9dafa] px-3 py-2 text-[11px] font-semibold text-primary"
                  >
                    Review
                  </button>
                  <button
                    type="button"
                    onClick={() => void status(item.id, "ACCEPTED")}
                    className="rounded-xl bg-[#20aa65] px-3 py-2 text-[11px] font-semibold text-white"
                  >
                    Terima
                  </button>
                  <button
                    type="button"
                    onClick={() => void status(item.id, "REJECTED")}
                    className="rounded-xl border border-[#e6aab1] px-3 py-2 text-[11px] font-semibold text-[#b42332]"
                  >
                    Tolak
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[#cbd9e8] bg-white p-8 text-[12px] text-muted">
              Belum ada pelamar.
            </p>
          )}
        </section>
      </div>
    </TeacherPortalLayout>
  );
}
