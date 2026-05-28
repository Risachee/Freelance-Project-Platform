import { api } from './axiosInstance';
import { type Project } from '@/types/project';

const STATUS_MAP: Record<string, string> = {
  discussion: 'Обсуждение',
  active: 'В работе',
  paused: 'На паузе',
  done: 'Завершен',
};

const toApiPayload = (project: Partial<Project>): Record<string, any> => {
  const payload = { ...project };

  const englishKey = Object.keys(STATUS_MAP).find(
    key => STATUS_MAP[key as keyof typeof STATUS_MAP] === payload.status
  );

  if (englishKey) {
    payload.status = englishKey;
  }

  delete payload.clientName;
  delete payload.isArchived;
  delete payload.owner;
  delete payload.token;

  return payload;
};

const fromApiPayload = (projects: Project[]) => {
  return projects.map((project) => ({
    ...project,

    status: STATUS_MAP[project.status] || project.status
  }));
};

export const projectService = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('projects/');

    return fromApiPayload(response.data);
  },

  getById: async (id: number): Promise<Project> => {
    const response = await api.get<Project>(`projects/${id}/`);
    return response.data;
  },

  create: async (newProject: Omit<Project, 'id' | 'created_at'>): Promise<Project> => {
    const payload = toApiPayload(newProject);
    const response = await api.post<Project>('projects/', payload);
    return {
      ...response.data,
      status: STATUS_MAP[response.data.status as keyof typeof STATUS_MAP] || response.data.status
    };
  },

  update: async (id: number, updatedData: Partial<Project>): Promise<Project> => {
    const payload = toApiPayload(updatedData);
    const response = await api.patch<Project>(`projects/${id}/`, payload);

    return {
      ...response.data,
      status: STATUS_MAP[response.data.status as keyof typeof STATUS_MAP] || response.data.status
    };
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`projects/${id}/`);
  },

  getTasks: async (projectId: number) => {
    const response = await api.get(`projects/${projectId}/tasks/`);
    return response.data;
  },
};