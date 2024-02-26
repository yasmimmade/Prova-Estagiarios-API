import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UsuariosResponse {
  @Expose()
  @ApiProperty({ example: '1' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Rodrigo' })
  nome: string;

  @Expose()
  @ApiProperty({ example: 'rodrigo@example.com' })
  email: string;
}

export class ListarUsuariosResponse {
  @Expose()
  @ApiProperty({
    example: [{ id: 1, nome: 'Rodrigo', email: 'rodrigo@example.com' }],
    isArray: true,
  })
  usuarios: UsuariosResponse[];
}
