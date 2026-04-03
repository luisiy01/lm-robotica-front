import { useState } from "react";
import {
  X,
  DollarSign,
  User,
  Loader2,
  CheckCircle,
  CalendarDays,
  Search,
} from "lucide-react";
import { useNuevoPago } from "../../hooks/useNuevoPago";

export const ModalNuevoPago = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { formik, alumnos, isRegistrando, searchTerm, setSearchTerm } =
    useNuevoPago(onClose);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-emerald-50/50">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <DollarSign className="text-emerald-500" /> Registrar Ingreso
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">
          {/* Selector de Alumno */}
          <div className="space-y-1 relative">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Ingeniero
            </label>
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <input
                type="text"
                placeholder="Buscar ingeniero..."
                value={searchTerm}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
              />
            </div>

            {/* Dropdown de resultados */}
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                {alumnos.length > 0 ? (
                  alumnos.map((a: any) => (
                    <button
                      key={a.id}
                      type="button"
                      className={`w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors flex items-center justify-between ${
                        formik.values.alumno_id === a.id
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-600"
                      }`}
                      onClick={() => {
                        formik.setFieldValue("alumno_id", a.id);
                        setSearchTerm(a.nombre);
                        setShowDropdown(false);
                      }}
                    >
                      {a.nombre}
                      {formik.values.alumno_id === a.id && (
                        <CheckCircle size={14} />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-400">
                    No se encontraron resultados
                  </div>
                )}
              </div>
            )}
            {/* Input oculto para validación de Formik si es necesario */}
            <input type="hidden" {...formik.getFieldProps("alumno_id")} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Duración del Pago
            </label>
            <div className="relative">
              <CalendarDays
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={18}
              />
              <select
                {...formik.getFieldProps("duracion")}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none text-gray-700"
              >
                <option value="1">1 Mes</option>
                <option value="3">3 Meses</option>
                <option value="6">6 Meses</option>
              </select>
            </div>
          </div>

          {/* Monto y Método */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Monto ($)
              </label>
              <input
                {...formik.getFieldProps("monto")}
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Método
              </label>
              <select
                {...formik.getFieldProps("metodo_pago")}
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">
              Concepto
            </label>
            <input
              {...formik.getFieldProps("concepto")}
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
              {isRegistrando ? (
                <Loader2 className="animate-spin" />
              ) : (
                <CheckCircle size={20} />
              )}
              Confirmar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
