import { IsEnum, IsOptional } from "class-validator";
import { AuditAction, AuditEntity, StockOutReason, UserRole } from "src/db/enums";

export class SearchAuditDto {
    @IsOptional()
    @IsEnum(AuditAction)
    action?: AuditAction;

    @IsOptional()
    @IsEnum(AuditEntity)
    entity?: AuditEntity;

    @IsOptional()
    @IsEnum(StockOutReason)
    reason?: StockOutReason;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}