import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { TotalProdutosResponse } from './response/totalProdutos.response';
import { ListarProdutosCategoriaResponse } from './response/listarProdutosCategoria.response';
import { ListarProdutosResponse, ProdutoResponse } from './response/listarProdutos.response';
import { CriarProdutoDto } from './dto/criarProduto.dto';
import { EditarProdutoDto } from './dto/editarProduto.dto';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @ApiResponse({ status: 200, type: ListarProdutosResponse })
  listarProdutos(): Promise<ListarProdutosResponse> {
    return this.produtoService.listarProdutos()
  }

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

  @Get('by/:id')
  @ApiResponse({ status: 200, type: ProdutoResponse })
  buscarProdutoId(@Param('id') id: number): Promise<ProdutoResponse> {
    return this.produtoService.buscarProdutoId(id)
  }

  @Post()
  @ApiResponse({ status: 201 })
  @ApiBody({ type: ProdutoResponse })
  criarProduto(@Body(ValidationPipe) criarProdutoDto: CriarProdutoDto) {
    return this.produtoService.criarProduto(criarProdutoDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200 })
  @ApiBody({ type: ProdutoResponse })
  editarProduto(@Param('id') id: number, @Body(ValidationPipe) editarProdutoDto: EditarProdutoDto) {
    return this.produtoService.atualizarProduto(id, editarProdutoDto)
  }


  @Delete(':id')
  @ApiResponse({ status: 200 })
  deletarProduto(@Param('id') id: number) {
    return this.produtoService.deletarProduto(id)
  }
}
