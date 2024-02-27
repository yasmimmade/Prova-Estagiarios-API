import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";

export class CriarProdutoDto{
    @Expose()
    @IsDefined()
    @IsString()
    nome: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    valor: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    estoque: number;

    @Expose()
    @IsDefined()
    @IsString()
    descricao: string;
}