/**
 * Header Component
 * Reusable header with logo, title, and subtitle
 */
import PropTypes from "prop-types";

export default function Header({ logo = "📇", title, subtitle }) {
  return (
    <header className="header">
      <div className="header-content">
        <span className="logo">{logo}</span>
        <div className="header-text">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
