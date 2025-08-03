import { Injectable, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { doctors, appointments } from '../data/database';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Appointment, AppointmentStatus } from '../appointments/entities/appointment.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  onModuleInit() {
    // Seed Doctors
    const doctor1: Doctor = {
      id: uuidv4().toString(),
      name: 'Dr. Ayesha Khan',
      specialist: 'Cardiologist',
      workingHours: {
        startTime: '09:00',
        endTime: '17:00',
      },
      slotDuration: 30,
      createdAt: Date.now().valueOf(),
      updatedAt: Date.now().valueOf(),
      deleted: false,
    };

    const doctor2: Doctor = {
      id: uuidv4().toString(),
      name: 'Dr. Raj Mehta',
      specialist: 'Dermatologist',
      workingHours: {
        startTime: '10:00',
        endTime: '16:00',
      },
      slotDuration: 20,
      createdAt: Date.now().valueOf(),
      updatedAt: Date.now().valueOf(),
      deleted: false,
    };

    doctors.push(doctor1, doctor2);

    // Seed Appointments
    const appointment1: Appointment = {
      id: uuidv4().toString(),
      doctorId: doctor1.id,
      patientName: 'John Doe',
      startTime: Date.now().valueOf(),
      endTime: Date.now().valueOf() + 30 * 60 * 1000,
      status: AppointmentStatus.BOOKED,
      createdAt: Date.now(),
    };

    const appointment2: Appointment = {
      id: uuidv4().toString(),
      doctorId: doctor2.id,
      patientName: 'Jane Smith',
      startTime: Date.now().valueOf() + 60 * 60 * 1000,
      endTime: Date.now().valueOf() + 90 * 60 * 1000,
      status: AppointmentStatus.BOOKED,
      createdAt: Date.now(),
    };

    appointments.push(appointment1, appointment2);

    console.log(`Seeded ${doctors.length} doctors and ${appointments.length} appointments`);
  }
}
