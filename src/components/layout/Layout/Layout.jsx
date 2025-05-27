import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../elements/NavBar';
import Footer from '../../elements/Footer';
import './Layout.styles.css';

/**
 * Main layout component that wraps all pages
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  /**
   * Page content
   */
  children: PropTypes.node.isRequired,
};

export default Layout;