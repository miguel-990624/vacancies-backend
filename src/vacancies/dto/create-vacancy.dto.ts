import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Modality } from '../entities/vacancy.entity';

export class CreateVacancyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  technologies: string;

  @IsString()
  seniority: string;

  @IsString()
  softSkills: string;

  @IsString()
  location: string;

  @IsEnum(Modality)
  modality: Modality;

  @IsString()
  salaryRange: string;

  @IsString()
  company: string;

  @IsInt()
  @Min(1)
  maxApplicants: number;
}
