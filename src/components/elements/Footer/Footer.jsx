import React from "react";
import PropTypes from "prop-types";
import { MDBFooter } from "mdb-react-ui-kit";
import "./Footer.styles.css";

const Footer = ({ bgColor = "light", className = "", ...props }) => {
  return (
    <MDBFooter
      bgColor={bgColor}
      className={`text-center text-lg-left ${className}`}
      {...props}
    >
      <div className="footer-content">
        &copy; {new Date().getFullYear()} Copyright: NZ Vet Locum Network 🩺
      </div>
    </MDBFooter>
  );
};

Footer.propTypes = {
  /**
   * Footer background color
   */
  bgColor: PropTypes.string,
  /**
   * Additional CSS class names
   */
  className: PropTypes.string,
};

export default Footer;
