/**
 * Footer Component
 * Reusable footer with customizable message
 */
import PropTypes from "prop-types";

export default function Footer({ message, secondaryMessage }) {
  return (
    <footer className="footer">
      <p>{message}</p>
      {secondaryMessage && <p>{secondaryMessage}</p>}
    </footer>
  );
}

Footer.propTypes = {
  message: PropTypes.string.isRequired,
  secondaryMessage: PropTypes.string,
};
