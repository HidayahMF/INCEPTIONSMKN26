import type { PklTab } from "./pkl.types";

type PklTabsProps = { selected: PklTab; onChange: (tab: PklTab) => void };

const tabs: { id: PklTab; label: string }[] = [
  { id: "opportunities", label: "Jelajahi Peluang" },
  { id: "applications", label: "Lamaran Saya" },
  { id: "saved", label: "Tersimpan" },
];

export function PklTabs({ selected, onChange }: PklTabsProps) {
  return <div role="tablist" aria-label="Konten BKK dan PKL" className="grid min-w-0 grid-cols-3 overflow-hidden rounded-2xl border border-[#e1e9f4] bg-white sm:flex sm:overflow-x-auto">
    {tabs.map((tab) => <button key={tab.id} id={`pkl-tab-${tab.id}`} type="button" role="tab" aria-selected={selected === tab.id} aria-controls={`pkl-panel-${tab.id}`} onClick={() => onChange(tab.id)} className={`min-h-12 min-w-0 border-b-2 px-1 text-[11px] font-medium leading-4 transition-colors duration-200 sm:shrink-0 sm:px-7 sm:text-[13px] ${selected === tab.id ? "border-primary text-primary" : "border-transparent text-[#637495] hover:border-[#b9dfff] hover:text-primary"}`}>{tab.label}</button>)}
  </div>;
}
