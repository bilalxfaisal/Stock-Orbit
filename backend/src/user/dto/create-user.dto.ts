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

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password!: string;

    @Matches(/^03\d{9}$/, {
        message: "Phone number must be in the format 03XXXXXXXXX",
    })
    @IsString()
    phoneNumber!: string;

    @IsEnum(UserRole)
    role!: UserRole;
}