import { useEffect, useRef, useState } from "react";

type PklFilterBarProps = {
  query: string;
  field: string;
  major: string;
  location: string;
  fields: string[];
  majors: string[];
  locations: string[];
  onQueryChange: (value: string) => void;
  onFieldChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onLocationChange: (value: string) => void;
};

const selectClass = "h-11 w-full appearance-none rounded-xl border border-[#dce4ee] bg-white px-3 text-[12px] text-ink outline-none transition";

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel = value === "all" ? `Semua ${label.toLowerCase()}` : value;

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return <div ref={containerRef} className="relative min-w-0"><span className="mb-2 block text-[11px] font-medium text-[#52658a]">{label}</span><button type="button" role="combobox" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((current) => !current)} onKeyDown={(event) => { if ((event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") && !open) { event.preventDefault(); setOpen(true); } }} className={`${selectClass} flex items-center justify-between text-left focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-[#d8efff] ${open ? "border-primary ring-2 ring-[#d8efff]" : ""}`}><span className="truncate">{selectedLabel}</span><span aria-hidden="true" className={`ml-3 h-3 w-[7px] shrink-0 bg-[#0B1324] transition-[transform,background-color] duration-300 ease-out ${open ? "rotate-90 bg-primary" : "-rotate-90"} [mask-image:url('/assets/shared/icons/chevron-down.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:7px_12px]`} /></button>{open && <div role="listbox" aria-label={label} className="absolute left-0 right-0 top-[74px] z-40 max-h-56 overflow-y-auto rounded-xl border border-[#dce4ee] bg-white p-1 shadow-[0_12px_30px_rgba(20,47,90,.14)]">{options.map((option) => { const optionLabel = option === "all" ? `Semua ${label.toLowerCase()}` : option; const selected = value === option; return <button key={option} type="button" role="option" aria-selected={selected} onClick={() => { onChange(option); setOpen(false); }} className={`block w-full rounded-lg px-3 py-2.5 text-left text-[12px] transition-colors ${selected ? "bg-[#eaf4ff] font-semibold text-primary" : "text-ink hover:bg-[#f1f7ff] hover:text-primary"}`}>{optionLabel}</button>; })}</div>}</div>;
}

export function PklFilterBar({ query, field, major, location, fields, majors, locations, onQueryChange, onFieldChange, onMajorChange, onLocationChange }: PklFilterBarProps) {
  return <section className="grid gap-4 rounded-2xl border border-[#e1e9f4] bg-white p-5 md:grid-cols-[minmax(250px,1.35fr)_repeat(3,minmax(150px,1fr))]">
    <label className="min-w-0"><span className="mb-2 block text-[11px] font-medium text-[#52658a]">Cari peluang</span><span className="flex h-11 items-center gap-3 rounded-xl border border-[#dce4ee] px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-[#d8efff]"><img className="size-5 shrink-0" src="/assets/pages/siswapages/search.png" alt="" aria-hidden="true" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#4f5e7a]" placeholder="Cari perusahaan atau posisi..." /></span></label>
    <SelectField label="Bidang" value={field} options={["all", ...fields]} onChange={onFieldChange} />
    <SelectField label="Kesesuaian jurusan" value={major} options={["all", ...majors]} onChange={onMajorChange} />
    <SelectField label="Lokasi" value={location} options={["all", ...locations]} onChange={onLocationChange} />
  </section>;
}
