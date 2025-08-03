import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { appointments, doctors } from 'src/data/database';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CompleteAppointmentDto } from '../dto/complete-appointment.dto';
import { ViewAllAppointment } from '../dto/view-all-appointment.dto';
import { millisToTimeString, millisToDate } from 'src/utils/time.util';
import { randomUUID } from 'crypto';

@Injectable()
export class AppointmentsService {
  private appointments = appointments;

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
      status: AppointmentStatus.BOOKED,
      createdAt: new Date().getTime(),
    };

    this.appointments.push(appointment);
    return appointment;
  }

  getAvailableSlots(doctorId: string, date: string): { startTime: number; endTime: number }[] {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) throw new NotFoundException('Doctor not found');

    const SLOT_DURATION_MIN = 30;
    const slots: { startTime: number; endTime: number }[] = [];

    const [year, month, day] = date.split('-').map(Number);

    const workStart = new Date(year, month - 1, day, ...doctor.workingHours.startTime.split(':').map(Number)).getTime();
    const workEnd = new Date(year, month - 1, day, ...doctor.workingHours.endTime.split(':').map(Number)).getTime();

    for (let start = workStart; start + SLOT_DURATION_MIN * 60000 <= workEnd; start += SLOT_DURATION_MIN * 60000) {
      const end = start + SLOT_DURATION_MIN * 60000;
      slots.push({ startTime: start, endTime: end });
    }

    const booked = this.appointments.filter(
      a =>
        a.doctorId === doctorId &&
        a.status !== 'CANCELLED' &&
        new Date(a.startTime).toDateString() === new Date(workStart).toDateString()
    );

    const available = slots.filter(slot => {
      return !booked.some(appt =>
        (slot.startTime >= appt.startTime && slot.startTime < appt.endTime) ||
        (slot.endTime > appt.startTime && slot.endTime <= appt.endTime) ||
        (slot.startTime <= appt.startTime && slot.endTime >= appt.endTime)
      );
    });

    return available.map(slot => ({
      ...slot,
      startTimeStr: millisToTimeString(slot.startTime),
      endTimeStr: millisToTimeString(slot.endTime),
    }));
  }

  findAll(): ViewAllAppointment[] {
    return this.appointments.map(appointment => ({
      ...appointment,
      date: millisToDate(appointment.startTime),
      startTime: millisToTimeString(appointment.startTime),
      endTime: millisToTimeString(appointment.endTime),
    }));
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

    appt.status = AppointmentStatus.COMPLETED,
    appt.actualEndTime = actualEnd;
    return appt;
  }

  cancel(id: string): Appointment {
    const appt = this.appointments.find((a) => a.id === id);
    if (!appt) throw new NotFoundException('Appointment not found');
    appt.status = AppointmentStatus.CANCELLED;
    return appt;
  }
}
