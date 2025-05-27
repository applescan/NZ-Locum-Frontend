/**
 * API service for doctor-related operations
 */

import apiService from './apiClient';

const doctorsService = {
  // Get all doctors
  getAllDoctors: () => {
    return apiService.get('/doctors/all');
  },
  
  // Get doctor by ID
  getDoctorById: (id) => {
    return apiService.get(`/doctors/search/${id}`);
  },
  
  // Register a new doctor
  registerDoctor: (doctorData) => {
    // For multipart form data (with image upload)
    return apiService.postForm('/doctors/add', doctorData);
  },
  
  // Login a doctor
  loginDoctor: (credentials) => {
    return apiService.post('/doctors/login', credentials);
  },
  
  // Update doctor profile
  updateDoctor: (id, doctorData) => {
    // For multipart form data (with image upload)
    return apiService.postForm(`/doctors/update/${id}`, doctorData);
  },
  
  // Delete doctor profile
  deleteDoctor: (id) => {
    return apiService.delete(`/doctors/delete/${id}`);
  },
};

export default doctorsService;