import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ParticipanteAsambleaService } from './participante-asamblea.service';
import { CreateParticipanteDto } from 'src/dto/CreateParticipanteDto';
import { ParticipanteAsamblea } from 'src/entities/ParticipanteAsamblea.entity';
import { AuthRequest } from 'src/dto/AuthRequest';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('participante-asamblea')
export class ParticipanteAsambleaController {
  constructor(private readonly participanteService: ParticipanteAsambleaService) {}

  @Get()
  async getAllParticipantes(): Promise<ParticipanteAsamblea[]> {
    return this.participanteService.findAll();
  }

  @Get('asamblea/:asambleaId')
  async getParticipantesByAsambleaId(@Param('asambleaId') asambleaId: string): Promise<ParticipanteAsamblea[]> {
    return this.participanteService.findByAsambleaId(asambleaId);
  }

  @Get(':id')
  async getParticipanteById(@Param('id') id: string): Promise<ParticipanteAsamblea | null> {
    return this.participanteService.findById(id);
  }

  @Post()
  async createParticipante(@Req() req: AuthRequest, @Body() createParticipanteDto: CreateParticipanteDto): Promise<ParticipanteAsamblea> {
    const idUsuario = req.user?.userId;
    return this.participanteService.createParticipante(createParticipanteDto, idUsuario);
  }
}
