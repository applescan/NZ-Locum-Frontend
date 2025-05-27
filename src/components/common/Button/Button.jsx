import React from 'react';
import PropTypes from 'prop-types';
import './Button.styles.css';

/**
 * Primary button component that provides consistent styling and behavior
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    'app-button',
    `app-button--${variant}`,
    `app-button--${size}`,
    fullWidth ? 'app-button--fullWidth' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  /**
   * Button content
   */
  children: PropTypes.node.isRequired,
  /**
   * Button visual style
   */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined', 'text']),
  /**
   * Button size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Makes the button take the full width of its container
   */
  fullWidth: PropTypes.bool,
  /**
   * Disables the button
   */
  disabled: PropTypes.bool,
  /**
   * HTML button type
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * Click handler
   */
  onClick: PropTypes.func,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Button;