export enum AppointmentStatus {
  BOOKED = 'BOOKED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

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
