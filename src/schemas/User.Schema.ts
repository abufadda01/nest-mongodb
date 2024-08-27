import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema() // to detect that this class is will be a mongodb schema definition
export class User{

    @Prop({unique : true}) // stands for property({options_for_validation})
    username : string

    @Prop({required : false})
    displayName? : string // add ? to trigger that the displayName key value could be undefined 

    @Prop({required : false})
    avatar? : string

}


export const userSchema = SchemaFactory.createForClass(User) // to create the actual mongodb schema from this class definition