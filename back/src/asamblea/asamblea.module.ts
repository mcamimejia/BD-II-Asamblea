import { Module } from '@nestjs/common';
import { AsambleaService } from './asamblea.service';
import { AsambleaController } from './asamblea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asamblea } from 'src/entities/Asamblea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asamblea])],
  providers: [AsambleaService],
  controllers: [AsambleaController]
})
export class AsambleaModule {}
