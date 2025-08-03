import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { DoctorsService } from '../services/doctors.service';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new doctor' })
  @ApiResponse({ status: 201, description: 'Doctor created successfully' })
  @ApiBody({ type: CreateDoctorDto })
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'List of all doctors' })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a doctor by ID' })
  @ApiResponse({ status: 200, description: 'Doctor found' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  @ApiParam({ name: 'id', description: 'Doctor ID' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }
}
