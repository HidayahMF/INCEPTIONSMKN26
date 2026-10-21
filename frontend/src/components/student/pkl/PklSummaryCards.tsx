type PklSummaryCardsProps = { isDemo: boolean };

const cards = [
  { value: "3", title: "Lamaran aktif", detail: "1 perlu berkas · 1 ditinjau · 1 wawancara" },
  { value: "1", title: "Menunggu respons", detail: "Lamaran dalam peninjauan" },
  { value: "1", title: "Jadwal wawancara", detail: "22 Okt 2026 · 09.00 WIB" },
];

export function PklSummaryCards({ isDemo }: PklSummaryCardsProps) {
  return <div className="grid gap-4 md:grid-cols-3">
    {cards.map((card) => <section key={card.title} className="min-w-0 rounded-2xl border border-[#e1e9f4] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(25,63,112,.02)]">
      <strong className="block text-[30px] font-bold leading-none text-ink">{isDemo ? card.value : "0"}</strong>
      <h2 className="mt-3 text-[13px] font-medium text-[#52658a]">{card.title}</h2>
      <p className="mt-2 break-words text-[11px] text-muted">{isDemo ? card.detail : "Belum ada data tersedia"}</p>
    </section>)}
  </div>;
}
