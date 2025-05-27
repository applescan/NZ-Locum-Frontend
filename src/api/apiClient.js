/**
 * Base API client for making HTTP requests.
 * Provides consistent error handling and request configuration.
 */

import axios from 'axios';

// Create an axios instance with default configs
const apiClient = axios.create({
  baseURL: 'https://nz-locum-backend-3a82ed85ab97.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const user = JSON.parse(localStorage.getItem('user'));
    const userClinic = JSON.parse(localStorage.getItem('userClinic'));
    
    // If user has a token, add it to request headers
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    } else if (userClinic && userClinic.token) {
      config.headers.Authorization = `Bearer ${userClinic.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle different error scenarios
    if (response && response.status === 401) {
      // Handle unauthorized error - could redirect to login
      console.log('Session expired. Please login again.');
      // Could add auto logout logic here
    }
    
    return Promise.reject(error);
  }
);

// Helper methods for different request types
const apiService = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data = {}, config = {}) => apiClient.post(url, data, config),
  put: (url, data = {}, config = {}) => apiClient.put(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  
  // Special method for multipart form data (file uploads)
  postForm: (url, formData, config = {}) => {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
  },
};

export default apiService;