export interface PostDto {
    id: string;
    title: string;
    description: string;
    content: string;
    created_at?: string;
  }
  
  export interface Post {
    id: string;
    title: string;
    description: string;
    content: string;
    createdAt?: Date;
  }