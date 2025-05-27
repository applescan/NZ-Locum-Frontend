/**
 * API service for job-related operations
 */

import apiService from './apiClient';

const jobsService = {
  // Get all jobs
  getAllJobs: () => {
    return apiService.get('/jobs/all');
  },
  
  // Get job by ID
  getJobById: (id) => {
    return apiService.get(`/jobs/search/${id}`);
  },
  
  // Get jobs by location
  getJobsByLocation: (location) => {
    return apiService.get(`/jobs/search/${location.toLowerCase()}`);
  },
  
  // Create a new job posting
  createJob: (jobData) => {
    return apiService.post('/jobs/add', jobData);
  },
  
  // Update a job posting
  updateJob: (id, jobData) => {
    return apiService.post(`/jobs/update/${id}`, jobData);
  },
  
  // Delete a job posting
  deleteJob: (id) => {
    return apiService.delete(`/jobs/delete/${id}`);
  },
};

export default jobsService;