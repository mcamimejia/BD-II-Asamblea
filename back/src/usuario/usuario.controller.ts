import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RegisterDto } from 'src/dto/RegisterDto';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @Post('register')
        register(@Body() registerDto: RegisterDto) {
        return this.usuarioService.register(registerDto);
    }
}
