import { useState, type FormEvent, type ReactNode } from "react";

type FormValues = {
  name: string;
  category: string;
  description: string;
  location: string;
  date: string;
  photo: File | null;
};

const initial: FormValues = { name: "", category: "", description: "", location: "", date: "", photo: null };
const inputClass = "h-11 w-full rounded-xl border border-[#dce4ee] bg-white px-3 text-[13px] text-ink outline-none transition placeholder:text-[#9aa9bf] focus:border-primary focus:ring-2 focus:ring-[#d8efff]";

export function LostFoundReportForm({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<FormValues>(initial);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function update(key: keyof FormValues, value: string | File | null) {
    setValues((current) => ({ ...current, [key]: value }));
    if (error) setError("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.name.trim() || !values.category.trim() || !values.description.trim() || !values.location.trim() || !values.date) {
      setError("Lengkapi semua field wajib sebelum melanjutkan.");
      setNotice("");
      return;
    }
    setError("");
    setNotice("Form demo siap ditinjau. Laporan belum disimpan karena API Lost & Found belum tersedia.");
  }

  return <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[#07152b]/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="report-lost-title" className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_24px_70px_rgba(5,35,80,.25)] sm:rounded-[28px]">
      <header className="flex shrink-0 items-start justify-between border-b border-[#e7edf5] bg-[#f8fbff] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex min-w-0 items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e5f3ff] text-primary"><img className="size-5 object-contain" src="/assets/pages/siswapages/Lost&Found/info.png" alt="" aria-hidden="true" /></span><div className="min-w-0"><h2 id="report-lost-title" className="text-xl font-bold tracking-[-.02em] text-ink">Laporkan Barang Hilang</h2><p className="mt-1 text-[12px] leading-5 text-muted">Lengkapi informasi agar petugas dapat menindaklanjuti.</p></div></div>
        <button type="button" aria-label="Tutup form laporan" onClick={onClose} className="grid size-9 shrink-0 place-items-center rounded-full text-2xl leading-none text-[#607296] transition hover:bg-[#eaf4ff] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">×</button>
      </header>

      <form onSubmit={submit} className="min-h-0 overflow-y-auto">
        <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:gap-x-5 sm:px-7 sm:py-6">
          <Field id="lost-item-name" label="Nama barang" required><input id="lost-item-name" value={values.name} onChange={(event) => update("name", event.target.value)} className={inputClass} placeholder="Contoh: Tumbler biru" /></Field>
          <Field id="lost-item-category" label="Kategori" required><input id="lost-item-category" value={values.category} onChange={(event) => update("category", event.target.value)} className={inputClass} placeholder="Contoh: Perlengkapan minum" /></Field>
          <div className="sm:col-span-2"><Field id="lost-item-description" label="Deskripsi" required><textarea id="lost-item-description" value={values.description} onChange={(event) => update("description", event.target.value)} className={`${inputClass} h-24 resize-y py-3`} placeholder="Jelaskan ciri-ciri barang, warna, atau tanda khusus lainnya..." /></Field></div>
          <Field id="lost-item-location" label="Lokasi terakhir terlihat" required><input id="lost-item-location" value={values.location} onChange={(event) => update("location", event.target.value)} className={inputClass} placeholder="Contoh: Perpustakaan" /></Field>
          <Field id="lost-item-date" label="Tanggal kehilangan" required><input id="lost-item-date" type="date" value={values.date} onChange={(event) => update("date", event.target.value)} className={`${inputClass} text-[#607296]`} /></Field>
          <div className="sm:col-span-2"><Field id="lost-item-photo" label="Foto barang (opsional)"><label htmlFor="lost-item-photo" className="flex min-h-[72px] cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#b9c9dc] bg-[#fbfdff] px-4 transition hover:border-primary hover:bg-[#f4faff] focus-within:border-primary focus-within:ring-2 focus-within:ring-[#d8efff]"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eaf4ff] text-primary"><span aria-hidden="true" className="text-xl leading-none">＋</span></span><span className="min-w-0"><strong className="block truncate text-[12px] font-semibold text-ink">{values.photo?.name || "Pilih foto barang"}</strong><span className="mt-1 block text-[11px] text-muted">PNG, JPG hingga 5 MB · opsional</span></span><input id="lost-item-photo" type="file" accept="image/*" onChange={(event) => update("photo", event.target.files?.[0] ?? null)} className="sr-only" /></label></Field></div>
          {error && <p role="alert" className="sm:col-span-2 rounded-xl border border-[#ffd5d5] bg-[#fff5f5] px-4 py-3 text-[12px] font-medium text-[#d62929]">{error}</p>}
          {notice && <p role="status" className="sm:col-span-2 rounded-xl border border-[#ffe8a8] bg-[#fffaf0] px-4 py-3 text-[12px] leading-5 text-[#946b00]">{notice}</p>}
        </div>
        <footer className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#e7edf5] bg-[#fbfdff] px-5 py-4 sm:flex-row sm:justify-end sm:px-7"><button type="button" onClick={onClose} className="min-h-11 rounded-xl border border-[#cbd5e1] bg-white px-5 text-[13px] font-semibold text-primary transition hover:border-primary hover:bg-[#eef7ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Batal</button><button type="submit" className="min-h-11 rounded-xl bg-gradient-to-r from-[#43baf5] to-[#007ce9] px-5 text-[13px] font-semibold text-white transition-[background-color,background-image,color,border-color,box-shadow] duration-300 hover:border hover:border-[#cbd5e1] hover:bg-white hover:bg-none hover:text-primary hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Tinjau laporan</button></footer>
      </form>
    </section>
  </div>;
}

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return <label htmlFor={id} className="grid gap-2 text-[12px] font-medium text-[#52658a]"><span>{label}{required && <span className="text-[#d62929]"> *</span>}</span>{children}</label>;
}
