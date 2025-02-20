import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuariosCuentas } from 'src/usuarioscuentas/dto/create-usuarioscuenta.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creado_en: Date;
  
  @OneToMany(() => UsuariosCuentas, (usuarioCuenta) => usuarioCuenta.usuario)
  cuentas: UsuariosCuentas[];
}