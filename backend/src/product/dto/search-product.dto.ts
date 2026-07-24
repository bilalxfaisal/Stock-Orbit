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
  @IsNotEmpty()
  @IsNumberString()
  categoryId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  productTypeId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  containerId?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  minQuantity?: number;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  maxQuantity?: number;

  // Sorting

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(ProductSortBy)
  sortBy?: ProductSortBy;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SortOrder)
  order?: SortOrder;

  // Pagination

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  page = 1;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  limit = 10;
}