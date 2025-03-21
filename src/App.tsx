import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./App.css";

interface Post {
  id?: number;
  title: string;
  content: string;
  tags: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState("");

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
      <h1>Anotaciones</h1>
      {errors && <span className="error">{errors}</span>}
      {!isEditing ? (
        <PostList
          posts={posts}
          onAddPost={() => setIsEditing(true)}
          onEditPost={(index) => {
            setIsEditing(true);
            setCurrentPost(index);
          }}
          onDeletePost={handleDeletePost}
        />
      ) : (
        <PostForm
          id={currentPost !== null ? posts[currentPost].id ?? 0 : 0}
          post={currentPost !== null ? posts[currentPost] : null}
          onSave={handleSavePost}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </main>
  );
}

export default App;
