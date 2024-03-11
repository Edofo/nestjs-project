import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        example: "nolan@gmail.com",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    email: string;
}
