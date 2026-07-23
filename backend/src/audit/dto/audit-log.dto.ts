import { IsEnum } from "class-validator";
import { AuditAction, AuditEntity, StockOutReason, UserRole } from "src/db/enums";

export class AuditLogDto {

    @IsEnum(AuditAction)
    action!: AuditAction;

    @IsEnum(AuditEntity)
    entity!: AuditEntity;

    entityId!: number;
    quantity?: number;

    @IsEnum(StockOutReason)
    reason?: StockOutReason;

    @IsEnum(UserRole)
    role?: UserRole;
    
    description?: string;
}