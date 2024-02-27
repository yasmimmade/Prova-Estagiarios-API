import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/database/entities/Produto';
import { Repository } from 'typeorm';
import { TotalProdutosResponse } from './response/totalProdutos.response';
import { ListarProdutosCategoriaResponse, ProdutosResponse } from './response/listarProdutosCategoria.response';
import { ListarProdutosResponse } from './response/listarProdutos.response';
import { plainToClass } from 'class-transformer';
import { CriarProdutoDto } from './dto/criarProduto.dto';
import { EditarProdutoDto } from './dto/editarProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async listarProdutos(): Promise<ListarProdutosResponse>{
    const produtosExistentes = await this.produtoRepository.find({
      order: {
      nome: 'ASC',
    },});

    const response = new ListarProdutosResponse();

    if(produtosExistentes.length === 0){
      throw new NotFoundException("Nenhum produto cadastrado na base")
    }

    response.produtos = plainToClass(ProdutosResponse, produtosExistentes);

    return response;
  }

  async buscarProdutoId(id: number): Promise<ProdutosResponse>{
    const produtoExistente = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoExistente) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const response = plainToClass(ProdutosResponse, produtoExistente);

    return response;
  }

  async totalProdutos(): Promise<TotalProdutosResponse> {
    const produtosExistentes = await this.produtoRepository.count({});

    const response = new TotalProdutosResponse();
    response.total = produtosExistentes;
    return response;
  }

  async listarProdutosCategoria(): Promise<ListarProdutosCategoriaResponse> {
    const list = new ListarProdutosCategoriaResponse();
    return list;
  }

  async listarProdutoSemEstoque(): Promise<ListarProdutosResponse>{
    const produtosExistentes = await this.produtoRepository.find({where:{estoque: 0}});

    const response = new ListarProdutosResponse();

    if(produtosExistentes.length === 0){
      throw new NotFoundException("Não Existem produtos sem estoque no momento")
    }

    response.produtos = plainToClass(ProdutosResponse, produtosExistentes);

    return response;
  }

  async criarProduto(produtoDto: CriarProdutoDto){
    const {nome, valor, estoque, descricao} = produtoDto;

    await this.produtoExisteComNome(nome);

    const novoProduto = new Produto();
    novoProduto.nome = nome;
    novoProduto.valor = valor;
    novoProduto.estoque = estoque;
    novoProduto.descricao = descricao;

    return await this.produtoRepository.save(novoProduto);
  }

  async deletarProduto(id: number){
    const produtoExistente = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoExistente) {
      throw new NotFoundException('Produto não encontrado.');
    }

    await this.produtoRepository.softRemove(produtoExistente);
  }

  async atualizarProduto(id: number, editarProdutoDto: EditarProdutoDto) {
    const produtoExistente = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoExistente) {
      throw new NotFoundException('Produto não encontrado.');
    }

    produtoExistente.valor = editarProdutoDto.valor;
    produtoExistente.estoque = editarProdutoDto.estoque;

    await this.produtoRepository.save(produtoExistente);
}

  async produtoExisteComNome(nome: string){
    const possivelProduto = await this.produtoRepository.findOne({where: {nome: nome}});

    if (possivelProduto){
      throw new BadRequestException("Já existe um produto cadastrado com este nome");
    }
  }
}
