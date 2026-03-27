import {
    Settings,
    LogOut,
    Bell,
    Calendar,
    DollarSign,
    Users,
} from 'lucide-react';
import { Outlet } from "react-router";
import logoLM from "../../assets/images/logo_lm_robotica.jpg";
import './NewDashboard.css';
import { useLogout } from './hooks/useLogout';

export const NewDashboard = () => {
    const { logout } = useLogout();

    return (
        <div className="dashboard-container">

            {/* SIDEBAR */}
            <aside className="sidebar hidden md:flex">
                <div className="p-6 flex items-center gap-3">
                    <img src={logoLM} alt="LM Robótica" className="h-10 w-auto rounded-lg" />
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm leading-tight">LM ROBÓTICA</span>
                        <span className="text-[10px] text-gray-400 font-bold tracking-tighter">EDUCATION CENTER</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <div className="sidebar-item">
                        <Calendar size={20} />
                        <span>Asistencias</span>
                    </div>
                    <div className="sidebar-item">
                        <DollarSign size={20} />
                        <span>Pagos</span>
                    </div>
                    <div className="sidebar-item sidebar-item-active">
                        <Users size={20} />
                        <span>Alumnos</span>
                    </div>
                    <div className="sidebar-item">
                        <Settings size={20} />
                        <span>Configuración</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                    >
                        <div className="p-2 bg-red-100 group-hover:bg-red-200 rounded-lg transition-colors">
                            <LogOut size={18} />
                        </div>
                        <span className="font-bold text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col overflow-y-auto">

                {/* HEADER */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-72 lg:w-96" />
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            <div className="w-9 h-9 rounded-xl bg-[#F4D03F] flex items-center justify-center font-bold text-gray-700 shadow-sm">
                                LM
                            </div>
                        </div>
                    </div>
                </header>

                {/* ÁREA DE TRABAJO */}
                <div className="p-6 lg:p-10 space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};