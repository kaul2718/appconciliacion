import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAjustecontableDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsNumber()
    @IsNotEmpty()
    conciliacionId: number; // Relación con ConciliacionBancaria
}
