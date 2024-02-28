import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from 'src/database/entities/Produto';
import { Categoria } from 'src/database/entities/Categoria';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), TypeOrmModule.forFeature([Categoria])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
