import {
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    Length,
    Min,
} from "class-validator";

export class StockInProductDto {
    
    @IsNotEmpty()
    @IsString()
    brand!: string;

    @IsNotEmpty()
    @IsString()
    model!: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    price!: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @IsPositive()
    quantity!: number;

    @IsInt()
    @IsNotEmpty()
    productTypeId!: number;

    @IsNotEmpty()
    @IsInt()
    containerId!: number;
}