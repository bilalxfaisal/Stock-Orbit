import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsInt,
    IsPhoneNumber,
    IsString,
    MinLength,
    Matches,
} from "class-validator";
import { UserRole } from "src/db/enums";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;

    @IsNotEmpty()
    @Matches(/^03\d{9}$/, {
        message: "Phone number must be in the format 03XXXXXXXXX",
    })
    @IsString()
    phoneNumber!: string;
    
    @IsNotEmpty()
    @IsEnum(UserRole)
    role!: UserRole;
}