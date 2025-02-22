import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';
import { UsuariosCuentas } from 'src/usuarioscuentas/dto/create-usuarioscuenta.dto';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { TipoCuentaBancaria } from 'src/common/enums/tipocuenta.enum';
@Entity()
export class CuentaBancaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre_banco: string;

  @Column({ length: 50, unique: true })
  numero_cuenta: string;

  @Column()
  tipo: TipoCuentaBancaria;

  @Column({ length: 10 })
  moneda: string;
  
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;

  @OneToMany(() => UsuariosCuentas, (usuarioCuenta) => usuarioCuenta.cuenta)
  usuarios: UsuariosCuentas[];

  @OneToMany(() => ExtractosBancarios, (extracto) => extracto.cuenta)
  extractos: ExtractosBancarios[];

  @OneToMany(() => TransaccionesBancarias, (transaccion) => transaccion.cuenta)
  transacciones: TransaccionesBancarias[];

  @OneToMany(() => Conciliaciones, (conciliacion) => conciliacion.cuenta)
  conciliaciones: Conciliaciones[];
}