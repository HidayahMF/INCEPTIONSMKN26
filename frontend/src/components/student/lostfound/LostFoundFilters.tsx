import { useEffect, useRef, useState } from "react";

type Props = { query: string; category: string; location: string; date: string; status: string; categories: string[]; locations: string[]; dates: string[]; statuses: string[]; onQuery: (value: string) => void; onCategory: (value: string) => void; onLocation: (value: string) => void; onDate: (value: string) => void; onStatus: (value: string) => void };
const selectClass = "h-11 w-full rounded-xl border border-[#dce4ee] bg-white px-3 text-left text-[12px] text-ink outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-[#d8efff]";

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedLabel = value === "all" ? `Semua ${label.toLowerCase()}` : value;
  useEffect(() => {
    if (!open) return;
    const outside = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", outside); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", outside); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <div ref={ref} className="relative min-w-0"><span className="mb-2 block text-[11px] font-medium text-[#52658a]">{label}</span><button type="button" role="combobox" aria-label={label} aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((current) => !current)} className={`${selectClass} flex items-center justify-between ${open ? "border-primary ring-2 ring-[#d8efff]" : ""}`}><span className="truncate">{selectedLabel}</span><span aria-hidden="true" className={`ml-2 h-3 w-[7px] shrink-0 bg-[#0B1324] transition-transform duration-300 ${open ? "rotate-90 bg-primary" : "-rotate-90"} [mask-image:url('/assets/shared/icons/chevron-down.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:7px_12px]`} /></button>{open && <div role="listbox" aria-label={label} className="absolute left-0 right-0 top-[74px] z-40 max-h-56 overflow-y-auto rounded-xl border border-[#dce4ee] bg-white p-1 shadow-[0_12px_30px_rgba(20,47,90,.14)]">{options.map((option) => { const optionLabel = option === "all" ? `Semua ${label.toLowerCase()}` : option; return <button key={option} type="button" role="option" aria-selected={value === option} onClick={() => { onChange(option); setOpen(false); }} className={`block w-full rounded-lg px-3 py-2.5 text-left text-[12px] ${value === option ? "bg-[#eaf4ff] font-semibold text-primary" : "text-ink hover:bg-[#f1f7ff] hover:text-primary"}`}>{optionLabel}</button>; })}</div>}</div>;
}

export function LostFoundFilters({ query, category, location, date, status, categories, locations, dates, statuses, onQuery, onCategory, onLocation, onDate, onStatus }: Props) {
  return <section className="grid gap-4 rounded-2xl border border-[#e1e9f4] bg-white p-5 md:grid-cols-[minmax(260px,1.5fr)_repeat(4,minmax(135px,1fr))]"><label className="min-w-0 md:col-span-5"><span className="mb-2 block text-[11px] font-medium text-[#52658a]">Barang di Sekitar Sekolah</span><span className="flex h-11 items-center gap-3 rounded-xl border border-[#dce4ee] px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-[#d8efff]"><img className="size-5 shrink-0" src="/assets/pages/siswapages/search.png" alt="" aria-hidden="true" /><input value={query} onChange={(event) => onQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#4f5e7a]" placeholder="Cari nama atau deskripsi barang..." /></span></label><FilterSelect label="Kategori" value={category} options={["all", ...categories]} onChange={onCategory} /><FilterSelect label="Lokasi" value={location} options={["all", ...locations]} onChange={onLocation} /><FilterSelect label="Tanggal" value={date} options={["all", ...dates]} onChange={onDate} /><FilterSelect label="Status" value={status} options={["all", ...statuses]} onChange={onStatus} /></section>;
}
