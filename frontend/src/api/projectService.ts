import { api } from './axiosInstance'; 
import type { Project } from '@/types/project';


export const projectService = {

  getAll: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('projects/');
    return response.data;
  },
};