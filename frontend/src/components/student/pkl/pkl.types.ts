export type PklOpportunity = {
  id: string;
  company: string;
  industry: string;
  program: string;
  major: string;
  field: string;
  location: string;
  registrationPeriod: string;
  internshipPeriod: string;
  image: string;
  description: string;
  requirements: string[];
  status: string;
  detailImage?: string;
  activities?: string[];
  benefits?: string[];
  registrationStart?: string;
  registrationEnd?: string;
  internshipStart?: string;
  internshipEnd?: string;
};

export type PklApplication = { id: string; vacancyId: string; vacancy: PklOpportunity | null; portfolioId: string; status: "SUBMITTED" | "REVIEWING" | "ACCEPTED" | "REJECTED"; reviewerNote: string; createdAt: string; updatedAt: string; cvFileId: string | null };

export type PklTab = "opportunities" | "applications" | "saved";
