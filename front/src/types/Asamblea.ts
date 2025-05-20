export type Asamblea = {
    IdAsamblea: string;
    Nombre: string;
    Fecha: string;
    HoraInicio: string;
    HoraFin: string;
    Lugar: string;
    AccionesTotal: number;
    AccionesMaximoParticipante: number;
    Tipo: 'PRESENCIAL' | 'VIRTUAL';
}