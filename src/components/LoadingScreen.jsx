/**
 * Loading Screen Component
 * Displays progress during file processing
 */
import PropTypes from "prop-types";

export default function LoadingScreen({ uploadProgress }) {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-icon">📄</div>
        <h2>Processing Your File</h2>
        <p>Reading and parsing contacts...</p>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
        <p className="progress-text">{Math.round(uploadProgress)}%</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  uploadProgress: PropTypes.number.isRequired,
};
