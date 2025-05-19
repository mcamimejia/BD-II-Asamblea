import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { RegisterDto } from 'src/dto/RegisterDto';

@Controller('usuario')
export class UsuarioController {
    constructor(private usuarioService: UsuarioService) {}

    @Get(':id')
    getUsuarioById(@Param('id') id: string) {
        return this.usuarioService.findById(id);
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.usuarioService.register(registerDto);
    }
}
