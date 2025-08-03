import { Injectable } from '@nestjs/common';
import { doctors } from 'src/data/database';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DoctorsService {

  private doctors = doctors;

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor: Doctor = {
      id: uuidv4().toString(),
      name: createDoctorDto.name,
      specialist: createDoctorDto.specialist,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      deleted: false,
    };
    this.doctors.push(doctor);
    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctors.filter((d) => !d.deleted);
  }

  async findOne(id: string): Promise<Doctor | null> {
    const doctor = this.doctors.find((d) => d.id === id && !d.deleted);
    return doctor || null;
  }

}
