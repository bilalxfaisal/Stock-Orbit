import {
    IsInt,
    IsPositive,
    IsString,
    Length,
    Min,
} from "class-validator";

export class StockInProductDto {

    @IsString()
    @Length(2, 100)
    brand!: string;

    @IsString()
    @Length(2, 100)
    model!: string;

    @IsInt()
    @IsPositive()
    price!: number;

    @IsInt()
    @Min(0)
    quantity!: number;

    @IsInt()
    productTypeId!: number;

    @IsInt()
    containerId!: number;
}