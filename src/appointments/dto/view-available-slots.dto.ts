import { IsDateString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ViewAvailableSlotsDto {
  @ApiProperty({ example: 'a0f5c830-1234-4bc1-832d-1234567890ab' })
  @IsString()
  doctorId: string;

  @ApiProperty({ example: '2025-08-04' })
  @IsDateString()
  date: string;
}
