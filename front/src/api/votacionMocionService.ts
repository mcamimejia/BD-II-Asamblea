import type { CreateVotacionDto } from "../types/CreateVotacionDto";
import { apiClient } from "./api";

const baseUrl = '/votacion-mocion';

export const createVotacion = async (data: CreateVotacionDto) => {
    try {
      const res = await apiClient.post(`${baseUrl}`, data);
      return res.data;
    } catch (error: any) {
      const backendMsg = error.response?.data?.message;
      throw new Error(backendMsg || error.message || `Error al registrar el participante`); 
    }
}