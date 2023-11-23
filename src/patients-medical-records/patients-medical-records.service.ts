import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePatientsMedicalRecordDto } from './dto/create-patients-medical-record.dto';
import { UpdatePatientsMedicalRecordDto } from './dto/update-patients-medical-record.dto';

@Injectable()
export class PatientsMedicalRecordsService {
  constructor(
    private readonly prismaService: PrismaService,
    private patientsService: PatientsService,
  ) {}

  async create(createPatientsMedicalRecordDto: CreatePatientsMedicalRecordDto) {
    const patient = await this.patientsService.findOne(
      createPatientsMedicalRecordDto.patientId,
    );
    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createPatientsMedicalRecordDto.patientId} not found`,
      );
    }
    return this.prismaService.patientMedicalRecord.create({
      data: { ...createPatientsMedicalRecordDto },
    });
  }

  async findByPatientId(patientId: number) {
    const patient = await this.patientsService.findOne(patientId);
    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found`);
    }
    const records = await this.prismaService.patientMedicalRecord.findMany({
      where: { patientId },
    });
    if (!records) {
      throw new Error(`Medical Record with patientID ${patientId} not found`);
    }
    return records;
  }

  async findAll() {
    const records = await this.prismaService.patientMedicalRecord.findMany();
    return records;
  }

  async findOne(id: number) {
    const record = await this.prismaService.patientMedicalRecord.findUnique({
      where: { id },
    });
    if (!record) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    return record;
  }

  async update(
    id: number,
    updatePatientsMedicalRecordDto: UpdatePatientsMedicalRecordDto,
  ) {
    const updatedRecord = await this.prismaService.patientMedicalRecord.update({
      where: { id },
      data: updatePatientsMedicalRecordDto,
    });

    if (!updatedRecord) {
      throw new NotFoundException('User not found');
    }

    return updatedRecord;
  }

  async remove(id: number) {
    const record = await this.prismaService.patientMedicalRecord.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Patient not found');
    }

    return this.prismaService.patientMedicalRecord.delete({
      where: { id },
    });
  }
}
