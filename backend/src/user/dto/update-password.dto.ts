import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class UpdatePasswordDto{

    @IsString()
    @IsNotEmpty()
    oldPassword!: string

    @IsString()
    @IsNotEmpty()
    newPassword!: string
}