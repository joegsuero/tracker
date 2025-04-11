import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

interface Post {
  id?: number;
  title: string;
  content: string;
  tags: string;
}

function Entries() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const posts: Post[] = await invoke("get_posts_command");
    setPosts(posts);
  };

  const handleSavePost = async (post: Post) => {
    try {
      await invoke(post.id ? "update_post_command" : "save_post_command", {
        ...post,
      });
      fetchPosts();
      setIsEditing(false);
      setCurrentPost(null);
      setErrors("");
    } catch (e: any) {
      setErrors(e);
    }
  };

  const handleDeletePost = async (id: number) => {
    await invoke("delete_post_command", { postId: id });
    fetchPosts();
  };

  return (
    <main className="container">
      {errors && <span className="error">{errors}</span>}
      {!isEditing ? (
        <PostList
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          posts={posts}
          onAddPost={() => setIsEditing(true)}
          onEditPost={(id) => {
            setIsEditing(true);
            setCurrentPost(id);
          }}
          onDeletePost={handleDeletePost}
        />
      ) : (
        <PostForm
          id={currentPost !== null ? currentPost ?? 0 : 0}
          post={
            currentPost !== null
              ? posts.find((post) => post?.id == currentPost)
              : null
          }
          onSave={handleSavePost}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </main>
  );
}

export default Entries;
