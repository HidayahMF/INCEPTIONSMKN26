import { api } from '../../../lib/api';
import type { LostFoundItem } from './lostfound.types';
export const getLostFoundItems = () => api<LostFoundItem[]>('/api/student/lost-found');
export const getLostFoundItem = (id: string) => api<LostFoundItem>(`/api/student/lost-found/${id}`);
export const createLostFoundItem = (payload: { type: string; name: string; category: string; description: string; location: string; date: string; additional: string; photo: File }) => { const form = new FormData(); Object.entries(payload).forEach(([key, value]) => form.append(key, value)); return api<LostFoundItem>('/api/student/lost-found', { method: 'POST', body: form }); };
export const claimLostFoundItem = (id: string, description: string) => api<{ id: string; status: string }>(`/api/student/lost-found/${id}/claims`, { method: 'POST', body: JSON.stringify({ description }) });
