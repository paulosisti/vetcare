import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      throw error.message;
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get('crmv/:crmv')
  async getUsersCrmv(@Param('crmv') crmv: number) {
    try {
      const users = await this.usersService.getUsersDataByCrmv(crmv);
      return users;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.usersService.findOne(id);
      return user;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      return updatedUser;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.usersService.remove(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
