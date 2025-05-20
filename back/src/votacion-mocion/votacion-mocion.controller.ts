import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { VotacionMocionService } from './votacion-mocion.service';
import { VotacionMocion } from 'src/entities/VotacionMocion.entity';
import { CreateVotacionDto } from 'src/dto/CreateVotacionDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('votacion-mocion')
export class VotacionMocionController {
  constructor(private readonly votacionMocionService: VotacionMocionService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<VotacionMocion | null> {
    return this.votacionMocionService.findById(id);
  }

  @Get('mocion/:mocionId')
  async findByMocionId(@Param('mocionId') mocionId: string): Promise<VotacionMocion[]> {
    return this.votacionMocionService.findAllByMocionId(mocionId);
  }

  @Post()
  async create(@Body() dto: CreateVotacionDto): Promise<VotacionMocion> {
    return this.votacionMocionService.createVotacion(dto);
  }
}
