import PostDetail from "./PostDetail";

async function getData(id: string) {
  const res = await fetch(`http://localhost:4000/api/posts/${id}`);
  
  if (!res.ok) {
    return [];
  }

  return res.json();
}

interface PostDetailProps {
  params: {
    id: string;
  };
}

const PostDetailPage: React.FC<PostDetailProps> = async ({ params }) => {
  const { id } = params || {};

  const response: any = await getData(id);

  return <PostDetail {...response.data} />;
};

export default PostDetailPage;