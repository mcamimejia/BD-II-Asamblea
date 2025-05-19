import { forwardRef, Module } from '@nestjs/common';
import { ResultadoMocionService } from './resultado-mocion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadosMocion } from 'src/entities/ResultadosMocion.entity';
import { MocionModule } from 'src/mocion/mocion.module';
import { VotacionMocionModule } from 'src/votacion-mocion/votacion-mocion.module';
import { MocionGateway } from 'src/mocion/mocion.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResultadosMocion]),
    forwardRef(() => MocionModule),
    VotacionMocionModule,
  ],
  providers: [ResultadoMocionService, MocionGateway],
  exports: [ResultadoMocionService],
})
export class ResultadoMocionModule {}
