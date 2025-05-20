export type RegisterDto = {
  Correo: string;
  Password: string;
  PrimerNombre: string;
  SegundoNombre: string;
  PrimerApellido: string;
  SegundoApellido: string;
  EsEmpresa?: boolean;
  Perfil: PefilUsuario;
  DireccionUno: string;
  DireccionDos: string;
  Complemento: string;
  CodigoPostal: string;
  Barrio: string;
  Ciudad: string;
  Pais: string;
  NumDocumento: number | null;
  TipoDocumento: string;
  FechaExpedicion: Date | string | null;
  ImgFrontal?: string;
  ImgReverso?: string;
  ImgCompleto?: string;
  Estado?: EstadoDocumento
}

export type PefilUsuario = '' | "EMPLEADO" | "EXTERNO";

export type EstadoDocumento = "VALIDO" | "NO_VALIDO" | "ANULADO" | "SIN_VERIFICAR";