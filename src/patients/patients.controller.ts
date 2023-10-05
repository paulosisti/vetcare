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
  Res,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FileDto } from './dto/upload.file.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.patientsService.create(createPatientDto);
    return patient;
  }

  @Get()
  async findAll() {
    const patients = await this.patientsService.findAll();
    return patients;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const patient = await this.patientsService.findOne(id);
      return patient;
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      const updatedPatient = await this.patientsService.update(
        id,
        updatePatientDto,
      );
      return updatedPatient;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const deletedPatient = await this.patientsService.remove(id);
      return deletedPatient;
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: FileDto, @Param('id') id: number) {
    const uploadFile = await this.patientsService.upload(id, file);
    return uploadFile;
  }

  @Get('photo/:id')
  async serveImage(@Param('id') id: number, @Res() res: Response) {
    const patient = await this.patientsService.findOne(id);
    const imageBlob = await this.patientsService.getImage(id);

    if (imageBlob) {
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = patient.photoUrl.split('.').pop().toLowerCase();

      if (imageExtensions.includes(fileExtension)) {
        res.setHeader('Content-Type', `image/${fileExtension}`);
        const imageBuffer = await imageBlob.arrayBuffer();
        res.send(Buffer.from(imageBuffer));
      } else {
        res.status(415).end('Tipo de imagem não suportado');
      }
    } else {
      res.status(404).end('Imagem não encontrada');
    }
  }
}
