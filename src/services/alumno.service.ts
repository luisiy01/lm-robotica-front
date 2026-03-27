import api from "./api";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAlumnos = async (): Promise<any> => {
  try {
    const response = await api.get(`${apiUrl}/alumnos`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAlumnoById = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`${apiUrl}/alumnos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el alumno con ID: ${id}`, error);
    throw error;
  }
};

export const addAlumno = async (postData: any): Promise<any> => {
  try {
    const response = await api.post(`${apiUrl}/alumnos`, postData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateAlumno = async (id: string, postData: any): Promise<any> => {
  try {
    const response = await api.patch(`${apiUrl}/alumnos/${id}`, postData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAlumno = async (id: string): Promise<any> => {
  try {
    const response = await api.delete(`${apiUrl}/alumnos/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
