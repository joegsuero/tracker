interface TagProps {
  tag: string;
}

function Tag({ tag }: TagProps) {
  return <span className="tag">{tag}</span>;
}

export default Tag;
