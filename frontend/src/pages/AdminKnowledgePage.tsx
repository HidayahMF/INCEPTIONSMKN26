import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { PortalLayout } from "../layouts/PortalLayout";
import { RequirePermission } from "../features/auth/RequireAuth";
import { api, getCachedApi } from "../lib/api";
import { ActionModal } from "../components/shared/ActionModal";
import { useToast } from "../components/shared/ToastProvider";
type KnowledgeItem = {
  id: string;
  status: string;
  source_type: string;
  knowledge_sources?: { title?: string };
};
export function AdminKnowledgePage() {
  const { addToast } = useToast();
  const [items, setItems] = useState<KnowledgeItem[]>(() => getCachedApi<KnowledgeItem[]>("/api/admin/knowledge") || []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [pendingStatus, setPendingStatus] = useState<{
    id: string;
    next: string;
    title: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  async function reload() {
    try {
      setItems(await api<KnowledgeItem[]>("/api/admin/knowledge"));
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "Gagal memuat knowledge base.",
      );
    }
  }
  useEffect(() => {
    void reload();
  }, []);
  async function addText(event: FormEvent) {
    event.preventDefault();
    try {
      await api("/api/admin/knowledge/text", {
        method: "POST",
        body: JSON.stringify({ title, body }),
      });
      setTitle("");
      setBody("");
      setStatus("Sumber disimpan sebagai DRAFT.");
      addToast({ variant: "success", title: "Sumber Knowledge Base berhasil disimpan", description: "Sumber tersimpan sebagai draft." });
      await reload();
    } catch (e) {
      addToast({ variant: "error", title: "Sumber Knowledge Base gagal disimpan", description: e instanceof Error ? e.message : "Gagal menyimpan sumber.", duration: null });
      setStatus(e instanceof Error ? e.message : "Gagal menyimpan sumber.");
    }
  }
  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("title", file.name);
    form.append("file", file);
    try {
      await api("/api/admin/knowledge/pdf", { method: "POST", body: form });
      setStatus("PDF diproses sebagai DRAFT.");
      addToast({ variant: "success", title: "PDF berhasil diunggah", description: "Dokumen diproses sebagai draft." });
      await reload();
    } catch (e) {
      addToast({ variant: "error", title: "PDF gagal diunggah", description: e instanceof Error ? e.message : "Gagal memproses PDF.", duration: null });
      setStatus(e instanceof Error ? e.message : "Gagal memproses PDF.");
    }
  }
  async function changeStatus(id: string, nextStatus: string) {
    setBusy(true);
    try {
      await api(`/api/admin/knowledge/${id}/status`, {
        method: "POST",
        body: JSON.stringify({ status: nextStatus }),
      });
      await reload();
      setPendingStatus(null);
      addToast({ variant: "success", title: nextStatus === "APPROVED" ? "Sumber berhasil dipublikasikan" : "Publikasi sumber berhasil ditarik" });
    } catch (e) {
      setPendingStatus(null);
      addToast({ variant: "error", title: "Status sumber gagal diubah", description: e instanceof Error ? e.message : "Status gagal diubah.", duration: null });
      setStatus(e instanceof Error ? e.message : "Status gagal diubah.");
    } finally {
      setBusy(false);
      setPendingStatus(null);
    }
  }
  return (
    <RequirePermission permission="content:manage">
      <PortalLayout breadcrumb="Knowledge Base">
        <p className="text-sm font-medium text-primary">
          Sumber informasi publik
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
          Knowledge Base
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          Tinjau dan setujui sumber sebelum digunakan oleh chatbot publik.
        </p>
        {status && (
          <p className="mt-6 rounded-2xl bg-white p-4 text-sm text-muted ring-1 ring-light-blue">
            {status}
          </p>
        )}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[24px] border border-light-blue bg-white p-6">
            <h2 className="text-xl font-bold text-ink">
              Tambah informasi teks
            </h2>
            <form className="mt-5 grid gap-3" onSubmit={addText}>
              <input
                className="rounded-xl border border-light-blue px-4 py-3"
                placeholder="Judul sumber"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="min-h-40 rounded-xl border border-light-blue px-4 py-3"
                placeholder="Isi resmi yang sudah diverifikasi"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
              <button className="rounded-full bg-gradient-to-br from-primary-dark via-primary to-soft-blue px-5 py-3 text-sm font-medium text-white">
                Simpan sebagai draft
              </button>
            </form>
            <label className="mt-5 block text-sm font-medium text-ink">
              Unggah PDF draft
              <input
                className="mt-2 block text-sm font-normal"
                type="file"
                accept="application/pdf"
                onChange={upload}
              />
            </label>
          </article>
          <article className="rounded-[24px] border border-light-blue bg-white p-6">
            <h2 className="text-xl font-bold text-ink">Sumber tersimpan</h2>
            <div className="mt-5 grid gap-3">
              {items.map((item) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-2xl bg-school-bg p-4"
                  key={item.id}
                >
                  <span>
                    <strong className="block text-sm text-ink">
                      {item.knowledge_sources?.title || "Sumber tanpa judul"}
                    </strong>
                    <small className="text-xs text-muted">
                      {item.source_type} · {item.status}
                    </small>
                  </span>
                  <button
                    className="rounded-full bg-white px-3 py-2 text-xs font-medium text-primary"
                    onClick={() =>
                      setPendingStatus({
                        id: item.id,
                        next: item.status === "APPROVED" ? "DRAFT" : "APPROVED",
                        title: item.knowledge_sources?.title || "Sumber ini",
                      })
                    }
                  >
                    {item.status === "APPROVED" ? "Tarik publikasi" : "Setujui"}
                  </button>
                </div>
              ))}
            </div>
          </article>
        </div>
        <ActionModal
          open={Boolean(pendingStatus)}
          variant={pendingStatus?.next === "APPROVED" ? "save" : "warning"}
          title={
            pendingStatus?.next === "APPROVED"
              ? "Setujui sumber ini?"
              : "Tarik publikasi?"
          }
          description={
            pendingStatus
              ? `${pendingStatus.title} akan ${pendingStatus.next === "APPROVED" ? "dipublikasikan untuk digunakan chatbot" : "dikembalikan menjadi draft"}.`
              : ""
          }
          confirmLabel={
            pendingStatus?.next === "APPROVED" ? "Setujui" : "Tarik Publikasi"
          }
          busy={busy}
          onClose={() => {
            if (!busy) setPendingStatus(null);
          }}
          onConfirm={() =>
            pendingStatus
              ? changeStatus(pendingStatus.id, pendingStatus.next)
              : undefined
          }
        />
      </PortalLayout>
    </RequirePermission>
  );
}
