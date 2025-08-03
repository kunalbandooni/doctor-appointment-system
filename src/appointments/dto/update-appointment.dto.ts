import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ example: '2025-08-06T10:30:00.000Z', description: 'New appointment date/time (ISO format)' })
  @IsOptional()
  @IsDateString()
  startTime: string;

  @ApiPropertyOptional({ example: '2025-08-06T10:30:00.000Z', description: 'New appointment date/time (ISO format)' })
  @IsOptional()
  @IsDateString()
  endTime: string;
}
