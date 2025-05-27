import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { validateForm } from '../../../utils/validation';
import './Form.styles.css';

/**
 * Form component for consistent form handling and validation
 */
const Form = ({ 
  initialValues,
  validationSchema,
  onSubmit,
  children,
  className = '',
  ...props
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when initialValues change
  useEffect(() => {
    setValues(initialValues || {});
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Handle field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));
  };
  
  // Handle field blur
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
    
    if (validationSchema) {
      const fieldErrors = validateForm(values, { [name]: validationSchema[name] });
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: fieldErrors[name],
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationSchema || {}).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // Validate all fields
    if (validationSchema) {
      const formErrors = validateForm(values, validationSchema);
      setErrors(formErrors);
      
      // If there are errors, stop submission
      if (Object.keys(formErrors).length > 0) {
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Form context for child components
  const formContext = {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
  };
  
  return (
    <form 
      className={`app-form ${className}`} 
      onSubmit={handleSubmit} 
      noValidate
      {...props}
    >
      {typeof children === 'function' ? children(formContext) : children}
    </form>
  );
};

Form.propTypes = {
  /**
   * Initial form values
   */
  initialValues: PropTypes.object,
  /**
   * Validation schema
   */
  validationSchema: PropTypes.object,
  /**
   * Form submission handler
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Form content (can be a function or React elements)
   */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Form;