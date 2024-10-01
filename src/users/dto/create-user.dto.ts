import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role?: string; // Optional, default is 'user'
}
