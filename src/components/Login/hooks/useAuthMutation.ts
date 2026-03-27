import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../../auth/auth.service';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const useAuthMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // 1. Guardar el token en localStorage
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // 2. Notificación de éxito
            toast.success(`¡Bienvenido, ${data.user.nombre}!`, {
                description: 'Conexión exitosa con LM Robótica.',
            });

            // 3. Redirigir al Dashboard
            setTimeout(() => navigate('/dashboard'), 1000);
        },
        onError: (error: any) => {
            const mensaje = error.response?.data?.message || 'Error al conectar';
            toast.error('Fallo de autenticación', {
                description: mensaje,
            });
        },
    });
};