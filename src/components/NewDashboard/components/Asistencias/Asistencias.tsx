import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarDays,
  Users,
  Clock,
  UserPlus,
  X,
  Search,
  CheckCircle,
} from "lucide-react";
import "react-day-picker/dist/style.css";

export function Asistencias() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [alumnos, _setAlumnos] = useState([]);
  const [_loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  // Estados para el buscador del modal
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<any>(null);

  // Simulación de base de datos de alumnos para el buscador
  // En producción, esto vendría de tu hook de Supabase/NestJS
  const [listaBusqueda, setListaBusqueda] = useState([
    { id: 1, nombre: "Luis García" },
    { id: 2, nombre: "Ana Martínez" },
    { id: 3, nombre: "Roberto Solís" },
  ]);

  const filteredAlumnos = listaBusqueda.filter((a) =>
    a.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (selectedDay) {
      const fechaFormateada = format(selectedDay, "yyyy-MM-dd");
      fetchAlumnosPorDia(fechaFormateada);
    }
  }, [selectedDay]);

  const fetchAlumnosPorDia = async (_fecha: string) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-up">
            {/* Header del Modal - Usando el estilo de ModalNuevoPago */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <UserPlus className="text-blue-600" /> Programar Clase
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSearchTerm("");
                  setShowDropdown(false);
                }}
                className="p-2 hover:bg-white rounded-full transition-colors text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            <form className="p-6 space-y-5">
              {/* Selector de Alumno - Lógica idéntica a ModalNuevoPago */}
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

                {/* Dropdown de resultados */}
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

              {/* Fecha y Hora - Dropdown de Horas Fijas */}
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
                      value={
                        selectedDay ? format(selectedDay, "dd/MM/yyyy") : ""
                      }
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
                    <select className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none text-gray-700">
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

              {/* Botones de Acción */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSearchTerm("");
                  }}
                  className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-2xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Confirmar Clase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
