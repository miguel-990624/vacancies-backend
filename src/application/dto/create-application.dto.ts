import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 1, description: 'ID de la vacante a la que se aplica' })
  @IsInt()
  vacancyId: number;
}
