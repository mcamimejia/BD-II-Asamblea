import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AsambleaListRes } from 'src/dto/AsambleaListRes';
import { Asamblea } from 'src/entities/Asamblea.entity';
import { ParticipanteAsamblea } from 'src/entities/ParticipanteAsamblea.entity';
import { ParticipanteAsambleaService } from 'src/participante-asamblea/participante-asamblea.service';
import { Repository } from 'typeorm';

@Injectable()
export class AsambleaService {
    constructor(
        @InjectRepository(Asamblea)
        private readonly asambleaRepository: Repository<Asamblea>,
        @Inject(forwardRef(() => ParticipanteAsambleaService))
        private readonly participanteService: ParticipanteAsambleaService
    ){}

    async findAll(): Promise<Asamblea[]>{
        return this.asambleaRepository.find();
    }

    async findById(id: string): Promise<Asamblea | null>{
        return this.asambleaRepository.findOne({where: {IdAsamblea: id}});
    }

    async findByIdWithParticipante(id: string, idUsuario: string): Promise<{asamblea: Asamblea | null, participante: ParticipanteAsamblea | null}>{
        const [asamblea, participante] = await Promise.all([
            this.asambleaRepository.findOne({where: {IdAsamblea: id}, relations: ['Mociones']}),
            this.participanteService.findByUsuarioId(idUsuario)
        ])
        return {asamblea, participante}
    }

    async findAllWithIsParticipante(idUsuario: string): Promise<AsambleaListRes[]> {
        const asambleas = await this.asambleaRepository.find({
            relations: ['Participantes', 'Participantes.Usuario'],
        });

        return asambleas.map(asamblea => {
            const { Participantes, ...rest } = asamblea as Asamblea;
            const isParticipante = Participantes
                ? Participantes.some((p: any) => p.Usuario?.IdUsuario === idUsuario)
                : false;
            return {
                ...rest,
                isParticipante,
            };
        });
    }
}
