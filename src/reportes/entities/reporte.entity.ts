import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';

@Entity()
export class Reportes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conciliaciones, (conciliacion) => conciliacion.reportes)
  @JoinColumn({ name: 'conciliacion_id' })
  conciliacion: Conciliaciones;

  @Column({ length: 255 })
  archivo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}