import React from 'react';
import PropTypes from 'prop-types';
import './Card.styles.css';

/**
 * Card component for displaying content in a contained manner
 */
const Card = ({
  children,
  variant = 'default',
  elevation = 'medium',
  className = '',
  ...props
}) => {
  const cardClasses = [
    'app-card',
    `app-card--${variant}`,
    `app-card--elevation-${elevation}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  /**
   * Card content
   */
  children: PropTypes.node.isRequired,
  /**
   * Card visual style
   */
  variant: PropTypes.oneOf(['default', 'outlined', 'flat']),
  /**
   * Card shadow elevation
   */
  elevation: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

/**
 * Card header component
 */
const CardHeader = ({ children, className = '', ...props }) => {
  const headerClasses = ['app-card__header', className].filter(Boolean).join(' ');
  
  return (
    <div className={headerClasses} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card body component
 */
const CardBody = ({ children, className = '', ...props }) => {
  const bodyClasses = ['app-card__body', className].filter(Boolean).join(' ');
  
  return (
    <div className={bodyClasses} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card footer component
 */
const CardFooter = ({ children, className = '', ...props }) => {
  const footerClasses = ['app-card__footer', className].filter(Boolean).join(' ');
  
  return (
    <div className={footerClasses} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;