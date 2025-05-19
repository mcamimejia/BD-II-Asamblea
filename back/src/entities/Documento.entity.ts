import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { EstadoDocumento } from 'src/dto/RegisterDto';

@Entity()
export class Documento {
  @PrimaryColumn()
  IdDocumento: string;

  @Column({ unique: true, type: 'bigint' })
  NumDocumento: number;

  @Column()
  TipoDocumento: string;

  @Column({ type: 'date', nullable: true })
  FechaExpedicion?: Date;

  @Column({ nullable: true })
  ImgFrontal?: string;

  @Column({ nullable: true })
  ImgReverso?: string;

  @Column({ nullable: true })
  ImgCompleto?: string;

  @Column({ default: EstadoDocumento.SIN_VERIFICAR })
  Estado?: EstadoDocumento;

  @OneToOne(() => Usuario, (usuario) => usuario.Documento)
  Usuario: Usuario;
}