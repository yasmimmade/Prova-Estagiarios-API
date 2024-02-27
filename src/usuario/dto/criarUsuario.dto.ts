import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsEmail, IsString, IsStrongPassword, MaxLength, } from 'class-validator';

export class CriarUsuarioDto {
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

  @Expose()
  @ApiProperty({ example: 'senha' })
  @IsDefined()
  @IsString()
  @MaxLength(11)
  @IsStrongPassword({minSymbols: 0, minLength: 6, minUppercase: 1, minNumbers: 1})
  senha: string;
}
