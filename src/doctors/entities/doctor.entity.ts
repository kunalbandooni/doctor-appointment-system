export class Doctor {
  id: string;
  name: string;
  specialist: string;
  workingHours: {
    startTime: string;
    endTime: string;
  }
  slotDuration: number;
  createdAt: number;
  updatedAt: number;
  deleted: boolean
}

// import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

// @Entity('doctor')
// export class Doctor {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column()
//   specialist: string;

//   @Column({ type: 'bigint' })
//   createdAt: number;

//   @Column({ type: 'bigint' })
//   updatedAt: number;

//   @Column({ default: false })
//   deleted: boolean;
  
//   @OneToMany(() => Appointment, (appointment) => appointment.doctor)
//   appointments: Appointment[];

// }
