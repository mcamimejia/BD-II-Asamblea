import { Injectable } from '@nestjs/common';
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
    documento.Estado = rest.Estado;

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
}
