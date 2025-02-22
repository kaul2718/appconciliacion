import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { TipoMovimientoFinanciero } from 'src/common/enums/tipomovimientofinan';

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

  @Column()
  tipo: TipoMovimientoFinanciero;

  @Column({ length: 100 })
  referencia: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}