import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from '../dtos/CreatePost.dto';


@Injectable()
export class PostsService {

    constructor(@InjectModel(Post.name) private postModel : Model <Post>){}


    async createPost(createPostDto : CreatePostDto){
        const newPost = new this.postModel(createPostDto)
        return await newPost.save()
    }


    findPostById(){

    }

}
