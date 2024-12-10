"use client";

import { Post } from "@/app/models/posts/types";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import Loading from "../../components/atoms/Loading";
import useQueryPostList from "../../hooks/useQueryPostList";
import EmptyMessage from "../EmptyMessage";
import Introduction from "../Introduction";
import PostCard from "../PostCard";
import Button from "@/app/components/atoms/Button";
import { useRouter } from "next/navigation";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { data: postList, isLoading, isError } = useQueryPostList(posts);
  const router = useRouter();

  const onGoToCreatePage = () => {
    router.push("/create-post");
  };

  if (isLoading)
    return (
      <div className="my-24">
        <Loading />
      </div>
    );

  if (isError || !postList) return <ErrorMessage />;

  return (
    <main>
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto lg:mx-0 w-full md:flex justify-between items-center">
            <Introduction />
            <div className="mt-8 md:mt-0 md:text-right">
              <Button
                className="px-6 py-3.5 text-lg font-semibold"
                onClick={onGoToCreatePage}
              >
                Create
              </Button>
            </div>
          </div>
          <div className="mx-auto max-w-7xl border-t border-gray-200 pt-10 mt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
            {postList.length === 0 ? (
              <EmptyMessage />
            ) : (
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 w-full lg:grid-cols-3">
                {postList.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostList;