import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { Usuario } from './Usuario.entity';

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

  @Column({ default: 'SIN_VERIFICAR' })
  Estado?: 'SIN_VERIFICAR' | 'VALIDO' | 'NO_VALIDO' | 'ANULADO';;

  @OneToOne(() => Usuario, (usuario) => usuario.Documento)
  Usuario: Usuario;
}