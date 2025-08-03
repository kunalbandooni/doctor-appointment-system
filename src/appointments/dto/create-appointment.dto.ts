import { IsString, IsUUID, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsUUID()
  doctorId: string;

  @IsString()
  patientName: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
