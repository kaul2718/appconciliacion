import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExtractoBancario } from 'src/extractobancario/entities/extractobancario.entity';
import { LibroContable } from 'src/librocontable/entities/librocontable.entity';
@Entity()
export class CuentaBancaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numeroCuenta: string;

  @Column()
  banco: string;

  @OneToMany(() => ExtractoBancario, extracto => extracto.cuenta)
  extractos: ExtractoBancario[];

  @OneToMany(() => LibroContable, libro => libro.cuenta)
  libros: LibroContable[];
}