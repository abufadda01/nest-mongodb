import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { User } from 'src/schemas/User.Schema';


// then we will use our User Service class to interact with our db , and apply full logic implementation , by inject our user schema model in our service class
// inside our constructor by use decorator @InjectModel(model_name_as_we_define_it_in_the_module)  its_access_modifier_type  var_to_access_it : Model_data_type <generic_type_that_will_be_our_schema_class>  
// then we can access any of the mongodb methods using the defined instance userModel
@Injectable()
export class UsersService {
    
    constructor(@InjectModel(User.name) private userModel : Model <User>){}
    
    // createUserDto WILL BE OBJECT THAT HAVE THE EXPECTED VALUES THAT WILL CAME FOMR THE USER REQ BODY , AND THE DTO STRUCTURE LOOKS LIKE OUR SCHEMA DEFINITION IN MOST CASES , NOT ALL FIELDS IN OUR SCHEMA MUST EXIST IN OUR DTO DEFINITION , WE USALLY USE THE DTO TO VALIDATE OUR DATA AND OUR REQUIRED KEYS THAT CAME FROM OUR REQ BODY
    createUser(createUserDto : CreateUserDto){
        const newUser = new this.userModel(createUserDto)
        return newUser.save()
    }

}
