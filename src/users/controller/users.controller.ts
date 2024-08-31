import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/dtos/UpdateUser.dto';
import { UsersService } from '../services/users.service';



@Controller('users')
export class UsersController {

    // inject our service in the controller to access the full imp logic in the service
    constructor(private usersService : UsersService){}


    @Post()
    @UsePipes(new ValidationPipe()) // will check the validation from the dto class first then the schema validation will be checked since the createUser function from the service use the users model inside it
    createUser(@Body() createUserDto : CreateUserDto){  
        console.log(createUserDto)
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


    @Patch("/:id")
    @UsePipes(new ValidationPipe())
    async updateUser(@Body() updateUserDto : UpdateUserDto , @Param("id") id : string){
        return this.usersService.updateUser(updateUserDto , id)    
    }


    @Delete("/:id")
    deleteUser(@Param("id") id : string){
        return this.usersService.deleteUser(id)
    }


}
 