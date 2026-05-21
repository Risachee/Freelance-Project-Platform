import { api } from './axiosInstance';

export const authService = {

    login: async (credentials: { username: string; password: string }) => {
        const response = await api.post('users/login/', credentials);
        return response.data as { access: string; refresh?: string };
    },
    user: async() =>{
        const response = await api.get('users/user/');
        return response.data
    }
};