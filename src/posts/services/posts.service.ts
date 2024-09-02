import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schema';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { User } from 'src/schemas/User.Schema';


@Injectable()
export class PostsService {

    constructor(@InjectModel(Post.name) private postModel : Model <Post> , @InjectModel(User.name) private readonly userModel: Model<User>,){}


    async createPost(createPostDto : CreatePostDto , id : string) : Promise <Post>{

        const user = await this.userModel.findById(id)

        if(!user){
            throw new HttpException("user not found" , 404)
        }

        const newPost = new this.postModel(createPostDto)
        const savedPost = await newPost.save()

        // user.posts.push(savedPost._id) way one
        this.userModel.findByIdAndUpdate(id , {$push : {posts : savedPost._id}} , {new : true})

        return savedPost
     
    }

 

    async findPostById(id : string) : Promise <Post>{

        const post = await this.postModel.findById(id)

        if(!post){
            throw new HttpException("post not found" , 404)
        }

        return post
    }

    
}
