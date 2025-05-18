import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Mocion } from './Mocion.entity';

@Entity()
export class Opciones {
  @PrimaryColumn()
  IdOpciones: string;

  @Column()
  Opcion1: string;

  @Column()
  Opcion2: string;

  @Column({ nullable: true })
  Opcion3?: string;

  @Column({ nullable: true })
  Opcion4?: string;

  @Column({ nullable: true })
  Opcion5?: string;

  @Column({ nullable: true })
  Opcion6?: string;

  @Column({ nullable: true })
  Opcion7?: string;

  @Column({ nullable: true })
  Opcion8?: string;

  @Column({ nullable: true })
  Opcion9?: string;

  @Column({ nullable: true })
  Opcion10?: string;

  @OneToMany(() => Mocion, mocion => mocion.Opciones)
  mociones: Mocion[];
}