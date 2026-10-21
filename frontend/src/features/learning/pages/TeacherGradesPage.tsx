import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { RequirePermission } from "../../auth/RequireAuth";
import { useAuth } from "../../auth/AuthProvider";
import { createAssessment, getAssignmentAssessments, saveScores } from "../learning.api";
import type { Assessment, Assignment, StudentRow, Topic } from "../learning.types";
import { TeacherPortalLayout } from "../../../layouts/TeacherPortalLayout";
import { getCachedTeacherAssignments, invalidateTeacherAssignment, loadTeacherAssignment } from "../teacher.utils";

type Status = { tone: "success" | "error" | "info"; message: string } | null;

export function TeacherGradesPage() {
  const { me } = useAuth();
  return <RequirePermission permission="grades:manage">{me?.profile.account_type === "TEACHER" || me?.profile.account_type === "ADMIN" ? <TeacherGradesContent /> : <TeacherOnlyMessage />}</RequirePermission>;
}

function TeacherGradesContent() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [assignmentId, setAssignmentId] = useState("");
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [assessmentId, setAssessmentId] = useState("new");
  const [topicId, setTopicId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [minimum, setMinimum] = useState("75");
  const [maximum, setMaximum] = useState("100");
  const [scores, setScores] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAssignment, setLoadingAssignment] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let active = true;
    getCachedTeacherAssignments().then((items) => {
      if (!active) return;
      setAssignments(items);
      const requested = new URLSearchParams(window.location.search).get("assignment");
      setAssignmentId(items.find((item) => item.id === requested)?.id || items[0]?.id || "");
    }).catch((reason) => {
      if (active) setStatus({ tone: "error", message: getErrorMessage(reason, "Penugasan gagal dimuat.") });
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!assignmentId) return;
    let active = true;
    setLoadingAssignment(true);
    setStatus(null);
    getCachedTeacherAssignments().then((items) => {
      const assignment = items.find((item) => item.id === assignmentId);
      if (!assignment) throw new Error("Penugasan mengajar tidak ditemukan atau tidak dapat diakses.");
      return loadTeacherAssignment(assignment);
    }).then(({ students: studentRows, topics: topicData, assessments: assessmentData }) => {
      if (!active) return;
      setStudents(studentRows);
      setTopics(topicData);
      setAssessments(assessmentData);
      const requestedAssessment = new URLSearchParams(window.location.search).get("assessment");
      const selected = assessmentData.find((item) => item.id === requestedAssessment) || assessmentData[0];
      applyAssessment(selected, topicData);
    }).catch((reason) => {
      if (active) setStatus({ tone: "error", message: getErrorMessage(reason, "Data assessment gagal dimuat.") });
    }).finally(() => { if (active) { setLoadingAssignment(false); setDirty(false); } });
    return () => { active = false; };
  }, [assignmentId]);

  const selectedAssessment = assessments.find((item) => item.id === assessmentId);
  const isExistingAssessment = assessmentId !== "new" && Boolean(selectedAssessment);
  const scoreCount = Object.values(scores).filter((value) => value.trim() !== "").length;
  const invalidScoreCount = Object.values(scores).filter((value) => {
    if (!value.trim()) return false;
    const number = Number(value);
    return !Number.isFinite(number) || number < 0 || number > Number(maximum);
  }).length;
  const canSubmit = Boolean(assignmentId && topicId && title.trim() && date && students.length && scoreCount && !invalidScoreCount && Number(minimum) >= 0 && Number(maximum) > 0 && Number(minimum) <= Number(maximum));
  const scoreSummary = useMemo(() => `${scoreCount}/${students.length} nilai diisi`, [scoreCount, students.length]);

  function requestChange(action: () => void) {
    if (dirty && !window.confirm("Perubahan yang belum disimpan akan hilang. Lanjutkan?")) return;
    action();
  }

  function selectAssessment(id: string) {
    requestChange(() => {
      setAssessmentId(id);
      const selected = assessments.find((item) => item.id === id);
      applyAssessment(selected, topics);
      setDirty(false);
    });
  }

  function applyAssessment(selected: Assessment | undefined, topicData: Topic[]) {
    setAssessmentId(selected?.id || "new");
    setTopicId(selected?.topic_id || topicData[0]?.id || "");
    setTitle(selected?.title || "");
    setDate(selected?.assessment_date || new Date().toISOString().slice(0, 10));
    setMinimum(String(selected?.minimum_score ?? 75));
    setMaximum(String(selected?.max_score ?? 100));
    setScores(Object.fromEntries((selected?.student_scores || []).map((row) => [row.student_id, String(row.score)])));
  }

  function changeScore(studentId: string, event: ChangeEvent<HTMLInputElement>) {
    setScores((current) => ({ ...current, [studentId]: event.target.value }));
    setDirty(true);
    setStatus(null);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setBusy(true);
    setStatus(null);
    try {
      const assessment = assessmentId === "new"
        ? await createAssessment({ assignmentId, topicId, title, assessmentDate: date, minimumScore: Number(minimum), maxScore: Number(maximum) })
        : { id: assessmentId };
      const payload = Object.entries(scores).filter(([, value]) => value.trim() !== "").map(([studentId, score]) => ({ studentId, score: Number(score) }));
      await saveScores(assessment.id, payload);
      invalidateTeacherAssignment(assignmentId);
      const refreshed = await getAssignmentAssessments(assignmentId);
      setAssessments(refreshed);
      const saved = refreshed.find((item) => item.id === assessment.id);
      applyAssessment(saved, topics);
      setDirty(false);
      setStatus({ tone: "success", message: "Nilai berhasil disimpan. Data assessment telah diperbarui." });
    } catch (reason) {
      setStatus({ tone: "error", message: getErrorMessage(reason, "Nilai gagal disimpan. Perubahan lokal dipertahankan.") });
    } finally {
      setBusy(false);
    }
  }

  function validate() {
    const minimumScore = Number(minimum);
    const maximumScore = Number(maximum);
    if (!title.trim() || !topicId || !date) return setValidation("Judul, topik, dan tanggal assessment wajib diisi.");
    if (!Number.isFinite(minimumScore) || !Number.isFinite(maximumScore) || minimumScore < 0 || maximumScore <= 0 || minimumScore > maximumScore) return setValidation("Target minimum harus berada di antara 0 dan nilai maksimum.");
    if (!scoreCount) return setValidation("Isi setidaknya satu nilai sebelum menyimpan.");
    if (invalidScoreCount) return setValidation("Periksa nilai siswa. Nilai tidak boleh negatif atau melebihi nilai maksimum.");
    return true;
  }

  function setValidation(message: string) {
    setStatus({ tone: "error", message });
    return false;
  }

  return <TeacherPortalLayout breadcrumb="Input Nilai & Kompetensi"><div className="grid min-w-0 gap-6">
    <header><p className="text-[11px] font-semibold uppercase tracking-[.12em] text-primary">Penilaian berbasis penugasan</p><h1 className="mt-2 text-[28px] font-bold tracking-[-.03em] text-ink sm:text-[30px]">Input Nilai &amp; Kompetensi</h1><p className="mt-2 max-w-2xl text-[13px] leading-6 text-muted">Kelola penilaian siswa berdasarkan kelas, mata pelajaran, dan topik pembelajaran.</p></header>
    {status && <StatusBanner status={status} />}
    {loading ? <LoadingState /> : !assignments.length ? <EmptyState text="Belum ada penugasan aktif untuk akun ini." /> : <form className="grid min-w-0 gap-6" onSubmit={submit}>
      <section className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6"><SectionTitle title="Pilih assessment" copy="Gunakan assessment existing untuk memperbarui nilai, atau buat assessment baru." /><div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Kelas & mata pelajaran"><select className="control" value={assignmentId} onChange={(event) => requestChange(() => setAssignmentId(event.target.value))} disabled={loadingAssignment || busy}>{assignments.map((assignment) => <option key={assignment.id} value={assignment.id}>{assignment.classes.code} · {assignment.subjects.name}</option>)}</select></Field>
        <Field label="Assessment"><select className="control" value={assessmentId} onChange={(event) => selectAssessment(event.target.value)} disabled={loadingAssignment || busy}><option value="new">+ Assessment baru</option>{assessments.map((assessment) => <option key={assessment.id} value={assessment.id}>{assessment.title}</option>)}</select></Field>
        <Field label="Topik pembelajaran"><select className="control" value={topicId} onChange={(event) => { setTopicId(event.target.value); setDirty(true); }} disabled={isExistingAssessment || !topics.length}>{topics.map((topic) => <option key={topic.id} value={topic.id}>{topic.name}</option>)}</select></Field>
        <Field label="Judul assessment"><input className="control" value={title} onChange={(event) => { setTitle(event.target.value); setDirty(true); }} placeholder="Contoh: Penilaian Persamaan Linear" required disabled={isExistingAssessment} /></Field>
        <Field label="Tanggal assessment"><input className="control" type="date" value={date} onChange={(event) => { setDate(event.target.value); setDirty(true); }} required disabled={isExistingAssessment} /></Field>
        <Field label="Target minimum"><input className="control" type="number" min="0" step="0.01" value={minimum} onChange={(event) => { setMinimum(event.target.value); setDirty(true); }} required disabled={isExistingAssessment} /></Field>
        <Field label="Nilai maksimum"><input className="control" type="number" min="0.01" step="0.01" value={maximum} onChange={(event) => { setMaximum(event.target.value); setDirty(true); }} required disabled={isExistingAssessment} /></Field>
      </div>{isExistingAssessment && <p className="mt-4 rounded-xl bg-[#f5f9fd] px-3 py-2 text-[11px] text-muted">Detail assessment existing bersifat tetap. Halaman ini digunakan untuk memperbarui score siswa.</p>}</section>
      <section className="min-w-0 rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-[0_2px_8px_rgba(25,63,112,.02)] sm:p-6"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><SectionTitle title="Daftar nilai siswa" copy="Masukkan nilai secara langsung. Nilai kosong tidak akan dikirim ke server." /></div><span className="w-fit rounded-full bg-[#edf7ff] px-3 py-1.5 text-[10px] font-semibold text-primary">{scoreSummary}</span></div>{loadingAssignment ? <div className="mt-5 h-48 animate-pulse rounded-xl bg-[#f5f9fd]" /> : students.length ? <div className="mt-5 overflow-x-auto rounded-xl border border-[#e3eaf3]"><table className="w-full min-w-[720px] text-left"><thead><tr className="bg-[#f8fbff] text-[10px] uppercase tracking-[.08em] text-[#8492aa]"><th className="px-4 py-3 font-semibold">No.</th><th className="px-4 py-3 font-semibold">Nama siswa</th><th className="px-4 py-3 font-semibold">Identitas sekolah</th><th className="px-4 py-3 font-semibold">Nilai</th><th className="px-4 py-3 font-semibold">Status</th></tr></thead><tbody>{students.map((student, index) => <ScoreRow key={student.student_id} student={student} index={index} value={scores[student.student_id] || ""} maximum={maximum} minimum={minimum} onChange={changeScore} />)}</tbody></table></div> : <EmptyState text="Belum ada siswa pada penugasan ini." />}<div className="mt-5 flex flex-col gap-3 border-t border-[#e8eef5] pt-5 sm:flex-row sm:items-center sm:justify-between"><p className="text-[11px] text-muted">{dirty ? "Ada perubahan yang belum disimpan." : "Tidak ada perubahan lokal."}</p><button className="min-h-11 rounded-xl bg-primary px-5 text-[12px] font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50" disabled={busy || loadingAssignment || !students.length || !canSubmit}>{busy ? "Menyimpan..." : "Simpan nilai"}</button></div></section>
    </form>}
    <p className="pb-1 text-[11px] text-muted">SMK Negeri 26 Jakarta · Portal Internal Guru</p>
  </div></TeacherPortalLayout>;
}

function ScoreRow({ student, index, value, maximum, minimum, onChange }: { student: StudentRow; index: number; value: string; maximum: string; minimum: string; onChange: (studentId: string, event: ChangeEvent<HTMLInputElement>) => void }) {
  const number = value.trim() ? Number(value) : null;
  const status = number === null ? "Belum diisi" : !Number.isFinite(number) || number < 0 || number > Number(maximum) ? "Tidak valid" : number >= Number(minimum) ? "Mencapai target" : "Perlu ditinjau";
  const statusClass = status === "Mencapai target" ? "bg-[#eaf9f0] text-[#159957]" : status === "Tidak valid" ? "bg-[#fff1f2] text-[#b42332]" : status === "Perlu ditinjau" ? "bg-[#fff7df] text-[#9a6b0b]" : "bg-[#f2f5f8] text-muted";
  return <tr className="border-t border-[#eef2f7] text-[12px]"><td className="px-4 py-3 text-muted">{index + 1}</td><td className="px-4 py-3 font-semibold text-ink">{student.profiles.display_name}</td><td className="px-4 py-3 text-muted">{student.profiles.school_identifier}</td><td className="px-4 py-3"><input aria-label={`Nilai ${student.profiles.display_name}`} className="h-10 w-28 rounded-lg border border-[#cbd9ea] px-3 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-[#bfe4ff]" type="number" min="0" max={maximum} step="0.01" value={value} onChange={(event) => onChange(student.student_id, event)} /></td><td className="px-4 py-3"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusClass}`}>{status}</span></td></tr>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-2 text-[11px] font-semibold text-ink">{label}{children}</label>; }
function SectionTitle({ title, copy }: { title: string; copy: string }) { return <><h2 className="text-[16px] font-bold text-ink">{title}</h2><p className="mt-1 text-[11px] leading-5 text-muted">{copy}</p></>; }
function StatusBanner({ status }: { status: Exclude<Status, null> }) { const styles = { success: "border-[#bde7cc] bg-[#f0fbf4] text-[#147a43]", error: "border-[#f2c9ce] bg-[#fff3f4] text-[#b42332]", info: "border-[#cce5f7] bg-[#f3faff] text-primary" }; return <p role={status.tone === "error" ? "alert" : "status"} className={`rounded-xl border p-4 text-[12px] ${styles[status.tone]}`}>{status.message}</p>; }
function EmptyState({ text }: { text: string }) { return <div className="rounded-xl border border-dashed border-[#cbd9e8] bg-[#f8fbff] p-5 text-[12px] text-muted">{text}</div>; }
function LoadingState() { return <div className="grid gap-5"><div className="h-56 animate-pulse rounded-2xl bg-white" /><div className="h-80 animate-pulse rounded-2xl bg-white" /></div>; }
function TeacherOnlyMessage() { return <main className="min-h-screen bg-school-bg p-8 text-muted">Halaman ini hanya tersedia untuk akun guru.</main>; }
function getErrorMessage(reason: unknown, fallback: string) { return reason instanceof Error && reason.message ? reason.message : fallback; }
