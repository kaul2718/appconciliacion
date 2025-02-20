import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';

@Entity()
export class TransaccionesBancarias {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CuentaBancaria, (cuenta) => cuenta.transacciones)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: CuentaBancaria;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number;

  @Column({ type: 'enum', enum: ['ingreso', 'egreso'] })
  tipo: string;

  @Column({ length: 100 })
  referencia: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}