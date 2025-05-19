import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AsambleaService } from './asamblea.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Asamblea } from 'src/entities/Asamblea.entity';

@UseGuards(JwtAuthGuard)
@Controller('asamblea')
export class AsambleaController {
    constructor(private asambleaService: AsambleaService){}

    @Get()
    getAllAsambleas(): Promise<Asamblea[]>{
        return this.asambleaService.findAll();
    }

    @Get(':id')
    getAsambleaById(@Param('id') id: string): Promise<Asamblea | null>{
        return this.asambleaService.findById(id);
    }
}
