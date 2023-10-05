import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';

@Injectable()
export class VaccinesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVaccineDto: CreateVaccineDto) {
    return this.prismaService.vaccine.create({
      data: { ...createVaccineDto },
    });
  }

  async findAll() {
    const records = await this.prismaService.vaccine.findMany();
    return records;
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
