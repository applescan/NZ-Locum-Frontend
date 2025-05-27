import React from 'react';
import PropTypes from 'prop-types';
import './Input.styles.css';

/**
 * Input component for forms with consistent styling and error handling
 */
const Input = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputId = id || name;
  
  const inputClasses = [
    'app-input',
    error ? 'app-input--error' : '',
    disabled ? 'app-input--disabled' : '',
    fullWidth ? 'app-input--fullWidth' : '',
    className
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'app-input__label',
    required ? 'app-input__label--required' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`app-input-wrapper ${fullWidth ? 'app-input-wrapper--fullWidth' : ''}`}>
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
        {...props}
      />
      
      {(error || helperText) && (
        <div className={`app-input__helper-text ${error ? 'app-input__helper-text--error' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  /**
   * Input ID
   */
  id: PropTypes.string,
  /**
   * Input name
   */
  name: PropTypes.string.isRequired,
  /**
   * Input type
   */
  type: PropTypes.oneOf([
    'text', 'password', 'email', 'number', 'tel', 'url', 
    'date', 'time', 'datetime-local', 'search', 'file'
  ]),
  /**
   * Input label
   */
  label: PropTypes.string,
  /**
   * Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Input value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Change handler
   */
  onChange: PropTypes.func,
  /**
   * Blur handler
   */
  onBlur: PropTypes.func,
  /**
   * Error message
   */
  error: PropTypes.string,
  /**
   * Helper text
   */
  helperText: PropTypes.string,
  /**
   * Is input required
   */
  required: PropTypes.bool,
  /**
   * Is input disabled
   */
  disabled: PropTypes.bool,
  /**
   * Makes the input take the full width of its container
   */
  fullWidth: PropTypes.bool,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Input;