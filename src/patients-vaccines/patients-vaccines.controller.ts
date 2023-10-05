import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePatientsVaccineDto } from './dto/create-patients-vaccine.dto';
import { UpdatePatientsVaccineDto } from './dto/update-patients-vaccine.dto';
import { PatientsVaccinesService } from './patients-vaccines.service';

@Controller('patients-vaccines')
export class PatientsVaccinesController {
  constructor(
    private readonly patientsVaccinesService: PatientsVaccinesService,
  ) {}

  @Post()
  create(@Body() createPatientsVaccineDto: CreatePatientsVaccineDto) {
    return this.patientsVaccinesService.create(createPatientsVaccineDto);
  }

  @Get()
  findAll() {
    return this.patientsVaccinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientsVaccinesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePatientsVaccineDto: UpdatePatientsVaccineDto,
  ) {
    return this.patientsVaccinesService.update(id, updatePatientsVaccineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientsVaccinesService.remove(id);
  }
}
