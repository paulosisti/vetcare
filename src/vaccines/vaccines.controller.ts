import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { VaccinesService } from './vaccines.service';

@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccinesService.create(createVaccineDto);
  }

  @Get()
  findAll() {
    return this.vaccinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vaccinesService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPetId(@Param('patientId') patientId: number) {
    return this.vaccinesService.findByPetId(patientId);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVaccineDto: UpdateVaccineDto) {
    return this.vaccinesService.update(id, updateVaccineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vaccinesService.remove(id);
  }
}
