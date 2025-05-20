import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ParticipanteAsamblea } from './ParticipanteAsamblea.entity';
import { Mocion } from './Mocion.entity';

@Entity('VotacionMocion')
export class VotacionMocion {
  @PrimaryColumn()
  IdVotacionMocion: string;

  @Column()
  OpcionVoto: string;

  @Column({ type: 'timestamp' })
  FechaHoraVoto: Date;

  @ManyToOne(() => ParticipanteAsamblea, participante => participante.Votaciones, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdParticipante' })
  Participante: ParticipanteAsamblea;

  @ManyToOne(() => Mocion, mocion => mocion.Votaciones, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdMocion' })
  Mocion: Mocion;
}