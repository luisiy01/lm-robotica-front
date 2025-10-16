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
