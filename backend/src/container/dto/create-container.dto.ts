import { IsString, Length, IsInt, IsPositive, Matches, Min, IsNotEmpty } from "class-validator";

export class CreateContainerDto {

    @IsNotEmpty()
    @IsString()
    @Length(5, 5)
    code!: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    maximumCapacity!: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    categoryId!: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    warehouseId!: number;
}