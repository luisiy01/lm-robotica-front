import { useState } from 'react';
import { Mail, Lock, Zap, Puzzle } from 'lucide-react';
import legoLogo from "../../assets/images/lego_logo.png";
import logoLM from "../../assets/images/logo_lm_robotica.jpg";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Datos enviados:', { email, password });
        // Aquí iría tu lógica de autenticación
    };

    return (
        <div className="bg-lego-pattern min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-x-hidden font-sans">

            {/* Estilos inline para el patrón de LEGO (puedes moverlo a tu index.css) */}
            <style>{`
        .bg-lego-pattern {
          background-color: #f9fafb;
          background-image: radial-gradient(#e5e7eb 2px, transparent 2px);
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
        }
      `}</style>

            {/* PIEZAS DE FONDO */}
            <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-48 sm:h-48 opacity-30 blur-md rotate-12 pointer-events-none lg:opacity-40 lg:blur-sm transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Lego_Color_Bricks.jpg" alt="Ladrillos" className="w-full h-full object-contain" />
            </div>

            <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-64 sm:h-64 opacity-30 blur-md -rotate-12 pointer-events-none lg:opacity-40 lg:blur-sm transition-all duration-500">
                <img src={legoLogo} alt="LEGO Logo" className="w-full h-full object-contain" />
            </div>

            {/* CARD PRINCIPAL */}
            <div className="w-full max-w-[90%] sm:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-gray-300/50 relative z-10 overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-500">

                {/* Línea superior LEGO Yellow */}
                <div className="h-2 w-full bg-[#F4D03F]"></div>

                <div className="p-6 sm:p-8 md:p-10">
                    <div className="text-center mb-6 sm:mb-10">
                        <img
                            src={logoLM}
                            alt="LM Robótica Logo"
                            className="h-12 sm:h-16 mx-auto mb-4 object-contain"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                            <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-[#0EA5E9]" />
                            Portal de Acceso
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Donde la robótica toma forma, pieza a pieza.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {/* Campo Email */}
                        <div className="space-y-1.5">
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
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-all"
                                    placeholder="tu.correo@robotica.com"
                                />
                            </div>
                        </div>

                        {/* Campo Password */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-medium text-gray-700">Contraseña</label>
                                <button type="button" className="text-[10px] sm:text-xs font-medium text-[#0284C7] hover:underline">¿La olvidaste?</button>
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
                                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-[#0EA5E9] transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Botón */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-[#0EA5E9] text-white text-sm sm:text-base font-semibold py-3 sm:py-3.5 px-4 rounded-xl hover:bg-[#0284C7] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                            >
                                CONECTAR
                                <Zap size={18} fill="currentColor" />
                            </button>
                        </div>
                    </form>

                    {/* Separador */}
                    <div className="relative my-6 sm:my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
                            <span className="bg-white px-4">Workspace</span>
                        </div>
                    </div>

                    {/* RRSS */}
                    <div className="text-center">
                        <a
                            href="https://www.instagram.com/lm_robotica/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] sm:text-xs text-gray-400 hover:text-[#0EA5E9] transition-colors font-medium"
                        >
                            @lm_robotica
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};