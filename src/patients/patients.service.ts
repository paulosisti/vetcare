import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
// import axios from 'axios';
import { OwnersService } from 'src/owners/owners.service';
import { PrismaService } from 'src/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { FileDto } from './dto/upload.file.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly prismaService: PrismaService,
    private ownersService: OwnersService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const owner = await this.ownersService.findOne(createPatientDto.ownerId);
    if (!owner) {
      throw new NotFoundException(
        `Owner with ID ${createPatientDto.ownerId} not found`,
      );
    }
    const vetCarePatient = await this.prismaService.patient.create({
      data: { ...createPatientDto },
    });

    // await this.createPetInPetCare(vetCarePatient);

    return vetCarePatient;
  }

  // private async createPetInPetCare(vetCarePatient: any) {
  //   try {
  //     await axios.post('https://petcaredeploy-api.onrender.com/pets', {
  //       animalType: vetCarePatient.species,
  //       name: vetCarePatient.name,
  //       breed: vetCarePatient.breed,
  //       gender: vetCarePatient.sex,
  //       weight: Math.round(vetCarePatient.weight),
  //       birthDate: vetCarePatient.dateOfBirth,
  //       userId: vetCarePatient.ownerId,
  //     });
  //   } catch (error) {
  //     console.error('Erro ao criar pet no Pet Care', error.message);
  //     if (error.response) {
  //       console.error('Detalhes da resposta:', error.response.data);
  //     }
  //     throw new Error(`Erro ao criar pet no Pet Care: ${error.message}`);
  //   }
  // }

  async findAll() {
    const patients = await this.prismaService.patient.findMany();
    return patients;
  }

  async findOne(id: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
      include: {
        owner: true,
        vaccines: true,
        hygiene: true,
        parasiteControl: true,
        patientMedicalRecord: true,
      },
    });
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const updatedPatient = await this.prismaService.patient.update({
      where: { id },
      data: updatePatientDto,
    });

    if (!updatedPatient) {
      throw new NotFoundException('User not found');
    }

    return updatedPatient;
  }

  async remove(id: number) {
    const patient = await this.prismaService.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.prismaService.patient.delete({
      where: { id },
    });
  }

  async upload(id: number, file: FileDto) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    const data = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    if (data) {
      const patient = await this.findOne(id);

      if (patient) {
        await this.prismaService.patient.update({
          where: { id },
          data: { photoUrl: file.originalname }, // Correção aqui
        });
      }
    }

    return data;
  }

  async getImage(id: number) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );
    const patient = await this.findOne(id);
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .download(patient.photoUrl);

    if (error) {
      console.error('Erro ao buscar a imagem:', error.message);
      return null;
    }

    if (data) {
      return data;
    }

    return null;
  }

  isBirthdayToday(dateOfBirth: Date): boolean {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);

    // Definindo a hora, minuto, segundo e milissegundo como 0 para ambas as datas
    currentDate.setUTCHours(0, 0, 0, 0);
    birthDate.setUTCHours(0, 0, 0, 0);

    const isBirthday =
      currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() === birthDate.getDate();

    return isBirthday;
  }

  async getBirthdaysToday() {
    const patients = await this.findAll();

    const patientsWithBirthday = patients.filter((patient) =>
      this.isBirthdayToday(patient.dateOfBirth),
    );

    console.log('Patients with Birthday Today:', patientsWithBirthday);

    return patientsWithBirthday;
  }
}
