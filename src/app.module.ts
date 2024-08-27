import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


// inside the imports array we add all our app modules , db connection
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://laith:Laithfadda123@cluster0.sy1ihfy.mongodb.net/nest-course"), 
    UsersModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
