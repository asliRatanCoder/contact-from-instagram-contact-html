/**
 * Export Section Component
 * Provides buttons to export contacts in different formats
 */
import PropTypes from "prop-types";

const exportFormats = [
  {
    format: "csv",
    icon: "📋",
    title: "CSV",
    description: "Spreadsheet Format",
  },
  {
    format: "vcard",
    icon: "📱",
    title: "vCard",
    description: "Universal Format",
  },
  {
    format: "json",
    icon: "⚙️",
    title: "JSON",
    description: "Data Format",
  },
];

export default function ExportSection({ contactCount, onDownload }) {
  if (contactCount === 0) return null;

  return (
    <section className="export-section">
      <h2>💾 Export Your Contacts</h2>
      <div className="export-buttons">
        {exportFormats.map(({ format, icon, title, description }) => (
          <button
            key={format}
            className="export-btn"
            onClick={() => onDownload(format)}
          >
            <div className="btn-content">
              <div className="btn-icon">{icon}</div>
              <div className="btn-text">
                <div className="btn-title">{title}</div>
                <div className="btn-desc">{description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

ExportSection.propTypes = {
  contactCount: PropTypes.number.isRequired,
  onDownload: PropTypes.func.isRequired,
};
