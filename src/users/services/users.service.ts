import { UpdateUserDto } from '../dtos/UpdateUser.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User } from 'src/schemas/User.Schema';
import { UserSettings } from 'src/schemas/UserSettings.schema';


// then we will use our User Service class to interact with our db , and apply full logic implementation , by inject our user schema model in our service class
// inside our constructor by use decorator @InjectModel(model_name_as_we_define_it_in_the_module)  its_access_modifier_type  var_to_access_it : Model_data_type <generic_type_that_will_be_our_schema_class>  
// then we can access any of the mongodb methods using the defined instance userModel
@Injectable()
export class UsersService { 
    
    constructor(@InjectModel(User.name) private userModel : Model <User> , @InjectModel(UserSettings.name) private userSettingsModel : Model <UserSettings>){}
    
    // createUserDto WILL BE OBJECT THAT HAVE THE EXPECTED keys VALUES THAT WILL CAME FOMR THE USER REQ BODY , AND THE DTO STRUCTURE LOOKS LIKE OUR SCHEMA DEFINITION IN MOST CASES , NOT ALL FIELDS IN OUR SCHEMA MUST EXIST IN OUR DTO DEFINITION , WE USALLY USE THE DTO TO VALIDATE OUR DATA AND OUR REQUIRED KEYS THAT CAME FROM OUR REQ BODY
    // and the service will get the dto obj from the controller as a parameter after it been validated
    async createUser({settings , ...createUserDto} : CreateUserDto) : Promise <User>{ // we must first check that if the user is try to create a userSettings doc object because we can't add the ref key to the user doc object and we still dont have the userSettings doc object
        
        // if i have a settings key in my req body then i want to create db doc object for this before add it as a ref key in the user doc object
        if(settings){

            const newUserSettings = new this.userSettingsModel(settings)
            await newUserSettings.save()

            const newUser = new this.userModel({
                ...createUserDto ,
                settings : newUserSettings._id 
            })

            return newUser.save()
 
        }

        const newUser = new this.userModel({...createUserDto})
        return newUser.save()  
    
    }


 
    getUsers(page : number) : Promise <User[]>{
        return this.userModel.find().skip((page - 1) * 10)
    }



    // we could add the process of error handling in both service file and the controller
    async getUserById(id : string) : Promise <User>{

        const isValidId = mongoose.Types.ObjectId.isValid(id)
        
        if(!isValidId){
            throw new HttpException("Invalid user id" , 400)
        }

        const user = await this.userModel.findById(id).populate("settings")

        if(!user){
            throw new HttpException("user not found" , 404)
        }

        return user
    }



    async updateUser(updateUserDto : UpdateUserDto , id : string) : Promise <User>{

        const isValidId = mongoose.Types.ObjectId.isValid(id)
        
        if(!isValidId){
            throw new HttpException("Invalid user id" , 400)
        }

        const user = await this.userModel.findById(id)

        if(!user){
            throw new HttpException("user not found" , 404)
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(id , {...updateUserDto} , {new : true})

        return updatedUser

    }



    async deleteUser(id : string) {

        const isValidId = mongoose.Types.ObjectId.isValid(id)
        
        if(!isValidId){
            throw new HttpException("Invalid user id" , 400)
        }

        const user = await this.userModel.findById(id)

        if(!user){
            throw new HttpException("user not found" , 404)
        }

        await this.userModel.findByIdAndDelete(id)

        return {msg : "user deleted successfully"}

    }

 

} 
