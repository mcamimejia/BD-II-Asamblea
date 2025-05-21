import type { CreateMocionDto } from "../types/CreateMocionDto";
import { apiClient } from "./api";

const baseUrl = '/mocion';

export const createMocion = async (data: CreateMocionDto) => {
    try {
      const res = await apiClient.post(`${baseUrl}`, data);
      return res.data;
    } catch (error: any) {
      const backendMsg = error.response?.data?.message;
      throw new Error(backendMsg || error.message || `Error al crear moción`); 
    }
}