import type { RegisterDto } from "../types/RegisterDto";
import { apiClient } from "./api";

const baseUrl = '/usuario';

export const register = async (data: RegisterDto) => {
    try {
      const res = await apiClient.post(`${baseUrl}/register`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message || `Error en registro`);
    }
}