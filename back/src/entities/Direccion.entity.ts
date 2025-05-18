import { Entity, PrimaryColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { ClienteProveedor } from './ClienteProveedor.entity';

@Entity()
export class Direccion {
  @PrimaryColumn()
  IdDireccion: string;

  @Column()
  DireccionUno: string;

  @Column({ nullable: true })
  DireccionDos?: string;

  @Column({ nullable: true })
  Complemento?: string;

  @Column({ nullable: true })
  CodigoPostal?: string;

  @Column()
  Barrio: string;

  @Column()
  Ciudad: string;

  @Column()
  Pais: string;

  @OneToOne(() => Usuario, (usuario) => usuario.Direccion)
  Usuario: Usuario;

  @OneToOne(() => ClienteProveedor, (cliente) => cliente.Direccion)
  Clientes: ClienteProveedor;
}