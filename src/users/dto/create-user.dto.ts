import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Miguel Molina' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'miguel@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123!', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}
