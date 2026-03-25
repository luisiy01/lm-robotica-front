import { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    UserPlus,
    MoreVertical,
    Mail,
    Award,
    BookOpen
} from 'lucide-react';
import './Alumnos.css';
import { useNavigate } from 'react-router';

// Datos de ejemplo inspirados en una clase de robótica
const alumnosData = [
    { id: 1, nombre: "Mateo García", email: "mateo.g@email.com", nivel: "Advanced", proyectos: 12, asistencia: "95%", color: "bg-blue-500" },
    { id: 2, nombre: "Valentina Luna", email: "val.luna@email.com", nivel: "Intermediate", proyectos: 8, asistencia: "88%", color: "bg-yellow-500" },
    { id: 3, nombre: "Santiago Ruiz", email: "santi.robot@email.com", nivel: "Basic", proyectos: 3, asistencia: "100%", color: "bg-green-500" },
    { id: 4, nombre: "Lucía Fernández", email: "lucia.f@email.com", nivel: "Advanced", proyectos: 15, asistencia: "92%", color: "bg-purple-500" },
    { id: 5, nombre: "Thiago Pérez", email: "thiago.p@email.com", nivel: "Intermediate", proyectos: 7, asistencia: "80%", color: "bg-orange-500" },
];

export const Alumnos = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    return (
        <div className="p-6 lg:p-10 space-y-8 animate-fade-up">

            {/* HEADER DE SECCIÓN */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <Users className="text-[#0EA5E9]" />
                        Comunidad de Alumnos
                    </h2>
                    <p className="text-gray-500 text-sm">Gestiona y revisa el progreso de tus ingenieros en formación.</p>
                </div>

                <button
                    className="flex items-center justify-center gap-2 bg-[#0EA5E9] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20"
                    onClick={() => navigate('/dashboard/alumnos/nuevo')}
                >
                    <UserPlus size={18} />
                    Inscribir Alumno
                </button>
            </div>

            {/* BARRA DE FILTROS */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-sky-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                        <Filter size={16} />
                        Filtrar
                    </button>
                    <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white focus:outline-none">
                        <option>Todos los Niveles</option>
                        <option>Básico (Spike Essential)</option>
                        <option>Intermedio (Spike Prime)</option>
                        <option>Avanzado (EV3 / Python)</option>
                    </select>
                </div>
            </div>

            {/* TABLA DE ALUMNOS */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Alumno</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nivel Robótica</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Proyectos</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Asistencia</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {alumnosData.map((alumno, index) => (
                                <tr key={alumno.id} className="table-row-hover stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`avatar-lego ${alumno.color}`}>
                                                {alumno.nombre.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">{alumno.nombre}</p>
                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Mail size={12} /> {alumno.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`badge-nivel ${alumno.nivel === 'Advanced' ? 'nivel-advanced' :
                                            alumno.nivel === 'Intermediate' ? 'nivel-inter' : 'nivel-basic'
                                            }`}>
                                            {alumno.nivel}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                            <BookOpen size={14} className="text-gray-400" />
                                            {alumno.proyectos} completados
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500"
                                                    style={{ width: alumno.asistencia }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-600">{alumno.asistencia}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINACIÓN / FOOTER TABLA */}
                <div className="p-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between text-xs font-bold text-gray-400">
                    <span>Mostrando {alumnosData.length} alumnos inscritos</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">Anterior</button>
                        <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-100">Siguiente</button>
                    </div>
                </div>
            </div>

            {/* SECCIÓN DE LOGROS RÁPIDOS (Opcional) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl">
                            <Award size={32} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Alumno del Mes</h3>
                            <p className="text-white/80 text-sm">Lucía Fernández - Por su innovador brazo robótico.</p>
                        </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
                </div>
            </div>

        </div>
    );
};