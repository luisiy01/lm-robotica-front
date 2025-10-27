import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllAsistencias = async (params?: any): Promise<any> => {
  try {
    const response = await axios.get(`${apiUrl}/asistencia/find`, {
      params,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const actualizarAsistencia = async (
  id: string,
  postData: any
): Promise<any> => {
  try {
    const response = await axios.patch(`${apiUrl}/asistencia/${id}`, postData);
    return response;
  } catch (error) {
    console.error(error);
  }
};
