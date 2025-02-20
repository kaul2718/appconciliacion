import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ConciliacionBancaria } from 'src/conciliacionbancaria/entities/conciliacionbancaria.entity';
@Entity()
export class Diferencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  monto: number;

  @ManyToOne(() => ConciliacionBancaria, conciliacion => conciliacion.diferencias)
  conciliacion: ConciliacionBancaria;
}