/**
 * Custom hook for making API calls with loading and error states
 */

import { useState, useEffect, useCallback } from 'react';

const useApi = (apiFunction, immediate = false, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to execute the API call
  const execute = useCallback(async (...params) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiFunction(...params);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction]);

  // If immediate is true, execute the API call when the hook is initialized
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    isLoading,
    error,
    execute,
    setData, // Expose setData to allow manual updates
  };
};

export default useApi;