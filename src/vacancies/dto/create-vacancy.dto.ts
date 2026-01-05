import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Modality } from '../entities/vacancy.entity';

export class CreateVacancyDto {
  @ApiProperty({ example: 'Backend Developer', description: 'Título de la vacante' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Desarrollo de APIs escalables con NestJS', description: 'Descripción de la vacante' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Node.js, NestJS, TypeScript, PostgreSQL', description: 'Tecnologías requeridas' })
  @IsString()
  technologies: string;

  @ApiProperty({ example: 'Mid', description: 'Nivel de seniority requerido' })
  @IsString()
  seniority: string;

  @ApiProperty({ example: 'Trabajo en equipo, comunicación', description: 'Habilidades blandas requeridas' })
  @IsString()
  softSkills: string;

  @ApiProperty({ example: 'Medellín', description: 'Ubicación de la vacante' })
  @IsString()
  location: string;

  @ApiProperty({ enum: Modality, example: 'remote', description: 'Modalidad de trabajo' })
  @IsEnum(Modality)
  modality: Modality;

  @ApiProperty({ example: '4M - 6M COP', description: 'Rango salarial' })
  @IsString()
  salaryRange: string;

  @ApiProperty({ example: 'TechCorp', description: 'Empresa que ofrece la vacante' })
  @IsString()
  company: string;

  @ApiProperty({ example: 5, minimum: 1, description: 'Número máximo de postulantes permitidos' })
  @IsInt()
  @Min(1)
  maxApplicants: number;
}
