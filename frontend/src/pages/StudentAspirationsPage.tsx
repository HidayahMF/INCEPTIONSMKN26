import { useEffect, useState } from "react";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { api } from "../lib/api";
import { ActionModal } from "../components/shared/ActionModal";
type Cycle = { id: string; name: string; opens_at: string; closes_at: string };
type SchoolClass = { id: string; code: string };
type Aspiration = {
  id: string;
  classLabel: string;
  category: string;
  title: string;
  content: string;
  status: string;
  updates: {
    id: string;
    status: string;
    message: string;
    created_at: string;
  }[];
};
const categories = [
  ["FACILITIES", "Sarana sekolah"],
  ["LEARNING", "Pembelajaran"],
  ["STUDENT_LIFE", "Kehidupan siswa"],
  ["SAFETY", "Keamanan"],
  ["OTHER", "Lainnya"],
];
export function StudentAspirationsPage() {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [items, setItems] = useState<Aspiration[]>([]);
  const [form, setForm] = useState({
    classId: "",
    cycleId: "",
    category: "FACILITIES",
    title: "",
    content: "",
  });
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      const context = await api<{ classes: SchoolClass[]; cycles: Cycle[] }>(
        "/api/student/aspirations/context",
      );
      setClasses(context.classes);
      setCycles(context.cycles);
      setForm((current) => ({
        ...current,
        classId: current.classId || context.classes[0]?.id || "",
        cycleId: current.cycleId || context.cycles[0]?.id || "",
      }));
      setItems(await api<Aspiration[]>("/api/student/aspirations"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Aspirasi gagal dimuat.",
      );
    }
  }
  useEffect(() => {
    void load();
  }, []);
  function submit(event: React.FormEvent) {
    event.preventDefault();
    setConfirmOpen(true);
  }
  async function confirmSubmit() {
    setBusy(true);
    try {
      await api("/api/student/aspirations", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setNotice("Aspirasi kelas berhasil dikirim ke MPK.");
      setForm((current) => ({ ...current, title: "", content: "" }));
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Aspirasi gagal dikirim.",
      );
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  }
  return (
    <StudentPortalLayout breadcrumb="Aspirasi Kelas">
      <div className="grid min-w-0 gap-6">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
            Suara kelas
          </p>
          <h1 className="mt-2 text-[28px] font-bold tracking-[-.03em] text-ink">
            Aspirasi Kelas
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">
            Perwakilan kelas dapat mengirim satu rangkuman aspirasi pada setiap
            siklus yang dibuka sekolah.
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
          onSubmit={submit}
          className="grid gap-4 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_4px_16px_rgba(25,63,112,.04)] sm:grid-cols-2"
        >
          <h2 className="sm:col-span-2 text-[17px] font-bold text-ink">
            Kirim aspirasi kelas
          </h2>
          <label className="grid gap-2 text-[11px] font-medium text-ink">
            Kelas
            <select
              value={form.classId}
              onChange={(event) =>
                setForm({ ...form, classId: event.target.value })
              }
              className="h-10 rounded-xl border border-[#cbd9ea] bg-white px-3"
            >
              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.code}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-[11px] font-medium text-ink">
            Siklus
            <select
              value={form.cycleId}
              onChange={(event) =>
                setForm({ ...form, cycleId: event.target.value })
              }
              className="h-10 rounded-xl border border-[#cbd9ea] bg-white px-3"
            >
              {cycles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-[11px] font-medium text-ink">
            Kategori
            <select
              value={form.category}
              onChange={(event) =>
                setForm({ ...form, category: event.target.value })
              }
              className="h-10 rounded-xl border border-[#cbd9ea] bg-white px-3"
            >
              {categories.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-[11px] font-medium text-ink sm:col-span-2">
            Judul
            <input
              required
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              className="h-10 rounded-xl border border-[#cbd9ea] px-3"
            />
          </label>
          <label className="grid gap-2 text-[11px] font-medium text-ink sm:col-span-2">
            Isi aspirasi
            <textarea
              required
              minLength={10}
              value={form.content}
              onChange={(event) =>
                setForm({ ...form, content: event.target.value })
              }
              className="min-h-28 rounded-xl border border-[#cbd9ea] p-3"
            />
          </label>
          <button
            disabled={!classes.length || !cycles.length}
            className="w-fit rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Kirim Aspirasi
          </button>
        </form>
        <ActionModal
          open={confirmOpen}
          variant="save"
          title="Kirim aspirasi?"
          description="Aspirasi akan dikirim kepada MPK untuk ditinjau pada siklus yang dipilih."
          confirmLabel="Kirim Aspirasi"
          busy={busy}
          onClose={() => {
            if (!busy) setConfirmOpen(false);
          }}
          onConfirm={confirmSubmit}
        />
        <section className="grid gap-3">
          <h2 className="text-[18px] font-bold text-ink">Riwayat aspirasi</h2>
          {items.length ? (
            items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#dce8f5] bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {item.classLabel} · {item.category}
                    </span>
                    <h3 className="mt-2 text-[15px] font-bold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-[#edf6ff] px-3 py-1 text-[10px] font-semibold text-primary">
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-[12px] leading-6 text-[#607296]">
                  {item.content}
                </p>
                {item.updates.map((update) => (
                  <div
                    key={update.id}
                    className="mt-4 border-l-2 border-primary/20 pl-3"
                  >
                    <p className="text-[10px] font-semibold text-primary">
                      {update.status}
                    </p>
                    <p className="mt-1 text-[12px] text-muted">
                      {update.message}
                    </p>
                  </div>
                ))}
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white p-10 text-center text-[12px] text-muted">
              Belum ada aspirasi kelas yang dikirim.
            </div>
          )}
        </section>
      </div>
    </StudentPortalLayout>
  );
}
