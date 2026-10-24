import type { LearningSummary } from '../learning.types';

type SummaryCardsProps = { summary: LearningSummary['summary'] };

export function LearningSummaryCards({ summary }: SummaryCardsProps) {
  return (
    <section aria-label="Ringkasan pembelajaran" className="grid gap-4 md:grid-cols-3">
      <SummaryCard label="Mata Pelajaran Dinilai" value={summary.assessedSubjects} detail="Mata pelajaran dengan penilaian" />
      <SummaryCard label="Topik Perlu Perhatian" value={summary.needsAttention} detail="Topik yang perlu dipelajari" />
      <SummaryCard label="Topik Sudah Dikuasai" value={summary.mastered} detail="Topik yang sudah dikuasai" />
    </section>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: number; detail: string }) {
  return (
    <article className="min-w-0 rounded-2xl border border-[#e1e9f4] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(25,63,112,.08)]">
      <strong className="block text-[30px] font-bold leading-none text-ink">{value}</strong>
      <h2 className="mt-3 text-[13px] font-medium text-[#52658a]">{label}</h2>
      <p className="mt-2 break-words text-[11px] text-muted">{detail}</p>
    </article>
  );
}
