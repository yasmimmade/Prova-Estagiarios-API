import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TotalProdutosResponse {
  @Expose()
  @ApiProperty({ example: '1' })
  total: number;
}
