// EditarAlumno.tsx
import { User, Phone, Save, ArrowLeft, Calendar, Trash2, UserCheck, ShieldCheck, Loader2 } from 'lucide-react';
import './EditarAlumno.css';
import '../../../NewDashboard.css';
import { useEditarAlumno } from './hooks/useEditarAlumno';
import { useParams } from 'react-router';

export const EditarAlumno = () => {
    const { id } = useParams();

    const { formik, navigate, isValid, confirmDelete, isLoadingData, isUpdating } = useEditarAlumno(id!);

    if (isLoadingData) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin text-sky-500" size={48} />
                <span className="ml-3 text-gray-500 font-medium">Cargando expediente...</span>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8 font-sans animate-fade-up">

            {/* ENCABEZADO */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                        onClick={() => navigate('/dashboard/alumnos')}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">Editar Ingeniero</h2>
                        <p className="text-gray-500 text-sm italic">Actualizando perfil de {formik.values.nombre}</p>
                    </div>
                </div>

                <button
                    onClick={confirmDelete}
                    className="flex items-center justify-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors"
                >
                    <Trash2 size={18} />
                    Dar de Baja
                </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">

                {/* SECCIÓN 1: DATOS DEL ALUMNO */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
                            <User size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">Información Personal</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Nombre Completo</label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${formik.touched.nombre && formik.errors.nombre ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input
                                    {...formik.getFieldProps('nombre')}
                                    disabled={isUpdating}
                                    className="form-input !pl-12"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Fecha de Nacimiento</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-gray-300" size={18} />
                                <input {...formik.getFieldProps('fechaNacimiento')} disabled={isUpdating} type="date" className="form-input !pl-12" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: CONTACTO TUTOR */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                            <UserCheck size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">Datos de Contacto</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Nombre del Tutor</label>
                            <div className="relative">
                                <UserCheck className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${formik.touched.nombreTutor && formik.errors.nombreTutor ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('nombreTutor')} disabled={isUpdating} type="text" className="form-input !pl-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Teléfono de Emergencia</label>
                            <div className="relative">
                                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 ${formik.touched.telefono && formik.errors.telefono ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('telefono')} disabled={isUpdating} type="tel" className="form-input !pl-12" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 3: SALUD */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                            <ShieldCheck size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">Notas Médicas</h3>
                    </div>
                    <div className="relative">
                        <ShieldCheck className="absolute left-4 top-4 text-gray-300 z-10" size={18} />
                        <textarea {...formik.getFieldProps('alergias')} disabled={isUpdating} className="form-input !pl-12 min-h-[100px] pt-3"></textarea>
                    </div>
                </section>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={!isValid || isUpdating}
                        className={`flex-1 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg 
                            ${!isValid || isUpdating ? 'bg-gray-200 text-gray-400' : 'bg-sky-500 text-white shadow-sky-500/25'}`}
                    >
                        {isUpdating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isUpdating ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/alumnos')}
                        className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};