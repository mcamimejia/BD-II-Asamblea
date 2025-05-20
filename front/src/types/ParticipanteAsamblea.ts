export type ParticipanteAsamblea = {
    IdParticipante: string;
    AccionesRepresentadas: number;
    Rol: RolAsamblea;
}

export type CreateParticipanteDto = {
  AccionesRepresentadas?: number;
  IdAsamblea: string;
  IdRol: string;
}

export type RolAsamblea = {
  IdRol: string;
  Rol: string;
  Crear: boolean;
  Modificar: boolean;
  Eliminar: boolean;
  Votar: boolean;
  Descargar: boolean;
}