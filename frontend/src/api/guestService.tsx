import { api } from './axiosInstance'; 
import type { Project } from '@/types/project';

export const guestService = {

  getProjectByToken: async (token: string): Promise<Project> => {

    const response = await api.get<Project>(`/guests/${token}/project/`, {
      headers: {
        Authorization: null,
      },
    });
    return response.data;
  },

  createGuestLink: async (projectId: number): Promise<{ token: string; link: string }> => {
    const response = await api.post<{ token: string; link: string }>(
      `/projects/${projectId}/guest-link/`
    );
    return response.data;
  },
};