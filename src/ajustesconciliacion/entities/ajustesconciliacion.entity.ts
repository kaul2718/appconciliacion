import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { User } from 'src/users/entities/user.entity';
@Entity()
export class AjustesConciliacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conciliaciones, (conciliacion) => conciliacion.ajustes)
  @JoinColumn({ name: 'conciliacion_id' })
  conciliacion: Conciliaciones;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  monto_ajustado: number;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}