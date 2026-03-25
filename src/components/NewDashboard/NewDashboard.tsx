import {
    LayoutDashboard,
    Cpu,
    Trophy,
    Settings,
    LogOut,
    Search,
    Bell,
    PlayCircle,
    Clock,
    BatteryMedium,
    ChevronRight
} from 'lucide-react';
import logoLM from "../../assets/images/logo_lm_robotica.jpg";
import './NewDashboard.css';

export const NewDashboard = () => {
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
                    <div className="sidebar-item sidebar-item-active">
                        <LayoutDashboard size={20} />
                        <span>Panel General</span>
                    </div>
                    <div className="sidebar-item">
                        <Cpu size={20} />
                        <span>Mis Robots</span>
                    </div>
                    <div className="sidebar-item">
                        <Trophy size={20} />
                        <span>Competencias</span>
                    </div>
                    <div className="sidebar-item">
                        <Settings size={20} />
                        <span>Configuración</span>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="sidebar-item w-full text-red-500 hover:bg-red-50 hover:text-red-600">
                        <LogOut size={20} />
                        <span>Salir</span>
                    </button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col overflow-y-auto">

                {/* HEADER */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="relative w-72 lg:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar proyectos..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-sky-500 transition-all text-sm"
                        />
                    </div>

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

                    <div className="animate-fade-up">
                        <h2 className="text-2xl font-bold text-gray-800">¡Hola, Ingeniero! 🛠️</h2>
                        <p className="text-gray-500 text-sm">Panel de control de tus kits LEGO Education.</p>
                    </div>

                    {/* TARJETAS DE ESTADO */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="stat-card animate-fade-up delay-1 border-b-4 border-b-[#0EA5E9]">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl"><PlayCircle size={24} /></div>
                                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-md uppercase">En curso</span>
                            </div>
                            <p className="text-sm text-gray-400 font-medium">Proyectos Activos</p>
                            <p className="text-2xl font-bold text-gray-800">3 Desafíos</p>
                        </div>

                        <div className="stat-card animate-fade-up delay-2 border-b-4 border-b-[#F4D03F]">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-yellow-50 text-yellow-600 rounded-2xl"><Clock size={24} /></div>
                            </div>
                            <p className="text-sm text-gray-400 font-medium">Tiempo de Construcción</p>
                            <p className="text-2xl font-bold text-gray-800">24.5 Horas</p>
                        </div>

                        <div className="stat-card animate-fade-up delay-3 border-b-4 border-b-green-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><BatteryMedium size={24} /></div>
                            </div>
                            <p className="text-sm text-gray-400 font-medium">Estado del Hub</p>
                            <p className="text-2xl font-bold text-gray-800 text-green-600">Conectado</p>
                        </div>
                    </div>

                    {/* SECCIÓN INFERIOR */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-up delay-3">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-6 flex items-center justify-between">
                                Progreso de Ensamble
                                <button className="text-xs text-sky-600 hover:underline">Ver todo</button>
                            </h3>

                            <div className="space-y-6">
                                {[
                                    { name: "Seguidor de Línea PID", val: 85, color: "bg-[#0EA5E9]" },
                                    { name: "Misión Espacial Spike", val: 40, color: "bg-[#F4D03F]" },
                                    { name: "Mecánica de Engranajes", val: 100, color: "bg-green-500" }
                                ].map((item, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-bold text-gray-700">{item.name}</span>
                                            <span className="text-gray-400">{item.val}%</span>
                                        </div>
                                        <div className="progress-container">
                                            <div className={`progress-bar-fill ${item.color}`} style={{ width: `${item.val}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#1F2937] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-gray-200">
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[#F4D03F] font-bold text-xs uppercase tracking-widest mb-2">Próximo Torneo</h4>
                                    <p className="text-2xl font-bold mb-2">Nacional de Robótica <br /> FLL 2026</p>
                                    <p className="text-gray-400 text-sm">Prepara tu código, la competencia inicia en 12 días.</p>
                                </div>
                                <button className="mt-8 flex items-center justify-center gap-2 w-full bg-[#0EA5E9] py-3 rounded-2xl font-bold hover:bg-[#0284C7] transition-all">
                                    Inscribir Equipo <ChevronRight size={18} />
                                </button>
                            </div>
                            {/* Decoración LEGO sutil */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};