import { IsString, IsOptional } from 'class-validator';

export class UpdateBlogDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    author?: string;
}
