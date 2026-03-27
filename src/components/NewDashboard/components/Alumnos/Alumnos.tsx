// Alumnos.tsx
import { Users, Search, UserPlus, FileText, Download, Loader2, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { useAlumnos } from './hooks/useAlumnos';
import { useAlumnosQueries } from './hooks/queries/useAlumnosQueries';
import './Alumnos.css';
import { useNavigate } from 'react-router';

export const Alumnos = () => {

    const navigate = useNavigate();

    const { alumnosQuery, deleteAlumno } = useAlumnosQueries();

    const { data: alumnos, isLoading, isError } = alumnosQuery;
    const { searchTerm, setSearchTerm, filteredAlumnos, handleCreate, exportToExcel, exportToPDF } = useAlumnos(alumnos)

    if (isLoading) return (
        <div className="flex h-96 items-center justify-center flex-col gap-4">
            <Loader2 className="animate-spin text-sky-500" size={48} />
            <p className="text-gray-500 font-medium">Cargando ingenieros...</p>
        </div>
    );

    if (isError) return (
        <div className="p-10 text-center bg-red-50 rounded-3xl border border-red-100 m-6">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
            <h3 className="text-red-800 font-bold">Error de conexión</h3>
            <p className="text-red-600">No pudimos obtener la lista de alumnos de la base de datos.</p>
        </div>
    );

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
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre del alumno..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-sky-500 transition-all outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest px-2">
                    {filteredAlumnos.length} Ingeniero(s)
                </div>
            </div>

            {/* TABLA (Mismo código de renderizado que tenías) */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">Nombre</th>
                                <th className="p-4 font-semibold text-gray-600">Tutor</th>
                                <th className="p-4 font-semibold text-gray-600">Teléfono</th>
                                <th className="p-4 font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlumnos?.map((alumno: any) => (
                                <tr key={alumno.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-700">{alumno.nombre}</td>
                                    <td className="p-4 text-gray-600">{alumno.nombreTutor}</td>
                                    <td className="p-4 text-gray-600">{alumno.telefono}</td>
                                    <td className="p-4 flex gap-2">
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-2">
                                                {/* BOTÓN EDITAR */}
                                                <button
                                                    onClick={() => navigate(`/dashboard/alumnos/editar/${alumno.id}`)}
                                                    className="p-2 text-sky-500 hover:bg-sky-100 rounded-lg transition-all"
                                                    title="Editar Alumno"
                                                >
                                                    <Edit2 size={18} />
                                                </button>

                                                {/* BOTÓN ELIMINAR */}
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`¿Seguro que deseas eliminar a ${alumno.nombre}?`)) {
                                                            deleteAlumno(alumno.id);
                                                        }
                                                    }}
                                                    className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                                                    title="Eliminar Alumno"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredAlumnos.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-gray-400 font-medium italic">No se encontraron resultados para "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};