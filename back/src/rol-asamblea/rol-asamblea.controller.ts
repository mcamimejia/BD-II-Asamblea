import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolAsambleaService } from './rol-asamblea.service';
import { RolAsamblea } from 'src/entities/RolAsamblea.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rol-asamblea')
export class RolAsambleaController {
    constructor(private rolAsambleaService: RolAsambleaService) {}

    @Get()
    getAll(): Promise<RolAsamblea[]> {
        return this.rolAsambleaService.findAll();
    }
}
