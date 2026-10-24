import { useEffect, useState } from "react";
import { RequirePermission } from "../features/auth/RequireAuth";
import { api } from "../lib/api";
import { TeacherPortalLayout } from "../layouts/TeacherPortalLayout";
import { ActionModal } from "../components/shared/ActionModal";
import { useToast } from "../components/shared/ToastProvider";

type ReviewItem = {
  id: string;
  title: string;
  category?: string;
  competition?: string;
  summary?: string;
  description: string;
  role?: string;
  purpose?: string;
  background?: string;
  features?: string[];
  outputs?: string[];
  skills?: string[];
  lessonsLearned?: string;
  github?: string;
  demoUrl?: string;
  files?: { id: string; name: string; mimeType: string; size: number; createdAt: string }[];
  date: string;
};

export function TeacherPortfolioReviewPage() {
  return (
    <RequirePermission permission="portfolio:review">
      <TeacherPortfolioReviewContent />
    </RequirePermission>
  );
}

function TeacherPortfolioReviewContent() {
  const { addToast } = useToast();
  const [tab, setTab] = useState<"portfolio" | "achievement">("portfolio");
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState("");
  const [rejecting, setRejecting] = useState<ReviewItem | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [verifying, setVerifying] = useState<ReviewItem | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    try {
      setError("");
      setItems(await api<ReviewItem[]>(`/api/reviewer/${tab}`));
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Antrean review gagal dimuat.",
      );
    }
  }

  useEffect(() => {
    void load();
  }, [tab]);

  async function review(
    item: ReviewItem,
    decision: "VERIFIED" | "REJECTED",
    suppliedNote = "",
  ) {
    const note =
      decision === "REJECTED" ? suppliedNote : "Disetujui setelah ditinjau.";
    if (decision === "REJECTED" && !note.trim()) return;
    setBusy(item.id);
    try {
      await api(`/api/reviewer/${tab}/${item.id}/review`, {
        method: "POST",
        body: JSON.stringify({ decision, note }),
      });
      setNotice(
        `${item.title} ${decision === "VERIFIED" ? "diverifikasi" : "dikembalikan untuk revisi"}.`,
      );
      setRejecting(null);
      setVerifying(null);
      addToast({ variant: "success", title: decision === "VERIFIED" ? "Pengajuan berhasil diverifikasi" : "Pengajuan dikembalikan untuk revisi", description: item.title });
      setRejectNote("");
      await load();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Review gagal disimpan.";
      setRejecting(null);
      setVerifying(null);
      addToast({ variant: "error", title: "Review gagal disimpan", description: message, duration: null });
      setError(
        message,
      );
    } finally {
      setBusy("");
    }
  }

  return (
    <TeacherPortalLayout breadcrumb="Review Portofolio & Prestasi">
      <div className="grid min-w-0 gap-6">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
            Verifikasi karya siswa
          </p>
          <h1 className="mt-2 text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">
            Review Portofolio &amp; Prestasi
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">
            Tinjau data yang dikirim siswa sebelum dinyatakan terverifikasi.
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
        {notice && (
          <p
            role="status"
            className="rounded-xl border border-[#bce8cf] bg-[#f2fbf5] p-4 text-[12px] text-[#147a42]"
          >
            {notice}
          </p>
        )}
        <div
          role="tablist"
          className="flex w-fit rounded-xl border border-[#dce8f5] bg-white p-1"
        >
          {(["portfolio", "achievement"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={`rounded-lg px-4 py-2 text-[12px] font-semibold ${tab === value ? "bg-[#edf7ff] text-primary" : "text-muted"}`}
            >
              {value === "portfolio" ? "Karya" : "Prestasi"}
            </button>
          ))}
        </div>
        {items.length ? (
          <section className="overflow-x-auto rounded-2xl border border-[#dce8f5] bg-white shadow-[0_2px_8px_rgba(25,63,112,.02)]">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-[#e7edf5] text-[10px] uppercase tracking-wide text-[#8492aa]">
                  <th className="px-5 py-4 font-semibold">Data</th>
                  <th className="px-5 py-4 font-semibold">Deskripsi</th>
                  <th className="px-5 py-4 font-semibold">Tanggal</th>
                  <th className="px-5 py-4 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#eef2f7] align-top text-[12px] last:border-0"
                  >
                    <td className="px-5 py-4">
                      <strong className="block text-ink">{item.title}</strong>
                      <span className="mt-1 block text-[11px] text-muted">
                        {item.category || item.competition}
                      </span>
                    </td>
                    <td className="max-w-[340px] px-5 py-4 leading-5 text-muted">
                      {item.description}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted">
                      {item.date}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setExpanded((current) => current === item.id ? null : item.id)}
                          className="rounded-lg border border-[#b9dafa] px-3 py-2 text-[11px] font-semibold text-primary"
                        >
                          {expanded === item.id ? "Tutup detail" : "Lihat detail"}
                        </button>
                        <button
                          disabled={busy === item.id}
                          type="button"
                          onClick={() => setVerifying(item)}
                          className="rounded-lg bg-primary px-3 py-2 text-[11px] font-semibold text-white disabled:opacity-50"
                        >
                          Verifikasi
                        </button>
                        <button
                          disabled={busy === item.id}
                          type="button"
                          onClick={() => {
                            setRejecting(item);
                            setRejectNote("");
                          }}
                          className="rounded-lg border border-[#e6aab1] px-3 py-2 text-[11px] font-semibold text-[#b42332] disabled:opacity-50"
                        >
                          Tolak
                        </button>
                      </div>
                      {expanded === item.id && (
                        <div className="mt-4 grid gap-3 rounded-xl border border-[#e1e9f4] bg-[#f8fbff] p-4 text-[11px] leading-5 text-muted sm:col-span-4">
                          {tab === "portfolio" ? (
                            <>
                              {item.summary && <ReviewDetail label="Ringkasan" value={item.summary} />}
                              <ReviewDetail label="Deskripsi" value={item.description} />
                              {item.role && <ReviewDetail label="Peran siswa" value={item.role} />}
                              {item.purpose && <ReviewDetail label="Tujuan" value={item.purpose} />}
                              {item.background && <ReviewDetail label="Latar belakang" value={item.background} />}
                              {item.features?.length ? <ReviewList label="Fitur / implementasi" items={item.features} /> : null}
                              {item.outputs?.length ? <ReviewList label="Hasil / output" items={item.outputs} /> : null}
                              {item.skills?.length ? <ReviewList label="Teknologi / keahlian" items={item.skills} /> : null}
                              {item.lessonsLearned && <ReviewDetail label="Pembelajaran" value={item.lessonsLearned} />}
                              {(item.github || item.demoUrl) && <ReviewDetail label="Tautan" value={[item.github, item.demoUrl].filter(Boolean).join(" · ")} />}
                            </>
                          ) : <ReviewDetail label="Deskripsi" value={item.description} />}
                          {item.files?.length ? <ReviewList label="Dokumentasi" items={item.files.map((file) => `${file.name} (${file.mimeType})`)} /> : <ReviewDetail label="Dokumentasi" value="Tidak ada file yang dikirim." />}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <section className="rounded-2xl border border-dashed border-[#cbd9e8] bg-white p-12 text-center">
            <h2 className="text-[16px] font-bold text-ink">
              Tidak ada antrean review
            </h2>
            <p className="mt-2 text-[12px] text-muted">
              Data yang sudah dikirim siswa akan muncul di sini.
            </p>
          </section>
        )}
        {rejecting && (
          <div
            className="portal-modal-backdrop fixed inset-0 z-[110] grid place-items-center bg-ink/35 p-4"
            role="presentation"
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="reject-title"
              className="portal-modal-panel max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-2xl"
            >
              <h2 id="reject-title" className="text-[17px] font-bold text-ink">
                Kembalikan untuk revisi
              </h2>
              <p className="mt-2 text-[12px] leading-5 text-muted">
                Tuliskan catatan yang dapat membantu siswa memperbaiki data ini.
              </p>
              <label className="mt-4 grid gap-2 text-[11px] font-medium text-ink">
                <span>Catatan revisi</span>
                <textarea
                  value={rejectNote}
                  onChange={(event) => setRejectNote(event.target.value)}
                  className="min-h-28 rounded-xl border border-[#cbd9ea] p-3 text-[12px] outline-none focus:border-primary focus:ring-2 focus:ring-[#d7edff]"
                  autoFocus
                />
              </label>
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRejecting(null)}
                  className="rounded-xl border border-[#b9dafa] px-4 py-2.5 text-[12px] font-semibold text-primary"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!rejectNote.trim() || busy === rejecting.id}
                  onClick={() => void review(rejecting, "REJECTED", rejectNote)}
                  className="rounded-xl bg-[#b42332] px-4 py-2.5 text-[12px] font-semibold text-white disabled:opacity-50"
                >
                  Kirim Penolakan
                </button>
              </div>
            </section>
          </div>
        )}
        <ActionModal
          open={Boolean(verifying)}
          variant="save"
          title="Verifikasi data ini?"
          description={
            verifying
              ? `${verifying.title} akan ditandai terverifikasi dan dikirim kembali ke siswa.`
              : ""
          }
          confirmLabel="Verifikasi"
          busy={Boolean(verifying && busy === verifying.id)}
          onClose={() => {
            if (!busy) setVerifying(null);
          }}
          onConfirm={() => {
            const item = verifying;
            return item ? review(item, "VERIFIED") : undefined;
          }}
        />
      </div>
    </TeacherPortalLayout>
  );
}

function ReviewDetail({ label, value }: { label: string; value: string }) {
  return <p><strong className="text-ink">{label}:</strong> {value}</p>;
}

function ReviewList({ label, items }: { label: string; items: string[] }) {
  return <div><strong className="text-ink">{label}:</strong><ul className="mt-1 list-disc pl-5">{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></div>;
}
