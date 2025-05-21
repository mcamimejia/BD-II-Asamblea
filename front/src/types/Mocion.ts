export type Mocion = {
    IdMocion: string;
    Pregunta: string;
    Descripcion?: string;
    TipoMocion: string;
    HoraInicio: Date;
    HoraFin: Date;
    Resultados: ResultadosMocion[];
    Opciones: Opciones;
}

export type ResultadosMocion = {
    IdResultadoMocion: string;
    Estado: string;
    CantidadVotosTotal: number;
    RequiereSecundar: boolean;
}

export type Opciones = {
    IdOpciones: string;
    Opcion1: string;
    Opcion2: string;
    Opcion3?: string;
    Opcion4?: string;
    Opcion5?: string;
    Opcion6?: string;
    Opcion7?: string;
    Opcion8?: string;
    Opcion9?: string;
    Opcion10?: string;
}