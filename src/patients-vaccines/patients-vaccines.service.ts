import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePatientsVaccineDto } from './dto/create-patients-vaccine.dto';
import { UpdatePatientsVaccineDto } from './dto/update-patients-vaccine.dto';

@Injectable()
export class PatientsVaccinesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly patientsService: PatientsService,
  ) {}

  async create(createPatientsVaccineDto: CreatePatientsVaccineDto) {
    return this.prisma.patientVaccine.create({
      data: { ...createPatientsVaccineDto },
    });
  }

  async findAll() {
    return this.prisma.patientVaccine.findMany();
  }

  async findByPetId(patientId: number) {
    const pet = await this.patientsService.findOne(patientId);
    const patient = await this.prisma.patientVaccine.findMany({
      where: { patientId: patientId },
    });
    if (!pet || !patient) {
      throw new NotFoundException('Ops... Record not found. :(');
    }
    return patient;
  }

  async findOne(id: number) {
    return this.prisma.patientVaccine.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePatientsVaccineDto: UpdatePatientsVaccineDto) {
    const updatedRecord = await this.prisma.patientVaccine.update({
      where: { id },
      data: updatePatientsVaccineDto,
    });

    if (!updatedRecord) {
      throw new NotFoundException('Vaccine not found');
    }

    return updatedRecord;
  }

  async remove(id: number) {
    return this.prisma.patientVaccine.delete({
      where: { id },
    });
  }
}
