const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

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
