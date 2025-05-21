import { apiClient } from "./api";

const baseUrl = '/asamblea';

export const asambleaList = async () => {
  try {
    const res = await apiClient.get(`${baseUrl}`);
    return res.data;
  } catch (error: any) {
    const backendMsg = error.response?.data?.message;
    throw new Error(backendMsg || error.message || `Error en obtener la lista de asambleas`); 
  }
}

export const asambleaDetails = async (idAsamblea: string) => {
  try {
    const res = await apiClient.get(`${baseUrl}/${idAsamblea}`);
    return res.data;
  } catch (error: any) {
    const backendMsg = error.response?.data?.message;
    throw new Error(backendMsg || error.message || `Error en obetener los detalles de la asamblea`); 
  }
}