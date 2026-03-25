import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAlumnos = async (): Promise<any> => {
  try {
    const response = await axios.get(`${apiUrl}/alumno`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const addAlumno = async (postData: any): Promise<any> => {
  try {
    const response = await axios.post(`${apiUrl}/alumno`, postData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateAlumno = async (id: string, postData: any): Promise<any> => {
  try {
    const response = await axios.patch(`${apiUrl}/alumno/${id}`, postData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAlumno = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(`${apiUrl}/alumno/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
