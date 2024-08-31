import { Body, Controller, Get, HttpException, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';


@Controller('users')
export class UsersController {

    // inject our service in the controller to access the full imp logic in the service
    constructor(private usersService : UsersService){}


    @Post()
    @UsePipes(new ValidationPipe()) // will check the validation from the dto class first then the schema validation will be checked since the createUser function use the users model inside it
    createUser(@Body() createUserDto : CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }


    @Get()
    getUsers(@Query("page") page : number | 1){
        return this.usersService.getUsers(page)
    }


    @Get("/:id")
    async getUserById(@Param("id") id : string){    
        return this.usersService.getUserById(id)
    }





}
 