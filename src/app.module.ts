import {MiddlewareConsumer, Module, NestModule, OnModuleInit} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {BlogsModule} from "./blogs/blogs.module";
import {UsersService} from "./users/users.service";
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        AuthModule,
        UsersModule,
        BlogsModule,
        ProjectsModule,
        TasksModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule  implements OnModuleInit {
    constructor(private readonly usersService: UsersService) {}

    async onModuleInit() {
        await this.seedUser();
    }
    private async seedUser() {
        const adminUsername = 'admin'; // Change this to the email you want to seed
        const existingAdminUser = await this.usersService.findOne(adminUsername);
        if (!existingAdminUser) {
            await this.usersService.create({username: adminUsername, password: '12345678', role: 'admin'}); // Change the password as needed
            console.log('Seeded user created:', adminUsername);
        } else {
            console.log('User already exists:', adminUsername);
        }
        const username = 'shajeel'; // Change this to the email you want to seed
        const existingUser = await this.usersService.findOne(username);
        if (!existingUser) {
            await this.usersService.create({username: username, password: '12345678'});// Change the password as needed
            console.log('Seeded user created:', username);
        } else {
            console.log('User already exists:', username);
        }
    }
}


