import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asamblea } from 'src/entities/Asamblea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AsambleaService {
    constructor(
        @InjectRepository(Asamblea)
        private readonly asambleaRepository: Repository<Asamblea>
    ){}

    async findAll(): Promise<Asamblea[]>{
        return this.asambleaRepository.find();
    }
}
