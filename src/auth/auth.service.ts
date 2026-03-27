
import api from '../services/api';

export const loginUser = async (credentials: { email: string; password: string }) => {
    const { data } = await api.post(`/auth/login`, credentials);
    return data; // Retorna { access_token, user: { id, nombre, rol } }
};