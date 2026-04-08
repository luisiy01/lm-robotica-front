import { useState, useEffect } from "react";
import { format } from "date-fns";
import { asistenciasService } from "../../../../../services/asistencia.service";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useAsistencias = (onSuccess?: () => void) => {
  const [alumnos, setAlumnos] = useState<any[]>([]); // Alumnos programados del día
  const [listaBusqueda, setListaBusqueda] = useState<any[]>([]); // Alumnos para el buscador
  const [loading, setLoading] = useState(false);
  const [isGuardando, setIsGuardando] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState<any>(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  const queryClient = useQueryClient();

  const useAsistenciasDelDia = (fecha: Date | undefined) => {
    const fechaFormateada = fecha ? format(fecha, "yyyy-MM-dd") : "";
    return useQuery({
      queryKey: ["asistencias", fechaFormateada],
      queryFn: () =>
        asistenciasService.obtenerAsistenciasPorFecha(fechaFormateada),
      enabled: !!fecha, // Solo se ejecuta si hay una fecha seleccionada
    });
  };

  // 1. Cargar lista de alumnos para el buscador (Ingenieros)
  useEffect(() => {
    const fetchListaAlumnos = async () => {
      try {
        // Sustituir por tu llamada real a Supabase/API
        // const { data } = await api.get('/alumnos');
        // setListaBusqueda(data);

        // Simulación inicial
        setListaBusqueda([
          { id: 1, nombre: "Luis García" },
          { id: 2, nombre: "Ana Martínez" },
          { id: 3, nombre: "Roberto Solís" },
        ]);
      } catch (error) {
        console.error("Error cargando lista de alumnos:", error);
      }
    };
    fetchListaAlumnos();
  }, []);

  // 2. Filtrar alumnos para el buscador
  const filteredAlumnos = listaBusqueda.filter((a) =>
    a.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 3. Obtener alumnos programados por día
  const fetchAlumnosPorDia = async (fecha: Date | undefined) => {
    if (!fecha) return;
    setLoading(true);
    try {
      const fechaFormateada = format(fecha, "yyyy-MM-dd");
      // Llamada a tu endpoint de NestJS
      // const { data } = await api.get(`/asistencias?fecha=${fechaFormateada}`);
      // setAlumnos(data);
      console.log("Consultando alumnos para:", fechaFormateada);
    } catch (error) {
      console.error("Error al obtener asistencias:", error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Guardar nueva programación
  const guardarHorario = async (fecha: Date | undefined) => {
    if (!alumnoSeleccionado || !fecha || !horaSeleccionada) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setIsGuardando(true);

    const fechaFormateada = format(fecha, "yyyy-MM-dd");

    try {
      await asistenciasService.registrarAsistencia(
        alumnoSeleccionado.id,
        fechaFormateada,
        horaSeleccionada,
      );

      toast.success("¡Clase programada!");

      // Limpiar estados locales
      setSearchTerm("");
      setAlumnoSeleccionado(null);
      setHoraSeleccionada("");

      if (onSuccess) onSuccess();
      fetchAlumnosPorDia(fecha); // Recargar la tabla
    } catch (error) {
      toast.error("No se pudo registrar la clase");
    } finally {
      setIsGuardando(false);
    }
  };

  return {
    alumnos,
    loading,
    isGuardando,
    searchTerm,
    setSearchTerm,
    filteredAlumnos,
    alumnoSeleccionado,
    setAlumnoSeleccionado,
    horaSeleccionada,
    setHoraSeleccionada,
    fetchAlumnosPorDia,
    guardarHorario,
    useAsistenciasDelDia,
  };
};
