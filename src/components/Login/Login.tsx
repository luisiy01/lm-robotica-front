import { Mail, Lock, Zap, Puzzle, AlertCircle, Loader2 } from 'lucide-react';
import legoLogo from "@assets/images/lego_logo.png";
import logoLM from "@assets/images/logo_lm_robotica.jpg";
import './Login.css';
import { useLogin } from './hooks/useLogin';

export const Login = () => {
    const { formik, isValid, isLoading } = useLogin();

    return (
        <div className="bg-lego-pattern h-screen w-full flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* PIEZAS DE FONDO */}
            <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-48 sm:h-48 opacity-30 blur-md rotate-12 pointer-events-none lg:opacity-40 lg:blur-sm z-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Lego_Color_Bricks.jpg" alt="Ladrillos" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-64 sm:h-64 opacity-30 blur-md -rotate-12 pointer-events-none lg:opacity-40 lg:blur-sm z-0">
                <img src={legoLogo} alt="LEGO Logo" className="w-full h-full object-contain" />
            </div>

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

                    <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
                        {/* Campo Email */}
                        <div className="space-y-1">
                            <label className="text-xs sm:text-sm font-medium text-gray-700">Correo Electrónico</label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none ${formik.touched.email && formik.errors.email ? 'text-red-400' : 'text-gray-400'}`}>
                                    <Mail size={18} />
                                </div>
                                <input
                                    {...formik.getFieldProps('email')}
                                    type="email"
                                    className={`input-lm ${formik.touched.email && formik.errors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                                    placeholder="tu.correo@robotica.com"
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1 mt-1 font-medium italic">
                                    <AlertCircle size={12} /> {formik.errors.email}
                                </p>
                            )}
                        </div>

                        {/* Campo Contraseña */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-medium text-gray-700">Contraseña</label>
                                <button type="button" className="text-[10px] sm:text-xs font-medium text-[#0284C7] hover:underline">¿Olvidaste?</button>
                            </div>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none ${formik.touched.password && formik.errors.password ? 'text-red-400' : 'text-gray-400'}`}>
                                    <Lock size={18} />
                                </div>
                                <input
                                    {...formik.getFieldProps('password')}
                                    type="password"
                                    className={`input-lm ${formik.touched.password && formik.errors.password ? 'border-red-500 focus:ring-red-200' : ''}`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-[10px] sm:text-xs flex items-center gap-1 mt-1 font-medium italic">
                                    <AlertCircle size={12} /> {formik.errors.password}
                                </p>
                            )}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 
                                    ${!isValid || isLoading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-lm-primary text-white active:scale-[0.98]'}`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        AUTENTICANDO...
                                    </>
                                ) : (
                                    <>
                                        CONECTAR
                                        <Zap size={18} fill="currentColor" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* FOOTER RRSS */}
                    <div className="text-center mt-8">
                        <a href="https://www.instagram.com/lm_robotica/" target="_blank" rel="noreferrer" className="text-[10px] sm:text-xs text-gray-400 hover:text-[#0EA5E9] transition-colors font-medium">
                            @lm_robotica
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};