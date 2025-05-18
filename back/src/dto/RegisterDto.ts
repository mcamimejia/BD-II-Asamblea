export class RegisterDto {
  Correo: string;
  Password: string;
  PrimerNombre: string;
  SegundoNombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  EsEmpresa: boolean;
  Perfil: PefilUsuario;
  DireccionUno: string;
  DireccionDos: string;
  Complemento: string;
  CodigoPostal: string;
  Barrio: string;
  Ciudad: string;
  Pais: string;
  NumDocumento: number;
  TipoDocumento: string;
  FechaExpedicion: Date;
  ImgFrontal: string;
  ImgReverso: string;
  ImgCompleto: string;
  Estado: EstadoDocumento
}

export enum PefilUsuario {
    EMPLEADO,
    EXTERNO
}

export enum EstadoDocumento {
    VALIDO,
    NO_VALIDO,
    ANULADO,
    SIN_VERIFICAR
}