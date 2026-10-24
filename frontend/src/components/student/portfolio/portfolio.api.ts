import { api } from "../../../lib/api";
import type { PortfolioProject, StudentAchievement, VerificationStatus } from "./portfolio.types";

export type PortfolioPayload = {
  title: string;
  category: string;
  summary: string;
  description: string;
  skills: string[];
  date: string;
  role: string;
  purpose?: string;
  background?: string;
  features?: string[];
  outputs?: string[];
  lessonsLearned?: string;
  github?: string;
  demoUrl?: string;
};
export type AchievementPayload = Omit<StudentAchievement, "id" | "verificationStatus" | "image"> & { file?: File | null };

export const getPortfolioProjects = () => api<PortfolioProject[]>("/api/student/portfolio");
export const getPortfolioProject = (id: string) => api<PortfolioProject>(`/api/student/portfolio/${encodeURIComponent(id)}`);
export const getAchievements = () => api<StudentAchievement[]>("/api/student/achievements");
export const getAchievement = (id: string) => api<StudentAchievement>(`/api/student/achievements/${encodeURIComponent(id)}`);
export const createPortfolio = (payload: PortfolioPayload) => api<PortfolioProject>("/api/student/portfolio", { method: "POST", body: JSON.stringify(payload) });
export const createAchievement = (payload: AchievementPayload) => api<StudentAchievement>("/api/student/achievements", { method: "POST", body: JSON.stringify(payload) });
export const updatePortfolio = (id: string, payload: PortfolioPayload) => api<PortfolioProject>(`/api/student/portfolio/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const updateAchievement = (id: string, payload: AchievementPayload) => api<StudentAchievement>(`/api/student/achievements/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deletePortfolio = (id: string) => api<{ deleted: boolean }>(`/api/student/portfolio/${id}`, { method: "DELETE" });
export const deleteAchievement = (id: string) => api<{ deleted: boolean }>(`/api/student/achievements/${id}`, { method: "DELETE" });
export const submitPortfolio = (id: string) => api<PortfolioProject>(`/api/student/portfolio/${id}/submit`, { method: "POST" });
export const submitAchievement = (id: string) => api<StudentAchievement>(`/api/student/achievements/${id}/submit`, { method: "POST" });
export const removePortfolio = (id: string) => api<{ deleted: boolean }>(`/api/student/portfolio/${id}`, { method: "DELETE" });
export const removeAchievement = (id: string) => api<{ deleted: boolean }>(`/api/student/achievements/${id}`, { method: "DELETE" });
export const uploadPortfolioFile = (kind: "portfolio" | "achievement", recordId: string, file: File) => { const body = new FormData(); body.append("recordId", recordId); body.append("file", file); return api(`/api/student/files/${kind}`, { method: "POST", body }); };
export const removePortfolioFile = (kind: "portfolio" | "achievement", fileId: string) => api<{ deleted: boolean }>(`/api/student/files/${kind}/${encodeURIComponent(fileId)}`, { method: "DELETE" });
export const getSignedPortfolioFile = (kind: "portfolio" | "achievement", fileId: string) => api<{ url: string; expiresIn: number }>(`/api/files/${kind}/${fileId}`);

export function statusLabel(status: VerificationStatus | PortfolioProject["status"]) {
  return { DRAFT: "Draf", SUBMITTED: "Menunggu Verifikasi", PENDING: "Menunggu Verifikasi", VERIFIED: "Terverifikasi", REJECTED: "Perlu Revisi" }[status];
}
