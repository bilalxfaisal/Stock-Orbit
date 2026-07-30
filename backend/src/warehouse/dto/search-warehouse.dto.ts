import {
    IsOptional,
    IsString,
    IsInt,
    Min,
    IsNumber,
} from "class-validator";
import { Type } from "class-transformer";

export class SearchWarehouseDto {

    @IsOptional()
    @IsNumber()
    id?: number

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}