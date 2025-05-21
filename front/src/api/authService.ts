import type { LoginDto } from "../types/LoginDto";
import { apiClient } from "./api";

export const postLogin = async (data: LoginDto) => {
    try {
      const res = await apiClient.post('/auth/login', data);
      return res.data;
    } catch (error: any) {
      const backendMsg = error.response?.data?.message;
      throw new Error(backendMsg || error.message || `Error en login`); 
    }
}

