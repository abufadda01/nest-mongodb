import { PostsService } from './../services/posts.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatePostDto } from "../dtos/CreatePost.dto";
import { Post as PostScehma } from 'src/schemas/Post.schema';



@Controller('posts')
export class PostsController {

    constructor(private postsService : PostsService){}


    @Post("/:id")
    @UsePipes(new ValidationPipe()) // the validation of the dto class will run first then the validation of the schema 
    createPost(@Body() createPostDto : CreatePostDto , @Param("id") id : string) : Promise <PostScehma>{
        return this.postsService.createPost(createPostDto , id)
    }


    @Get("/:id")
    findPostById(@Param("id") id : string) : Promise <PostScehma>{
        return this.postsService.findPostById(id)
    }

}
