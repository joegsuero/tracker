import html2pdf from "html2pdf.js";
import { useState, useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import ImageUploader from "./ImageUploader";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from "react-markdown";
import { FaFilePdf } from "react-icons/fa";

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
  const [toolbarUp, setToolbarUp] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const exportToPDF = () => {
    // Eliminar todas las imágenes del markdown (![alt](url))
    const contentWithoutImages = content.replace(/!\[.*?\]\(.*?\)/g, "");

    const markdownHtml = ReactDOMServer.renderToString(
      <div
        style={{
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          margin: "10px",
          backgroundColor: "#FFFFFF",
        }}
      >
        <ReactMarkdown>{contentWithoutImages}</ReactMarkdown>
      </div>
    );

    const opt = {
      filename: `${title || "documento"}.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
        backgroundColor: "#FFFFFF",
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
      },
    };

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = markdownHtml;
    document.body.appendChild(tempDiv);

    html2pdf()
      .set(opt)
      .from(tempDiv)
      .save()
      .finally(() => {
        document.body.removeChild(tempDiv);
      });
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const editorElement = editorRef.current;
    const toolbarHeight = 50; // Altura aproximada del toolbar

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        // Calculamos qué parte del editor es visible
        const bounds = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // Si la parte superior no es visible, mostramos toolbar abajo
        if (bounds.top < 0) {
          setToolbarUp(false);
        }
        // Si la parte inferior está cerca del borde inferior, mostramos toolbar arriba
        else if (bounds.bottom > viewportHeight - toolbarHeight) {
          setToolbarUp(true);
        }
        // Caso por defecto (editor completamente visible)
        else {
          setToolbarUp(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    observerRef.current.observe(editorElement);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "10px",
          }}
        >
          <button type="button" className="export-button" onClick={exportToPDF}>
            <FaFilePdf />
          </button>
          <ImageUploader />
        </div>
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="title-input"
        required
      />

      <div ref={editorRef}>
        <MDEditor
          style={{
            minHeight: "350px",
          }}
          value={content}
          onChange={setContent}
          toolbarBottom={!toolbarUp}
        />
      </div>

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
