import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '123', description: 'ID of the doctor' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: 'John', description: 'Patient Name' })
  @IsString()
  @IsNotEmpty()
  patientName: string;

  @ApiProperty({ example: '2025-08-05T15:00:00.000Z', description: 'Appointment date and time (ISO format)' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '2025-08-05T15:00:00.000Z', description: 'Appointment date and time (ISO format)' })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
