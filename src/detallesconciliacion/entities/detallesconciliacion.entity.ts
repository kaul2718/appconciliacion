import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';

@Entity()
export class DetallesConciliacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conciliaciones, (conciliacion) => conciliacion.detalles)
  @JoinColumn({ name: 'conciliacion_id' })
  conciliacion: Conciliaciones;

  @ManyToOne(() => TransaccionesBancarias, { nullable: true })
  @JoinColumn({ name: 'transaccion_id' })
  transaccion: TransaccionesBancarias;

  @ManyToOne(() => ExtractosBancarios, { nullable: true })
  @JoinColumn({ name: 'extracto_id' })
  extracto: ExtractosBancarios;

  @Column({ type: 'enum', enum: ['ajuste_manual', 'conciliado', 'diferencia_pendiente'] })
  tipo: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  diferencia: number;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}