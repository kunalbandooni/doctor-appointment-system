import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CompleteAppointmentDto {
  @ApiProperty({ example: '2025-08-05T15:00:00.000Z', description: 'Appointment date and time (ISO format)' })
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  actualEndTime: string;
}
