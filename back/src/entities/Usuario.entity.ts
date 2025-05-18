import { Entity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Direccion } from './Direccion.entity';
import { Documento } from './Documento.enitity';

@Entity()
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

  @Column('bytea')
  HashPassword: Buffer;

  @Column({ default: false })
  EsEmpresa: boolean;

  @Column()
  Perfil: 'EMPLEADO' | 'EXTERNO';

  @OneToOne(() => Direccion, (direccion) => direccion.Usuarios)
  @JoinColumn({ name: 'IdDireccion' })
  Direccion: Direccion;

  @OneToOne(() => Documento, (documento) => documento.Usuario, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'IdDocumento' })
  Documento: Documento;
}
