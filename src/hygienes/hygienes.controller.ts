import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateHygieneDto } from './dto/create-hygiene.dto';
import { UpdateHygieneDto } from './dto/update-hygiene.dto';
import { HygienesService } from './hygienes.service';

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
  findOne(@Param('id') id: number) {
    return this.hygienesService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPetId(@Param('patientId') patientId: number) {
    return this.hygienesService.findByPetId(patientId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateHygieneDto: UpdateHygieneDto) {
    return this.hygienesService.update(id, updateHygieneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hygienesService.remove(id);
  }
}
