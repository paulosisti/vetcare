import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const patient = await this.patientsService.create(createPatientDto);
      return patient;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get()
  async findAll() {
    const patients = await this.patientsService.findAll();
    return patients;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const patient = await this.patientsService.findOne(id);
      return patient;
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      const updatedPatient = await this.patientsService.update(
        id,
        updatePatientDto,
      );
      return updatedPatient;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const deletedPatient = await this.patientsService.remove(id);
      return deletedPatient;
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
