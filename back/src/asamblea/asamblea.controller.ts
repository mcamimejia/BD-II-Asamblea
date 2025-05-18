import { Controller, Get, UseGuards } from '@nestjs/common';
import { AsambleaService } from './asamblea.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Asamblea } from 'src/entities/Asamblea.entity';

@UseGuards(JwtAuthGuard)
@Controller('asamblea')
export class AsambleaController {
    constructor(private asambleaService: AsambleaService){}

    @Get()
    getAll(): Promise<Asamblea[]>{
        return this.asambleaService.findAll();
    }
}
