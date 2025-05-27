import React from 'react';
import PropTypes from 'prop-types';
import './Loading.styles.css';

/**
 * Loading spinner component for async operations
 */
const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="loading">
      <div className="loading__container">
        <h3 className="loading__text">{text}</h3>
        <div className="loading__spinner">
          <div className="loading__line"></div>
          <div className="loading__line"></div>
          <div className="loading__line"></div>
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {
  /**
   * Loading text to display
   */
  text: PropTypes.string,
};

export default Loading;