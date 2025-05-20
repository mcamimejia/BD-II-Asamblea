import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ClienteProveedor } from './ClienteProveedor.entity';
import { ParticipanteAsamblea } from './ParticipanteAsamblea.entity';
import { Mocion } from './Mocion.entity';

@Entity('Asamblea')
export class Asamblea {
  @PrimaryColumn({ length: 25 })
  IdAsamblea: string;

  @Column({ length: 100 })
  Nombre: string;

  @Column({ type: 'date' })
  Fecha: string;

  @Column({ type: 'time' })
  HoraInicio: string;

  @Column({ type: 'time', nullable: true })
  HoraFin: string;

  @Column({ length: 50 })
  Lugar: string;

  @Column({ type: 'bigint' })
  AccionesTotal: number;

  @Column({ type: 'bigint' })
  AccionesMaximoParticipante: number;

  @Column({ length: 50 })
  Tipo: 'PRESENCIAL' | 'VIRTUAL';

  @ManyToOne(() => ClienteProveedor, (cliente) => cliente.Asambleas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'IdCliente' })
  Cliente: ClienteProveedor;

  @OneToMany(() => ParticipanteAsamblea, (participante) => participante.Asamblea)
  Participantes: ParticipanteAsamblea[];

  @OneToMany(() => Mocion, (mociones) => mociones.Asamblea)
  Mociones: ParticipanteAsamblea[];
}