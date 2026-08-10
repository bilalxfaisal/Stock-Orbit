import { Type } from "class-transformer";
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { ProductSortBy, SortOrder } from "src/db/enums";

export class SearchProductDto {
  // Filters

  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  productTypeId?: number;

  @IsOptional()
  @IsNumberString()
  containerId?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minQuantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxQuantity?: number;

  // Sorting

  @IsOptional()
  @IsEnum(ProductSortBy)
  sortBy?: ProductSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;

  // Pagination

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit = 10;
}