import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: 2, description: 'ID del usuario que aplica a la vacante' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 1, description: 'ID de la vacante a la que se aplica' })
  @IsInt()
  vacancyId: number;
}
