import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Contains, IsDefined, IsEmail, IsString, IsStrongPassword, Length, Matches, contains, isNumberString, isStrongPassword, isUppercase } from 'class-validator';

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
  @Length(7, 10)
  @IsStrongPassword({
    minUppercase: 1,
    minLength: null,
    minLowercase: null,
    minNumbers: 1,
    minSymbols: null
  })
  senha: string;
}
