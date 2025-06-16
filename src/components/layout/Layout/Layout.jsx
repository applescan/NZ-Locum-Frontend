import React from "react";
import PropTypes from "prop-types";
import NavBar from "../../elements/NavBar/NavBar";
import Footer from "../../elements/Footer/Footer";
import "./Layout.styles.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
