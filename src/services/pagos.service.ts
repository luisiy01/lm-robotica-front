import api from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Obtiene el historial completo de pagos con los nombres de los alumnos
 */
export const getPagos = async (): Promise<any> => {
  try {
    const response = await api.get(`${apiUrl}/pagos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el historial de pagos:", error);
    throw error;
  }
};

/**
 * Registra un nuevo movimiento (Mensualidad, Inscripción, etc.)
 */
export const addPago = async (pagoData: any): Promise<any> => {
  try {
    const response = await api.post(`${apiUrl}/pagos`, pagoData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el pago:", error);
    throw error;
  }
};

/**
 * Elimina un registro de pago por ID
 */
export const deletePago = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`${apiUrl}/pagos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el pago ${id}:`, error);
    throw error;
  }
};