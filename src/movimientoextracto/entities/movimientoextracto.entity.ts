import { ExtractosBancarios } from "src/extractobancario/entities/extractobancario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovimientoExtracto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ExtractosBancarios, (extracto) => extracto.movimientos)
  @JoinColumn({ name: 'extracto_id' })
  extracto: ExtractosBancarios;

  @Column({ type: 'date' })
  fecha: Date; // Fecha del movimiento.

  @Column({ length: 255 })
  descripcion: string; // Descripción del movimiento.

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number; // Monto del movimiento.

  @Column({ type: 'enum', enum: ['ingreso', 'egreso'] })
  tipo: string; // Tipo de movimiento (ingreso o egreso).

  @Column({ length: 100 })
  referencia: string; // Referencia del movimiento.

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}