import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';
import { TipoMovimientoFinanciero } from 'src/common/enums/tipomovimientofinan';

export class CreateTransaccionesBancariaDto {

    @IsNotEmpty({ message: 'El campo cuenta_id no puede estar vacío' })
    @IsString({ message: 'El campo cuenta_id debe ser una cadena de texto' })
    cuenta_id: string;

    @IsNotEmpty({ message: 'El campo fecha no puede estar vacío' })
    @IsDateString()
    fecha: Date;

    @IsNotEmpty({ message: 'El campo descripcion no puede estar vacío' })
    @IsString({ message: 'El campo descripcion debe ser una cadena de texto' })
    descripcion: string;

    @IsNotEmpty({ message: 'El campo monto no puede estar vacío' })
    @IsNumber({}, { message: 'El campo monto debe ser un número' })
    @IsPositive({ message: 'El monto debe ser un número positivo' }) // Aseguramos que el monto sea positivo
    monto: number;

    @IsNotEmpty({ message: 'El campo tipo no puede estar vacío' })
    @IsEnum(TipoMovimientoFinanciero, { message: 'El tipo de movimiento financiero no es válido' })
    tipo: TipoMovimientoFinanciero;

    @IsNotEmpty({ message: 'El campo referencia no puede estar vacío' })
    @IsString({ message: 'El campo referencia debe ser una cadena de texto' })
    referencia: string;

   
}
