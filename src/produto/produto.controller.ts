import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { TotalProdutosResponse } from './response/totalProdutos.response';
import { ListarProdutosCategoriaResponse } from './response/listarProdutosCategoria.response';
import { ListarProdutosResponse, ProdutosResponse } from './response/listarProdutos.response';
import { CriarProdutoDto } from './dto/criarProduto.dto';
import { EditarProdutoDto } from './dto/editarProduto.dto';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @ApiResponse({ status: 200, type: ListarProdutosResponse })
  listarProdutos(): Promise<ListarProdutosResponse> {
    return this.produtoService.listarProdutos();
  }

  @Get('by/:id')
  @ApiResponse({ status: 200, type: ProdutosResponse })
  buscarProdutoId(@Param('id') id: number): Promise<ProdutosResponse> {
    return this.produtoService.buscarProdutoId(id);
  }

  @Get('sem-estoque')
  @ApiResponse({ status: 200, type: ListarProdutosResponse })
  buscarProdutoSemEstoque(): Promise<ListarProdutosResponse> {
    return this.produtoService.listarProdutoSemEstoque();
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

  @Post()
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CriarProdutoDto })
  criarProduto(@Body(ValidationPipe) criarProdutoDto: CriarProdutoDto) {
    return this.produtoService.criarProduto(criarProdutoDto)
  }

  @Delete(":id")
  @ApiResponse({status: 200})
  deletarProduto(@Param("id") id:number){
    this.produtoService.deletarProduto(id);

    return "Produto deletado com sucesso"
  }

  @Patch(':id')
  @ApiResponse({ status: 200 })
  async atualizarProduto(
    @Param('id') id: number,
    @Body(ValidationPipe) editarProdutoDto: EditarProdutoDto,
  ) {
    await this.produtoService.atualizarProduto(id, editarProdutoDto);

    return 'Produto editado com sucesso';
  }
}
