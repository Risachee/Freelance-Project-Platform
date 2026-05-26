import {api} from './axiosInstance'; 

export const taskService = {
  getProjectTasks: (projectId: number | string) => 
    api.get(`/projects/${projectId}/tasks/`),
    
  create: (projectId: number | string, taskData: any) => 
    api.post(`/projects/${projectId}/tasks/`, taskData),
    
  update: (projectId: number | string, taskId: number | string, taskData: any) => 
    api.put(`/projects/${projectId}/tasks/${taskId}/`, taskData),
    
  delete: (projectId: number | string, taskId: number | string) => 
    api.delete(`/projects/${projectId}/tasks/${taskId}/`),
};