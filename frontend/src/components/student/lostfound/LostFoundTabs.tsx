import type { LostFoundTab } from "./lostfound.types";

const tabs: { id: LostFoundTab; label: string }[] = [
  { id: "all", label: "Semua Barang" },
  { id: "lost", label: "Barang Hilang" },
  { id: "found", label: "Barang Ditemukan" },
  { id: "mine", label: "Laporan Saya" },
];

export function LostFoundTabs({ selected, onChange }: { selected: LostFoundTab; onChange: (tab: LostFoundTab) => void }) {
  return <div role="tablist" aria-label="Kategori Lost & Found" className="flex min-w-0 overflow-x-auto rounded-2xl border border-[#e1e9f4] bg-white"><div className="flex min-w-full sm:min-w-0">{tabs.map((tab) => <button key={tab.id} id={`lost-found-tab-${tab.id}`} type="button" role="tab" aria-selected={selected === tab.id} aria-controls={`lost-found-panel-${tab.id}`} onClick={() => onChange(tab.id)} className={`min-h-12 flex-1 whitespace-nowrap border-b-2 px-4 text-[12px] font-medium transition-colors duration-200 sm:min-w-[140px] sm:px-7 sm:text-[13px] ${selected === tab.id ? "border-primary text-primary" : "border-transparent text-[#637495] hover:border-[#b9dfff] hover:text-primary"}`}>{tab.label}</button>)}</div></div>;
}
