import { useState } from "react";
import EditorContainer from "./EditorContainer";
import MDEditor from "@uiw/react-md-editor";

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
  const [isMarkdown, setIsMarkdown] = useState(false);

  const exit = () => {
    setTitle("");
    setContent("");
    setTags("");
    onCancel();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      id != 0
        ? { id, title, content, tags: tags }
        : { title, content, tags: tags }
    );
    setTitle("");
    setContent("");
    setTags("");
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{id ? "Edit" : "Add"} note</h1>
        <button
          className="mkd-button"
          onClick={(e) => {
            e.preventDefault();
            setIsMarkdown(!isMarkdown);
          }}
        >
          {isMarkdown ? "Markdown" : "Conventional"}
        </button>
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="title-input"
        required
      />

      {isMarkdown ? (
        <div>
          <MDEditor
            style={{ minHeight: "350px" }}
            value={content}
            onChange={setContent}
          />
          {/* <MDEditor.Markdown
            source={content}
            style={{ whiteSpace: "pre-wrap" }}
          /> */}
        </div>
      ) : (
        <EditorContainer
          placeholder={"Write here your entry..."}
          content={content}
          setContent={setContent}
        />
      )}
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (separated by commas)"
        className="tags-input"
      />
      <div className="form-buttons">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" className="cancel-button" onClick={exit}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default PostForm;
