import { useState } from "react";

interface PostFormProps {
  id: number;
  post: any;
  onSave: (post: any) => void;
  onCancel: () => void;
}

function PostForm({ id, post, onSave, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState(post?.tags || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      id != 0
        ? { id, title, content, tags: tags }
        : { title, content, tags: tags }
    );
    setTitle("");
    setContent("");
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="title-input"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write here your entry..."
        className="content-textarea"
        required
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (separated by commas)"
        className="tags-input"
      />
      <div className="form-buttons">
        <button type="submit" className="save-button">
          Guardar
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default PostForm;
