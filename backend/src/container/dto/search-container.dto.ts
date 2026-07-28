import {
    IsInt,
    IsOptional,
    IsString,
    Min,
} from "class-validator";

import { Type } from "class-transformer";

export class SearchContainerDto {

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    warehouseId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    categoryId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    minCapacity?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    maxCapacity?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;
}