import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ResultadoMocionService } from './resultado-mocion.service';
import { ResultadosMocion } from 'src/entities/ResultadosMocion.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('resultado-mocion')
export class ResultadoMocionController {
  constructor(private readonly resultadoService: ResultadoMocionService) {}

  @Get('mocion/:idMocion')
  async getByMocionId(@Param('idMocion') idMocion: string): Promise<ResultadosMocion | null> {
    return this.resultadoService.findByMocionId(idMocion);
  }
}
