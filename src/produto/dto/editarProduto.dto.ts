import { Expose } from "class-transformer";
import { IsDefined, IsNumber, } from "class-validator";

export class EditarProdutoDto{
    @Expose()
    @IsDefined()
    @IsNumber()
    valor: number;

    @Expose()
    @IsDefined()
    @IsNumber()
    estoque: number;
}