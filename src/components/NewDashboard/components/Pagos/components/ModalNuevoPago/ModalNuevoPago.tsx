// pages/Pagos/components/ModalNuevoPago.tsx
import { X, DollarSign, User, FileText, Loader2, CheckCircle } from 'lucide-react';
import { useNuevoPago } from '../../hooks/useNuevoPago';

export const ModalNuevoPago = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { formik, alumnos, isLoadingAlumnos, isRegistrando } = useNuevoPago(onClose);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-50/50">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <DollarSign className="text-emerald-500" /> Registrar Ingreso
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
                    {/* Selector de Alumno */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Ingeniero</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                            <select
                                {...formik.getFieldProps('alumno_id')}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none text-gray-700"
                            >
                                <option value="">Seleccionar alumno...</option>
                                {alumnos.map((a: any) => (
                                    <option key={a.id} value={a.id}>{a.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Monto y Concepto */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Monto ($)</label>
                            <input
                                {...formik.getFieldProps('monto')}
                                type="number"
                                placeholder="0.00"
                                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Método</label>
                            <select {...formik.getFieldProps('metodo_pago')} className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option value="efectivo">Efectivo</option>
                                <option value="transferencia">Transferencia</option>
                                <option value="tarjeta">Tarjeta</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Concepto</label>
                        <input
                            {...formik.getFieldProps('concepto')}
                            type="text"
                            placeholder="Ej. Mensualidad Abril"
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-2xl transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isRegistrando || !formik.isValid}
                            className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                        >
                            {isRegistrando ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                            Confirmar Pago
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};