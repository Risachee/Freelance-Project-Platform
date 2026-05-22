import { api } from './axiosInstance';
import type { Client } from '@/types/client';


const toApiPayload = (client: Partial<Client>): Record<string, any> => {
  const { projectsCount, ...payload } = client;
  return payload;
};

export const clientService = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get<Client[]>('clients/');
    return response.data;
  },

  getById: async (id: number): Promise<Client> => {
    const response = await api.get<Client>(`clients/${id}/`);
    return response.data;
  },

  create: async (newClient: Omit<Client, 'id' | 'projectsCount'>): Promise<Client> => {
    const payload = toApiPayload(newClient);
    const response = await api.post<Client>('clients/', payload);
    return response.data;
  },

  update: async (id: number, updatedData: Partial<Client>): Promise<Client> => {
    const payload = toApiPayload(updatedData);
    const response = await api.patch<Client>(`clients/${id}/`, payload);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`clients/${id}/`)
  }
};