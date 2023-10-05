import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateParasiteControllDto } from './dto/create-parasite-controll.dto';
import { UpdateParasiteControllDto } from './dto/update-parasite-controll.dto';
import { ParasiteControllsService } from './parasite-controlls.service';

@Controller('parasite-controlls')
export class ParasiteControllsController {
  constructor(
    private readonly parasiteControllsService: ParasiteControllsService,
  ) {}

  @Post()
  create(@Body() createParasiteControllDto: CreateParasiteControllDto) {
    return this.parasiteControllsService.create(createParasiteControllDto);
  }

  @Get()
  findAll() {
    return this.parasiteControllsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.parasiteControllsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateParasiteControllDto: UpdateParasiteControllDto,
  ) {
    return this.parasiteControllsService.update(id, updateParasiteControllDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.parasiteControllsService.remove(id);
  }
}
