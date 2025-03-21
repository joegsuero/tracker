import Tag from "./Tag";

interface PostItemProps {
  post: any;
  onClick: () => void;
}

function PostItem({ post, onClick }: PostItemProps) {
  return (
    <li className="post-item" onClick={onClick}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="tags">
        {post.tags.map((tag: string, idx: number) => (
          <Tag key={idx} tag={tag} />
        ))}
      </div>
    </li>
  );
}

export default PostItem;
