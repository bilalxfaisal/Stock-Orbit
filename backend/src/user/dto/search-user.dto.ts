import { IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "src/db/enums";

export class SearchUserDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}