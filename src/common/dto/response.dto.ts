import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: { id: 1, name: 'Miguel Molina' } })
  data: T;

  @ApiProperty({ example: 'Operación exitosa' })
  message: string;
}
