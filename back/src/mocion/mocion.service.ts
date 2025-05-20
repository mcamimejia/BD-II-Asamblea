import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AsambleaService } from 'src/asamblea/asamblea.service';
import { CreateMocionDto } from 'src/dto/CreateMocionDto';
import { Mocion } from 'src/entities/Mocion.entity';
import { Opciones } from 'src/entities/Opciones.entity';
import { formatTime } from 'src/utils/formatTime';
import { generarId } from 'src/utils/generateIds';
import { Repository } from 'typeorm';
import { MocionGateway } from './mocion.gateway';
import { ResultadoMocionService } from 'src/resultado-mocion/resultado-mocion.service';

@Injectable()
export class MocionService {
    constructor(
        @InjectRepository(Mocion)
        private readonly mocionRepository: Repository<Mocion>,
        private readonly asambleaService: AsambleaService,
        private readonly mocionGateway: MocionGateway,
        private readonly resultadoMocionService: ResultadoMocionService,
    ) {}

    async findAll(): Promise<Mocion[]>{
        return this.mocionRepository.find();
    }

    async findByAsamblea(asambleaId: string): Promise<Mocion[]>{
        return this.mocionRepository.find({ where: {Asamblea: { IdAsamblea: asambleaId } } });
    }

    async findById(id: string): Promise<Mocion | null>{
        return this.mocionRepository.findOne({ where: { IdMocion: id } });
    }

    async createMocion(createMocionDto: CreateMocionDto) {
        const idMocion = generarId('MOC');
        const idOpciones = generarId('OPC');

        if (!createMocionDto.Pregunta || !createMocionDto.Opcion1 || !createMocionDto.Opcion2 || !createMocionDto.TipoMocion) {
            throw new Error('Faltan datos requeridos');
        }

        const asamblea = await this.asambleaService.findById(createMocionDto.IdAsamblea);

        if (!asamblea) {
            throw new Error('Asamblea no existe')
        }

        const opciones = new Opciones();
        opciones.IdOpciones = idOpciones;
        opciones.Opcion1 = createMocionDto.Opcion1;
        opciones.Opcion2 = createMocionDto.Opcion2;
        opciones.Opcion3 = createMocionDto.Opcion3;
        opciones.Opcion4 = createMocionDto.Opcion4;
        opciones.Opcion5 = createMocionDto.Opcion5;
        opciones.Opcion6 = createMocionDto.Opcion6;
        opciones.Opcion7 = createMocionDto.Opcion7;
        opciones.Opcion8 = createMocionDto.Opcion8;
        opciones.Opcion9 = createMocionDto.Opcion9;
        opciones.Opcion10 = createMocionDto.Opcion10;

        const horaInicio = new Date();
        const horaFin = new Date(horaInicio.getTime() + 10 * 60000); // 10 min later

        const newMocion = new Mocion();
        newMocion.IdMocion = idMocion;
        newMocion.Pregunta = createMocionDto.Pregunta;
        newMocion.Descripcion = createMocionDto.Descripcion;
        newMocion.TipoMocion = createMocionDto.TipoMocion;
        newMocion.HoraInicio = formatTime(horaInicio);
        newMocion.HoraFin = formatTime(horaFin);
        newMocion.Opciones = opciones;
        newMocion.Asamblea = asamblea;

        const savedMocion = await this.mocionRepository.save(newMocion);

        if (!savedMocion) {
            throw new Error('Error al guardar la moción');
        }
        
        this.mocionGateway.emitMocionCreada(savedMocion);

        setTimeout(async () => {
            this.mocionGateway.emitMocionInactiva(savedMocion.IdMocion);
            this.resultadoMocionService.createResultado(savedMocion.IdMocion);
        }, 10 * 60000); // 10 minutos

        return {
            message: 'Moción registrada exitosamente',
            mocion: { id: savedMocion.IdMocion },
        };
    }
}
