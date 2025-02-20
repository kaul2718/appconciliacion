import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
export class CreateUsuarioscuentaDto {}
@Entity()
export class UsuariosCuentas {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (usuario) => usuario.cuentas)
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @ManyToOne(() => CuentaBancaria, (cuenta) => cuenta.usuarios)
  @JoinColumn({ name: 'cuenta_id' })
  cuenta: CuentaBancaria;
}