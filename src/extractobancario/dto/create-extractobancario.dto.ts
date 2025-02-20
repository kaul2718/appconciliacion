import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateExtractobancarioDto {
    @IsDate()
    @IsNotEmpty()
    fecha: Date;
  
    @IsNumber()
    @IsNotEmpty()
    saldoInicial: number;
  
    @IsNumber()
    @IsNotEmpty()
    saldoFinal: number;
  
    @IsNumber()
    @IsNotEmpty()
    cuentaId: number; // Relación con CuentaBancaria
}
