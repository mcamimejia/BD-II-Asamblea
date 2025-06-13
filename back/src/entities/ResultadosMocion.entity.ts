import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Mocion } from './Mocion.entity';

@Entity('ResultadosMocion')
export class ResultadosMocion {
  @PrimaryColumn()
  IdResultadoMocion: string;

  @Column()
  Estado: string;

  @Column()
  CantidadVotosTotal: number;

  @Column({ type: 'bit', default: false })
  RequiereSecundar: boolean;

  @ManyToOne(() => Mocion, mocion => mocion.Resultados, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdMocion' })
  Mocion: Mocion;
}