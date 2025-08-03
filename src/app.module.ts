import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'your_db_user',
    //   password: 'your_db_pass',
    //   database: 'doctor_app_db',
    //   entities: [], // add here, for entity when adding postgres
    //   synchronize: true, // Only for dev
    // }),
    DoctorsModule,
    AppointmentsModule
  ],
  providers: [SeedService]
})

export class AppModule {}
