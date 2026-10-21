import type { LostFoundHistoryEvent } from "./lostfound.types";

export function LostFoundTimeline({ history }: { history?: LostFoundHistoryEvent[] }) {
  if (!history?.length) return null;
  return <section className="rounded-xl border border-[#dce8f5] bg-white p-4 sm:p-5"><h2 className="text-[14px] font-bold text-ink">Riwayat Laporan</h2><div className="mt-5 grid gap-5">{history.map((event, index) => <div key={event.id} className="relative flex gap-3"><div className="relative flex w-6 shrink-0 justify-center"><span className={`relative z-10 grid size-6 place-items-center rounded-full ${event.kind === "verified" ? "bg-[#24c96b] text-white" : "bg-primary text-white ring-4 ring-[#d7edff]"}`}>{event.kind === "verified" ? "✓" : ""}</span>{index < history.length - 1 && <span className="absolute left-1/2 top-6 h-[calc(100%+20px)] w-px -translate-x-1/2 bg-[#b9d8f7]" />}</div><div className="min-w-0"><h3 className="text-[12px] font-bold text-ink">{event.title}</h3><p className="mt-1 text-[11px] text-[#607296]">{event.date}</p><p className="mt-1 text-[11px] leading-5 text-[#607296]">{event.description}</p></div></div>)}</div></section>;
}
