import React from "react";
import PropTypes from "prop-types";
import "./PageHeader.styles.css";

const PageHeader = ({
  maoriTitle,
  englishTitle,
  text,
  background,
  overlay = true,
  centeredContent = true,
  minHeight = "20vh",
}) => {
  return (
    <div
      className={`page-header ${
        centeredContent ? "page-header--centered" : ""
      }`}
      style={{
        backgroundImage: `url(${background})`,
        minHeight,
      }}
    >
      {overlay && <div className="page-header__overlay"></div>}

      <div className="page-header__content">
        {maoriTitle && (
          <h4 className="page-header__maori-title">{maoriTitle}</h4>
        )}
        {englishTitle && <h1 className="page-header__title">{englishTitle}</h1>}
        {text && <p className="page-header__text">{text}</p>}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  /**
   * Māori title (smaller, displayed above main title)
   */
  maoriTitle: PropTypes.string,
  /**
   * Main title in English
   */
  englishTitle: PropTypes.string,
  /**
   * Optional descriptive text
   */
  text: PropTypes.string,
  /**
   * Background image URL
   */
  background: PropTypes.string.isRequired,
  /**
   * Whether to show a dark overlay over the background
   */
  overlay: PropTypes.bool,
  /**
   * Whether to center the content horizontally and vertically
   */
  centeredContent: PropTypes.bool,
  /**
   * Minimum height of the header
   */
  minHeight: PropTypes.string,
};

export default PageHeader;
