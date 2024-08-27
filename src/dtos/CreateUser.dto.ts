import { IsNotEmpty, IsString } from "class-validator"


export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username : string

    @IsNotEmpty()
    displayName? : string
}