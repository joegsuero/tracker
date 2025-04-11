import React, { SetStateAction, useState } from "react";
import {
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { confirm } from "@tauri-apps/api/dialog";
import MDEditor from "@uiw/react-md-editor";

interface PostListProps {
  posts: any[];
  onAddPost: () => void;
  onEditPost: (index: number) => void;
  onDeletePost: (id: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

const ITEMS_PER_PAGE = 3;

function PostList({
  posts,
  onAddPost,
  onEditPost,
  onDeletePost,
  currentPage,
  setCurrentPage,
}: PostListProps) {
  const [filter, setFilter] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(filter) ||
      post.title.toLowerCase().includes(filter) ||
      post.tags.toLowerCase().includes(filter)
  );

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      if (currentPosts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="post-list-container">
      <h1 style={{ justifySelf: "self-start" }}>Notes</h1>

      <div className="post-list-container-controls">
        <button className="add-button" onClick={onAddPost}>
          Add new note
        </button>

        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
          placeholder="Write for filter your notes"
          className="search-input"
          required
        />
      </div>
      <ul className="post-list">
        {currentPosts.map((post, index) => (
          <li
            key={index}
            className="post-item"
            onClick={() => onEditPost(post?.id)}
          >
            <h2>{post?.title}</h2>
            <MDEditor.Markdown
              source={post?.content}
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "inherit",
                textOverflow: "ellipsis",
                overflow: "hidden",
                height: "50px",
              }}
            />
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

      {/* Paginación */}
      {posts.length > ITEMS_PER_PAGE && (
        <div className="pagination-controls">
          {/* Botón Ir al inicio */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
            className="pagination-button"
            aria-label="Go to first page"
          >
            <FaAngleDoubleLeft color="white" />
          </button>

          {/* Botón Página anterior */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination-button"
            aria-label="Previous page"
          >
            <FaChevronLeft color="white" />
          </button>

          {/* Indicador de página */}
          <span className="page-indicator">
            Page {totalPages == 0 ? 0 : currentPage} of {totalPages}
          </span>

          {/* Botón Página siguiente */}
          <button
            disabled={totalPages == 0 || currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination-button"
            aria-label="Next page"
          >
            <FaChevronRight color="white" />
          </button>

          {/* Botón Ir al final */}
          <button
            disabled={totalPages == 0 || currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className="pagination-button"
            aria-label="Go to last page"
          >
            <FaAngleDoubleRight color="white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
