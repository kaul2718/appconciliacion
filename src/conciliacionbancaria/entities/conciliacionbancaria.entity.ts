import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ExtractoBancario } from 'src/extractobancario/entities/extractobancario.entity';
import { LibroContable } from 'src/librocontable/entities/librocontable.entity';
import { Diferencia } from 'src/diferencia/entities/diferencia.entity';
import { AjusteContable } from 'src/ajustecontable/entities/ajustecontable.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class ConciliacionBancaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  estado: string;

  @Column()
  saldoDiferencia: number;

  @ManyToOne(() => ExtractoBancario, extracto => extracto.conciliacion)
  @JoinColumn()
  extracto: ExtractoBancario;

  @ManyToOne(() => LibroContable, libro => libro.conciliacion)
  @JoinColumn()
  libro: LibroContable;

  @ManyToOne(() => User, user => user.conciliaciones)
  user: User;

  @OneToMany(() => Diferencia, diferencia => diferencia.conciliacion)
  diferencias: Diferencia[];

  @OneToMany(() => AjusteContable, ajuste => ajuste.conciliacion)
  ajustes: AjusteContable[];
}