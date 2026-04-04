// pages/Pagos/Pagos.tsx
import {
  DollarSign,
  Plus,
  Loader2,
  Search,
  TrendingUp,
  CalendarDays,
  Calendar,
} from "lucide-react";
import { usePagosQueries } from "./hooks/usePagosQueries";
import { usePagos } from "./hooks/usePagos"; // Importamos el nuevo hook
import { useState } from "react";
import { ModalNuevoPago } from "./components/ModalNuevoPago/ModalNuevoPago";
import "./Pagos.css";

export const Pagos = () => {
  const { pagosQuery } = usePagosQueries();
  const { data: pagos, isLoading } = pagosQuery;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extraemos la lógica procesada del custom hook
  const { searchTerm, setSearchTerm, filteredPagos, stats } = usePagos(pagos);

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
        <p className="text-gray-500 font-medium">Sincronizando finanzas...</p>
      </div>
    );

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-fade-up">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <DollarSign className="text-emerald-500" /> Control de Pagos
          </h2>
          <p className="text-gray-500 text-sm">
            Administración de ingresos de LM Robótica.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={20} /> Registrar Pago
        </button>
      </div>

      {/* CARDS USANDO STATS DEL HOOK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase">
              Total Recaudado
            </p>
            <p className="text-2xl font-black text-gray-800">
              ${stats.total.toLocaleString()}
            </p>
          </div>
        </div>
        {/* ... otras cards ... */}
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div className="relative w-full md:w-96">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Buscar pago por alumno..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLA USANDO FILTEREDPAGOS */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Fecha de Pagada
              </th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Ingeniero
              </th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Concepto
              </th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Duración
              </th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Monto
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredPagos.map((pago: any) => (
              <tr
                key={pago.id}
                className="hover:bg-emerald-50/10 transition-colors"
              >
                {/* Nueva columna de Fecha */}
                <td className="p-5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(pago.fecha_pago).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </td>

                <td className="p-5 font-bold text-gray-700">
                  {pago.alumnos?.nombre}
                </td>
                <td className="p-5 text-gray-600 text-sm">{pago.concepto}</td>

                <td className="p-5">
                  <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                    <CalendarDays size={14} />
                    {pago.duracion} {pago.duracion === 1 ? "mes" : "meses"}
                  </span>
                </td>

                <td className="p-5 font-black text-gray-800">
                  ${pago.monto.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalNuevoPago
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
