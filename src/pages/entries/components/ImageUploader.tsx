import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import { FaImages, FaTimes, FaCheck, FaCopy } from "react-icons/fa";

function ImageUploader() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const newImageNames: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const imageData = Array.from(uint8Array);
        const extension = file.name.split(".").pop() || "";

        const fileName = await invoke<string>("save_image", {
          imageData,
          extension,
        });

        newImageNames.push(fileName);
      }

      setUploadedImages((prev) => [...prev, ...newImageNames]);
    } catch (err) {
      setError(`Error al guardar imágenes: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };
  return (
    <div className="image-uploader-container">
      <div className="upload-controls">
        <label className="upload-button">
          Subir imágenes
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            multiple
            style={{ display: "none" }}
          />
        </label>

        {uploadedImages.length > 0 && (
          <button
            className="view-images-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowModal(true);
            }}
            title="Ver imágenes subidas"
          >
            <FaImages size={20} />
            <span className="badge">{uploadedImages.length}</span>
          </button>
        )}
      </div>

      {isLoading && <div className="loading">Subiendo imágenes...</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Modal para mostrar las imágenes */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Imágenes subidas</h3>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="images-list">
              {uploadedImages.length === 0 ? (
                <p>No hay imágenes subidas</p>
              ) : (
                <ul>
                  {uploadedImages.map((imageName, index) => (
                    <li
                      key={index}
                      onClick={() => copyToClipboard(imageName, index)}
                      style={{ cursor: "pointer" }}
                    >
                      <span>{imageName}</span>
                      <span style={{ marginLeft: "10px" }}>
                        {copiedIndex === index ? (
                          <FaCheck color="green" />
                        ) : (
                          <FaCopy />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
