import React from 'react';
import PropTypes from 'prop-types';
import './TextArea.styles.css';

/**
 * TextArea component for multiline text input with consistent styling
 */
const TextArea = ({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  rows = 3,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const textareaId = id || name;
  
  const textareaClasses = [
    'app-textarea',
    error ? 'app-textarea--error' : '',
    disabled ? 'app-textarea--disabled' : '',
    fullWidth ? 'app-textarea--fullWidth' : '',
    className
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'app-textarea__label',
    required ? 'app-textarea__label--required' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`app-textarea-wrapper ${fullWidth ? 'app-textarea-wrapper--fullWidth' : ''}`}>
      {label && (
        <label htmlFor={textareaId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={textareaClasses}
        {...props}
      ></textarea>
      
      {(error || helperText) && (
        <div className={`app-textarea__helper-text ${error ? 'app-textarea__helper-text--error' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

TextArea.propTypes = {
  /**
   * TextArea ID
   */
  id: PropTypes.string,
  /**
   * TextArea name
   */
  name: PropTypes.string.isRequired,
  /**
   * TextArea label
   */
  label: PropTypes.string,
  /**
   * Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * TextArea value
   */
  value: PropTypes.string,
  /**
   * Change handler
   */
  onChange: PropTypes.func,
  /**
   * Blur handler
   */
  onBlur: PropTypes.func,
  /**
   * Number of visible rows
   */
  rows: PropTypes.number,
  /**
   * Error message
   */
  error: PropTypes.string,
  /**
   * Helper text
   */
  helperText: PropTypes.string,
  /**
   * Is textarea required
   */
  required: PropTypes.bool,
  /**
   * Is textarea disabled
   */
  disabled: PropTypes.bool,
  /**
   * Makes the textarea take the full width of its container
   */
  fullWidth: PropTypes.bool,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default TextArea;