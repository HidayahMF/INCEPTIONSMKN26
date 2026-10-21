export type PortfolioStatus = "DRAFT" | "PUBLISHED";
export type VerificationStatus = "DRAFT" | "PENDING" | "VERIFIED" | "REJECTED";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  skills: string[];
  date: string;
  status: PortfolioStatus;
  thumbnail: string;
  purpose: string;
  role: string;
  background?: string;
  features?: string[];
  outputs?: string[];
  lessonsLearned?: string;
  documentationImages?: string[];
  github?: string;
  demoUrl?: string;
};

export type StudentAchievement = {
  id: string;
  title: string;
  type: string;
  competition: string;
  organizer: string;
  level: string;
  rank: string;
  date: string;
  description: string;
  evidence?: string;
  image?: string;
  verificationStatus: VerificationStatus;
  verificationNote?: string;
};
