import React from "react";
import { FaTrash } from "react-icons/fa"; // Importa el icono de basura de React Icons
import { confirm } from "@tauri-apps/api/dialog";

interface PostListProps {
  posts: any[];
  onAddPost: () => void;
  onEditPost: (index: number) => void;
  onDeletePost: (id: number) => void;
}

function PostList({
  posts,
  onAddPost,
  onEditPost,
  onDeletePost,
}: PostListProps) {
  const handleDelete = async (event: React.MouseEvent, id: number) => {
    event.stopPropagation();

    const confirmDelete = await confirm(
      "Are you sure you want to delete this item?",
      {
        title: "Delete confirmation",
        type: "warning",
      }
    );

    if (confirmDelete) {
      onDeletePost(id);
    }
  };

  return (
    <>
      <button className="add-button" onClick={onAddPost}>
        Add new entry
      </button>
      <ul className="post-list">
        {posts.map((post, index) => (
          <li
            key={index}
            className="post-item"
            onClick={() => onEditPost(index)}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="tags">
              {post.tags.length > 0 &&
                post.tags.split(",").map((tag: string, idx: number) => (
                  <span key={idx} className="tag">
                    {tag}
                  </span>
                ))}
            </div>
            <button
              type="button"
              className="delete-button"
              onClick={(event) => handleDelete(event, post.id)}
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostList;
