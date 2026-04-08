import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Para que el calendario esté en español
import { CalendarDays, Users, Clock, GraduationCap } from "lucide-react"; // Asumiendo que usas lucide-react como en las otras pantallas
import "react-day-picker/dist/style.css";

export function Asistencias() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDay) {
      const fechaFormateada = format(selectedDay, "yyyy-MM-dd");
      fetchAlumnosPorDia(fechaFormateada);
    }
  }, [selectedDay]);

  const fetchAlumnosPorDia = async (fecha: string) => {
    setLoading(true);
    // Simulación de carga o tu llamada a NestJS/Supabase aquí
    // const { data } = await supabase.from('asistencias')...
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Encabezado de la Pantalla */}
      <div className="flex items-center gap-3 border-b pb-4">
        <CalendarDays className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Control de Asistencias
          </h1>
          <p className="text-sm text-gray-500">
            Gestiona y visualiza los alumnos por fecha de clase
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lado Izquierdo: Calendario con estilo de tarjeta */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl shadow-md border border-gray-100 flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDay}
            onSelect={setSelectedDay}
            locale={es}
            className="m-0"
            modifiersStyles={{
              selected: {
                backgroundColor: "#2563eb",
                color: "white",
                borderRadius: "8px",
              },
            }}
          />
        </div>

        {/* Lado Derecho: Listado de Alumnos */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              Alumnos para el{" "}
              {selectedDay ? format(selectedDay, "PPP", { locale: es }) : "..."}
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {alumnos.length} Programados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alumno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      Cargando alumnos...
                    </td>
                  </tr>
                ) : alumnos.length > 0 ? (
                  alumnos.map((alumno: any) => (
                    <tr
                      key={alumno.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {alumno.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                          {alumno.curso}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-gray-400" />
                          {alumno.hora}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md">
                          Ver Perfil
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-gray-500 italic"
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
    </div>
  );
}
