import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        example: "Nolan",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: "nolan@gmail.com",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    email: string;
}
