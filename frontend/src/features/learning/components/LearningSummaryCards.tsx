import type { ReactNode } from 'react';
import type { LearningSummary } from '../learning.types';

type SummaryCardsProps = { summary: LearningSummary['summary'] };

export function LearningSummaryCards({ summary }: SummaryCardsProps) {
  return (
    <section aria-label="Ringkasan pembelajaran" className="grid gap-4 sm:grid-cols-3">
      <SummaryCard icon={<BookIcon />} label="Mata Pelajaran Dinilai" value={summary.assessedSubjects} />
      <SummaryCard icon={<FocusIcon />} label="Topik Perlu Perhatian" value={summary.needsAttention} />
      <SummaryCard icon={<CheckIcon />} label="Topik Sudah Dikuasai" value={summary.mastered} />
    </section>
  );
}

function SummaryCard({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <article className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)]">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf7ff] text-primary" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <p className="text-[28px] font-bold leading-none tracking-[-.04em] text-primary-dark">{value}</p>
        <p className="mt-2 text-[12px] font-medium leading-5 text-muted">{label}</p>
      </div>
    </article>
  );
}

function BookIcon() { return <svg className="size-5" viewBox="0 0 24 24" fill="none"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5v-16Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M5 5.5V21.5M9 7h7M9 11h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>; }
function FocusIcon() { return <svg className="size-5" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4.5 4.5M11 8v6M8 11h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>; }
function CheckIcon() { return <svg className="size-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" /><path d="m8 12.2 2.6 2.6 5.6-5.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
