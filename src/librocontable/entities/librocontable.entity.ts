import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { ConciliacionBancaria } from 'src/conciliacionbancaria/entities/conciliacionbancaria.entity';
@Entity()
export class LibroContable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  saldo: number;

  @ManyToOne(() => CuentaBancaria, cuenta => cuenta.libros)
  cuenta: CuentaBancaria;

  @OneToOne(() => ConciliacionBancaria, conciliacion => conciliacion.libro)
  conciliacion: ConciliacionBancaria;
}