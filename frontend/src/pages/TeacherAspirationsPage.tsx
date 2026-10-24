import { useEffect, useState } from "react";
import { RequirePermission } from "../features/auth/RequireAuth";
import { TeacherPortalLayout } from "../layouts/TeacherPortalLayout";
import { api } from "../lib/api";
import { ActionModal } from "../components/shared/ActionModal";
import { TextInputDialog } from "../components/shared/TextInputDialog";
type Item = {
  id: string;
  classLabel: string;
  category: string;
  title: string;
  content: string;
  status: string;
  updates: { id: string; status: string; message: string }[];
};
export function TeacherAspirationsPage() {
  return (
    <RequirePermission permission="aspirations:review">
      <Content />
    </RequirePermission>
  );
}
function Content() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [input, setInput] = useState<{ id: string; status: string } | null>(
    null,
  );
  const [confirm, setConfirm] = useState<{
    id: string;
    status: string;
    message: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      setItems(await api<Item[]>("/api/reviewer/aspirations"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Aspirasi gagal dimuat.",
      );
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function update(id: string, status: string, message: string) {
    setBusy(true);
    try {
      await api(`/api/reviewer/aspirations/${id}/update`, {
        method: "POST",
        body: JSON.stringify({ status, message }),
      });
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Respons gagal disimpan.",
      );
    } finally {
      setBusy(false);
      setConfirm(null);
      setInput(null);
    }
  }
  return (
    <TeacherPortalLayout breadcrumb="Aspirasi Kelas">
      <div className="grid min-w-0 gap-6">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
            Ruang tindak lanjut MPK
          </p>
          <h1 className="mt-2 text-[28px] font-bold text-ink">
            Aspirasi Kelas
          </h1>
          <p className="mt-2 text-[13px] leading-6 text-muted">
            Tinjau aspirasi berdasarkan kelas. Identitas perwakilan tidak
            ditampilkan di ruang MPK.
          </p>
        </header>
        {error && (
          <p
            role="alert"
            className="rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]"
          >
            {error}
          </p>
        )}
        <section className="grid gap-4">
          {items.length ? (
            items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#dce8f5] bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {item.classLabel} · {item.category}
                    </span>
                    <h2 className="mt-2 text-[16px] font-bold text-ink">
                      {item.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#edf6ff] px-3 py-1 text-[10px] font-semibold text-primary">
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-[12px] leading-6 text-[#607296]">
                  {item.content}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.status === "SUBMITTED" && (
                    <button
                      onClick={() =>
                        setConfirm({
                          id: item.id,
                          status: "IN_REVIEW",
                          message: "Aspirasi akan ditandai sedang ditinjau.",
                        })
                      }
                      className="rounded-xl bg-primary px-3 py-2 text-[11px] font-semibold text-white"
                    >
                      Mulai Tinjau
                    </button>
                  )}
                  {item.status === "IN_REVIEW" && (
                    <button
                      onClick={() =>
                        setInput({ id: item.id, status: "RESPONDED" })
                      }
                      className="rounded-xl bg-primary px-3 py-2 text-[11px] font-semibold text-white"
                    >
                      Kirim Respons
                    </button>
                  )}
                  {item.status === "RESPONDED" && (
                    <button
                      onClick={() =>
                        setConfirm({
                          id: item.id,
                          status: "RESOLVED",
                          message: "Aspirasi akan ditandai selesai.",
                        })
                      }
                      className="rounded-xl bg-[#20aa65] px-3 py-2 text-[11px] font-semibold text-white"
                    >
                      Tandai Selesai
                    </button>
                  )}
                  {item.status !== "RESOLVED" && item.status !== "REJECTED" && (
                    <button
                      onClick={() =>
                        setInput({ id: item.id, status: "REJECTED" })
                      }
                      className="rounded-xl border border-[#e6aab1] px-3 py-2 text-[11px] font-semibold text-[#b42332]"
                    >
                      Tolak
                    </button>
                  )}
                </div>
                {item.updates.map((updateItem) => (
                  <div
                    key={updateItem.id}
                    className="mt-4 border-l-2 border-primary/20 pl-3"
                  >
                    <p className="text-[10px] font-semibold text-primary">
                      {updateItem.status}
                    </p>
                    <p className="mt-1 text-[12px] text-muted">
                      {updateItem.message}
                    </p>
                  </div>
                ))}
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#cbd8e8] bg-white p-10 text-center text-[12px] text-muted">
              Belum ada aspirasi untuk ditinjau.
            </div>
          )}
        </section>
      </div>
      <TextInputDialog
        open={Boolean(input)}
        title="Tulis respons aspirasi"
        description="Respons ini akan dikirim kepada perwakilan kelas dan tersimpan pada riwayat aspirasi."
        label="Respons MPK"
        busy={busy}
        error={error}
        onClose={() => {
          if (!busy) setInput(null);
        }}
        onSubmit={(message) =>
          input ? update(input.id, input.status, message) : undefined
        }
      />
      <ActionModal
        open={Boolean(confirm)}
        variant={confirm?.status === "REJECTED" ? "warning" : "save"}
        title={
          confirm?.status === "RESOLVED"
            ? "Tandai aspirasi selesai?"
            : "Mulai tinjau aspirasi?"
        }
        description={confirm?.message || ""}
        confirmLabel={
          confirm?.status === "RESOLVED" ? "Tandai Selesai" : "Mulai Tinjau"
        }
        busy={busy}
        onClose={() => {
          if (!busy) setConfirm(null);
        }}
        onConfirm={() =>
          confirm
            ? update(confirm.id, confirm.status, confirm.message)
            : undefined
        }
      />
    </TeacherPortalLayout>
  );
}
