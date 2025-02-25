import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';
import { TipoConciliacion } from 'src/common/enums/tipoconciliacion.enum';

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

  @Column({ type: 'enum', enum: TipoConciliacion }) // AJUSTEMAN = 'Ajuste Manual', CONCILIADO = 'Conciliado', DIFPENDIENTE = 'Diferencia Pendiente'
  tipo: TipoConciliacion;
  
  @Column({ type: 'decimal', precision: 15, scale: 2 })
  diferencia: number;
  
  @Column({ type: 'int', nullable: true })
  diferencia_fecha: number; // Nueva columna para registrar la diferencia en días

  @Column({ type: 'boolean', default: false })
  fecha_diferente: boolean; // Nueva columna para saber si la fecha es diferente

  @Column({ type: 'boolean', default: false })
  monto_diferente: boolean; // Nueva columna para saber si el monto es diferente

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}