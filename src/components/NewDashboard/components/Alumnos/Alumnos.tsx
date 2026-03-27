// Alumnos.tsx
import { Users, Search, UserPlus, MoreVertical, FileText, Download } from 'lucide-react';
import { useAlumnos } from './hooks/useAlumnos';
import './Alumnos.css';

export const Alumnos = () => {
    const {
        searchTerm, setSearchTerm,
        nivelFilter, setNivelFilter,
        filteredAlumnos, handleEdit,
        handleCreate, exportToExcel, exportToPDF
    } = useAlumnos();

    return (
        <div className="p-6 lg:p-10 space-y-8 animate-fade-up font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        <Users className="text-[#0EA5E9]" />
                        Comunidad de Alumnos
                    </h2>
                    <p className="text-gray-500 text-sm italic">Gestión de ingenieros LM Robótica</p>
                </div>

                <div className="flex gap-3">
                    {/* Botones de Exportación */}
                    <button
                        onClick={exportToExcel}
                        className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-200 shadow-sm"
                        title="Exportar a Excel"
                    >
                        <Download size={20} />
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-200 shadow-sm"
                        title="Exportar a PDF"
                    >
                        <FileText size={20} />
                    </button>

                    <button
                        onClick={handleCreate}
                        className="flex items-center justify-center gap-2 bg-[#0EA5E9] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20"
                    >
                        <UserPlus size={18} />
                        <span className="hidden sm:inline">Inscribir Alumno</span>
                    </button>
                </div>
            </div>

            {/* BUSCADOR Y FILTROS */}
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
                <select
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white focus:outline-none"
                    value={nivelFilter}
                    onChange={(e) => setNivelFilter(e.target.value)}
                >
                    <option value="Todos">Todos los Niveles</option>
                    <option value="Basic">Básico</option>
                    <option value="Intermediate">Intermedio</option>
                    <option value="Advanced">Avanzado</option>
                </select>
            </div>

            {/* TABLA (Mismo código de renderizado que tenías) */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* ... table head and body ... */}
                        <tbody className="divide-y divide-gray-50">
                            {filteredAlumnos.length > 0 ? (
                                filteredAlumnos.map((alumno) => (
                                    <tr key={alumno.id} className="hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                                            {alumno.nombre}
                                            <p className="text-[10px] text-gray-400 font-normal">{alumno.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-sky-50 text-sky-600 rounded-md text-[10px] font-bold uppercase">
                                                {alumno.nivel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-gray-600 text-sm">
                                            {alumno.asistencia}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleEdit(alumno.id)}
                                                className="p-2 hover:bg-sky-50 text-gray-400 hover:text-sky-600 rounded-lg"
                                            >
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                                        No se encontraron resultados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};