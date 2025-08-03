import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class ViewAllAppointment {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  doctorId: string;

  @ApiProperty()
  @IsString()
  patientName: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsString()
  date: string;

  @ApiProperty({ example: '14:00' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '14:30' })
  @IsString()
  endTime: string;

  @ApiProperty({ example: 1691145000000, required: false })
  @IsOptional()
  @IsNumber()
  actualEndTime?: number;

  @ApiProperty({ enum: AppointmentStatus })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @ApiProperty({ example: 1691141400000 })
  @IsNumber()
  createdAt: number;
}
