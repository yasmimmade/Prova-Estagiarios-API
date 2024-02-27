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

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
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

  async criarProduto(produtoDto: CriarProdutoDto) {
    const { nome, descricao, estoque, valor } = produtoDto;
    await this.verificarNome(nome)
    try {
      const novoProduto = new Produto()

      novoProduto.nome = nome;
      novoProduto.descricao = descricao;
      novoProduto.estoque = estoque;
      novoProduto.valor = valor;

      await this.produtoRepository.save(novoProduto)

      return { mensagem: "Produto cadastrado com sucesso!" }
    } catch(e) {
      throw new Error(`Erro ao cadastrar um produto: ${e.mensagem}`)
    }
  }

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

  async verificarNome(nome: string) {
    const usuarioExistente = await this.produtoRepository.findOneBy({
      nome: nome
    })
    if(usuarioExistente) throw new ConflictException("Produto com esse nome já cadastrado!")
  }

  async atualizarProduto(id: number, editarUsuarioDto: EditarProdutoDto) {
    const produtoExistente = await this.produtoRepository.findOneBy({
      id: id
    })

    await this.verificarNome(produtoExistente.nome)
    try {
      produtoExistente.nome = editarUsuarioDto.nome;
      produtoExistente.descricao = editarUsuarioDto.descricao;
      // produtoExistente.estoque = editarUsuarioDto.estoque;
      // produtoExistente.valor = editarUsuarioDto.valor;
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
}
