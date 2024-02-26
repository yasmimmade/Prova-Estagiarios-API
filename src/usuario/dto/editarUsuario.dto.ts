import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class EditarUsuarioDto {
  @Expose()
  @ApiProperty({ example: 'Rodrigo' })
  @IsDefined()
  @IsString()
  nome: string;

  @Expose()
  @ApiProperty({ example: 'rodrigo@example.com' })
  @IsDefined()
  @IsEmail()
  email: string;
}
