const apiUrl = import.meta.env.VITE_API_URL;
import api from "./api"; // Asumiendo que esta es tu configuración base de axios

export const asistenciasService = {
  /**
   * Registra una nueva programación de clase para un alumno
   * @param alumnoId UUID del alumno
   * @param fecha Formato YYYY-MM-DD
   * @param hora Formato HH:mm
   */
  registrarAsistencia: async (
    alumnoId: string,
    fecha: string,
    hora: string,
  ) => {
    try {
      const response = await api.post(`${apiUrl}/asistencias/programar`, {
        alumno_id: alumnoId,
        fecha: fecha,
        hora: hora,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Error al programar la clase";
    }
  },

  /**
   * Obtiene la lista de alumnos programados para una fecha específica
   */
  obtenerAsistenciasPorFecha: async (fecha: string) => {
    try {
      const response = await api.get(`${apiUrl}/asistencias?fecha=${fecha}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Error al obtener las asistencias";
    }
  },
};
