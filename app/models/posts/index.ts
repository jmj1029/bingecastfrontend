import { Post, PostDto } from "./types";

export const toModel = (postDto: PostDto): Post => ({
  ...postDto,
  createdAt: postDto?.created_at ? new Date(postDto?.created_at) : undefined,
});