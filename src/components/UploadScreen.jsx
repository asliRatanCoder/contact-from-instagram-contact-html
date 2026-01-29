/**
 * Upload Screen Component
 * Handles file upload with drag-and-drop functionality
 */
import { useRef, useState } from "react";
import PropTypes from "prop-types";

export default function UploadScreen({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onFileUpload({ target: { files: [file] } });
    }
  };

  return (
    <section className="upload-section">
      <div
        className={`upload-box ${dragActive ? "drag-active" : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon">📥</div>
          <h2>Upload Your HTML File</h2>
          <p className="upload-text">Drag and drop your synced_contacts.html</p>
          <p className="upload-subtext">or click to browse</p>
          <span className="file-format">HTML</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".html"
          onChange={onFileUpload}
          style={{ display: "none" }}
        />
      </div>
    </section>
  );
}

UploadScreen.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};
