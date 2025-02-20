import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ConciliacionBancaria } from 'src/conciliacionbancaria/entities/conciliacionbancaria.entity';
@Entity()
export class AjusteContable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  monto: number;

  @Column()
  fecha: Date;

  @ManyToOne(() => ConciliacionBancaria, conciliacion => conciliacion.ajustes)
  conciliacion: ConciliacionBancaria;
}