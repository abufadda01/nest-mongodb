import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { UserSettings } from "./UserSettings.schema";
import { Post } from "./Post.schema";


@Schema() // to detect that this class is will be a mongodb schema definition
export class User{

    @Prop({unique : true}) // stands for property({options_for_validation})
    username : string

    @Prop({required : false})
    displayName? : string // add ? to trigger that the displayName key value could be undefined 

    @Prop({required : false})
    avatar? : string

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "UserSettings"}) // this will be a ref id key to other schema
    settings : UserSettings
    
    @Prop({type : [{type : mongoose.Schema.Types.ObjectId , ref : "Post"}]}) // this will be a ref id key to other schema
    posts : Types.ObjectId[]

}


export const userSchema = SchemaFactory.createForClass(User) // to create the actual mongodb schema from this class definition