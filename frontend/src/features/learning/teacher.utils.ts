import { getAssignmentAssessments, getAssignmentStudents, getAssignmentTopics, getAssignments } from "./learning.api";
import type { Assessment, Assignment, StudentRow, Topic } from "./learning.types";

export type LoadedTeacherAssignment = { assignment: Assignment; students: StudentRow[]; assessments: Assessment[]; topics: Topic[] };

// Internal portal navigation stays inside one authenticated SPA session. Reuse
// the already authorized workspace instead of requesting it for every route.
let assignmentsCache: Assignment[] | null = null;
let assignmentsRequest: Promise<Assignment[]> | null = null;
const assignmentCache = new Map<string, LoadedTeacherAssignment>();
const assignmentRequests = new Map<string, Promise<LoadedTeacherAssignment>>();

export function getCachedTeacherAssignments() {
  if (assignmentsCache) return Promise.resolve(assignmentsCache);
  if (!assignmentsRequest) {
    assignmentsRequest = getAssignments().then((items) => {
      assignmentsCache = items;
      return items;
    }).finally(() => { assignmentsRequest = null; });
  }
  return assignmentsRequest;
}

export async function loadTeacherAssignment(assignment: Assignment): Promise<LoadedTeacherAssignment> {
  const cached = assignmentCache.get(assignment.id);
  if (cached) return cached;
  const pending = assignmentRequests.get(assignment.id);
  if (pending) return pending;
  const request = Promise.all([getAssignmentStudents(assignment.id), getAssignmentTopics(assignment.id), getAssignmentAssessments(assignment.id)]).then(([studentData, topics, assessments]) => {
    const loaded = { assignment, students: studentData.students, topics, assessments };
    assignmentCache.set(assignment.id, loaded);
    return loaded;
  }).finally(() => { assignmentRequests.delete(assignment.id); });
  assignmentRequests.set(assignment.id, request);
  return request;
}

export async function loadTeacherWorkspace(assignments: Assignment[]) { return Promise.all(assignments.map(loadTeacherAssignment)); }

export function invalidateTeacherAssignment(assignmentId: string) {
  assignmentCache.delete(assignmentId);
}

export function clearTeacherLearningCache() {
  assignmentsCache = null;
  assignmentsRequest = null;
  assignmentCache.clear();
  assignmentRequests.clear();
}

export function formatTeacherDate(value: string) {
  if (!value) return "Tanggal belum tersedia";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(`${value}T00:00:00`));
}

export function completion(assessment: Assessment, studentCount: number) { return studentCount ? `${assessment.student_scores.length}/${studentCount}` : "Belum dapat dihitung"; }

export function scoreStatus(score: number, target: number) { return score >= target ? "Mencapai target" : "Perlu ditinjau"; }
