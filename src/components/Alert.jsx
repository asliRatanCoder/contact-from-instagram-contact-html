/**
 * Alert Component
 * Displays success or error messages
 */
import PropTypes from "prop-types";

export default function Alert({ type, message }) {
  if (!message) return null;

  const icon = type === "success" ? "✓" : "⚠️";
  const className = `alert alert-${type}`;

  return (
    <div className={className}>
      <span className="alert-icon">{icon}</span>
      <span>{message}</span>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  message: PropTypes.string,
};
