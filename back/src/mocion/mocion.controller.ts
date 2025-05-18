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
    getAll(): Promise<Mocion[]>{
        return this.mocionService.findAll();
    }

    @Get(':asamblea')
    getAllByAsamblea(@Param('asamblea') asamblea: string): Promise<Mocion[]>{
        return this.mocionService.findByAsamblea(asamblea);
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<Mocion | null>{
        return this.mocionService.findById(id);
    }

    @Post()
    async createMocion(@Body() createMocionDto: CreateMocionDto) {
        return this.mocionService.createMocion(createMocionDto);
    }
}
