import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreateExtractobancarioDto {
    @IsNotEmpty()
    @IsString()
    cuenta_id: string;

    @IsNotEmpty()
    @IsDateString()
    fecha: Date;

    @IsNotEmpty()
    @IsString()
    archivo: string;
}
