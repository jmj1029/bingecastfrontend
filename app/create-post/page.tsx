"use client";

import useCreatePost, { CreatePostParams } from "@/app/hooks/useCreatePost";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../components/form/i";
import FormMarkDownInput from "../components/form/FormMarkDownInput";
import Button from "../components/atoms/Button";

const CreatePost: React.FC = () => {
  const router = useRouter();
  const schema = yup.object().shape({
    title: yup.string().nullable().required("Please input title"),
    description: yup.string().nullable().required("Please input description"),
    content: yup.string().nullable().required("Please input content"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostParams>({
    resolver: yupResolver(schema),
  });

  const { mutate: createPost, isLoading: isSubmitting } = useCreatePost(
    (data) => {
      toast.success("Post created successfully");
      data?.id && router.push(`/posts/${data.id}`);
    },
    () => {
      toast.error("Something went wrong while creating post");
    }
  );

  const onSubmit = (values: CreatePostParams) =>
    createPost({
      ...values,
    });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Post
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-7xl px-8">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Title"
            name="title"
            containerClassName="max-w-md mx-auto"
            control={control}
            error={errors.title}
          />
          <FormInput
            containerClassName="max-w-md mx-auto"
            label="Description"
            name="description"
            control={control}
            error={errors.description}
          />
          <FormMarkDownInput
            label={"Content"}
            control={control}
            name="content"
            error={errors.content}
          />
          <div className="w-full flex items-center justify-center space-x-2">
            <Button
              className="!w-32"
              variant="white"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button className="!w-32" type="submit" loading={isSubmitting}>
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;