import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";
import { Categoria } from "src/database/entities/Categoria";

export class CriarProdutoDto {
    @Expose()
    @IsDefined()
    @IsString()
    nome: string;

    @Expose()
    @IsDefined()
    @IsString()
    descricao: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    estoque: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    valor: number; 

    @Expose()
    @IsDefined()
    @IsNumber()
    categoriaId: number
}