import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ParticipanteAsamblea } from './ParticipanteAsamblea.entity';

@Entity()
export class RolAsamblea {
  @PrimaryColumn()
  IdRol: string;

  @Column()
  Rol: string;

  @Column({ default: false })
  Crear: boolean;

  @Column({ default: false })
  Modificar: boolean;

  @Column({ default: false })
  Eliminar: boolean;

  @Column({ default: false })
  Votar: boolean;

  @Column({ default: false })
  Descargar: boolean;

  @OneToMany(() => ParticipanteAsamblea, (participante) => participante.Rol)
  Participantes: ParticipanteAsamblea[];
}