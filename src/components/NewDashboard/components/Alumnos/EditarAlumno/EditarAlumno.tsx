import { User, Mail, Phone, Save, ArrowLeft, Calendar, Trash2, Cpu, AlertCircle } from 'lucide-react';
import './EditarAlumno.css';
import '../../../NewDashboard.css';
import { useEditarAlumno } from './hooks/useEditarAlumno';

export const EditarAlumno = () => {
    // Datos simulados (en una app real vendrían de una API o estado global)
    const datosAlumnoActual = {
        nombre: 'Mateo García',
        fechaNacimiento: '2015-06-15',
        nivel: 'Advanced',
        emailTutor: 'mateo.g@email.com',
        telefono: '3121234567',
        alergias: 'Ninguna'
    };

    const { formik, navigate, isValid } = useEditarAlumno(datosAlumnoActual);

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8 font-sans">

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
                        <h2 className="text-2xl font-bold text-gray-800">Editar Perfil</h2>
                        <p className="text-sm text-gray-500 italic">
                            Actualizando al ingeniero <span className="text-sky-600 font-bold">{formik.values.nombre}</span>
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all text-sm"
                    onClick={() => { if (window.confirm('¿Eliminar registro?')) console.log('Baja confirmada'); }}
                >
                    <Trash2 size={18} />
                    Dar de Baja
                </button>
            </div>

            <form onSubmit={formik.handleSubmit} className="form-card animate-fade-up">

                {/* DATOS PERSONALES */}
                <section className="mb-10">
                    <h3 className="section-title"><User className="text-sky-500" size={20} /> Datos Personales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="input-label">Nombre del Alumno</label>
                            <div className="relative flex items-center">
                                <User className={`absolute left-4 z-10 ${formik.touched.nombre && formik.errors.nombre ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input
                                    {...formik.getFieldProps('nombre')}
                                    type="text"
                                    className={`form-input input-with-icon ${formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : ''}`}
                                />
                            </div>
                            {formik.touched.nombre && formik.errors.nombre && (
                                <p className="text-red-500 text-[10px] flex items-center gap-1 mt-1 font-medium"><AlertCircle size={12} />{formik.errors.nombre}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="input-label">Fecha de Nacimiento</label>
                            <div className="relative flex items-center">
                                <Calendar className="absolute left-4 text-gray-300 z-10" size={18} />
                                <input
                                    {...formik.getFieldProps('fechaNacimiento')}
                                    type="date"
                                    className="form-input input-with-icon"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* NIVEL DE ROBÓTICA */}
                <section className="mb-10">
                    <h3 className="section-title"><Cpu className="text-sky-500" size={20} /> Nivel de Robótica</h3>
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
                                    <p className="font-bold text-gray-800 text-sm">{lvl}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">LEGO Education</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* CONTACTO */}
                <section className="mb-10">
                    <h3 className="section-title"><Mail className="text-sky-500" size={20} /> Contacto de Tutor</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="input-label">Email</label>
                            <div className="relative flex items-center">
                                <Mail className="absolute left-4 text-gray-300 z-10" size={18} />
                                <input {...formik.getFieldProps('emailTutor')} type="email" className="form-input input-with-icon" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="input-label">Teléfono</label>
                            <div className="relative flex items-center">
                                <Phone className={`absolute left-4 z-10 ${formik.touched.telefono && formik.errors.telefono ? 'text-red-400' : 'text-gray-300'}`} size={18} />
                                <input {...formik.getFieldProps('telefono')} type="tel" className="form-input input-with-icon" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`flex-1 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg 
                            ${!isValid ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-500/20'}`}
                    >
                        <Save size={20} /> Guardar Cambios
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