import { api } from '../../../lib/api';
import type { PklApplication, PklOpportunity } from './pkl.types';

export const getPklVacancies = () => api<PklOpportunity[]>('/api/student/pkl/vacancies');
export const getPklApplications = () => api<PklApplication[]>('/api/student/pkl/applications');
export const applyPkl = (vacancyId: string, portfolioId: string, cv: File) => { const form = new FormData(); form.append('vacancyId', vacancyId); form.append('portfolioId', portfolioId); form.append('cv', cv); return api<{ id: string; status: string }>('/api/student/pkl/applications', { method: 'POST', body: form }); };
