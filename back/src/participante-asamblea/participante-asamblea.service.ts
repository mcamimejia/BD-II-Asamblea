import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipanteAsamblea } from 'src/entities/ParticipanteAsamblea.entity';
import { CreateParticipanteDto } from 'src/dto/CreateParticipanteDto';
import { generarId } from 'src/utils/generateIds';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AsambleaService } from 'src/asamblea/asamblea.service';
import { RolAsambleaService } from 'src/rol-asamblea/rol-asamblea.service';

@Injectable()
export class ParticipanteAsambleaService {
    constructor(
        @InjectRepository(ParticipanteAsamblea)
        private readonly participanteRepo: Repository<ParticipanteAsamblea>,
        private readonly usuarioService: UsuarioService,
        @Inject(forwardRef(() => AsambleaService))
        private readonly asambleaService: AsambleaService,
        private readonly rolService: RolAsambleaService,
    ) { }

    async findAll(): Promise<ParticipanteAsamblea[]> {
        return this.participanteRepo.find();
    }

    async findByAsambleaId(id: string): Promise<ParticipanteAsamblea[]> {
        return this.participanteRepo.find({ where: { Asamblea: { IdAsamblea: id } }});
    }

    async findById(id: string): Promise<ParticipanteAsamblea | null> {
        return this.participanteRepo.findOne({ where: { IdParticipante: id }});
    }

    async findByUsuarioId(id: string): Promise<ParticipanteAsamblea | null> {
        return this.participanteRepo.findOne({ where: { Usuario: {IdUsuario: id} }, relations: ['Rol'] });
    }

    async createParticipante(dto: CreateParticipanteDto): Promise<ParticipanteAsamblea> {
        const usuario = await this.usuarioService.findById(dto.IdUsuario);
        const asamblea = await this.asambleaService.findById(dto.IdAsamblea);
        const rol = await this.rolService.findById(dto.IdRol);

        if (!usuario || !asamblea || !rol) {
            throw new Error('Usuario, Asamblea o Rol no encontrado');
        }

        const participante = new ParticipanteAsamblea();
        participante.IdParticipante = generarId('PAR');
        participante.AccionesRepresentadas = dto.AccionesRepresentadas;
        participante.Usuario = usuario;
        participante.Asamblea = asamblea;
        participante.Rol = rol;

        return this.participanteRepo.save(participante);
    }
}
