import { IsString, Length } from "class-validator";

export class CreateWarehouseDto {
    @IsString()
    @Length(5, 5)
    code!: string;

    @IsString()
    @Length(3, 100)
    name!: string;

    @IsString()
    @Length(3, 255)
    location!: string;
}