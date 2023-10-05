import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateParasiteControllDto } from './dto/create-parasite-controll.dto';
import { UpdateParasiteControllDto } from './dto/update-parasite-controll.dto';

@Injectable()
export class ParasiteControllsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createParasiteControllDto: CreateParasiteControllDto) {
    return this.prismaService.parasiteControl.create({
      data: { ...createParasiteControllDto },
    });
  }

  async findAll() {
    const records = await this.prismaService.parasiteControl.findMany();
    return records;
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
