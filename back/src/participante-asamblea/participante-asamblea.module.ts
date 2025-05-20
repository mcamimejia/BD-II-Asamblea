import { forwardRef, Module } from '@nestjs/common';
import { ParticipanteAsambleaService } from './participante-asamblea.service';
import { ParticipanteAsambleaController } from './participante-asamblea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipanteAsamblea } from 'src/entities/ParticipanteAsamblea.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AsambleaModule } from 'src/asamblea/asamblea.module';
import { RolAsambleaModule } from 'src/rol-asamblea/rol-asamblea.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipanteAsamblea]),
    UsuarioModule,
    forwardRef(() => AsambleaModule),
    RolAsambleaModule,
  ],
  providers: [ParticipanteAsambleaService],
  controllers: [ParticipanteAsambleaController],
  exports: [ParticipanteAsambleaService],
})
export class ParticipanteAsambleaModule {}
