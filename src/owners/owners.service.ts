import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import axios from 'axios';
import { Owner } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { bcryptConstant } from 'src/users/constants';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const passwordHasehd = await hash(
      createOwnerDto.password,
      bcryptConstant.saltOrRound,
    );
    return this.prismaService.owner.create({
      data: { ...createOwnerDto, password: passwordHasehd },
    });
  }

  // private async createUserInPetCare(createdOwner: any) {
  //   try {
  //     await axios.post('https://petcaredeploy-api.onrender.com/users', {
  //       email: createdOwner.email,
  //       password: 'senha123',
  //       fullname: createdOwner.name,
  //     });
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         petcare: error.response?.data,
  //       },
  //       error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

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
    const owner = await this.findOne(id);

    if (updateOwnerDto.password) {
      owner.password = await hash(
        updateOwnerDto.password,
        bcryptConstant.saltOrRound,
      );
    }

    const ownerUpdated = await this.prismaService.owner.update({
      where: { id },
      data: { ...updateOwnerDto, password: owner.password },
    });

    return ownerUpdated;
  }

  async remove(id: number) {
    const deletedOwner = await this.prismaService.owner.delete({
      where: { id },
    });
    return deletedOwner;
  }

  async findByOwnerNamePassword(email: string, password: string) {
    const owner = await this.findByEmail(email);

    if (!owner)
      throw new UnauthorizedException('Incorrect Owner name or password.');

    await OwnersService.validOwnerPassword(owner, password);

    return owner;
  }

  async findByEmail(email: string) {
    return this.prismaService.owner.findFirst({
      where: {
        email,
      },
    });
  }

  static async validOwnerPassword(owner: Owner, password: string) {
    const isMatch = await compare(password, owner.password);

    if (!isMatch)
      throw new UnauthorizedException(['Incorrect Owner name or password.']);
  }
}
