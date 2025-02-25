import { IsEnum, IsNotEmpty } from "class-validator";
import { TipoCuentaBancaria } from "src/common/enums/tipocuenta.enum";

export class CreateMovimientoextractoDto {

    @IsNotEmpty()
    @IsEnum(TipoCuentaBancaria, { message: 'El tipo de cuenta bancaria no es válido' })
    tipo: TipoCuentaBancaria;

    
}
