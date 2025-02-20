import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class AuditoriaConciliaciones {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conciliaciones, (conciliacion) => conciliacion.auditorias)
  @JoinColumn({ name: 'conciliacion_id' })
  conciliacion: Conciliaciones;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @Column({ type: 'enum', enum: ['reportado', 'aprobado', 'rechazado'] })
  accion: string;

  @Column({ type: 'text' })
  comentario: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}