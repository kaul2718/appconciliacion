import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateExtractobancarioDto {
  @IsNotEmpty({ message: 'La fecha no puede estar vacía.' })
  @IsDateString({}, { message: 'La fecha debe ser una cadena de fecha válida (ISO 8601).' })
  fecha: string;
  
  @IsOptional()
  saldoFinal: number; // Saldo final del extracto

  @IsNotEmpty({ message: 'El ID de la cuenta no puede estar vacío.' })
  @IsNumber({}, { message: 'El ID de la cuenta debe ser un número.' })
  @Transform(({ value }) => {
    return Number(value); // Transformar a número
  })
  cuenta_id: number;
}