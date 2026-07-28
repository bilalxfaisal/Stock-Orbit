import { IsEnum, IsOptional } from "class-validator";
import { AuditAction, AuditEntity } from "src/db/enums";

export class SearchAuditDto {
    @IsOptional()
    @IsEnum(AuditAction)
    action?: AuditAction;

    @IsOptional()
    @IsEnum(AuditEntity)
    entity?: AuditEntity;
}