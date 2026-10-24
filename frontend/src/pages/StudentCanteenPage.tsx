import { useEffect, useState } from "react";
import { StudentPortalLayout } from "../layouts/StudentPortalLayout";
import { api } from "../lib/api";
import { ActionModal } from "../components/shared/ActionModal";
type Product = {
  id: string;
  merchant_id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  merchants?: { name: string };
};
type Order = {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  canteen_order_items: { product_name: string; quantity: number }[];
};
const money = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
export function StudentCanteenPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [pendingOrder, setPendingOrder] = useState<{
    merchantId: string;
    items: { productId: string; quantity: number }[];
    total: number;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  async function load() {
    try {
      setProducts(await api<Product[]>("/api/student/canteen/products"));
      setOrders(await api<Order[]>("/api/student/canteen/orders"));
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Kantin gagal dimuat.",
      );
    }
  }
  useEffect(() => {
    void load();
  }, []);
  function requestOrder(merchantId: string) {
    const items = Object.entries(cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([productId, quantity]) => ({ productId, quantity }));
    if (!items.length) return;
    const total = items.reduce(
      (sum, item) =>
        sum +
        (products.find((product) => product.id === item.productId)?.price ||
          0) *
          item.quantity,
      0,
    );
    setPendingOrder({ merchantId, items, total });
  }
  async function order() {
    if (!pendingOrder) return;
    setBusy(true);
    try {
      await api("/api/student/canteen/orders", {
        method: "POST",
        body: JSON.stringify({
          merchantId: pendingOrder.merchantId,
          items: pendingOrder.items,
          note: "Bayar di tempat saat pengambilan.",
        }),
      });
      setCart({});
      setNotice(
        "Pre-order berhasil dibuat. Pembayaran dilakukan saat pengambilan.",
      );
      await load();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Pre-order gagal dibuat.",
      );
    } finally {
      setBusy(false);
      setPendingOrder(null);
    }
  }
  const grouped = products.reduce<Record<string, Product[]>>((result, item) => {
    (result[item.merchant_id] ||= []).push(item);
    return result;
  }, {});
  return (
    <StudentPortalLayout breadcrumb="Kantin Digital">
      <div className="grid min-w-0 gap-6">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">
            Pre-order sekolah
          </p>
          <h1 className="mt-2 text-[28px] font-bold text-ink">
            Kantin Digital
          </h1>
          <p className="mt-2 text-[13px] text-muted">
            Pesan lebih dulu, bayar di tempat, lalu ambil sesuai informasi dari
            pedagang.
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
        <section className="grid gap-5">
          {Object.entries(grouped).map(([merchantId, items]) => (
            <div
              key={merchantId}
              className="rounded-2xl border border-[#dce8f5] bg-white p-5"
            >
              <h2 className="text-[17px] font-bold text-ink">
                {items[0].merchants?.name || "Kantin sekolah"}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-[#e6edf6] p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[13px] font-bold text-ink">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-[11px] text-muted">
                          {item.description}
                        </p>
                      </div>
                      <strong className="text-[12px] text-primary">
                        {money(item.price)}
                      </strong>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-muted">
                        Stok {item.stock}
                      </span>
                      <input
                        aria-label={`Jumlah ${item.name}`}
                        type="number"
                        min="0"
                        max={item.stock}
                        value={cart[item.id] || 0}
                        onChange={(event) =>
                          setCart({
                            ...cart,
                            [item.id]: Number(event.target.value),
                          })
                        }
                        className="h-9 w-20 rounded-lg border border-[#cbd9ea] px-2 text-center text-[12px]"
                      />
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                onClick={() => requestOrder(merchantId)}
                className="mt-5 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-semibold text-white"
              >
                Buat Pre-order
              </button>
            </div>
          ))}
        </section>
        <section className="grid gap-3">
          <h2 className="text-[18px] font-bold text-ink">Riwayat pesanan</h2>
          {orders.map((item) => (
            <article
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dce8f5] bg-white p-4"
            >
              <div>
                <strong className="text-[13px] text-ink">
                  {item.order_number}
                </strong>
                <p className="mt-1 text-[11px] text-muted">
                  {item.canteen_order_items
                    .map((line) => `${line.product_name} x${line.quantity}`)
                    .join(", ")}
                </p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-[#edf6ff] px-3 py-1 text-[10px] font-semibold text-primary">
                  {item.status}
                </span>
                <p className="mt-2 text-[11px] text-muted">
                  {money(item.total_amount)} · Bayar di tempat
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
      <ActionModal
        open={Boolean(pendingOrder)}
        variant="save"
        title="Buat Pre-order?"
        description={
          pendingOrder
            ? `${pendingOrder.items.reduce((sum, item) => sum + item.quantity, 0)} item dengan total ${money(pendingOrder.total)}. Pembayaran dilakukan saat pengambilan.`
            : ""
        }
        confirmLabel="Buat Pesanan"
        busy={busy}
        onClose={() => {
          if (!busy) setPendingOrder(null);
        }}
        onConfirm={order}
      />
    </StudentPortalLayout>
  );
}
