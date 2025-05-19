import { forwardRef, Module } from '@nestjs/common';
import { MocionService } from './mocion.service';
import { MocionController } from './mocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mocion } from 'src/entities/Mocion.entity';
import { MocionGateway } from './mocion.gateway';
import { ResultadoMocionModule } from 'src/resultado-mocion/resultado-mocion.module';
import { AsambleaModule } from 'src/asamblea/asamblea.module';
import { VotacionMocionModule } from 'src/votacion-mocion/votacion-mocion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mocion]),
    forwardRef(() => ResultadoMocionModule),
    AsambleaModule,
    forwardRef(() => VotacionMocionModule),
  ],
  providers: [MocionService, MocionGateway],
  controllers: [MocionController],
  exports: [MocionService, MocionGateway],
})
export class MocionModule {}
