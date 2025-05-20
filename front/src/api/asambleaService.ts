import { apiClient } from "./api";

const baseUrl = '/asamblea';

export const asambleaList = async () => {
    try {
      const res = await apiClient.get(`${baseUrl}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message || `Error al obtener asambleas`);
    }
}