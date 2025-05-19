import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { MocionService } from './mocion.service';
import { Mocion } from 'src/entities/Mocion.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMocionDto } from 'src/dto/CreateMocionDto';

@UseGuards(JwtAuthGuard)
@Controller('mocion')
export class MocionController {
    constructor(private mocionService: MocionService){}

    @Get()
    getAllMociones(): Promise<Mocion[]>{
        return this.mocionService.findAll();
    }

    @Get('asamblea/:asamblea')
    getAllMocionesByAsamblea(@Param('asamblea') asamblea: string): Promise<Mocion[]>{
        return this.mocionService.findByAsamblea(asamblea);
    }

    @Get(':id')
    getAsambleaById(@Param('id') id: string): Promise<Mocion | null>{
        return this.mocionService.findById(id);
    }

    @Post()
    createMocion(@Body() createMocionDto: CreateMocionDto) {
        return this.mocionService.createMocion(createMocionDto);
    }
}
