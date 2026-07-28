import {
    IsInt,
    IsOptional,
    IsString,
    Min,
} from "class-validator";
import { Type } from "class-transformer";

export class SearchInventoryDto {

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    productId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    containerId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    categoryId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    productTypeId?: number;

    @IsOptional()
    @Type(() => Number)
    @Min(0)
    minQuantity?: number;

    @IsOptional()
    @Type(() => Number)
    @Min(0)
    maxQuantity?: number;

    @IsOptional()
    @Type(() => Number)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    limit?: number = 10;
}