import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { TotalProdutosResponse } from './response/totalProdutos.response';
import { ListarProdutosCategoriaResponse } from './response/listarProdutosCategoria.response';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get('total')
  @ApiResponse({ status: 200, type: TotalProdutosResponse })
  totalProdutos(): Promise<TotalProdutosResponse> {
    return this.produtoService.totalProdutos();
  }

  @Get('categoria')
  @ApiResponse({ status: 200, type: ListarProdutosCategoriaResponse })
  listarProdutosCategoria(): Promise<ListarProdutosCategoriaResponse> {
    return this.produtoService.listarProdutosCategoria();
  }
}
