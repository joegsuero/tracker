import React, { useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { confirm } from "@tauri-apps/api/dialog";

interface PostListProps {
  posts: any[];
  onAddPost: () => void;
  onEditPost: (index: number) => void;
  onDeletePost: (id: number) => void;
}

const ITEMS_PER_PAGE = 3;
const MAX_CONTENT_LENGTH = 150;

function PostList({
  posts,
  onAddPost,
  onEditPost,
  onDeletePost,
}: PostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  const currentPosts = posts.slice(
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
        {currentPosts
          .filter(
            (post) =>
              post.content.toLowerCase().includes(filter) ||
              post.title.toLowerCase().includes(filter) ||
              post.tags.toLowerCase().includes(filter)
          )
          .map((post, index) => (
            <li
              key={index}
              className="post-item"
              onClick={() =>
                onEditPost((currentPage - 1) * ITEMS_PER_PAGE + index)
              }
            >
              <h2>{post.title}</h2>
              <p className="post-content" title={post.content}>
                {truncateText(post.content, MAX_CONTENT_LENGTH)}
              </p>
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
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination-button"
          >
            <FaChevronLeft color="white" />
          </button>

          <span className="page-indicator">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination-button"
          >
            <FaChevronRight color="white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
