/**
 * API service for clinic-related operations
 */

import apiService from './apiClient';

const clinicsService = {
  // Get all clinics
  getAllClinics: () => {
    return apiService.get('/clinics/all');
  },
  
  // Get clinic by ID
  getClinicById: (id) => {
    return apiService.get(`/clinics/search/${id}`);
  },
  
  // Register a new clinic
  registerClinic: (clinicData) => {
    // For multipart form data (with image upload)
    return apiService.postForm('/clinics/add', clinicData);
  },
  
  // Login a clinic
  loginClinic: (credentials) => {
    return apiService.post('/clinics/login', credentials);
  },
  
  // Update clinic profile
  updateClinic: (id, clinicData) => {
    // For multipart form data (with image upload)
    return apiService.postForm(`/clinics/update/${id}`, clinicData);
  },
  
  // Delete clinic profile
  deleteClinic: (id) => {
    return apiService.delete(`/clinics/delete/${id}`);
  },
};

export default clinicsService;