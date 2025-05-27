/**
 * Export all API services from a single file
 */

import apiService from './apiClient';
import jobsService from './jobsService';
import doctorsService from './doctorsService';
import clinicsService from './clinicsService';

export {
  apiService,
  jobsService,
  doctorsService,
  clinicsService,
};