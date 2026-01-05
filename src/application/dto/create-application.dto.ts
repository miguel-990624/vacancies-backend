import { IsInt } from 'class-validator';

export class CreateApplicationDto {
  @IsInt()
  userId: number;

  @IsInt()
  vacancyId: number;
}
