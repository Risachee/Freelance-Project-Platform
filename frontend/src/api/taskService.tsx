import { api } from './axiosInstance';
import type { Task } from '@/types/task';

const STATUS_MAP: Record<string, string> = {
  todo: 'Активные',
  in_progress: 'В процессе',
  done: 'Завершенные',
};
const PRIORITY_MAP: Record<string, string> = {
  1: "low",
  2: "medium",
  3: "high",
  4: "urgent",

};

const transformTask = (task: Task): Task => ({
  ...task,
  status: STATUS_MAP[task.status] || task.status,
  priority: PRIORITY_MAP[task.priority] || task.priority,
  completed: task.status === 'done' ? true : false
});

const toApiPayload = (taskData: Partial<Task>): Record<string, any> => {
  const payload = { ...taskData };
  const englishKey = Object.keys(STATUS_MAP).find(
    key => STATUS_MAP[key as keyof typeof STATUS_MAP] === payload.status
  );
  if (englishKey) payload.status = englishKey;

  const priorityKey = Object.keys(PRIORITY_MAP).find(
    key => PRIORITY_MAP[key] === payload.priority
  );
  if (priorityKey) payload.priority = priorityKey;
  
  delete payload.completed

  return payload;
};

export const taskService = {
  getProjectTasks: async (projectId: number | string): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/projects/${projectId}/tasks/`);
    return response.data.map(transformTask);
  },

  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks/tasks/');
    return response.data.map(transformTask);
  },

  create: async (projectId: number | string, taskData: any): Promise<Task> => {
    const payload = toApiPayload(taskData);
    const response = await api.post<Task>(`/projects/${projectId}/tasks/`, payload);
    return transformTask(response.data);
  },

  update: async (projectId: number | string, taskId: number | string, taskData: any): Promise<Task> => {
    const payload = toApiPayload(taskData);
    const response = await api.patch<Task>(`/projects/${projectId}/tasks/${taskId}/`, payload);
    return transformTask(response.data);
  },

  delete: (projectId: number | string, taskId: number | string) =>
    api.delete(`/projects/${projectId}/tasks/${taskId}/`),
};