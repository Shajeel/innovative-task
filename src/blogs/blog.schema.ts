import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogPostDocument = BlogPost & Document;

@Schema()
export class BlogPost {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    author: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
