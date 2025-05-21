import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultadosMocion } from 'src/entities/ResultadosMocion.entity';
import { MocionGateway } from 'src/mocion/mocion.gateway';
import { MocionService } from 'src/mocion/mocion.service';
import { generarId } from 'src/utils/generateIds';
import { VotacionMocionService } from 'src/votacion-mocion/votacion-mocion.service';
import { Repository } from 'typeorm';


@Injectable()
export class ResultadoMocionService {
    constructor(
        @InjectRepository(ResultadosMocion)
        private readonly resultadoRepo: Repository<ResultadosMocion>,
        @Inject(forwardRef(() => MocionService))
        private readonly mocionService: MocionService,
        private readonly votacionMocionService: VotacionMocionService,
        private readonly mocionGateway: MocionGateway
    ) { }

    async findByMocionId(idMocion: string): Promise<ResultadosMocion | null> {
        return this.resultadoRepo.findOne({ where: { Mocion: { IdMocion: idMocion } } });
    }

    async createResultado(IdMocion: string): Promise<void> {
        const mocion = await this.mocionService.findById(IdMocion);
        if (!mocion) {
            throw new NotFoundException('Mocion no encontrada');
        }
        const votaciones = await this.votacionMocionService.findAllByMocionId(IdMocion);
        if (!votaciones) {
            throw new NotFoundException('No hay votaciones para esta mocion');
        }
        const cantidadVotosTotal = votaciones.length;
        const votosPerOption: Record<string, number> = {};

        for (let i = 1; i <= 10; i++) {
            const opcionKey = `Opcion${i}`;
            votosPerOption[opcionKey] = votaciones.filter(v => v.OpcionVoto === opcionKey).length;
        }

        const [opcionMayorVotos, cantidadMayorVotos] = Object.entries(votosPerOption)
            .reduce((max, actual) => actual[1] > max[1] ? actual : max);

        const porcentajeMayorVotos = (cantidadMayorVotos / cantidadVotosTotal) * 100;

        const newResultado = new ResultadosMocion();
        newResultado.IdResultadoMocion = generarId('RES');
        newResultado.Estado = opcionMayorVotos;
        newResultado.RequiereSecundar = porcentajeMayorVotos <= 50;
        newResultado.CantidadVotosTotal = cantidadVotosTotal;
        newResultado.Mocion = mocion;

        await this.resultadoRepo.save(newResultado);

        this.mocionGateway.emitResultadosMocion(IdMocion);
    }
}
