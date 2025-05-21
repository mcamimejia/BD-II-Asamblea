import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/dto/RegisterDto';
import { Usuario } from 'src/entities/Usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generarId } from 'src/utils/generateIds';
import { Direccion } from 'src/entities/Direccion.entity';
import { Documento } from 'src/entities/Documento.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  async register(registerDto: RegisterDto) {
    if (!registerDto.Correo || !registerDto.Password || !registerDto.PrimerNombre  || !registerDto.Perfil
      || !registerDto.NumDocumento || !registerDto.TipoDocumento || !registerDto.FechaExpedicion
      || !registerDto.DireccionUno || !registerDto.Barrio || !registerDto.Ciudad || !registerDto.Pais) {
      throw new BadRequestException('Faltan datos requeridos');
    }

    const existingUser = await this.findByEmail(registerDto.Correo);
  if (existingUser) {
    throw new BadRequestException('El correo ya está registrado');
  }

    const existingDocumento = await this.findByNumDocumento(registerDto.NumDocumento);
  if (existingDocumento) {
    throw new BadRequestException('El número de documento ya está registrado');
  }

  
    const { Password, ...rest } = registerDto;
    const HashPassword = await bcrypt.hash(Password, 10);
    
    const idUsuario = generarId('USR');
    const idDireccion = generarId('DIR');
    const idDocumento = generarId('DOC');

    const direccion = new Direccion();
    direccion.IdDireccion = idDireccion;
    direccion.DireccionUno = rest.DireccionUno;
    direccion.DireccionDos = rest.DireccionDos;
    direccion.Complemento = rest.Complemento;
    direccion.CodigoPostal = rest.CodigoPostal;
    direccion.Barrio = rest.Barrio;
    direccion.Ciudad = rest.Ciudad;
    direccion.Pais = rest.Pais;

    const documento = new Documento();
    documento.IdDocumento = idDocumento;
    documento.NumDocumento = rest.NumDocumento;
    documento.TipoDocumento = rest.TipoDocumento;
    documento.FechaExpedicion = rest.FechaExpedicion;
    documento.ImgFrontal = rest.ImgFrontal;
    documento.ImgReverso = rest.ImgReverso;
    documento.ImgCompleto = rest.ImgCompleto;

    const user = new Usuario();
    user.IdUsuario = idUsuario;
    user.PrimerNombre = rest.PrimerNombre;
    user.SegundoNombre = rest.SegundoNombre;
    user.PrimerApellido = rest.PrimerApellido;
    user.SegundoApellido = rest.SegundoApellido;
    user.Correo = rest.Correo;
    user.HashPassword = Buffer.from(HashPassword);
    user.EsEmpresa = rest.EsEmpresa;
    user.Perfil = rest.Perfil;
    user.Direccion = direccion;
    user.Documento = documento;

    const savedUser = await this.usuarioRepo.save(user);

    return {
      message: 'Usuario registrado exitosamente',
      user: { id: savedUser.IdUsuario },
    };
  }

  async findByEmail(correo: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { Correo: correo } });
  }

  async findById(id: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ where: { IdUsuario: id } });
  }

  async findByNumDocumento(numDocumento: number): Promise<Documento | null> {
  const documentoRepo = this.usuarioRepo.manager.getRepository(Documento);
  return documentoRepo.findOne({ where: { NumDocumento: numDocumento } });
}
}
