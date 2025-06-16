import React from "react";
import PropTypes from "prop-types";
import "./PageHeader.styles.css";

const PageHeader = ({
  background,
  maoriTitle,
  englishTitle,
  text,
  className = "",
}) => {
  return (
    <div
      className={`page-header ${className}`}
      style={{ backgroundImage: `url(${background})`, textAlign: "center" }}
    >
      <h4>{maoriTitle}</h4>
      <h1>{englishTitle}</h1>
      <p>{text}</p>
    </div>
  );
};

PageHeader.propTypes = {
  /**
   * Background image URL
   */
  background: PropTypes.string.isRequired,
  /**
   * Maori title text
   */
  maoriTitle: PropTypes.string,
  /**
   * English title text
   */
  englishTitle: PropTypes.string,
  /**
   * Description or additional text
   */
  text: PropTypes.string,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default PageHeader;
