import React, { useState } from 'react';
import {
    Save,
    ArrowLeft,
    Cpu
} from 'lucide-react';
import './NuevoAlumno.css';
import '../../../NewDashboard.css';
import { useNavigate } from 'react-router';

export const NuevoAlumno = () => {
    const [formData, _setFormData] = useState({
        nombre: '',
        fechaNacimiento: '',
        nivel: 'Basic',
        emailTutor: '',
        telefono: '',
        alergias: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Inscribiendo alumno:", formData);
        alert("¡Alumno ensamblado correctamente en el sistema!");
    };

    const navigate = useNavigate();

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">

            {/* HEADER CON REGRESO */}
            <div className="flex items-center gap-4">
                <button
                    className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors"
                    onClick={() => navigate('/dashboard/alumnos')}
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Nueva Inscripción</h2>
                    <p className="text-gray-500 text-sm">Registra un nuevo integrante a la comunidad de LM Robótica.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="form-card animate-fade-up">

                {/* SECCIÓN 1: DATOS DEL ALUMNO */}
                <section className="mb-10">
                    <h3 className="section-title">
                        <span className="step-number">1</span>
                        Datos del Futuro Ingeniero
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="input-label">Nombre Completo</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ej. Juan Pérez"
                                    className="form-input pl-12"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="input-label">Fecha de Nacimiento</label>
                            <div className="relative">
                                <input type="date" className="form-input pl-12" required />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: NIVEL Y CURSO */}
                <section className="mb-10">
                    <h3 className="section-title">
                        <span className="step-number">2</span>
                        Configuración de Nivel
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { id: 'Basic', label: 'Básico', desc: 'Spike Essential', color: 'border-green-500' },
                            { id: 'Inter', label: 'Intermedio', desc: 'Spike Prime', color: 'border-sky-500' },
                            { id: 'Advanced', label: 'Avanzado', desc: 'EV3 / Python', color: 'border-purple-500' }
                        ].map((nivel) => (
                            <label key={nivel.id} className="cursor-pointer group">
                                <input type="radio" name="nivel" value={nivel.id} className="hidden peer" defaultChecked={nivel.id === 'Basic'} />
                                <div className="p-4 border-2 border-gray-100 rounded-2xl group-hover:border-gray-200 peer-checked:border-sky-500 peer-checked:bg-sky-50 transition-all">
                                    <Cpu className="mb-2 text-gray-400 group-hover:text-sky-500" size={20} />
                                    <p className="font-bold text-gray-800 text-sm">{nivel.label}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase">{nivel.desc}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>

                {/* SECCIÓN 3: CONTACTO Y SEGURIDAD */}
                <section className="mb-10">
                    <h3 className="section-title">
                        <span className="step-number">3</span>
                        Contacto de Emergencia
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="input-label">Correo del Tutor</label>
                            <div className="relative">
                                <input type="email" placeholder="tutor@email.com" className="form-input pl-12" required />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="input-label">Teléfono de contacto</label>
                            <div className="relative">
                                <input type="tel" placeholder="+52 ..." className="form-input pl-12" required />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1">
                            <label className="input-label">Notas Médicas o Alergias</label>
                            <div className="relative">
                                <textarea
                                    placeholder="Información importante de salud..."
                                    className="form-input pl-12 min-h-[100px] pt-3"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOTONES DE ACCIÓN */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        className="flex-1 bg-sky-500 text-white font-bold py-4 rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        Finalizar Inscripción
                    </button>
                    <button
                        type="button"
                        className="px-8 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>

            {/* FOOTER LEGO DECORATIVO */}
            <div className="flex justify-center gap-2 opacity-20">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-gray-300 rounded-full" style={{ boxShadow: 'inset 0 4px 4px rgba(0,0,0,0.1)' }}></div>
                ))}
            </div>
        </div>
    );
};