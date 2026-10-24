import { useEffect, useState } from "react";
import { RequirePermission } from "../features/auth/RequireAuth";
import { api } from "../lib/api";
import { TeacherPortalLayout } from "../layouts/TeacherPortalLayout";
import { ActionModal } from "../components/shared/ActionModal";
import { useToast } from "../components/shared/ToastProvider";
type Item = {
  id: string;
  name: string;
  type: string;
  status: string;
  location: string;
  description: string;
};
type Claim = {
  id: string;
  item_id: string;
  description: string;
  status: string;
  reviewer_note?: string;
  lost_found_items?: { name: string; item_type: string };
};
export function TeacherLostFoundReviewPage() {
  return (
    <RequirePermission permission="lost_found:manage">
      <Content />
    </RequirePermission>
  );
}
function Content() {
  const { addToast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState<{
    path: string;
    body?: unknown;
    title: string;
    description: string;
    variant: "save" | "warning";
  } | null>(null);
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      setItems(await api<Item[]>("/api/reviewer/lost-found"));
      setClaims(await api<Claim[]>("/api/reviewer/lost-found/claims"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Lost & Found gagal dimuat.",
      );
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function act(path: string, body?: unknown) {
    setBusy(true);
    try {
      await api(path, {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      });
      setNotice("Perubahan berhasil disimpan.");
      setPending(null);
      addToast({ variant: "success", title: "Perubahan Lost & Found berhasil disimpan", description: "Status dan riwayat laporan telah diperbarui." });
      await load();
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "Perubahan gagal disimpan.";
      setPending(null);
      addToast({ variant: "error", title: "Perubahan Lost & Found gagal", description: message, duration: null });
      setError(
        message,
      );
    } finally {
      setBusy(false);
      setPending(null);
    }
  }
  return (
    <TeacherPortalLayout breadcrumb="Lost & Found">
      <div className="grid min-w-0 gap-6">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
            Layanan barang sekolah
          </p>
          <h1 className="mt-2 text-[28px] font-bold text-ink">
            Review Lost &amp; Found
          </h1>
          <p className="mt-2 text-[13px] leading-6 text-muted">
            Verifikasi laporan, tinjau klaim, dan catat proses serah terima
            secara terkontrol.
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
        <section className="grid gap-3">
          <h2 className="text-[18px] font-bold text-ink">Laporan Barang</h2>
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dce8f5] bg-white p-4"
            >
              <div>
                <strong className="text-[13px] text-ink">{item.name}</strong>
                <p className="mt-1 text-[11px] text-muted">
                  {item.type} · {item.location} · {item.status}
                </p>
                <p className="mt-2 text-[11px] text-[#607296]">
                  {item.description}
                </p>
              </div>
              {item.status === "PENDING" && (
                <button
                  type="button"
                  onClick={() =>
                    setPending({
                      path: `/api/reviewer/lost-found/${item.id}/verify`,
                      title: "Verifikasi laporan barang?",
                      description:
                        "Laporan akan masuk ke status terverifikasi dan dapat diproses lebih lanjut.",
                      variant: "save",
                    })
                  }
                  className="rounded-xl bg-primary px-3 py-2 text-[11px] font-semibold text-white"
                >
                  Verifikasi
                </button>
              )}
            </article>
          ))}
        </section>
        <section className="grid gap-3">
          <h2 className="text-[18px] font-bold text-ink">Klaim Kepemilikan</h2>
          {claims.map((claim) => (
            <article
              key={claim.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dce8f5] bg-white p-4"
            >
              <div>
                <strong className="text-[13px] text-ink">
                  {claim.lost_found_items?.name || "Barang"}
                </strong>
                <p className="mt-1 text-[11px] text-muted">{claim.status}</p>
                <p className="mt-2 text-[11px] text-[#607296]">
                  {claim.description}
                </p>
              </div>
              {claim.status === "SUBMITTED" && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPending({
                        path: `/api/reviewer/lost-found/claims/${claim.id}/review`,
                        body: { status: "APPROVED", note: "Klaim disetujui." },
                        title: "Setujui klaim ini?",
                        description:
                          "Klaim akan disetujui dan menunggu proses serah terima.",
                        variant: "save",
                      })
                    }
                    className="rounded-xl bg-[#20aa65] px-3 py-2 text-[11px] font-semibold text-white"
                  >
                    Setujui
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPending({
                        path: `/api/reviewer/lost-found/claims/${claim.id}/review`,
                        body: {
                          status: "REJECTED",
                          note: "Bukti kepemilikan belum cukup.",
                        },
                        title: "Tolak klaim ini?",
                        description:
                          "Klaim akan ditolak berdasarkan bukti kepemilikan yang belum cukup.",
                        variant: "warning",
                      })
                    }
                    className="rounded-xl border border-[#e6aab1] px-3 py-2 text-[11px] font-semibold text-[#b42332]"
                  >
                    Tolak
                  </button>
                </div>
              )}
              {claim.status === "APPROVED" && (
                <button
                  type="button"
                  onClick={() =>
                    setPending({
                      path: `/api/reviewer/lost-found/claims/${claim.id}/handover`,
                      body: { note: "Serah terima dicatat petugas." },
                      title: "Catat serah terima?",
                      description:
                        "Tindakan ini akan mencatat bahwa barang telah diserahterimakan kepada pemilik.",
                      variant: "save",
                    })
                  }
                  className="rounded-xl bg-primary px-3 py-2 text-[11px] font-semibold text-white"
                >
                  Catat Serah Terima
                </button>
              )}
            </article>
          ))}
        </section>
      </div>
      <ActionModal
        open={Boolean(pending)}
        variant={pending?.variant || "save"}
        title={pending?.title || "Konfirmasi tindakan"}
        description={pending?.description || ""}
        confirmLabel="Konfirmasi"
        busy={busy}
        onClose={() => {
          if (!busy) setPending(null);
        }}
        onConfirm={() =>
          pending ? act(pending.path, pending.body) : undefined
        }
      />
    </TeacherPortalLayout>
  );
}
