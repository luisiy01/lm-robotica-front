import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getAllPagos = async (params?: any): Promise<any> => {
  try {
    const response = await axios.get(`${apiUrl}/pagos/find`, {
      params,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const pagarAlumno = async (id: string, postData: any): Promise<any> => {
  try {
    const response = await axios.patch(`${apiUrl}/pagos/${id}`, postData);
    return response;
  } catch (error) {
    console.error(error);
  }
};
