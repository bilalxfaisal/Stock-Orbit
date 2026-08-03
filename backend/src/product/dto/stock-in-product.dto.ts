import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
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

    // Only required when stockConfig.allowManualContainerSelection is true.
    // When false, this is ignored and a container is chosen automatically.
    @IsOptional()
    @IsInt()
    containerId?: number;
}