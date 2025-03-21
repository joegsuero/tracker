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
      "¿Estás seguro de que quieres eliminar este elemento?",
      {
        title: "Confirmar eliminación",
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
        Añadir Nueva Anotación
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
            {/* Botón de eliminar con icono de basura */}
            <button
              type="button"
              className="delete-button"
              onClick={(event) => handleDelete(event, post.id)}
            >
              <FaTrash /> {/* Icono de cesto de basura */}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostList;
