import Link from "next/link";

interface PostItemProps {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
}

const PostCard: React.FC<PostItemProps> = ({
  id,
  title,
  description,
  createdAt,
}) => {
  return (
    <div
      key={id}
      className="max-w-xl"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={createdAt?.toString()} className="text-gray-500">
          {createdAt?.toLocaleDateString()}
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={`/posts/${id}`}>{title}</Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PostCard;