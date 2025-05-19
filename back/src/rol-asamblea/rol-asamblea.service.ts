import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolAsamblea } from 'src/entities/RolAsamblea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolAsambleaService {
    constructor(
        @InjectRepository(RolAsamblea)
        private readonly rolAsambleaRepo: Repository<RolAsamblea>,
    ){}

    async findAll(): Promise<RolAsamblea[]>{
        return this.rolAsambleaRepo.find();
    }

    async findById(id: string): Promise<RolAsamblea | null> {
        return this.rolAsambleaRepo.findOne({ where: { IdRol: id } });
    }
}
