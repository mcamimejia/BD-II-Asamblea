import { forwardRef, Module } from '@nestjs/common';
import { AsambleaService } from './asamblea.service';
import { AsambleaController } from './asamblea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asamblea } from 'src/entities/Asamblea.entity';
import { ParticipanteAsambleaModule } from 'src/participante-asamblea/participante-asamblea.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asamblea]),
    forwardRef(() => ParticipanteAsambleaModule)
  ],
  providers: [AsambleaService],
  controllers: [AsambleaController],
  exports: [AsambleaService],
})
export class AsambleaModule {}
