import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException, BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ExtractoBancarioService } from './extractobancario.service';
import { CreateExtractobancarioDto } from './dto/create-extractobancario.dto';
import { ExtractosBancarios } from './entities/extractobancario.entity';
import * as csv from 'csv-parser'; // Para procesar archivos CSV.
import * as fs from 'fs'; // Para leer el archivo.

@Controller('extractos-bancarios')
export class ExtractoBancarioController {
  constructor(
    private readonly extractoService: ExtractoBancarioService,
  ) { }

  // Subir un archivo de extracto bancario y procesarlo
  @Post('upload')
  @UseInterceptors(FileInterceptor('archivo'))
  async uploadExtracto(
    @UploadedFile() file: Express.Multer.File,
    @Body() createExtractoDTO: CreateExtractobancarioDto,
  ) {

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo.');
    }

    // Verificar que el archivo sea un CSV
    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('El archivo debe ser un CSV.');
    }

    // Crear el directorio de uploads si no existe
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Guardar temporalmente el archivo en el servidor
    const filePath = `${uploadDir}/${Date.now()}_${file.originalname}`;
    fs.writeFileSync(filePath, file.buffer);

    // Procesar el archivo y guardar los datos en la base de datos
    try {
      return await this.extractoService.create(createExtractoDTO, filePath);
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      throw new BadRequestException(error.message || 'Error al procesar el archivo CSV.');
    }
  }

  // Obtener todos los extractos bancarios
  @Get()
  async findAll(): Promise<ExtractosBancarios[]> {
    return this.extractoService.findAll();
  }

  // Obtener un extracto bancario por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExtractosBancarios> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException(`El ID ${id} no es un número válido.`);
    }
    return this.extractoService.findOne(numericId);
  }
}