// NuevoAlumno.tsx
import { Save, ArrowLeft, User, Calendar, Phone, ShieldCheck, AlertCircle, UserCheck, Loader2 } from 'lucide-react';
import './NuevoAlumno.css';
import '../../../NewDashboard.css';
import { useNuevoAlumno } from './hooks/useNuevoAlumno';

export const NuevoAlumno = () => {
    const { formik, navigate, isValid, isLoading } = useNuevoAlumno();

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8 animate-fade-up">

            {/* HEADER */}
            <div className="flex items-center gap-4">
                <button
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                    onClick={() => navigate('/dashboard/alumnos')}
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Nueva Inscripción</h2>
                    <p className="text-gray-500 text-sm">Registra un nuevo integrante a LM Robótica.</p>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">

                {/* SECCIÓN 1: DATOS DEL ALUMNO */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
                            <User size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">Información del Ingeniero</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Nombre Completo</label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${formik.touched.nombre && formik.errors.nombre ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('nombre')} type="text" className="form-input !pl-12" placeholder="Ej. Mateo García" />
                            </div>
                            {formik.touched.nombre && formik.errors.nombre && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{formik.errors.nombre}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Fecha de Nacimiento</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input {...formik.getFieldProps('fechaNacimiento')} type="date" className="form-input !pl-12" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: DATOS DEL TUTOR */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                            <UserCheck size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-700">Datos del Tutor</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Nombre del Tutor</label>
                            <div className="relative">
                                <UserCheck className={`absolute left-4 top-1/2 -translate-y-1/2 ${formik.touched.nombreTutor && formik.errors.nombreTutor ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('nombreTutor')} type="text" className="form-input !pl-12" placeholder="Nombre del padre o tutor" />
                            </div>
                            {formik.touched.nombreTutor && formik.errors.nombreTutor && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{formik.errors.nombreTutor}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Teléfono de Emergencia</label>
                            <div className="relative">
                                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 ${formik.touched.telefono && formik.errors.telefono ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('telefono')} type="tel" className="form-input !pl-12" placeholder="10 dígitos" />
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
                        <textarea {...formik.getFieldProps('alergias')} className="form-input !pl-12 min-h-[100px] pt-3" placeholder="Alergias o condiciones importantes..."></textarea>
                    </div>
                </section>

                {/* ACCIONES */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={!isValid || isLoading}
                        className={`flex-1 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg 
                            ${!isValid || isLoading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/25'}`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                REGISTRANDO...
                            </>
                        ) : (
                            <>
                                <Save size={20} /> Finalizar Inscripción
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/alumnos')}
                        disabled={isLoading}
                        className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};