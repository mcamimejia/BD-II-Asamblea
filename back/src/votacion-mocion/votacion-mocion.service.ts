import { Injectable, Inject, forwardRef, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVotacionDto } from 'src/dto/CreateVotacionDto';
import { VotacionMocion } from 'src/entities/VotacionMocion.entity';
import { MocionService } from 'src/mocion/mocion.service';
import { ParticipanteAsambleaService } from 'src/participante-asamblea/participante-asamblea.service';
import { generarId } from 'src/utils/generateIds';
import { Repository } from 'typeorm';

@Injectable()
export class VotacionMocionService {
    constructor(
        @InjectRepository(VotacionMocion)
        private readonly votacionRepo: Repository<VotacionMocion>,
        private readonly participanteService: ParticipanteAsambleaService,
        @Inject(forwardRef(() => MocionService))
        private readonly mocionService: MocionService,
    ){}

    async findAllByMocionId(idMocion: string): Promise<VotacionMocion[]> {
        return this.votacionRepo.find({where: { Mocion: { IdMocion: idMocion } }});
    }

    async findById(id: string): Promise<VotacionMocion | null> {
        return this.votacionRepo.findOne({ where: { IdVotacionMocion: id } });
    }

    async createVotacion(dto: CreateVotacionDto): Promise<VotacionMocion> {
        const { OpcionVoto, IdParticipante, IdMocion } = dto;
        if (!OpcionVoto || !IdParticipante || !IdMocion) {
            throw new BadRequestException('Faltan datos requeridos');
        }
        const participante = await this.participanteService.findById(IdParticipante);
        const mocion = await this.mocionService.findById(IdMocion);

        if (!participante || !mocion) {
            throw new NotFoundException('Participante o moción no encontrados');
        }

        const votacion = new VotacionMocion();
        votacion.IdVotacionMocion = generarId('VOT');
        votacion.OpcionVoto = dto.OpcionVoto;
        votacion.FechaHoraVoto = new Date();
        votacion.Participante = participante;
        votacion.Mocion = mocion;

        return this.votacionRepo.save(votacion);
    }
}
