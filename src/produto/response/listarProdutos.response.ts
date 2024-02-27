import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ProdutoResponse {
    @Expose()
    id: number;

    @Expose()
    nome: string

    @Expose()
    descricao: string

    @Expose()
    estoque: number

    @Expose()
    valor: number
}

export class ListarProdutosResponse {
    @Expose()
    produtos: ProdutoResponse[];
}