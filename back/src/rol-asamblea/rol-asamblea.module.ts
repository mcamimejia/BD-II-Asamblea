import { Module } from '@nestjs/common';
import { RolAsambleaService } from './rol-asamblea.service';
import { RolAsambleaController } from './rol-asamblea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolAsamblea } from 'src/entities/RolAsamblea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolAsamblea])],
  providers: [RolAsambleaService],
  controllers: [RolAsambleaController]
})
export class RolAsambleaModule {}
