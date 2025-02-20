import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { AuditoriaConciliaciones } from 'src/auditoriaconciliaciones/entities/auditoriaconciliacione.entity';
import { AjustesConciliacion } from 'src/ajustesconciliacion/entities/ajustesconciliacion.entity';
import { Reportes } from 'src/reportes/entities/reporte.entity';
@Entity()
export class Conciliaciones {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CuentaBancaria, (cuenta) => cuenta.conciliaciones)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: CuentaBancaria;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @Column({ type: 'enum', enum: ['pendiente', 'aprobado', 'rechazado'] })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @OneToMany(() => DetallesConciliacion, (detalle) => detalle.conciliacion)
  detalles: DetallesConciliacion[];

  @OneToMany(() => AuditoriaConciliaciones, (auditoria) => auditoria.conciliacion)
  auditorias: AuditoriaConciliaciones[];

  @OneToMany(() => AjustesConciliacion, (ajuste) => ajuste.conciliacion)
  ajustes: AjustesConciliacion[];

  @OneToMany(() => Reportes, (reporte) => reporte.conciliacion)
  reportes: Reportes[];
}