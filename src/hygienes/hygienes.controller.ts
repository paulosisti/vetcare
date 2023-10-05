import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HygienesService } from './hygienes.service';
import { CreateHygieneDto } from './dto/create-hygiene.dto';
import { UpdateHygieneDto } from './dto/update-hygiene.dto';

@Controller('hygienes')
export class HygienesController {
  constructor(private readonly hygienesService: HygienesService) {}

  @Post()
  create(@Body() createHygieneDto: CreateHygieneDto) {
    return this.hygienesService.create(createHygieneDto);
  }

  @Get()
  findAll() {
    return this.hygienesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hygienesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHygieneDto: UpdateHygieneDto) {
    return this.hygienesService.update(+id, updateHygieneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hygienesService.remove(+id);
  }
}
