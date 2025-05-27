import React from 'react';
import PropTypes from 'prop-types';
import './Select.styles.css';

/**
 * Select dropdown component for forms with consistent styling
 */
const Select = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const selectId = id || name;
  
  const selectClasses = [
    'app-select',
    error ? 'app-select--error' : '',
    disabled ? 'app-select--disabled' : '',
    fullWidth ? 'app-select--fullWidth' : '',
    className
  ].filter(Boolean).join(' ');
  
  const labelClasses = [
    'app-select__label',
    required ? 'app-select__label--required' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`app-select-wrapper ${fullWidth ? 'app-select-wrapper--fullWidth' : ''}`}>
      {label && (
        <label htmlFor={selectId} className={labelClasses}>
          {label}
        </label>
      )}
      
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={selectClasses}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {(error || helperText) && (
        <div className={`app-select__helper-text ${error ? 'app-select__helper-text--error' : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  /**
   * Select ID
   */
  id: PropTypes.string,
  /**
   * Select name
   */
  name: PropTypes.string.isRequired,
  /**
   * Select label
   */
  label: PropTypes.string,
  /**
   * Select value
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
   * Select options
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disabled: PropTypes.bool,
    })
  ),
  /**
   * Placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Error message
   */
  error: PropTypes.string,
  /**
   * Helper text
   */
  helperText: PropTypes.string,
  /**
   * Is select required
   */
  required: PropTypes.bool,
  /**
   * Is select disabled
   */
  disabled: PropTypes.bool,
  /**
   * Makes the select take the full width of its container
   */
  fullWidth: PropTypes.bool,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Select;