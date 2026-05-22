import { api } from './axiosInstance';

export const authService = {

    login: async (credentials: { username: string; password: string }) => {
        const response = await api.post('auth/login/', credentials);
        return response.data as { access: string; refresh?: string };
    },
    register: async (values: any) => {
        const response = await api.post('auth/register/', values);
        return response.data as { access: string; refresh?: string };
    },
}