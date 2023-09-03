import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const createdPatient = await this.prismaService.patient.create({
      data: createPatientDto,
    });
    return createdPatient;
  }

  async findAll() {
    const patients = await this.prismaService.patient.findMany();
    return patients;
  }

  async findOne(id: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
    });
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const updatedPatient = await this.prismaService.patient.update({
      where: { id },
      data: updatePatientDto,
    });
    return updatedPatient;
  }

  async remove(id: number) {
    const deletedPatient = await this.prismaService.patient.delete({
      where: { id },
    });
    return deletedPatient;
  }
}
