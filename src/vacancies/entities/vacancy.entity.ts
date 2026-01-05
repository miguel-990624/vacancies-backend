import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from '../../application/entities/application.entity';

export enum Modality {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
}

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  technologies: string;

  @Column()
  seniority: string;

  @Column()
  softSkills: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: Modality,
  })
  modality: Modality;

  @Column()
  salaryRange: string;

  @Column()
  company: string;

  @Column()
  maxApplicants: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Application, (application) => application.vacancy)
  applications: Application[];
}
