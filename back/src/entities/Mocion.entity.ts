import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Opciones } from './Opciones.entity';
import { Asamblea } from './Asamblea.entity';
import { VotacionMocion } from './VotacionMocion.entity';
import { ResultadosMocion } from './ResultadosMocion.entity';

@Entity()
export class Mocion {
  @PrimaryColumn()
  IdMocion: string;

  @Column()
  Pregunta: string;

  @Column({ nullable: true })
  Descripcion?: string;

  @Column()
  TipoMocion: string;

  @Column({ type: 'time' })
  HoraInicio: string;

  @Column({ type: 'time' })
  HoraFin: string;

  @ManyToOne(() => Opciones, opciones => opciones.mociones)
  @JoinColumn({ name: 'IdOpciones' })
  Opciones: Opciones;

  @ManyToOne(() => Asamblea, asamblea => asamblea.Mociones, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdAsamblea' })
  Asamblea: Asamblea;

  @OneToMany(() => VotacionMocion, votacion => votacion.Mocion)
  Votaciones: VotacionMocion[];

  @OneToMany(() => ResultadosMocion, resultado => resultado.Mocion)
  Resultados: ResultadosMocion[];
}