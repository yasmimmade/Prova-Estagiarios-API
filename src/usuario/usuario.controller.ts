import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { CriarUsuarioDto } from './dto/criarUsuario.dto';
import {
  ListarUsuariosResponse,
  UsuariosResponse,
} from './response/listarUsuarios.response';
import { EditarUsuarioDto } from './dto/editarUsuario.dto';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiResponse({ status: 200, type: ListarUsuariosResponse })
  listarUsuarios(): Promise<ListarUsuariosResponse> {
    return this.usuarioService.listarUsuarios();
  }

  @Get('by/:id')
  @ApiResponse({ status: 200, type: UsuariosResponse })
  buscarUsuarioId(@Param('id') id: number): Promise<UsuariosResponse> {
    return this.usuarioService.buscarUsuarioId(id);
  }

  @Post()
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CriarUsuarioDto })
  criarUsuario(@Body(ValidationPipe) criarUsuarioDto: CriarUsuarioDto) {
    this.usuarioService.criarUsuario(criarUsuarioDto)
    return "Usuário criado com sucesso"
  }

  @Get('by/name/:nome')
  @ApiResponse({ status: 200, type: UsuariosResponse })
  listarUsuariosPorNome(@Param('nome') nome: string): Promise<ListarUsuariosResponse>{
    return this.usuarioService.listarUsuariosPorNome(nome);
  }

  @Patch(':id')
  @ApiResponse({ status: 200 })
  async atualizarUsuario(
    @Param('id') id: number,
    @Body(ValidationPipe) editarUsuarioDto: EditarUsuarioDto,
  ) {
    await this.usuarioService.atualizarUsuario(id, editarUsuarioDto);

    return 'Usuário editado com sucesso';
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  deletarUsuario(@Param('id') id: number) {
    this.usuarioService.deletarUsuario(id);

    return "Usuário deletado com sucesso"
  }
}
