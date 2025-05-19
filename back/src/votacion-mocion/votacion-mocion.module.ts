import { Module, forwardRef } from '@nestjs/common';
import { VotacionMocionService } from './votacion-mocion.service';
import { VotacionMocionController } from './votacion-mocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotacionMocion } from 'src/entities/VotacionMocion.entity';
import { ParticipanteAsambleaModule } from 'src/participante-asamblea/participante-asamblea.module';
import { MocionModule } from 'src/mocion/mocion.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VotacionMocion]),
    ParticipanteAsambleaModule,
    forwardRef(() => MocionModule),
  ],
  providers: [VotacionMocionService],
  controllers: [VotacionMocionController],
  exports: [VotacionMocionService],
})
export class VotacionMocionModule {}
