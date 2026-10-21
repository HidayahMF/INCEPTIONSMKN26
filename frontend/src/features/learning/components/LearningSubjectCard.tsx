import type { SubjectRecommendation } from '../learning.types';
import { LearningTopicCard, statusLabels } from './LearningTopicCard';

const subjectStatusStyles: Record<SubjectRecommendation['status'], string> = { MASTERED: 'bg-[#e9f8f1] text-[#18794e]', ON_TRACK: 'bg-[#edf7ff] text-primary-dark', NEEDS_ATTENTION: 'bg-[#fff4df] text-[#9b6500]', NOT_ENOUGH_DATA: 'bg-[#f1f4f8] text-[#66748c]' };

export function LearningSubjectCard({ subject, busyTopicId, onPractice }: { subject: SubjectRecommendation; busyTopicId: string; onPractice: (topic: import('../learning.types').TopicRecommendation) => void }) {
  return <div className="grid min-w-0 gap-3"><div className="flex items-start justify-between gap-3 px-1"><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[.1em] text-primary">{subject.code}</p><h3 className="mt-1 text-[15px] font-bold leading-5 text-ink">{subject.name}</h3><p className="mt-1 text-[11px] text-muted">{subject.assessedTopics} topik dengan bukti penilaian</p></div><span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${subjectStatusStyles[subject.status]}`}>{statusLabels[subject.status]}</span></div><div className="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">{subject.topics.map((topic) => <LearningTopicCard key={topic.topicId} topic={topic} busy={busyTopicId === topic.topicId} onPractice={() => onPractice(topic)} />)}</div></div>;
}
