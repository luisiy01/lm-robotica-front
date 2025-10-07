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
