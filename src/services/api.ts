// services/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v2', // URL de tu backend NestJS
});

// INTERCEPTOR DE PETICIONES (Request)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            // Adjunta el token al header de Authorization
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// INTERCEPTOR DE RESPUESTAS (Response) - Opcional pero muy útil
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el backend responde 401 (No autorizado), el token expiró o es inválido
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Podrías forzar un redirect al login aquí
            //window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;