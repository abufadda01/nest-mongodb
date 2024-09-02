import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema , Post } from 'src/schemas/Post.schema';
import { User, userSchema } from 'src/schemas/User.Schema';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './services/posts.service';


@Module({ 
    imports : [
        // to register our post schema in our post module
        MongooseModule.forFeature([ 
            {
                name : Post.name ,
                schema : postSchema
            },
            {
                name : User.name ,
                schema : userSchema
            }
        ])
    ],
    providers: [PostsService],
    controllers: [PostsController]
})


export class PostsModule {}
