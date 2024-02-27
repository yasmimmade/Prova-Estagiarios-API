import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ProdutosResponse {
  @Expose()
  id: number;

  @Expose()
  nome: string;

  @Expose()
  valor: number;
  
  @Expose()
  estoque: number;

  @Expose()
  descricao: string;
}

export class ListarProdutosResponse {
  @Expose()
  produtos: ProdutosResponse[];
}