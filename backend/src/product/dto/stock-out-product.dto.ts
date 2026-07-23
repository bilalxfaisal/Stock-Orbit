import { IsEnum, IsInt } from "class-validator";
import { StockOutReason } from "../../db/enums";

export class StockOutProductDto{
    
    @IsInt()
    productId!: number

    @IsInt()
    quantity!: number

    @IsEnum(StockOutReason)
    reason!: StockOutReason
}