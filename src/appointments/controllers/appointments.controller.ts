import { Body, Controller, Get, Param, Patch, Post, Query, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { CompleteAppointmentDto } from '../dto/complete-appointment.dto';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: 201, description: 'Appointment created successfully' })
  create(@Body() dto: CreateAppointmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'List of all appointments' })
  findAll() {
    return this.service.findAll();
  }

  @Get('/slots/:doctorId')
  @ApiOperation({ summary: 'Get all available slots' })
  @ApiResponse({ status: 200, description: 'List of all slots available' })
  getAvailableSlots(@Param('doctorId') doctorId: string, @Query('date') date: string) {
    if (!date) throw new BadRequestException('Date query param is required in YYYY-MM-DD format');
    return this.service.getAvailableSlots(doctorId, date);
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get all appointments for a doctor' })
  @ApiParam({ name: 'doctorId', type: String })
  @ApiResponse({ status: 200, description: 'List of appointments for the doctor' })
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findByDoctorId(doctorId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an appointment by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: 200, description: 'Appointment updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark appointment as completed' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: CompleteAppointmentDto })
  @ApiResponse({ status: 200, description: 'Appointment marked as completed' })
  complete(@Param('id') id: string, @Body() dto: CompleteAppointmentDto) {
    return this.service.complete(id, dto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel an appointment' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Appointment cancelled successfully' })
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }
}
