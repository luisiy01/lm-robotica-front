// pages/Pagos/Pagos.tsx
import { DollarSign, Search, Plus, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { usePagosQueries } from './hooks/usePagosQueries';

export const Pagos = () => {
    const { pagosQuery } = usePagosQueries();
    const { data: pagos, isLoading } = pagosQuery;

    return (
        <div className="p-6 lg:p-10 space-y-8 animate-fade-up">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <DollarSign className="text-emerald-500" />
                        Control de Pagos
                    </h2>
                    <p className="text-gray-500 text-sm">Administra colegiaturas e inscripciones.</p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20">
                    <Plus size={20} />
                    Registrar Pago
                </button>
            </div>

            {/* CARDS DE RESUMEN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase">Recaudado Mes</p>
                        <p className="text-2xl font-black text-gray-800">$12,450</p>
                    </div>
                </div>
                {/* ... Agregar más cards según necesites ... */}
            </div>

            {/* TABLA DE PAGOS */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="p-5 text-xs font-bold text-gray-400 uppercase">Ingeniero</th>
                            <th className="p-5 text-xs font-bold text-gray-400 uppercase">Concepto</th>
                            <th className="p-5 text-xs font-bold text-gray-400 uppercase">Monto</th>
                            <th className="p-5 text-xs font-bold text-gray-400 uppercase">Estado</th>
                            <th className="p-5 text-xs font-bold text-gray-400 uppercase text-center">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {pagos?.map((pago: any) => (
                            <tr key={pago.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-5 font-bold text-gray-700">{pago.alumnos?.nombre}</td>
                                <td className="p-5 text-gray-600 text-sm">{pago.concepto}</td>
                                <td className="p-5 font-black text-gray-800">${pago.monto}</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${pago.estado === 'completado' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                        }`}>
                                        {pago.estado}
                                    </span>
                                </td>
                                <td className="p-5 text-center text-gray-400 text-sm">
                                    {new Date(pago.fecha_pago).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};