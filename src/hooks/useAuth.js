/**
 * Custom hook for handling authentication
 */

import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomContext } from '../context/Context';
import { doctorsService, clinicsService } from '../api';

const useAuth = () => {
  const navigate = useNavigate();
  const {
    user, setUser,
    currentUserInfo, setCurrentUserInfo,
    userClinic, setUserClinic,
    currentUserInfoClinic, setCurrentUserInfoClinic
  } = useContext(CustomContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is authenticated
  const isAuthenticated = !!user || !!userClinic;
  
  // Determine user type
  const userType = user ? 'doctor' : userClinic ? 'clinic' : null;

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedClinic = JSON.parse(localStorage.getItem('userClinic'));
    
    if (storedUser) {
      setUser(storedUser);
      
      // Fetch current user details
      const fetchUserDetails = async () => {
        try {
          const response = await doctorsService.getDoctorById(storedUser._id);
          setCurrentUserInfo(response.data.currentUserInfo[0]);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      
      fetchUserDetails();
    } else if (storedClinic) {
      setUserClinic(storedClinic);
      
      // Fetch current clinic details
      const fetchClinicDetails = async () => {
        try {
          const response = await clinicsService.getClinicById(storedClinic._id);
          setCurrentUserInfoClinic(response.data.currentUserInfoClinic[0]);
        } catch (error) {
          console.error('Error fetching clinic details:', error);
        }
      };
      
      fetchClinicDetails();
    }
  }, [setUser, setUserClinic, setCurrentUserInfo, setCurrentUserInfoClinic]);

  // Login function
  const login = useCallback(async (credentials, type) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (type === 'doctor') {
        const response = await doctorsService.loginDoctor(credentials);
        const userData = response.data;
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setCurrentUserInfo(userData.currentUserInfo);
        
        return userData;
      } else if (type === 'clinic') {
        const response = await clinicsService.loginClinic(credentials);
        const clinicData = response.data;
        
        localStorage.setItem('userClinic', JSON.stringify(clinicData));
        setUserClinic(clinicData);
        setCurrentUserInfoClinic(clinicData.currentUserInfoClinic);
        
        return clinicData;
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setUserClinic, setCurrentUserInfo, setCurrentUserInfoClinic]);

  // Logout function
  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    setUserClinic(null);
    setCurrentUserInfo(null);
    setCurrentUserInfoClinic(null);
    navigate('/');
  }, [navigate, setUser, setUserClinic, setCurrentUserInfo, setCurrentUserInfoClinic]);

  return {
    user,
    userClinic,
    currentUserInfo,
    currentUserInfoClinic,
    isAuthenticated,
    userType,
    isLoading,
    error,
    login,
    logout
  };
};

export default useAuth;