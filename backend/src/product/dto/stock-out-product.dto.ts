import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { StockOutReason } from "../../db/enums";

export class StockOutProductDto{
    
    @IsNotEmpty()
    @IsInt()
    productId!: number

    @IsNotEmpty()
    @IsInt()
    containerId!: number

    @IsNotEmpty()
    @IsInt()
    quantity!: number

    @IsNotEmpty()
    @IsEnum(StockOutReason)
    reason!: StockOutReason
}