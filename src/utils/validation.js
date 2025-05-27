/**
 * Form validation utility functions
 */

/**
 * Validates an email address
 * @param {string} email - Email address to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password strength
 * @param {string} password - Password to validate
 * @returns {boolean} Whether the password meets minimum requirements
 */
export const isStrongPassword = (password) => {
  // Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  // Basic NZ phone number validation
  const phoneRegex = /^0[2-9]\d{7,8}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates form fields
 * @param {Object} values - Form values object
 * @param {Object} fieldValidations - Field validation configuration
 * @returns {Object} Validation errors object
 */
export const validateForm = (values, fieldValidations) => {
  const errors = {};
  
  Object.entries(fieldValidations).forEach(([fieldName, validations]) => {
    const value = values[fieldName];
    
    // Required validation
    if (validations.required && (!value || value.trim() === '')) {
      errors[fieldName] = validations.requiredMessage || 'This field is required';
      return;
    }
    
    if (value) {
      // Email validation
      if (validations.email && !isValidEmail(value)) {
        errors[fieldName] = validations.emailMessage || 'Please enter a valid email address';
        return;
      }
      
      // Password validation
      if (validations.password && !isStrongPassword(value)) {
        errors[fieldName] = validations.passwordMessage || 
          'Password must be at least 8 characters with at least one letter and one number';
        return;
      }
      
      // Phone validation
      if (validations.phone && !isValidPhone(value)) {
        errors[fieldName] = validations.phoneMessage || 'Please enter a valid NZ phone number';
        return;
      }
      
      // Min length validation
      if (validations.minLength && value.length < validations.minLength) {
        errors[fieldName] = validations.minLengthMessage || 
          `Must be at least ${validations.minLength} characters`;
        return;
      }
      
      // Max length validation
      if (validations.maxLength && value.length > validations.maxLength) {
        errors[fieldName] = validations.maxLengthMessage || 
          `Must be no more than ${validations.maxLength} characters`;
        return;
      }
      
      // Pattern validation
      if (validations.pattern && !validations.pattern.test(value)) {
        errors[fieldName] = validations.patternMessage || 'Invalid format';
        return;
      }
      
      // Custom validation
      if (validations.custom && typeof validations.custom === 'function') {
        const customError = validations.custom(value, values);
        if (customError) {
          errors[fieldName] = customError;
          return;
        }
      }
    }
  });
  
  return errors;
};