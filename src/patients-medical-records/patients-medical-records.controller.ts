import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePatientsMedicalRecordDto } from './dto/create-patients-medical-record.dto';
import { UpdatePatientsMedicalRecordDto } from './dto/update-patients-medical-record.dto';
import { PatientsMedicalRecordsService } from './patients-medical-records.service';

@Controller('patients-medical-records')
export class PatientsMedicalRecordsController {
  constructor(
    private readonly patientsMedicalRecordsService: PatientsMedicalRecordsService,
  ) {}

  @Post()
  async create(
    @Body() createPatientsMedicalRecordDto: CreatePatientsMedicalRecordDto,
  ) {
    return this.patientsMedicalRecordsService.create({
      ...createPatientsMedicalRecordDto,
    });
  }

  @Get()
  findAll() {
    return this.patientsMedicalRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.patientsMedicalRecordsService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: number) {
    return this.patientsMedicalRecordsService.findByPatientId(patientId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePatientsMedicalRecordDto: UpdatePatientsMedicalRecordDto,
  ) {
    return this.patientsMedicalRecordsService.update(
      id,
      updatePatientsMedicalRecordDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.patientsMedicalRecordsService.remove(id);
  }
}
