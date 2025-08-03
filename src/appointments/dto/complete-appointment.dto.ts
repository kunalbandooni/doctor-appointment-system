import { IsDateString } from 'class-validator';

export class CompleteAppointmentDto {
  @IsDateString()
  actualEndTime: string;
}
