import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"



export class CreateUserSettingsDto{
    
    @IsOptional()
    @IsBoolean()
    receiveNotifications? : boolean
    
    @IsOptional()
    @IsBoolean()
    receiveEmails? : boolean
    
    @IsOptional()
    @IsBoolean()
    receiveSMS? : boolean

}



export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username : string

    @IsString()
    @IsOptional()
    displayName? : string
    
    @IsOptional()
    @ValidateNested() // to ensure that we also validate this key when we trigger that (new ValidationPipe) pipe because its also a dto but a dto inside dto (nested)
    settings? : CreateUserSettingsDto

}