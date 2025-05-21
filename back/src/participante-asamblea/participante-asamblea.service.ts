import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipanteAsamblea } from 'src/entities/ParticipanteAsamblea.entity';
import { CreateParticipanteDto } from 'src/dto/CreateParticipanteDto';
import { generarId } from 'src/utils/generateIds';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AsambleaService } from 'src/asamblea/asamblea.service';
import { RolAsambleaService } from 'src/rol-asamblea/rol-asamblea.service';
import { BadRequestException, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';

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

    async findByUsuarioAndAsamblea(idUsuario: string, idAsamblea: string): Promise<ParticipanteAsamblea | null> {
        return this.participanteRepo.findOne({ where: { Usuario: {IdUsuario: idUsuario}, Asamblea: {IdAsamblea: idAsamblea} }, relations: ['Rol'] });
    }

    async createParticipante(dto: CreateParticipanteDto, idUsuario: string): Promise<ParticipanteAsamblea> {
        if (!idUsuario || !dto.IdAsamblea || !dto.IdRol) {
            throw new BadRequestException('Faltan datos requeridos');
        }

        const participanteExistente = await this.participanteRepo.findOne({
            where: {
                Usuario: { IdUsuario: idUsuario },
                Asamblea: { IdAsamblea: dto.IdAsamblea },
            },
        });

        if (participanteExistente) {
            throw new ConflictException('El usuario ya está registrado en esta asamblea');
        }
        
        const usuario = await this.usuarioService.findById(idUsuario);
        const asamblea = await this.asambleaService.findById(dto.IdAsamblea);
        const rol = await this.rolService.findById(dto.IdRol);

        if (!usuario || !asamblea || !rol) {
            throw new NotFoundException('Usuario, Asamblea o Rol no encontrado');
        }

        if (dto.IdRol === 'ROL003' && (!dto.AccionesRepresentadas || dto.AccionesRepresentadas < 1)) {
            throw new BadRequestException('El rol de accionista requiere acciones representadas');
        }

        if(dto.AccionesRepresentadas && dto.AccionesRepresentadas > asamblea.AccionesMaximoParticipante) {
            throw new BadRequestException('El número de acciones representadas no puede ser mayor al máximo permitido');
        }

        if (new Date(asamblea.Fecha) < new Date()) {
            throw new ForbiddenException('La asamblea ya ha pasado');
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
