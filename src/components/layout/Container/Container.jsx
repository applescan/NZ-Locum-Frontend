import React from "react";
import PropTypes from "prop-types";
import "./Container.styles.css";

const Container = ({
  children,
  maxWidth = "lg",
  padding = true,
  className = "",
  ...props
}) => {
  const containerClasses = [
    "container",
    `container--${maxWidth}`,
    padding ? "container--padding" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  /**
   * Container content
   */
  children: PropTypes.node.isRequired,
  /**
   * Maximum width of the container
   */
  maxWidth: PropTypes.oneOf(["sm", "md", "lg", "xl", "fluid"]),
  /**
   * Whether to add horizontal padding
   */
  padding: PropTypes.bool,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Container;
