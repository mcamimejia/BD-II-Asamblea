export type AsambleaListRes = {
    IdAsamblea: string;
    Nombre: string;
    Fecha: string;
    HoraInicio: string;
    HoraFin: string;
    Lugar: string;
    AccionesTotal: number;
    AccionesMaximoParticipante: number;
    Tipo: 'PRESENCIAL' | 'VIRTUAL';
    isParticipante: boolean;
}