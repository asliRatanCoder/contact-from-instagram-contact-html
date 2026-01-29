/**
 * Info Section Component
 * Displays processed contact count and filename
 */
import PropTypes from "prop-types";

export default function InfoSection({ contactCount, fileName }) {
  if (contactCount === 0) return null;

  return (
    <section className="info-section">
      <div className="info-box">
        <div className="info-content">
          <p className="processed-message">✅ Data Processed Successfully</p>
          <div className="info-stat">
            <p className="stat-number">{contactCount}</p>
            <p className="stat-label">Contacts Ready</p>
          </div>
          {fileName && <p className="file-name">📄 {fileName}.html</p>}
        </div>
      </div>
    </section>
  );
}

InfoSection.propTypes = {
  contactCount: PropTypes.number.isRequired,
  fileName: PropTypes.string,
};
