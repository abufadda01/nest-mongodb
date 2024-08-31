import { PostsService } from './../services/posts.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatePostDto } from "../dtos/CreatePost.dto";



@Controller('posts')
export class PostsController {

    constructor(private postsService : PostsService){}


    @Post()
    @UsePipes(new ValidationPipe()) // the validation of the dto will run first then the validation of the schema 
    createPost(@Body() createPostDto : CreatePostDto){
        return this.postsService.createPost(createPostDto)
    }

}
