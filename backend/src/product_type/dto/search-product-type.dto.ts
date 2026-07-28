import { Type } from "class-transformer";
import {
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from "class-validator";

export class SearchProductTypeDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}