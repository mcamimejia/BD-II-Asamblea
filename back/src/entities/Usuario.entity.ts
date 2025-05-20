import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Direccion } from './Direccion.entity';
import { Documento } from './Documento.entity';

@Entity('Usuario')
export class Usuario {
  @PrimaryColumn()
  IdUsuario: string;

  @Column()
  PrimerNombre: string;

  @Column({ nullable: true })
  SegundoNombre?: string;

  @Column({ nullable: true })
  PrimerApellido?: string;

  @Column({ nullable: true })
  SegundoApellido?: string;

  @Column({ unique: true })
  Correo: string;

  @Column('varbinary')
  HashPassword: Buffer;

  @Column({ type: 'bit', default: false })
  EsEmpresa?: boolean;

  @Column()
  Perfil: 'EMPLEADO' | 'EXTERNO';

  @OneToOne(() => Direccion, (direccion) => direccion.Usuario, { cascade: true })
  @JoinColumn({ name: 'IdDireccion' })
  Direccion: Direccion;

  @OneToOne(() => Documento, (documento) => documento.Usuario, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdDocumento' })
  Documento: Documento;
}
