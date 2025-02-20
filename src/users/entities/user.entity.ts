import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ConciliacionBancaria } from 'src/conciliacionbancaria/entities/conciliacionbancaria.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => ConciliacionBancaria, conciliacion => conciliacion.user)
  conciliaciones: ConciliacionBancaria[];
}