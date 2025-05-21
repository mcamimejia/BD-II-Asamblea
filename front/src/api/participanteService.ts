import type { CreateParticipanteDto } from "../types/ParticipanteAsamblea";
import { apiClient } from "./api";

const baseUrl = '/participante-asamblea';

export const createParticipante = async (data: CreateParticipanteDto) => {
    try {
      const res = await apiClient.post(`${baseUrl}`, data);
      return res.data;
    } catch (error: any) {
      const backendMsg = error.response?.data?.message;
      throw new Error(backendMsg || error.message || `Error al registrar el participante`); 
    }
}

export const getRoles = async () => {
    try {
        const res = await apiClient.get(`/rol-asamblea`);
        return res.data;
    } catch (error: any) {
      const backendMsg = error.response?.data?.message;
      throw new Error(backendMsg || error.message || `Error al obtener los roles`); 
    }
}