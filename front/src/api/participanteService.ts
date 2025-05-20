import type { CreateParticipanteDto } from "../types/ParticipanteAsamblea";
import { apiClient } from "./api";

const baseUrl = '/participante-asamblea';

export const createParticipante = async (data: CreateParticipanteDto) => {
    try {
      const res = await apiClient.post(`${baseUrl}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message || `Error en registro`);
    }
}

export const getRoles = async () => {
    try {
        const res = await apiClient.get(`/rol-asamblea`);
        return res.data;
    } catch (error: any) {
        throw new Error(error.message || `Error al cargar los roles`);
    }
}