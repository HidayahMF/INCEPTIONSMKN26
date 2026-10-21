import type { SubjectRecommendation } from '../learning.types';
import { LearningTopicRow, statusLabels } from './LearningTopicRow';

const subjectStatusStyles: Record<SubjectRecommendation['status'], string> = { MASTERED: 'bg-[#e9f8f1] text-[#18794e]', ON_TRACK: 'bg-[#edf7ff] text-primary-dark', NEEDS_ATTENTION: 'bg-[#fff4df] text-[#9b6500]', NOT_ENOUGH_DATA: 'bg-[#f1f4f8] text-[#66748c]' };

export function LearningSubjectCard({ subject, busyTopicId, onPractice }: { subject: SubjectRecommendation; busyTopicId: string; onPractice: (topic: import('../learning.types').TopicRecommendation) => void }) {
  return <article className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="text-[11px] font-bold tracking-[.14em] text-primary">{subject.code}</p><h3 className="mt-1 text-[18px] font-bold tracking-[-.02em] text-ink">{subject.name}</h3><p className="mt-1 text-[11px] text-muted">{subject.assessedTopics} topik dengan bukti penilaian</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${subjectStatusStyles[subject.status]}`}>{statusLabels[subject.status]}</span></div><div className="mt-5 grid gap-3">{subject.topics.map((topic) => <LearningTopicRow key={topic.topicId} topic={topic} busy={busyTopicId === topic.topicId} onPractice={() => onPractice(topic)} />)}</div></article>;
}
