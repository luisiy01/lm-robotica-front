// NewDashboard.tsx
import {
  Settings,
  LogOut,
  Bell,
  Calendar,
  DollarSign,
  Users,
  Menu,
  X,
} from "lucide-react";
import { Outlet, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import logoLM from "../../assets/images/logo_lm_robotica.jpg";
import "./NewDashboard.css";
import { useLogout } from "./hooks/useLogout";
import { useState } from "react";

export const NewDashboard = () => {
  const { logout } = useLogout();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="dashboard-container flex h-screen overflow-hidden bg-gray-50">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>
      {/* SIDEBAR */}
      <aside
        className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoLM}
              alt="LM Robótica"
              className="h-10 w-auto rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 text-sm leading-tight">
                LM ROBÓTICA
              </span>
              <span className="text-[10px] text-gray-400 font-bold tracking-tighter uppercase">
                Education Center
              </span>
            </div>
          </div>
          {/* Botón cerrar para móvil */}
          <button
            onClick={closeSidebar}
            className="md:hidden p-2 text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {/* Usamos NavLink con la clase sidebar-item */}
          {/* react-router añade automáticamente la clase 'active' si la ruta coincide */}
          <NavLink
            to="/dashboard/asistencias"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
            }
          >
            <Calendar size={20} />
            <span>Asistencias</span>
          </NavLink>

          <NavLink
            to="/dashboard/pagos"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
            }
          >
            <DollarSign size={20} />
            <span>Pagos</span>
          </NavLink>

          <NavLink
            to="/dashboard/alumnos"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
            }
          >
            <Users size={20} />
            <span>Alumnos</span>
          </NavLink>

          <NavLink
            to="/dashboard/configuracion"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
            }
          >
            <Settings size={20} />
            <span>Configuración</span>
          </NavLink>
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
      <main className="flex-1 flex flex-col min-w-0">
        {/* HEADER ... (se mantiene igual) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* BOTÓN HAMBURGUESA (Visible solo en móvil/tablet) */}
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:block relative w-72 lg:w-96" />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-gray-100">
              <span className="hidden sm:block text-sm font-medium text-gray-600">
                Admin
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#F4D03F] flex items-center justify-center font-bold text-gray-700 shadow-sm">
                LM
              </div>
            </div>
          </div>
        </header>

        {/* ÁREA DE TRABAJO */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
