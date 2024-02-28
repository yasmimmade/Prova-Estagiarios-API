import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/database/entities/Produto';
import { Repository } from 'typeorm';
import { TotalProdutosResponse } from './response/totalProdutos.response';
import { ListarProdutosCategoriaResponse, ProdutosResponse } from './response/listarProdutosCategoria.response';
import { ListarProdutosResponse, ProdutoResponse} from './response/listarProdutos.response';
import { plainToClass } from 'class-transformer';
import { CriarProdutoDto } from './dto/criarProduto.dto';
import { EditarProdutoDto } from './dto/editarProduto.dto';
import { Categoria } from 'src/database/entities/Categoria';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ) {}

  async listarProdutos(): Promise<ListarProdutosResponse>{
    const produtosExistentes = await this.produtoRepository.find({
      order: {
        nome: "ASC"
      }
    })

    if(produtosExistentes.length == 0) throw new NotFoundException("Nenhum produto cadastrado na base!")

    const response = new ListarProdutosResponse()

    response.produtos = plainToClass(ProdutosResponse, produtosExistentes);
    return response;
  }
    
  async buscarProdutoId(id: number): Promise<ProdutoResponse> {
    const produtoExistente = await this.produtoRepository.findOne({
      where: { id }
    });
    const response = plainToClass(ProdutoResponse, produtoExistente);

    return response;
  }

  async listarSemEstoque(): Promise<ListarProdutosResponse> {
    const produtosExistentes = await this.produtoRepository.find({
      where: { estoque: 0 }
    })

    if(produtosExistentes.length == 0) throw new NotFoundException("Nenhum produto com estoque zerado na base!");

    const response = new ListarProdutosResponse();
    response.produtos = plainToClass(ProdutosResponse, produtosExistentes);

    return response
  }

  async listarProdutosCategoria(): Promise<ListarProdutosCategoriaResponse[]> {
    let categoriasProdutos = await this.categoriaRepository.find({
      relations: {
        produtos: true
      }
    })

    const response = plainToClass(ListarProdutosCategoriaResponse, categoriasProdutos)

    return response
  }

  async totalProdutos(): Promise<TotalProdutosResponse> {
    const qtdProdutos = await this.produtoRepository.count();

    const response = new TotalProdutosResponse();
    response.total = qtdProdutos;
    return response;
  }

  async criarProduto(produtoDto: CriarProdutoDto) {
    const { nome, descricao, estoque, valor, categoriaId } = produtoDto;
    await this.verificarNome(nome)
    try {
      const novoProduto = new Produto()

      novoProduto.nome = nome;
      novoProduto.descricao = descricao;
      novoProduto.estoque = estoque;
      novoProduto.valor = valor;
      novoProduto.categoriaId = categoriaId;

      await this.produtoRepository.save(novoProduto)

      return { mensagem: "Produto cadastrado com sucesso!" }
    } catch(e) {
      throw new Error(`Erro ao cadastrar um produto: ${e.mensagem}`)
    }
  }

  async atualizarProduto(id: number, editarProdutoDto: EditarProdutoDto) {
    const produtoExistente = await this.produtoRepository.findOneBy({
      id: id
    })

    try {
      produtoExistente.nome = editarProdutoDto.nome;
      produtoExistente.descricao = editarProdutoDto.descricao;
      produtoExistente.estoque = editarProdutoDto.estoque;
      // produtoExistente.valor = editarProdutoDto.valor;
      produtoExistente.categoriaId = editarProdutoDto.categoriaId;
      await this.produtoRepository.save(produtoExistente);
      return { mensagem: "Produto atualizado com sucesso!" }
    } catch (e) {
      throw new Error(`Erro ao atualizar produto: ${e.message}`);
    }    
  }

  async deletarProduto(id: number) {
    try { 
      const produtoExistente = await this.produtoRepository.findOne({
        where: {id}
      });
      await this.produtoRepository.softRemove(produtoExistente);
      return { mensagem: "Produto removido com sucesso!" }
    } catch(e) {
      throw new Error(`Erro ao deletar produto: ${e.message}`);
    }
  }

  async verificarNome(nome: string) {
    const produtoExistente = await this.produtoRepository.findOneBy({
      nome: nome
    })
    if(produtoExistente) throw new ConflictException("Produto com esse nome já cadastrado!")
  }
}
