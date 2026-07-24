import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateWarehouseDto {

    @IsNotEmpty()
    @IsString()
    @Length(5, 5)
    code!: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 255)
    location!: string;
}