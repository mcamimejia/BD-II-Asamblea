export type ParticipanteAsamblea = {
    IdParticipante: string;
    AccionesRepresentadas: number;
    Rol: {IdRol: string; Rol: string, Crear: boolean, Modificar: boolean, Eliminar: boolean, Votar: boolean, Descargar: boolean};
}