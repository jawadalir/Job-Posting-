// Determine API URL at runtime (not build time) to avoid hardcoded URLs
const getApiUrl = () => {
  // Runtime check: if we're on localhost, use localhost API
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Development: use localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    
    // Production: always use relative path since frontend and backend are on same domain
    // This works for Render, Vercel, or any single-domain deployment
    return '/api';
  }
  
  // Fallback (shouldn't happen in browser)
  return '/api';
};

// Get API URL at runtime, not build time
const API_URL = getApiUrl();

// Debug: Log API URL (helps troubleshoot)
if (typeof window !== 'undefined') {
  console.log('API_URL configured as:', API_URL);
  console.log('Current hostname:', window.location.hostname);
}

// Helper function to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle 401 errors (token expired)
const handleTokenExpired = (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return response;
};

// Auth API calls
export const registerUser = async (fullName, email, password, passwordConfirm) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password, passwordConfirm }),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return response.json();
};

// Job API calls
export const getAllJobs = async () => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'GET',
    headers: getHeaders(),
  });
  handleTokenExpired(response);
  return response.json();
};

export const getJobById = async (id) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  handleTokenExpired(response);
  return response.json();
};

export const createJob = async (jobData) => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(jobData),
  });
  handleTokenExpired(response);
  return response.json();
};

export const getMyJobs = async () => {
  const response = await fetch(`${API_URL}/jobs/user/my-jobs`, {
    method: 'GET',
    headers: getHeaders(),
  });
  handleTokenExpired(response);
  return response.json();
};

export const updateJob = async (id, jobData) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(jobData),
  });
  handleTokenExpired(response);
  return response.json();
};

export const deleteJob = async (id) => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  handleTokenExpired(response);
  return response.json();
};
