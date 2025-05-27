/**
 * This file defines the application theme including colors, typography, and spacing.
 * It provides consistent styling values that can be used throughout the application.
 */

const theme = {
  // Color palette based on existing app colors
  colors: {
    primary: {
      main: '#5BA4EE',
      dark: '#0075EC',
      light: '#D7E5F8',
      background: '#F3F9FF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    border: {
      light: '#EEEEEE',
      main: '#DDDDDD',
    },
    error: {
      main: '#DC3545',
      light: '#FEE8EA',
    },
    success: {
      main: '#28A745',
      light: '#E8F5E9',
    },
  },
  
  // Typography configuration
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  
  // Spacing system (in pixels - can be converted to rem)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  
  // Border radius
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  
  // Shadows
  shadows: {
    small: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  },
  
  // Z-index values
  zIndex: {
    navbar: 1100,
    modal: 1300,
    tooltip: 1500,
  },
};

export default theme;