export type Resource = { id: string; title: string; description: string; resource_type: string; url: string | null };
export type TopicRecommendation = { topicId: string; topicName: string; subjectName: string; averageScore: number | null; targetScore: number | null; gap: number | null; assessmentCount: number; status: 'MASTERED' | 'ON_TRACK' | 'NEEDS_ATTENTION' | 'NOT_ENOUGH_DATA'; approvedResources: Resource[] };
export type LearningSummary = { subjects: { id: string; code: string; name: string; assessedTopics: number; status: string; topics: TopicRecommendation[] }[]; summary: { assessedSubjects: number; needsAttention: number; mastered: number }; weakTopics: TopicRecommendation[] };
export type Assignment = { id: string; subject_id: string; class_id: string; academic_year_id: string; subjects: { id: string; code: string; name: string }; classes: { id: string; code: string; grade: number }; academic_years: { id: string; code: string } };
export type StudentRow = { student_id: string; profiles: { user_id: string; school_identifier: string; display_name: string } };
export type Topic = { id: string; subject_id: string; name: string; code: string; description: string | null };
