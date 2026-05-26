import { api } from './axiosInstance';
import type { Project } from '@/types/project';

const toApiPayload = (project: Partial<Project>): Record<string, any> => {
  const payload: Record<string, any> = { ...project };

  delete payload.clientName;
  delete payload.isArchived;
  delete payload.owner;   
  delete payload.token;   

  return payload;
};

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('projects/');
    return response.data;
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get<Project>(`projects/${id}/`);
    return response.data;
  },

  create: async (newProject: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
    const payload = toApiPayload(newProject);
    const response = await api.post<Project>('projects/', payload);
    return response.data;
  },

  update: async (id: number, updatedData: Partial<Project>): Promise<Project> => {
    const payload = toApiPayload(updatedData);
    const response = await api.patch<Project>(`projects/${id}/`, payload);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`projects/${id}/`);
  },

  getTasks: async (projectId: number) => {
    const response = await api.get(`projects/${projectId}/tasks/`);
    return response.data;
  },
};