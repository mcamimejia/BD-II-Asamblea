import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/LoginDto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<Usuario | null> {
    const user = await this.usuarioService.findByEmail(loginDto.correo);
    if (user && await bcrypt.compare(loginDto.password, user.HashPassword.toString())) {
      return user;
    }
    return null;
  }

  async login(user: Usuario) {
    const payload = { sub: user.IdUsuario, email: user.Correo, perfil: user.Perfil };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
