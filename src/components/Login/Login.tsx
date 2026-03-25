import { useState } from 'react';
import { Mail, Lock, Zap, Puzzle } from 'lucide-react';
import legoLogo from "../../assets/images/lego_logo.png";
import logoLM from "../../assets/images/logo_lm_robotica.jpg";
import './Login.css';
import { useNavigate } from 'react-router';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Datos enviados:', { email, password });
    };

    return (
        /* Cambiado a h-screen y overflow-hidden para asegurar que no haya doble scroll */
        <div className="bg-lego-pattern h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans">

            {/* PIEZAS DE FONDO - Con z-0 para no interferir */}
            <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-48 sm:h-48 opacity-30 blur-md rotate-12 pointer-events-none lg:opacity-40 lg:blur-sm z-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Lego_Color_Bricks.jpg" alt="Ladrillos" className="w-full h-full object-contain" />
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-64 sm:h-64 opacity-30 blur-md -rotate-12 pointer-events-none lg:opacity-40 lg:blur-sm z-0">
                <img src={legoLogo} alt="LEGO Logo" className="w-full h-full object-contain" />
            </div>

            {/* CARD PRINCIPAL - z-10 para estar sobre las piezas */}
            <div className="w-full max-w-[95%] sm:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-300/50 relative z-10 overflow-hidden border border-gray-100 animate-login-card">

                <div className="h-2 w-full bg-[#F4D03F]"></div>

                <div className="p-6 sm:p-8 md:p-10">
                    <div className="text-center mb-6 sm:mb-8">
                        <img src={logoLM} alt="LM Robótica Logo" className="h-12 sm:h-16 mx-auto mb-4 object-contain" />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-[#0EA5E9]" />
                            Portal de Acceso
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs sm:text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="input-lm"
                                    placeholder="tu.correo@robotica.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-medium text-gray-700">Contraseña</label>
                                <button type="button" className="text-[10px] sm:text-xs font-medium text-[#0284C7] hover:underline">¿Olvidaste?</button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input-lm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full btn-lm-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                onClick={() => navigate('/dashboard')}
                            >
                                CONECTAR
                                <Zap size={18} fill="currentColor" />
                            </button>
                        </div>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                            <span className="bg-white px-4">Workspace</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <a href="https://www.instagram.com/lm_robotica/" target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs text-gray-400 hover:text-[#0EA5E9] transition-colors font-medium">
                            @lm_robotica
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};