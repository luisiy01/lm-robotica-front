// components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirigimos al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si hay token, permitimos el acceso a las rutas hijas
    return <Outlet />;
};