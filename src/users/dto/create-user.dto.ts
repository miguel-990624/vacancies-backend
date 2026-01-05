import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Miguel Molina', description: 'Nombre completo del usuario' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'coder@example.com', description: 'Correo electrónico único' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'coder123', minLength: 6, description: 'Contraseña segura del usuario' })
  @IsString()
  @MinLength(6)
  password: string;
}
