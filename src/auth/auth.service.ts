import api from "../services/api";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await api.post(`/auth/login`, credentials);
    return data; // Retorna { access_token, user: { id, nombre, rol } }
  } catch (error) {
    // Es CRUCIAL relanzar el error para que React Query lo detecte
    throw error;
  }
};
