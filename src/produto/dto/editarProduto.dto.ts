import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsString } from "class-validator";
import { Categoria } from "src/database/entities/Categoria";

export class EditarProdutoDto {
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
    @IsString()
    estoque: string;

    @Expose()
    @IsDefined()
    @IsNumber()
    valor: string;
    
    @Expose()
    categoria: Categoria
}