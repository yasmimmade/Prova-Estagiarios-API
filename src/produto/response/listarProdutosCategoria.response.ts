import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProdutosResponse {
  @Expose()
  @ApiProperty({ example: '1' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Alface' })
  nome: string;

  @Expose()
  @ApiProperty({ example: 'Alface Crespa Agro' })
  descricao: string;

  @Expose()
  @ApiProperty({ example: '1' })
  estoque: number;

  @Expose()
  @ApiProperty({ example: '12.50' })
  valor: number;
}

export class ListarProdutosCategoriaResponse {
  @Expose()
  @ApiProperty({ example: '1' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Alface' })
  nome: string;

  @Expose()
  @ApiProperty({
    example: ProdutosResponse,
    isArray: true,
  })
  produtos: ProdutosResponse[];
}
