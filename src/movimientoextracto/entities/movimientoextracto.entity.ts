import { Transform } from "class-transformer";
import { TipoMovimientoFinanciero } from "src/common/enums/tipomovimientofinan";
import { ExtractosBancarios } from "src/extractobancario/entities/extractobancario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovimientoExtracto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ExtractosBancarios, (extracto) => extracto.movimientos)
  @JoinColumn({ name: 'extracto_id' })
  extracto: ExtractosBancarios;

  @Column({ type: 'timestamp' }) // o 'date' dependiendo de tus necesidades
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Convierte a Date cuando se crea la clase
  fecha: Date;

  @Column({ length: 255 })
  descripcion: string; // Descripción del movimiento.

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto: number; // Monto del movimiento.

  @Column()
  tipo: TipoMovimientoFinanciero;

  @Column({ length: 100 })
  referencia: string; // Referencia del movimiento.

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  saldo: number; // Saldo después del movimiento

}