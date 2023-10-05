import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import axios from 'axios';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { bcryptConstant } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHasehd = await hash(
      createUserDto.password,
      bcryptConstant.saltOrRound,
    );
    return this.prismaService.user.create({
      data: { ...createUserDto, password: passwordHasehd },
    });
  }

  async getUsersDataByCrmv(crmv: number) {
    try {
      const pesquisa = crmv;
      const endpoint = `https://app.cfmv.gov.br/pf/consultaInscricao/${pesquisa}/1/2/RS/03ADUVZwDc-8DnM78xTS2D2Cp3I8cRfNEou6LxKbZ1ennjonMWWMTI4ICnj5Kj_Ip9zu2w4SXjMSYj0ym4j45WwLhTXPfpzQW5pFJGoFe-d70b9hTqpE8W6j7_QFvMY4m5NHV_D3sPl9zzE3srwR1e0fUtUVtiRZtS674RkRAv25-OAENrlkHviOxX02gUxLfh7Fis9Ip1CuTr0Vjr8_KXPAgn-GPpxExFz_vlPrWm8B0lo4FOAuNG7_YAMukr9NlmxxMATS7Y-zz3o6clb4ED7k8mBqTyT_kBmvrk8Js5E7q3t8yfhiCEvcYAw_Fc8iQvq9Wts1WVgF1Rha6MAWJtaf7cUyZZoa6G32p5nq4BrioyAqVVk5VZ0zghuK0obgfIYcG0CSAVV9BS-QHPZs-4tV3dTy3fYloSnycBOtaOHfQfml17u6zc6CZcM4bw_Iz0Ty7InyFqZMNDYp_jHT4MsEvKiG4Cvp_JoGAjkDYWYoEBQHvG85I50Bv89TMzYt-BFhE-nXBJcU_fcXUwGj3WPiovXKeWNBphUXltQ_6XBNN70SgYKvZBEZ54QWxTdoEyik92KCtpOnwsqeN8nCndnka0tWp5fnBHPQ?_=1693724099401`;

      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error('Erro na requisição GET');
    }
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      user.password = await hash(
        updateUserDto.password,
        bcryptConstant.saltOrRound,
      );
    }

    const userUpdated = await this.prismaService.user.update({
      where: { id },
      data: { ...updateUserDto, password: user.password },
    });

    return userUpdated;
  }

  async remove(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async findByUsernamePassword(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user)
      throw new UnauthorizedException('Incorrect username or password.');

    await UsersService.validUserPassword(user, password);

    return user;
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  static async validUserPassword(user: User, password: string) {
    const isMatch = await compare(password, user.password);

    if (!isMatch)
      throw new UnauthorizedException(['Incorrect username or password.']);
  }
}
