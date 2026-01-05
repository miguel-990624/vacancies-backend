import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Modality } from '../entities/vacancy.entity';

export class CreateVacancyDto {
  @ApiProperty({ example: 'Backend Developer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Responsible for building scalable APIs and maintaining database integrity.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Node.js, NestJS, TypeScript, PostgreSQL' })
  @IsString()
  technologies: string;

  @ApiProperty({ example: 'Senior' })
  @IsString()
  seniority: string;

  @ApiProperty({ example: 'Communication, Problem-solving, Teamwork' })
  @IsString()
  softSkills: string;

  @ApiProperty({ example: 'Remote' })
  @IsString()
  location: string;

  @ApiProperty({ enum: Modality, example: 'remote' })
  @IsEnum(Modality)
  modality: Modality;

  @ApiProperty({ example: '4000-6000 USD' })
  @IsString()
  salaryRange: string;

  @ApiProperty({ example: 'TechCorp' })
  @IsString()
  company: string;

  @ApiProperty({ example: 10, minimum: 1 })
  @IsInt()
  @Min(1)
  maxApplicants: number;
}
