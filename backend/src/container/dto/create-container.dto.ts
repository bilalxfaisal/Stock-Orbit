import { IsString, Length, IsInt, IsPositive, Matches, Min } from "class-validator";

export class CreateContainerDto {
    @IsString()
    @Length(5, 5)
    code!: string;

    @IsInt()
    @IsPositive()
    maximumCapacity!: number;

    @IsInt()
    @IsPositive()
    categoryId!: number;

    @IsInt()
    @IsPositive()
    warehouseId!: number;
}