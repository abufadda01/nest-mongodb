import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.Schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


// to register our userSchema in user module we add them inside the model imports array and use the MongooseModule.forFeature([{}]) , each object will have the name of the db_model and the schema that define the model structure 
@Module({ 
    imports : [
        MongooseModule.forFeature([
        {
            name : User.name ,
            schema : userSchema
        }
    ])
  ],
    providers: [UsersService],
    controllers: [UsersController]
})


export class UsersModule {}
