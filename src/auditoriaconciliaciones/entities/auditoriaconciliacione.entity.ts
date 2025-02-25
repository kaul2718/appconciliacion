import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { User } from 'src/users/entities/user.entity';
import { EstadoConciliacion } from 'src/common/enums/estadoconciliacion.enum';
import { AccionAuditoriaConciliacion } from 'src/common/enums/accionaudit.enum';

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

  @Column({ type: 'enum', enum: AccionAuditoriaConciliacion })
  accion: AccionAuditoriaConciliacion;

  @Column({ type: 'enum', enum: EstadoConciliacion, nullable: true })
  estado_anterior: EstadoConciliacion;

  @Column({ type: 'enum', enum: EstadoConciliacion, nullable: true })
  estado_nuevo: EstadoConciliacion;
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  diferencia_saldo: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn({ type: 'timestamp' })
  creado_en: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizado_en: Date;
}
