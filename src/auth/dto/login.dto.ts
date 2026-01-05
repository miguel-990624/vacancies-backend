import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com', description: 'Correo del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'admin123', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6)
  password: string;
}
