import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibrocontableService } from './librocontable.service';
import { CreateLibrocontableDto } from './dto/create-librocontable.dto';
import { UpdateLibrocontableDto } from './dto/update-librocontable.dto';

@Controller('librocontable')
export class LibrocontableController {
  constructor(private readonly librocontableService: LibrocontableService) {}

  @Post()
  create(@Body() createLibrocontableDto: CreateLibrocontableDto) {
    return this.librocontableService.create(createLibrocontableDto);
  }

  @Get()
  findAll() {
    return this.librocontableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.librocontableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibrocontableDto: UpdateLibrocontableDto) {
    return this.librocontableService.update(+id, updateLibrocontableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.librocontableService.remove(+id);
  }
}
