import { Controller, Get, Param } from '@nestjs/common';
import { ResultadoMocionService } from './resultado-mocion.service';
import { ResultadosMocion } from 'src/entities/ResultadosMocion.entity';

@Controller('resultado-mocion')
export class ResultadoMocionController {
  constructor(private readonly resultadoService: ResultadoMocionService) {}

  @Get('mocion/:idMocion')
  async getByMocionId(@Param('idMocion') idMocion: string): Promise<ResultadosMocion | null> {
    return this.resultadoService.findByMocionId(idMocion);
  }
}
