import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Direccion } from './Direccion.entity';
import { Asamblea } from './Asamblea.entity';

@Entity()
export class ClienteProveedor {
  @PrimaryColumn({ length: 25 })
  IdCliente: string;

  @Column({ length: 100 })
  NombreEmpresa: string;

  @Column({ type: 'bigint', unique: true })
  Nit: number;

  @Column({ type: 'bigint' })
  AccionesEmpresa: number;

  @OneToOne(() => Direccion, { nullable: true })
  @JoinColumn({ name: 'IdDireccion' })
  Direccion: Direccion;

  @OneToMany(() => Asamblea, (asamblea) => asamblea.Cliente)
  Asambleas: Asamblea[];
}