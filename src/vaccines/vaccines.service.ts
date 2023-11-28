import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Injectable()
export class VaccinesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientsService: PatientsService,
  ) {}

  async create(createVaccineDto: CreateVaccineDto) {
    const pet = await this.patientsService.findOne(createVaccineDto.patientId);
    if (!pet) {
      throw new NotFoundException(
        `Pet with ID ${createVaccineDto.patientId} not found`,
      );
    }
    const vetCareVaccine = await this.prismaService.vaccine.create({
      data: { ...createVaccineDto },
    });

    await this.createVaccineInPetCare(vetCareVaccine);

    return vetCareVaccine;
  }

  private async createVaccineInPetCare(vetCareVaccine: any) {
    try {
      await axios.post('https://petcaredeploy-api.onrender.com/vaccines', {
        name: vetCareVaccine.name,
        date: vetCareVaccine.dateAdministered,
        petId: vetCareVaccine.patientId,
      });
    } catch (error) {
      console.error('Erro ao criar pet no Pet Care', error.message);
      if (error.response) {
        console.error('Detalhes da resposta:', error.response.data);
      }
      throw new Error(`Erro ao criar pet no Pet Care: ${error.message}`);
    }
  }

  async findAll() {
    const records = await this.prismaService.vaccine.findMany();
    return records;
  }

  async findByPetId(patientId: number) {
    const pet = await this.patientsService.findOne(patientId);
    const vaccine = await this.prismaService.vaccine.findMany({
      where: { patientId: patientId },
    });
    if (!pet || !vaccine) {
      throw new NotFoundException('Ops... Record not found. :(');
    }
    return vaccine;
  }

  async findOne(id: number) {
    const record = await this.prismaService.vaccine.findUnique({
      where: { id },
    });
    if (!record) {
      throw new Error(`Vaccine with ID ${id} not found`);
    }
    return record;
  }

  async update(id: number, updateVaccineDto: UpdateVaccineDto) {
    const updatedRecord = await this.prismaService.vaccine.update({
      where: { id },
      data: updateVaccineDto,
    });

    if (!updatedRecord) {
      throw new NotFoundException('Vaccine not found');
    }

    return updatedRecord;
  }

  async remove(id: number) {
    const record = await this.prismaService.vaccine.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('Vaccine not found');
    }

    return this.prismaService.vaccine.delete({
      where: { id },
    });
  }
}
