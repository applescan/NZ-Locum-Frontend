import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./ButtonBlueOutlined.styles.css";

const ButtonBlueOutlined = ({
  name,
  onClick,
  size = "md",
  type = "button",
  style = {},
  className = "",
  ...props
}) => {
  const buttonClasses = [
    "btn-blueOutlined",
    size === "sm" ? "btn-sml" : "",
    size === "md" ? "btn-med" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Button
      variant="blueOutlined"
      className={buttonClasses}
      onClick={onClick}
      type={type}
      style={style}
      {...props}
    >
      {name}
    </Button>
  );
};

ButtonBlueOutlined.propTypes = {
  /**
   * Button text content
   */
  name: PropTypes.string.isRequired,
  /**
   * Click event handler
   */
  onClick: PropTypes.func,
  /**
   * Button size: 'sm' for small, 'md' for medium
   */
  size: PropTypes.oneOf(["sm", "md"]),
  /**
   * Button type (e.g., 'button', 'submit')
   */
  type: PropTypes.string,
  /**
   * Inline styles
   */
  style: PropTypes.object,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default ButtonBlueOutlined;
