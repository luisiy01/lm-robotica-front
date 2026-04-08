// pages/Pagos/Pagos.tsx
import {
  DollarSign,
  Plus,
  Loader2,
  TrendingUp,
  CalendarDays,
  Calendar,
  FileText,
  TableIcon,
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
  const {
    dateRange,
    setDateRange,
    filteredPagos,
    stats,
    exportToExcel,
    exportToPDF,
  } = usePagos(pagos);

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
        <p className="text-gray-500 font-medium">Sincronizando finanzas...</p>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
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

      {/* BOTONES DE DESCARGA */}
      <div className="flex gap-2">
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors"
        >
          <FileText size={16} /> PDF
        </button>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs hover:bg-emerald-100 transition-colors"
        >
          <TableIcon size={16} /> Excel
        </button>
      </div>

      {/* CARDS USANDO STATS DEL HOOK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* BARRA DE BÚSQUEDA */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm ">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            Busqueda por fecha
          </h3>
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Fecha Inicio
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"
                  size={16}
                />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-600"
                  value={dateRange.inicio}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, inicio: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">
                Fecha Fin
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500"
                  size={16}
                />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-gray-600"
                  value={dateRange.fin}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, fin: e.target.value })
                  }
                />
              </div>
            </div>
            {(dateRange.inicio || dateRange.fin) && (
              <button
                onClick={() => setDateRange({ inicio: "", fin: "" })}
                className="mb-1 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLA USANDO FILTEREDPAGOS */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Fecha de Pago
              </th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Alumno
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
              <th className="p-5 text-xs font-bold text-gray-400 uppercase">
                Proximo Pago
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
                <td className="p-5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(
                      new Date(pago.fecha_pago).setMonth(
                        new Date(pago.fecha_pago).getMonth() + pago.duracion,
                      ),
                    ).toLocaleDateString("es-MX", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
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
