import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExtractobancarioService } from './extractobancario.service';
import { CreateExtractobancarioDto } from './dto/create-extractobancario.dto';
import { UpdateExtractobancarioDto } from './dto/update-extractobancario.dto';

@Controller('extractobancario')
export class ExtractobancarioController {
  constructor(private readonly extractobancarioService: ExtractobancarioService) {}

  @Post()
  create(@Body() createExtractobancarioDto: CreateExtractobancarioDto) {
    return this.extractobancarioService.create(createExtractobancarioDto);
  }

  @Get()
  findAll() {
    return this.extractobancarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extractobancarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExtractobancarioDto: UpdateExtractobancarioDto) {
    return this.extractobancarioService.update(+id, updateExtractobancarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extractobancarioService.remove(+id);
  }
}
