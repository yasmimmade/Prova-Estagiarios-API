import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/database/entities/Usuario';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from './dto/criarUsuario.dto';
import {
  ListarUsuariosResponse,
  UsuariosResponse,
} from './response/listarUsuarios.response';
import { plainToClass } from 'class-transformer';
import { EditarUsuarioDto } from './dto/editarUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async listarUsuarios(): Promise<ListarUsuariosResponse> {
    //Lista os usuarios ordenando pelo nome
    const usuariosExistentes = await this.usuarioRepository.find({
      order: {
        nome: 'ASC', // 'ASC' para ordem crescente, 'DESC' para ordem decrescente
      },
    });

    const response = new ListarUsuariosResponse();

    response.usuarios = plainToClass(UsuariosResponse, usuariosExistentes);
    return response;
  }

  async listarUsuariosPorNome(nome: string): Promise<ListarUsuariosResponse> {
    // Lista usuarios parecidos com o nome fornecido
    const usuariosExistentes = await this.usuarioRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
      order: {
        nome: 'ASC',
      },
    });

    const response = new ListarUsuariosResponse();
    response.usuarios = plainToClass(UsuariosResponse, usuariosExistentes);

    return response;
  }

  async buscarUsuarioId(id: number): Promise<UsuariosResponse> {
    // Retorna usuario com o id fornecido
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioExistente) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const response = plainToClass(UsuariosResponse, usuarioExistente);

    return response;
  }

  async criarUsuario(usuarioDto: CriarUsuarioDto) {
    const { nome, email, senha } = usuarioDto;
    try {
      // Criptografando a senha recebida
      const senhaCriptografada = await bcrypt.hash(senha, 10); // 10 é o custo do hash, quanto maior, mais seguro

      //Criando um objeto do tipo Usuario
      const novoUsuario = new Usuario();
      novoUsuario.nome = nome;
      novoUsuario.email = email;
      novoUsuario.senha = senhaCriptografada;

      //Salvando Usuario criado no banco
      await this.usuarioRepository.save(novoUsuario);
    } catch (e) {
      throw new Error(`Erro ao criar usuário: ${e.message}`);
    }
  }

  async atualizarUsuario(id: number, editarUsuarioDto: EditarUsuarioDto) {
    try {
      // usuarioExistente.nome = usuarioDto.nome;
      // usuarioExistente.email = usuarioDto.email;
      //   await this.usuarioRepository.save(usuarioExistente);
    } catch (e) {
      throw new Error(`Erro ao atualizar usuário: ${e.message}`);
    }
  }

  async deletarUsuario(id: number) {
    try {
      const usuarioExistente = await this.usuarioRepository.findOne({
        where: { id },
      });

      await this.usuarioRepository.softRemove(usuarioExistente);
    } catch (e) {
      throw new Error(`Erro ao deletar usuário: ${e.message}`);
    }
  }
}
