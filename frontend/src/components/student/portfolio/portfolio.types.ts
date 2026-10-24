export type PortfolioStatus = "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED" | "PUBLISHED";
export type VerificationStatus = "DRAFT" | "PENDING" | "SUBMITTED" | "VERIFIED" | "REJECTED";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  skills: string[];
  date: string;
  status: PortfolioStatus;
  thumbnail?: string;
  purpose: string;
  role: string;
  background?: string;
  features?: string[];
  outputs?: string[];
  lessonsLearned?: string;
  documentationImages?: string[];
  reviewerNote?: string;
  isPublic?: boolean;
  files?: { id: string; name: string; mimeType: string; size: number; createdAt: string }[];
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
  files?: { id: string; name: string; mimeType: string; size: number; createdAt: string }[];
};
