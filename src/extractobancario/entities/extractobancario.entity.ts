import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';

@Entity()
export class ExtractosBancarios {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CuentaBancaria, (cuenta) => cuenta.extractos)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: CuentaBancaria;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 255 })
  archivo: string; // Ruta o nombre del archivo.

  @OneToMany(() => MovimientoExtracto, (movimiento) => movimiento.extracto)
  movimientos: MovimientoExtracto[]; // Relación con los movimientos del extracto.

  @OneToMany(() => Conciliaciones, (conciliacion) => conciliacion.extracto)
  conciliaciones: Conciliaciones[]; // Relación inversa
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
}