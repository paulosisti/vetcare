import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { PrismaService } from 'src/prisma.service';
import { CreateParasiteControllDto } from './dto/create-parasite-controll.dto';
import { UpdateParasiteControllDto } from './dto/update-parasite-controll.dto';

@Injectable()
export class ParasiteControllsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientsService: PatientsService,
  ) {}

  async create(createParasiteControllDto: CreateParasiteControllDto) {
    return this.prismaService.parasiteControl.create({
      data: { ...createParasiteControllDto },
    });
  }

  async findAll() {
    const records = await this.prismaService.parasiteControl.findMany();
    return records;
  }

  async findByPetId(patientId: number) {
    const pet = await this.patientsService.findOne(patientId);
    const parasiteControl = await this.prismaService.parasiteControl.findMany({
      where: { patientId: patientId },
    });
    if (!pet || !parasiteControl) {
      throw new NotFoundException('Ops... Record not found. :(');
    }
    return parasiteControl;
  }

  async findOne(id: number) {
    const record = await this.prismaService.parasiteControl.findUnique({
      where: { id },
    });
    if (!record) {
      throw new Error(`parasiteControl with ID ${id} not found`);
    }
    return record;
  }

  async update(
    id: number,
    updateParasiteControllDto: UpdateParasiteControllDto,
  ) {
    const updatedRecord = await this.prismaService.parasiteControl.update({
      where: { id },
      data: updateParasiteControllDto,
    });

    if (!updatedRecord) {
      throw new NotFoundException('parasiteControl not found');
    }

    return updatedRecord;
  }

  async remove(id: number) {
    const record = await this.prismaService.parasiteControl.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException('parasiteControl not found');
    }

    return this.prismaService.parasiteControl.delete({
      where: { id },
    });
  }
}
