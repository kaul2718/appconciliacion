import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExtractoBancarioService } from './extractobancario.service';
import { ConciliacionService } from 'src/conciliaciones/conciliaciones.service';
import { CreateExtractobancarioDto } from './dto/create-extractobancario.dto';
import { ExtractosBancarios } from './entities/extractobancario.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';

@Controller('extractos-bancarios')
export class ExtractoBancarioController {
  constructor(
    private readonly extractoService: ExtractoBancarioService,
    private readonly conciliacionService: ConciliacionService,
  ) {}

  // Subir un archivo de extracto bancario y procesarlo
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' es el nombre del campo en el formulario
  async uploadExtracto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createExtractoDTO: CreateExtractobancarioDto,
  ): Promise<ExtractosBancarios> {
    // Guardar el archivo en el servidor (opcional)
    const filePath = `./uploads/${file.originalname}`;
    require('fs').writeFileSync(filePath, file.buffer);

    // Procesar el archivo y guardar los datos en la base de datos
    return this.extractoService.create(createExtractoDTO, filePath);
  }

  // Obtener todos los extractos bancarios
  @Get()
  async findAll(): Promise<ExtractosBancarios[]> {
    return this.extractoService.findAll();
  }

  // Obtener un extracto bancario por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ExtractosBancarios> {
    try {
      return await this.extractoService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Comparar transacciones con los movimientos de un extracto
  @Get(':id/conciliar')
  async conciliarExtracto(@Param('id') extractoId: number) {
    const extracto = await this.extractoService.findOne(extractoId);
    if (!extracto) {
      throw new NotFoundException(`Extracto con ID ${extractoId} no encontrado`);
    }

    // Obtener la cuenta bancaria asociada al extracto
    const cuentaId = extracto.cuenta.id;

    // Comparar transacciones con los movimientos del extracto
    return this.conciliacionService.compararTransaccionesConExtracto(cuentaId, extractoId);
  }
}