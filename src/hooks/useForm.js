/**
 * Custom hook for handling form state and validation
 */

import { useState, useCallback } from 'react';

const useForm = (initialValues = {}, validate = () => ({})) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  // Handle field blur for validation
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate the form when a field is blurred
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set form values programmatically
  const setFormValues = useCallback((newValues) => {
    setValues(newValues);
  }, []);

  // Validate all fields
  const validateForm = useCallback(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    // Mark all fields as touched
    const touchedFields = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    
    setTouched(touchedFields);
    
    // Return whether the form is valid
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFormValues,
    validateForm,
    setValues,
    setErrors,
    setTouched
  };
};

export default useForm;