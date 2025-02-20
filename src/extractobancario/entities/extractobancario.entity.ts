import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';

@Entity()
export class ExtractosBancarios {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CuentaBancaria, (cuenta) => cuenta.extractos)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: CuentaBancaria;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 255 })
  archivo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}