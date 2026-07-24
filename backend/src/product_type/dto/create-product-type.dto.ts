import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductTypeDto {

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsNumber()
    categoryId!: number
}