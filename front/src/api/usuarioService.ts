import type { RegisterDto } from "../types/RegisterDto";
import { apiClient } from "./api";

const baseUrl = '/usuario';

export const register = async (data: RegisterDto) => {
  try {
    const res = await apiClient.post(`${baseUrl}/register`, data);
    return res.data;
  } catch (error: any) {
    const backendMsg = error.response?.data?.message;
    throw new Error(backendMsg || error.message || `Error al registrar el usuario`);
  }
}