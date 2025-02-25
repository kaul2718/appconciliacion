import { IsDate, IsEnum, IsInt, IsOptional, IsISO8601, Min, ValidateIf, isString, IsString } from 'class-validator';
import { EstadoConciliacion } from 'src/common/enums/estadoconciliacion.enum';
export class CreateConciliacioneDto {

    @IsInt({ message: 'El ID de la cuenta debe ser un número entero.' })
    @Min(1, { message: 'El ID de la cuenta debe ser mayor a 0.' })
    cuentaId: number;

    @IsInt({ message: 'El ID del extracto debe ser un número entero.' })
    @Min(1, { message: 'El ID del extracto debe ser mayor a 0.' })
    extractoId: number;

    @IsString({ message: 'Agregar nombre o Mes de conciliacion' })
    descripcion: string;

    @IsISO8601()
    fecha_inicio: string;

    @IsISO8601()
    fecha_fin: string;

    @ValidateIf(o => o.fecha_inicio && o.fecha_fin)
    validateFechas() {
        if (new Date(this.fecha_inicio) > new Date(this.fecha_fin)) {
            throw new Error('La fecha de inicio no puede ser mayor que la fecha de fin.');
        }
    }

    @IsEnum(EstadoConciliacion, { message: 'El estado debe ser "Pendiente", "Aprobado" o "Rechazado".' })
    estado: EstadoConciliacion;
}
