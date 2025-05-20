import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AsambleaService } from './asamblea.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Asamblea } from 'src/entities/Asamblea.entity';
import { AsambleaListRes } from 'src/dto/AsambleaListRes';
import { AuthRequest } from 'src/dto/AuthRequest';
import { ParticipanteAsamblea } from 'src/entities/ParticipanteAsamblea.entity';

@UseGuards(JwtAuthGuard)
@Controller('asamblea')
export class AsambleaController {
    constructor(private asambleaService: AsambleaService){}

    @Get()
    getAllAsambleas(@Req() req: AuthRequest): Promise<AsambleaListRes[]>{
        const idUsuario = req.user?.userId;
        return this.asambleaService.findAllWithIsParticipante(idUsuario);
    }

    @Get(':id')
    getAsambleaById(@Param('id') id: string, @Req() req: AuthRequest): Promise<{asamblea: Asamblea | null, participante: ParticipanteAsamblea | null}>{
        const idUsuario = req.user?.userId;
        return this.asambleaService.findByIdWithParticipante(id, idUsuario);
    }
}
