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

  @Get('like/:nome')
  @ApiResponse( {status: 200, type: UsuariosResponse })
  buscarUsuarioNome(@Param('nome') nome: string) {
    return this.usuarioService.listarUsuariosPorNome(nome)
  }

  @Post()
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CriarUsuarioDto })
  criarUsuario(@Body(ValidationPipe) criarUsuarioDto: CriarUsuarioDto) {
    return this.usuarioService.criarUsuario(criarUsuarioDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200 })
  async atualizarUsuario(
    @Param('id') id: number,
    @Body(ValidationPipe) editarUsuarioDto: EditarUsuarioDto,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizarUsuario(
      id,
      editarUsuarioDto,
    );
    return usuarioAtualizado;
  }

  @Delete(':id')
  @ApiResponse({ status: 200 })
  deletarUsuario(@Param('id') id: number) {
    return this.usuarioService.deletarUsuario(id);
  }
}
