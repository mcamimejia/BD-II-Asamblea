import { Module } from '@nestjs/common';
import { MocionService } from './mocion.service';
import { MocionController } from './mocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mocion } from 'src/entities/Mocion.entity';
import { MocionGateway } from './mocion.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Mocion])],
  providers: [MocionService, MocionGateway],
  controllers: [MocionController]
})
export class MocionModule {}
