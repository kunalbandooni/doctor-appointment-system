import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CompleteAppointmentDto } from '../dto/complete-appointment.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = [];

  create(dto: CreateAppointmentDto): Appointment {
    const { doctorId, patientName, startTime, endTime } = dto;

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (start >= end) {
      throw new BadRequestException('End time must be after start time.');
    }

    // Prevent overlap
    const overlapping = this.appointments.find((appt) =>
      appt.doctorId === doctorId &&
      appt.status !== 'CANCELLED' &&
      (
        (start >= appt.startTime && start < appt.endTime) ||
        (end > appt.startTime && end <= appt.endTime) ||
        (start <= appt.startTime && end >= appt.endTime)
      )
    );

    if (overlapping) {
      throw new BadRequestException('Doctor is already booked for this time slot.');
    }

    const appointment: Appointment = {
      id: randomUUID(),
      doctorId,
      patientName,
      startTime: start,
      endTime: end,
      status: 'BOOKED',
      createdAt: new Date().getTime(),
    };

    this.appointments.push(appointment);
    return appointment;
  }

  findAll(): Appointment[] {
    return this.appointments;
  }

  findByDoctorId(doctorId: string): Appointment[] {
    return this.appointments.filter((a) => a.doctorId === doctorId);
  }

  update(id: string, dto: UpdateAppointmentDto): Appointment {
    const appt = this.appointments.find((a) => a.id === id);
    if (!appt) throw new NotFoundException('Appointment not found');
    if (appt.status !== 'BOOKED') throw new BadRequestException('Cannot edit completed/cancelled appointment');

    const newStart = new Date(dto.startTime).getTime();
    const newEnd = new Date(dto.endTime).getTime();

    if (newStart >= newEnd) throw new BadRequestException('End must be after start.');

    const overlapping = this.appointments.find((a) =>
      a.doctorId === appt.doctorId &&
      a.id !== id &&
      a.status !== 'CANCELLED' &&
      (
        (newStart >= a.startTime && newStart < a.endTime) ||
        (newEnd > a.startTime && newEnd <= a.endTime) ||
        (newStart <= a.startTime && newEnd >= a.endTime)
      )
    );

    if (overlapping) {
      throw new BadRequestException('Time slot overlaps with another appointment');
    }

    appt.startTime = newStart;
    appt.endTime = newEnd;
    return appt;
  }

  complete(id: string, dto: CompleteAppointmentDto): Appointment {
    const appt = this.appointments.find((a) => a.id === id);
    if (!appt) throw new NotFoundException('Appointment not found');

    const actualEnd = new Date(dto.actualEndTime).getTime();
    if (actualEnd > appt.endTime) {
      throw new BadRequestException('Actual end time cannot exceed original end time.');
    }

    appt.status = 'COMPLETED';
    appt.actualEndTime = actualEnd;
    return appt;
  }

  cancel(id: string): Appointment {
    const appt = this.appointments.find((a) => a.id === id);
    if (!appt) throw new NotFoundException('Appointment not found');
    appt.status = 'CANCELLED';
    return appt;
  }
}
