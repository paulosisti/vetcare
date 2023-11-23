import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MailService } from 'src/emails/mail.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnersService } from './owners.service';

@Controller('owners')
export class OwnersController {
  constructor(
    private readonly ownersService: OwnersService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    try {
      const owner = await this.ownersService.create(createOwnerDto);
      this.mailService.sendMail(owner.email);
      return owner;
    } catch (error) {
      // Lide com erros aqui, por exemplo, validações do Prisma
      throw new Error('Unable to create owner');
    }
  }

  @Get()
  async findAll() {
    const owners = await this.ownersService.findAll();
    return owners;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const owner = await this.ownersService.findOne(id);
      return owner;
    } catch (error) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ) {
    try {
      const updatedOwner = await this.ownersService.update(id, updateOwnerDto);
      return updatedOwner;
    } catch (error) {
      // Lide com erros aqui, por exemplo, validações do Prisma
      throw new Error(`Unable to update owner with ID ${id}`);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const deletedOwner = await this.ownersService.remove(id);
      return deletedOwner;
    } catch (error) {
      // Lide com erros aqui, por exemplo, validações do Prisma
      throw new Error(`Unable to delete owner with ID ${id}`);
    }
  }
}
