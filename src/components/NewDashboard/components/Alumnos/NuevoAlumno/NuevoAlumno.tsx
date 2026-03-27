import { Save, ArrowLeft, Cpu, User, Calendar, Mail, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import './NuevoAlumno.css';
import '../../../NewDashboard.css';
import { useNuevoAlumno } from './hooks/useNuevoAlumno';

export const NuevoAlumno = () => {
    const { formik, navigate, isValid } = useNuevoAlumno();

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
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-7 h-7 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        Datos del Futuro Ingeniero
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                            <div className="relative flex items-center">
                                <User className={`absolute left-4 z-10 ${formik.touched.nombre && formik.errors.nombre ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input
                                    {...formik.getFieldProps('nombre')}
                                    type="text"
                                    className={`form-input !pl-12 ${formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : ''}`}
                                    placeholder="Ej. Juan Pérez"
                                />
                            </div>
                            {formik.touched.nombre && formik.errors.nombre && <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1"><AlertCircle size={12} />{formik.errors.nombre}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Fecha de Nacimiento</label>
                            <div className="relative flex items-center">
                                <Calendar className={`absolute left-4 z-10 ${formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input
                                    {...formik.getFieldProps('fechaNacimiento')}
                                    type="date"
                                    className={`form-input !pl-12 ${formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? 'border-red-500' : ''}`}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: NIVEL */}
                <section className="mb-10">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-7 h-7 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        Nivel de Robótica
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['Basic', 'Intermediate', 'Advanced'].map((lvl) => (
                            <label key={lvl} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="nivel"
                                    value={lvl}
                                    className="hidden peer"
                                    checked={formik.values.nivel === lvl}
                                    onChange={formik.handleChange}
                                />
                                <div className="p-4 border-2 border-gray-100 rounded-2xl peer-checked:border-sky-500 peer-checked:bg-sky-50 transition-all">
                                    <Cpu size={20} className="mb-2 text-gray-400" />
                                    <p className="font-bold text-gray-800 text-sm">{lvl}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">LEGO Spike</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* SECCIÓN 3: CONTACTO */}
                <section className="mb-10">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-7 h-7 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        Contacto y Seguridad
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email del Tutor</label>
                            <div className="relative flex items-center">
                                <Mail className={`absolute left-4 z-10 ${formik.touched.emailTutor && formik.errors.emailTutor ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('emailTutor')} type="email" className="form-input !pl-12" placeholder="tutor@email.com" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Teléfono</label>
                            <div className="relative flex items-center">
                                <Phone className={`absolute left-4 z-10 ${formik.touched.telefono && formik.errors.telefono ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('telefono')} type="tel" className="form-input !pl-12" placeholder="10 dígitos" />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Notas Médicas</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-4 text-gray-300 z-10" size={18} />
                                <textarea {...formik.getFieldProps('alergias')} className="form-input !pl-12 min-h-[100px] pt-3" placeholder="Información de salud..."></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ACCIONES */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`flex-1 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg 
                            ${!isValid ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/25'}`}
                    >
                        <Save size={20} /> Finalizar Inscripción
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