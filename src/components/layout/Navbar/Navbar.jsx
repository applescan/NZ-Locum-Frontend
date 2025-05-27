import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import './Navbar.styles.css';
import { Button } from '../../common';
import Logo from '../../../images/logo.png';
import Toggle from '../../../images/toggle.png';

/**
 * Main navigation component with responsive design
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userType, logout } = useAuth();
  const navigate = useNavigate();
  
  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <img src={Logo} alt="NZ Vet Locum Network" height="70" />
        </Link>
        
        <button 
          className="navbar__toggle" 
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <img src={Toggle} alt="Menu" height="40" />
        </button>
        
        <nav className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
          <ul className="navbar__nav">
            <li className="navbar__item">
              <Link to="/job-search" className="navbar__link">
                Job Search
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/doctors" className="navbar__link">
                Doctors
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/clinics" className="navbar__link">
                Clinics
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/about" className="navbar__link">
                About Us
              </Link>
            </li>
            
            {isAuthenticated && userType === 'doctor' && (
              <li className="navbar__item">
                <Link to="/doctor-profile" className="navbar__link">
                  Your Profile
                </Link>
              </li>
            )}
            
            {isAuthenticated && userType === 'clinic' && (
              <li className="navbar__item">
                <Link to="/clinic-profile" className="navbar__link">
                  Your Profile
                </Link>
              </li>
            )}
          </ul>
          
          <div className="navbar__actions">
            {isAuthenticated ? (
              <Button 
                variant="primary" 
                size="small" 
                onClick={handleLogout}
                className="mr-2"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => navigate('/sign-in')}
                  className="mr-2"
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={() => navigate('/sign-up')}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;