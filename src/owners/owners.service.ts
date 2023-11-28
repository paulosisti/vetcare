import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const createdOwner = await this.prismaService.owner.create({
      data: createOwnerDto,
    });

    await this.createUserInPetCare(createdOwner);

    return createdOwner;
  }

  private async createUserInPetCare(createdOwner: any) {
    try {
      await axios.post('https://petcaredeploy-api.onrender.com/users', {
        email: createdOwner.email,
        password: 'senha123',
        fullname: createdOwner.name,
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
    const owners = await this.prismaService.owner.findMany({
      include: {
        patients: true,
      },
    });
    return owners;
  }

  async findOne(id: number) {
    const owner = await this.prismaService.owner.findFirst({
      where: { id },
      include: {
        patients: true,
      },
    });
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const updatedOwner = await this.prismaService.owner.update({
      where: { id },
      data: updateOwnerDto,
    });
    return updatedOwner;
  }

  async remove(id: number) {
    const deletedOwner = await this.prismaService.owner.delete({
      where: { id },
    });
    return deletedOwner;
  }
}
