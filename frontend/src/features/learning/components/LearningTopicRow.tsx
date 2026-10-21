import type { Resource, TopicRecommendation } from '../learning.types';

export const statusLabels: Record<TopicRecommendation['status'], string> = {
  MASTERED: 'Sudah Dikuasai',
  ON_TRACK: 'Sesuai Target',
  NEEDS_ATTENTION: 'Perlu Perhatian',
  NOT_ENOUGH_DATA: 'Data Belum Cukup',
};

const statusStyles: Record<TopicRecommendation['status'], string> = {
  MASTERED: 'bg-[#e9f8f1] text-[#18794e]',
  ON_TRACK: 'bg-[#edf7ff] text-primary-dark',
  NEEDS_ATTENTION: 'bg-[#fff4df] text-[#9b6500]',
  NOT_ENOUGH_DATA: 'bg-[#f1f4f8] text-[#66748c]',
};

type LearningTopicRowProps = { topic: TopicRecommendation; onPractice?: () => void; busy?: boolean };

export function LearningTopicRow({ topic, onPractice, busy = false }: LearningTopicRowProps) {
  const hasScore = topic.averageScore !== null;
  const score = hasScore ? Math.max(0, Math.min(100, topic.averageScore || 0)) : 0;
  const target = topic.targetScore === null ? null : Math.max(0, Math.min(100, topic.targetScore));

  return (
    <article className="rounded-xl border border-[#e2ebf5] bg-[#f8fbff] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[.1em] text-primary">{topic.subjectName}</p>
          <h3 className="mt-1 text-[14px] font-bold leading-5 text-ink">{topic.topicName}</h3>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[topic.status]}`}>{statusLabels[topic.status]}</span>
      </div>

      {hasScore ? (
        <div className="mt-4">
          <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-muted">
            <span>Nilai saat ini <strong className="text-ink">{topic.averageScore?.toFixed(1)}</strong></span>
            <span>{target === null ? 'Target belum tersedia' : <>Target <strong className="text-ink">{topic.targetScore?.toFixed(1)}</strong></>}</span>
          </div>
          <div className="relative mt-2 h-2.5 rounded-full bg-[#dce8f5]" aria-label={`Nilai ${topic.averageScore?.toFixed(1)} dari 100`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={score}>
            <div className={`h-full rounded-full ${topic.status === 'NEEDS_ATTENTION' ? 'bg-[#e2a82e]' : 'bg-primary'}`} style={{ width: `${score}%` }} />
            {target !== null && <span className="absolute -top-1.5 h-5 w-0.5 rounded-full bg-ink/50" style={{ left: `${target}%` }} aria-hidden="true" />}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
            {topic.gap !== null && <span>Selisih target <strong className={topic.gap > 0 ? 'text-[#9b6500]' : 'text-[#18794e]'}>{topic.gap.toFixed(1)} poin</strong></span>}
            <span>{topic.assessmentCount} bukti penilaian</span>
          </div>
        </div>
      ) : <p className="mt-4 text-[12px] text-muted">Belum ada nilai tercatat.</p>}

      <ApprovedResources resources={topic.approvedResources} />
      {topic.status === 'NEEDS_ATTENTION' && onPractice && <button type="button" onClick={onPractice} disabled={busy} className="mt-4 inline-flex min-h-9 items-center rounded-lg bg-primary px-3.5 text-[11px] font-semibold text-white transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">{busy ? 'Menyiapkan latihan...' : 'Latihan dengan AI'}</button>}
    </article>
  );
}

function ApprovedResources({ resources }: { resources: Resource[] }) {
  if (!resources.length) return null;
  return <div className="mt-4 border-t border-[#e2ebf5] pt-3"><p className="text-[10px] font-bold uppercase tracking-[.1em] text-muted">Sumber Belajar yang Disetujui</p><ul className="mt-2 grid gap-2">{resources.map((resource) => <li key={resource.id} className="flex min-w-0 items-start gap-2 text-[12px] leading-5"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" /><span className="min-w-0"><span className="font-semibold text-ink">{resource.title}</span><span className="ml-1 text-[10px] uppercase tracking-wide text-muted">{resource.resource_type}</span>{resource.description && <span className="block text-[11px] text-muted">{resource.description}</span>}{resource.url ? <a className="mt-0.5 inline-block font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" href={resource.url} target="_blank" rel="noopener noreferrer">Buka sumber<span className="sr-only">: {resource.title}</span></a> : <span className="block text-[10px] text-muted">Tautan belum tersedia</span>}</span></li>)}</ul></div>;
}
