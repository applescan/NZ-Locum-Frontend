import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.styles.css';

/**
 * Footer component for consistent page footer
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <h3>NZ Vet Locum Network</h3>
            <p className="footer__tagline">Connecting veterinary professionals across New Zealand</p>
          </div>
          
          <div className="footer__links">
            <div className="footer__links-group">
              <h4 className="footer__title">Quick Links</h4>
              <ul className="footer__list">
                <li className="footer__item">
                  <Link to="/" className="footer__link">Home</Link>
                </li>
                <li className="footer__item">
                  <Link to="/job-search" className="footer__link">Job Search</Link>
                </li>
                <li className="footer__item">
                  <Link to="/doctors" className="footer__link">Doctors</Link>
                </li>
                <li className="footer__item">
                  <Link to="/clinics" className="footer__link">Clinics</Link>
                </li>
                <li className="footer__item">
                  <Link to="/about" className="footer__link">About Us</Link>
                </li>
              </ul>
            </div>
            
            <div className="footer__links-group">
              <h4 className="footer__title">Account</h4>
              <ul className="footer__list">
                <li className="footer__item">
                  <Link to="/sign-in" className="footer__link">Sign In</Link>
                </li>
                <li className="footer__item">
                  <Link to="/sign-up" className="footer__link">Register</Link>
                </li>
                <li className="footer__item">
                  <Link to="/doctor-profile" className="footer__link">Doctor Profile</Link>
                </li>
                <li className="footer__item">
                  <Link to="/clinic-profile" className="footer__link">Clinic Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} NZ Vet Locum Network 🩺 | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;