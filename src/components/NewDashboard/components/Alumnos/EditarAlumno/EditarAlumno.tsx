import { useState } from 'react';
import { User, Mail, Phone, Save, ArrowLeft, ShieldCheck, Calendar, Trash2, Cpu } from 'lucide-react';
import './EditarAlumno.css';
import '../../../NewDashboard.css';
import { useNavigate } from 'react-router';

export const EditarAlumno = () => {
    const [formData, setFormData] = useState({
        nombre: 'Mateo García',
        fechaNacimiento: '2015-06-15',
        nivel: 'Advanced',
        emailTutor: 'mateo.g@email.com',
        telefono: '+52 312 123 4567',
        alergias: 'Ninguna'
    });

    const navigate = useNavigate();

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
                        <p className="text-sm text-gray-500">Actualizando al ingeniero <span className="text-sky-600 font-bold">{formData.nombre}</span></p>
                    </div>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all text-sm">
                    <Trash2 size={18} />
                    Eliminar Registro
                </button>
            </div>

            <form className="form-card animate-fade-up">
                {/* DATOS PERSONALES */}
                <section className="mb-10">
                    <h3 className="section-title"><User className="text-sky-500" size={20} /> Datos Personales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="input-label">Nombre del Alumno</label>
                            <div className="relative flex items-center">
                                <User className="absolute left-4 text-gray-300 z-10" size={18} />
                                <input type="text" value={formData.nombre} className="form-input input-with-icon" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="input-label">Fecha de Nacimiento</label>
                            <div className="relative flex items-center">
                                <Calendar className="absolute left-4 text-gray-300 z-10" size={18} />
                                <input type="date" value={formData.fechaNacimiento} className="form-input input-with-icon" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* NIVEL */}
                <section className="mb-10">
                    <h3 className="section-title"><Cpu className="text-sky-500" size={20} /> Nivel de Robótica</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {['Basic', 'Intermediate', 'Advanced'].map((lvl) => (
                            <label key={lvl} className="cursor-pointer">
                                <input type="radio" name="nivel" className="hidden peer" checked={formData.nivel === lvl} readOnly />
                                <div className="level-selector-card">
                                    <p className="font-bold text-gray-800 text-sm">{lvl}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">Kit LEGO Correspondiente</p>
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
                                <input type="email" value={formData.emailTutor} className="form-input input-with-icon" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="input-label">Teléfono</label>
                            <div className="relative flex items-center">
                                <Phone className="absolute left-4 text-gray-300 z-10" size={18} />
                                <input type="tel" value={formData.telefono} className="form-input input-with-icon" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOTONES */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button type="submit" className="flex-1 bg-sky-500 text-white font-bold py-4 rounded-2xl hover:bg-sky-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20">
                        <Save size={20} /> Guardar Cambios
                    </button>
                    <button type="button" className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};