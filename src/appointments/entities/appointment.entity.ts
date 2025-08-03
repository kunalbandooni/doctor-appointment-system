export type AppointmentStatus = 'BOOKED' | 'COMPLETED' | 'CANCELLED';

export class Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  startTime: number;
  endTime: number;
  actualEndTime?: number;
  status: AppointmentStatus;
  createdAt: number;
}
