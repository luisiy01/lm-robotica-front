import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, Users, UserPlus, User, Trash2 } from "lucide-react";
import "react-day-picker/dist/style.css";
import { useAsistencias } from "./hooks/useAsistencias";
import { ModalProgramarClase } from "./components/ModalProgramarClase";
import { toast } from "sonner";

export function Asistencias() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { useAsistenciasDelDia, eliminarAsistencia } = useAsistencias();

  const { data: asistencias = [], isLoading } =
    useAsistenciasDelDia(selectedDay);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 relative">
      {/* Encabezado con Botón de Acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
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
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm active:scale-95"
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
          <div className="p-5 bg-gray-50 flex justify-between items-center">
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
                    Horario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      Cargando información...
                    </td>
                  </tr>
                ) : asistencias.length > 0 ? (
                  asistencias.map((asistencia: any) => (
                    <tr
                      key={asistencia.id}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <User size={16} />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {asistencia.alumnos?.nombre}{" "}
                            {asistencia.alumnos?.apellido}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600 font-mono">
                        {asistencia.hora}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => {
                            toast.error("¿Eliminar clase?", {
                              description: `Se borrará la programación para ${asistencia.alumnos?.nombre}`,
                              action: {
                                label: "Eliminar",
                                onClick: () => {
                                  eliminarAsistencia(asistencia.id);
                                },
                              },
                              cancel: {
                                label: "Cancelar",
                                onClick: () =>
                                  console.log("Eliminación cancelada"),
                              },
                              duration: 10000,
                            });
                          }}
                          className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                          title="Eliminar Alumno"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-12 text-center text-gray-400 italic"
                    >
                      No hay alumnos programados para este día.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalProgramarClase
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDay={selectedDay}
      />
    </div>
  );
}
