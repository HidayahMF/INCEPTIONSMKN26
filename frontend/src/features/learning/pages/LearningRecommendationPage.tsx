import { useCallback, useEffect, useMemo, useState } from 'react';
import { RequirePermission } from '../../auth/RequireAuth';
import { StudentPortalLayout } from '../../../layouts/StudentPortalLayout';
import { generatePractice, getLearningSummary } from '../learning.api';
import type { LearningSummary, RecommendationStatus, TopicRecommendation } from '../learning.types';
import { LearningEmptyState } from '../components/LearningEmptyState';
import { LearningPracticePanel, type PracticeState } from '../components/LearningPracticePanel';
import { LearningPriorities } from '../components/LearningPriorities';
import { LearningSubjectCard } from '../components/LearningSubjectCard';
import { LearningSummaryCards } from '../components/LearningSummaryCards';

const statusOptions: { value: 'ALL' | RecommendationStatus; label: string }[] = [
  { value: 'ALL', label: 'Semua status' },
  { value: 'NEEDS_ATTENTION', label: 'Perlu Perhatian' },
  { value: 'ON_TRACK', label: 'Sesuai Target' },
  { value: 'MASTERED', label: 'Sudah Dikuasai' },
  { value: 'NOT_ENOUGH_DATA', label: 'Data Belum Cukup' },
];

export function LearningRecommendationPage() {
  const [data, setData] = useState<LearningSummary | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'ALL' | RecommendationStatus>('ALL');
  const [subjectId, setSubjectId] = useState('ALL');
  const [practice, setPractice] = useState<PracticeState | null>(null);
  const [busyTopicId, setBusyTopicId] = useState('');

  const loadLearning = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setData(await getLearningSummary());
    } catch (reason) {
      setData(null);
      setError(reason instanceof Error ? reason.message : 'Rekomendasi pembelajaran gagal dimuat.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadLearning(); }, [loadLearning]);

  async function openPractice(topic: TopicRecommendation) {
    if (busyTopicId) return;
    setBusyTopicId(topic.topicId);
    setError('');
    try {
      const result = await generatePractice(topic.topicId);
      setPractice({ topic, generated: result.generated, explanation: result.explanation, questions: result.questions });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Latihan tidak tersedia.');
    } finally {
      setBusyTopicId('');
    }
  }

  const filteredSubjects = useMemo(() => {
    if (!data) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return data.subjects.map((subject) => ({
      ...subject,
      topics: subject.topics.filter((topic) => {
        const matchesSubject = subjectId === 'ALL' || subject.id === subjectId;
        const matchesStatus = status === 'ALL' || topic.status === status;
        const matchesQuery = !normalizedQuery || `${subject.name} ${subject.code} ${topic.topicName} ${topic.subjectName}`.toLowerCase().includes(normalizedQuery);
        return matchesSubject && matchesStatus && matchesQuery;
      }),
    })).filter((subject) => subject.topics.length > 0);
  }, [data, query, status, subjectId]);

  const hasFilters = query.trim().length > 0 || status !== 'ALL' || subjectId !== 'ALL';

  return <RequirePermission permission="student:learning"><StudentPortalLayout breadcrumb="Pembelajaran">
    <div className="grid min-w-0 gap-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-[#dce8f5] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">Belajar berbasis evidence</p>
          <h1 className="mt-2 text-[27px] font-bold tracking-[-.04em] text-ink sm:text-[30px]">Rekomendasi Pembelajaran</h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">Pelajari kompetensi yang perlu ditingkatkan berdasarkan hasil penilaian gurumu.</p>
          <p className="mt-2 text-[11px] font-medium text-[#71819b]">Rekomendasi disusun dari penilaian yang tercatat, bukan prediksi nilai oleh AI.</p>
        </div>
        <img className="hidden h-28 w-44 shrink-0 object-contain object-right lg:block" src="/assets/pages/siswapages/pembelajaran/learning-overview.png" alt="" aria-hidden="true" />
      </header>

      {error && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#f2c9ce] bg-[#fff3f4] p-4 text-[12px] text-[#b42332]"><span>{error}</span><button type="button" onClick={() => void loadLearning()} className="rounded-lg border border-[#e6aab1] px-3 py-2 font-semibold hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b42332]">Coba lagi</button></div>}
      {loading && <LearningLoadingState />}
      {!loading && data && <>
        <LearningSummaryCards summary={data.summary} />
        {!data.subjects.length ? <LearningEmptyState /> : <>
          <LearningPriorities topics={data.weakTopics} busyTopicId={busyTopicId} onPractice={(topic) => void openPractice(topic)} />
          <section className="grid gap-4 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div><p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">Ringkasan kompetensi</p><h2 className="mt-1 text-[19px] font-bold tracking-[-.02em] text-ink">Mata Pelajaran &amp; Kompetensi</h2><p className="mt-1 text-[12px] leading-5 text-muted">Tinjau status topik dan sumber belajar yang disetujui gurumu.</p></div>
              <img className="hidden h-16 w-24 object-contain sm:block" src="/assets/pages/siswapages/pembelajaran/learning-subjects.png" alt="" aria-hidden="true" />
            </div>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(160px,.7fr)_minmax(170px,.75fr)]">
              <label className="flex min-h-10 items-center gap-2 rounded-lg border border-[#cbd9ea] bg-white px-3 text-[12px] text-muted focus-within:border-primary"><SearchIcon /><span className="sr-only">Cari mata pelajaran atau topik</span><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted" placeholder="Cari mata pelajaran atau topik..." /></label>
              <label className="sr-only" htmlFor="learning-status-filter">Filter status</label><select id="learning-status-filter" value={status} onChange={(event) => setStatus(event.target.value as 'ALL' | RecommendationStatus)} className="min-h-10 rounded-lg border border-[#cbd9ea] bg-white px-3 text-[12px] text-ink outline-none focus:border-primary">{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
              <label className="sr-only" htmlFor="learning-subject-filter">Filter mata pelajaran</label><select id="learning-subject-filter" value={subjectId} onChange={(event) => setSubjectId(event.target.value)} className="min-h-10 rounded-lg border border-[#cbd9ea] bg-white px-3 text-[12px] text-ink outline-none focus:border-primary"><option value="ALL">Semua mata pelajaran</option>{data.subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.code} · {subject.name}</option>)}</select>
            </div>
            {filteredSubjects.length ? <div className="grid gap-4 lg:grid-cols-2">{filteredSubjects.map((subject) => <LearningSubjectCard key={subject.id} subject={subject} busyTopicId={busyTopicId} onPractice={(topic) => void openPractice(topic)} />)}</div> : <div className="rounded-xl border border-dashed border-[#cbd9e8] bg-[#f8fbff] p-5 text-center text-[12px] leading-5 text-muted">{hasFilters ? 'Tidak ada mata pelajaran atau topik yang sesuai dengan filter.' : 'Belum ada kompetensi yang dapat ditampilkan.'}</div>}
          </section>
        </>}
      </>}
    </div>
    {practice && <LearningPracticePanel practice={practice} onClose={() => setPractice(null)} />}
  </StudentPortalLayout></RequirePermission>;
}

function LearningLoadingState() {
  return <div className="grid gap-4 sm:grid-cols-3" aria-label="Memuat rekomendasi"><div className="h-28 animate-pulse rounded-2xl bg-white" /><div className="h-28 animate-pulse rounded-2xl bg-white" /><div className="h-28 animate-pulse rounded-2xl bg-white" /><div className="h-72 animate-pulse rounded-2xl bg-white sm:col-span-3" /></div>;
}

function SearchIcon() { return <svg className="size-4 shrink-0 text-[#7890ad]" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.8" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>; }
