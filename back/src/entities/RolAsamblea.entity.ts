import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ParticipanteAsamblea } from './ParticipanteAsamblea.entity';

@Entity('RolAsamblea')
export class RolAsamblea {
  @PrimaryColumn()
  IdRol: string;

  @Column()
  Rol: string;

  @Column({ type: 'bit', default: false })
  Crear: boolean;

  @Column({ type: 'bit', default: false })
  Modificar: boolean;

  @Column({ type: 'bit', default: false })
  Eliminar: boolean;

  @Column({ type: 'bit', default: false })
  Votar: boolean;

  @Column({ type: 'bit', default: false })
  Descargar: boolean;

  @OneToMany(() => ParticipanteAsamblea, (participante) => participante.Rol)
  Participantes: ParticipanteAsamblea[];
}