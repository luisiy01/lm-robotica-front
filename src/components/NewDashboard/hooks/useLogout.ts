// hooks/useLogout.ts
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        // 1. Borramos toda la información de la sesión
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // 2. Notificamos al usuario
        toast.info('Sesión cerrada', {
            description: 'Esperamos verte pronto en LM Robótica.',
        });

        // 3. Redirigimos al login de inmediato
        navigate('/');
    };

    return { logout };
};