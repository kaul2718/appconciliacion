import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { User } from 'src/users/entities/user.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';

@Entity('ajustes_conciliacion')
export class AjustesConciliacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conciliaciones, (conciliacion) => conciliacion.ajustes)
  @JoinColumn({ name: 'conciliacion_id' })
  conciliacion: Conciliaciones;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => TransaccionesBancarias, { nullable: true }) // Puede ser nulo si el ajuste no se basa en una transacción
  @JoinColumn({ name: 'transaccion_id' })
  transaccion: TransaccionesBancarias;

  @ManyToOne(() => MovimientoExtracto, { nullable: true }) // Puede ser nulo si el ajuste no se basa en un movimiento
  @JoinColumn({ name: 'movimiento_id' })
  movimiento: MovimientoExtracto;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  monto_ajustado: number;

  @Column({ type: 'varchar', length: 20, default: 'Pendiente' }) // Pendiente, Aprobado, Rechazado
  estado: string;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}
