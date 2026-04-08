import { format } from "date-fns";
import {
  X,
  UserPlus,
  Search,
  CheckCircle,
  Clock,
  CalendarDays,
  Loader2,
} from "lucide-react";
import { useModalProgramarClase } from "./hooks/useModalProgramarClase";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: Date | undefined;
}

export const ModalProgramarClase = ({
  isOpen,
  onClose,
  selectedDay,
}: ModalProps) => {
  const modalData = useModalProgramarClase({
    isOpen,
    onClose,
    selectedDay,
  });

  if (!isOpen || !modalData) return null;

  const {
    handleFormSubmit,
    showDropdown,
    setShowDropdown,
    isGuardando,
    searchTerm,
    setSearchTerm,
    filteredAlumnos,
    alumnoSeleccionado,
    setAlumnoSeleccionado,
    horaSeleccionada,
    setHoraSeleccionada,
  } = modalData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <UserPlus className="text-blue-600" /> Programar Clase
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
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
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              />
            </div>

            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                {filteredAlumnos.length > 0 ? (
                  filteredAlumnos.map((a: any) => (
                    <button
                      key={a.id}
                      type="button"
                      className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between ${
                        alumnoSeleccionado?.id === a.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600"
                      }`}
                      onClick={() => {
                        setAlumnoSeleccionado(a);
                        setSearchTerm(a.nombre);
                        setShowDropdown(false);
                      }}
                    >
                      {a.nombre}
                      {alumnoSeleccionado?.id === a.id && (
                        <CheckCircle size={14} className="text-blue-600" />
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
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Fecha
              </label>
              <div className="relative">
                <CalendarDays
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="text"
                  disabled
                  value={selectedDay ? format(selectedDay, "dd/MM/yyyy") : ""}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-xl text-gray-500 text-sm outline-none"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                Horario
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <select
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-gray-700"
                  value={horaSeleccionada}
                  onChange={(e) => setHoraSeleccionada(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="03:30">03:30 PM</option>
                  <option value="05:00">05:00 PM</option>
                  <option value="06:30">06:30 PM</option>
                </select>
              </div>
            </div>
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
              disabled={isGuardando}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isGuardando ? (
                <Loader2 className="animate-spin" />
              ) : (
                <CheckCircle size={20} />
              )}
              Confirmar Clase
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
