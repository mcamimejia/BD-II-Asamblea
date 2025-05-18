import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { Asamblea } from './Asamblea.entity';
import { RolAsamblea } from './RolAsamblea.entity';
import { VotacionMocion } from './VotacionMocion.entity';

@Entity()
export class ParticipanteAsamblea {
  @PrimaryColumn({ length: 25 })
  IdParticipante: string;

  @Column({ type: 'bigint', nullable: true })
  AccionesRepresentadas: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'IdUsuario' })
  Usuario: Usuario;

  @ManyToOne(() => Asamblea, (asamblea) => asamblea.Participantes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdAsamblea' })
  Asamblea: Asamblea;

  @ManyToOne(() => RolAsamblea)
  @JoinColumn({ name: 'IdRol' })
  Rol: RolAsamblea;

  @OneToMany(() => VotacionMocion, (votacion) => votacion.Participante)
  Votaciones: VotacionMocion[];
}