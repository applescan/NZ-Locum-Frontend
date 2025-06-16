import React from "react";
import PropTypes from "prop-types";
import "./Loading.styles.css";

const Loading = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`load-wrapp ${className}`}>
      <div className="load-1">
        <h3>{message}</h3>
        <br />
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  /**
   * Loading message text
   */
  message: PropTypes.string,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Loading;
