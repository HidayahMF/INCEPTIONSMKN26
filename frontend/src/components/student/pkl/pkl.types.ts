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
};

export type PklTab = "opportunities" | "applications" | "saved";
