import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarDays,
  Users,
  Clock,
  GraduationCap,
  UserPlus,
  X,
} from "lucide-react";
import "react-day-picker/dist/style.css";

export function Asistencias() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  useEffect(() => {
    if (selectedDay) {
      const fechaFormateada = format(selectedDay, "yyyy-MM-dd");
      fetchAlumnosPorDia(fechaFormateada);
    }
  }, [selectedDay]);

  const fetchAlumnosPorDia = async (fecha: string) => {
    setLoading(true);
    // Aquí iría tu fetch a NestJS
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {/* Encabezado con Botón de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Control de Asistencias
            </h1>
            <p className="text-sm text-gray-500">
              Visualiza y programa clases para los alumnos
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Registrar Alumno a Clase
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lado Izquierdo: Calendario */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            locale={es}
          />
        </div>

        {/* Lado Derecho: Tabla */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              Alumnos para el{" "}
              {selectedDay ? format(selectedDay, "PPP", { locale: es }) : "..."}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Alumno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Horario
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* ... Mismo mapeo de alumnos que antes ... */}
                {alumnos.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-12 text-center text-gray-400 italic"
                    >
                      No hay alumnos programados. Haz clic en "Registrar" para
                      añadir uno.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL PARA REGISTRAR ALUMNO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                Nueva Inscripción
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha Seleccionada
                </label>
                <input
                  type="text"
                  disabled
                  value={
                    selectedDay
                      ? format(selectedDay, "PPP", { locale: es })
                      : ""
                  }
                  className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seleccionar Alumno
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Selecciona un alumno...</option>
                  {/* Aquí mapearías los alumnos existentes en tu DB */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de Clase
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md"
                >
                  Guardar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
