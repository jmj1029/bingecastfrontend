import { useMutation } from "react-query";
import axios from "../axios";
import { Post, PostDto } from "../models/posts/types";
import { toModel } from "../models/posts";

export type CreatePostParams = Pick<
  Post,
  "title" | "description" | "content"
>;

const onMutate = async (params: CreatePostParams) => {
  const { title, description, content } = params;

  const response = await axios.post<{
    data: PostDto;
  }>(
    `/api/posts`,
    {
      data: {
        title,
        description,
        content,
      },
    },
  );

  return toModel(response.data?.data);
};

const useCreatePost = (
  onSuccess?: (
    data: Post | null | undefined,
    variables: CreatePostParams,
    context: any
  ) => void,
  onError?: (error: any, variables: CreatePostParams, context: any) => void
) => {
  return useMutation(onMutate, {
    onSuccess,
    onError,
  });
};

export default useCreatePost;