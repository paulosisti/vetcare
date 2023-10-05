import { Injectable, NotFoundException } from '@nestjs/common';
import { Hygiene } from '@prisma/client';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma.service';
import { CreateHygieneDto } from './dto/create-hygiene.dto';
import { UpdateHygieneDto } from './dto/update-hygiene.dto';

@Injectable()
export class HygienesService {
  constructor(
    private prisma: PrismaService,
    private patientsService: PatientsService,
  ) {}

  async create(createHygieneDto: CreateHygieneDto): Promise<Hygiene> {
    const pet = await this.patientsService.findOne(createHygieneDto.patientId);
    if (pet) {
      return this.prisma.hygiene.create({
        data: { ...createHygieneDto },
      });
    }
  }

  async findByPetId(patientId: number) {
    const pet = await this.patientsService.findOne(patientId);
    const hygiene = await this.prisma.hygiene.findMany({
      where: { patientId: patientId },
    });
    if (!pet || !hygiene) {
      throw new NotFoundException('Ops... Record not found. :(');
    }
    return hygiene;
  }

  async findAll(): Promise<Hygiene[]> {
    const hygiene = await this.prisma.hygiene.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return hygiene;
  }

  async findOne(id: number) {
    const hygiene = await this.prisma.hygiene.findFirst({ where: { id } });
    if (!hygiene) {
      throw new NotFoundException('Ops... Hygiene not found. :(');
    }
    return hygiene;
  }

  async update(id: number, updateHygieneDto: UpdateHygieneDto) {
    const hygiene = await this.findOne(id);
    if (!hygiene) {
      throw new NotFoundException('Ops... Hygiene not found. :(');
    }

    const HygieneUpdated = await this.prisma.hygiene.update({
      where: { id },
      data: { ...updateHygieneDto },
    });

    return HygieneUpdated;
  }

  async remove(id: number) {
    const hygiene = await this.findOne(id);
    const deletedHygiene = await this.prisma.hygiene.delete({
      where: { id },
    });
    if (!hygiene) {
      throw new NotFoundException('Ops... Hygiene not found. :(');
    }
    return deletedHygiene;
  }
}
