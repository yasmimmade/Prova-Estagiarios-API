import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/database/entities/Produto';
import { Repository } from 'typeorm';
import { TotalProdutosResponse } from './response/totalProdutos.response';
import { ListarProdutosCategoriaResponse } from './response/listarProdutosCategoria.response';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async totalProdutos(): Promise<TotalProdutosResponse> {
    //Lista os usuarios ordenando pelo nome
    const produtosExistentes = await this.produtoRepository.find({});

    const response = new TotalProdutosResponse();
    response.total = 12;
    return response;
  }

  async listarProdutosCategoria(): Promise<ListarProdutosCategoriaResponse> {
    const list = new ListarProdutosCategoriaResponse();
    return list;
  }
}
