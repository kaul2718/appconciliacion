import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { ConciliacionBancaria } from 'src/conciliacionbancaria/entities/conciliacionbancaria.entity';
@Entity()
export class ExtractoBancario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  saldoInicial: number;

  @Column()
  saldoFinal: number;

  @ManyToOne(() => CuentaBancaria, cuenta => cuenta.extractos)
  cuenta: CuentaBancaria;

  @OneToOne(() => ConciliacionBancaria, conciliacion => conciliacion.extracto)
  conciliacion: ConciliacionBancaria;
}