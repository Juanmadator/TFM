// src/services/api.js
import axios from 'axios';

// 1. Configure the Axios instance with your backend's base URL
const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust this URL to your backend's actual address
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add an Axios interceptor to include the authentication token
// This runs before every request
API.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken'); // Get token from localStorage

    if (userToken) {
      // If a token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Optional: Add an interceptor for responses to handle global errors (e.g., 401 Unauthorized)
API.interceptors.response.use(
  (response) => response, // Just return the response if it's successful
  (error) => {
    // Handle specific error codes globally if needed
    if (error.response && error.response.status === 401) {
      console.error('Authentication error: Token expired or invalid. Redirecting to login.');
      // Example: Redirect to login page if 401 unauthorized
      // window.location.href = '/login'; // Or use navigate from react-router-dom
      localStorage.removeItem('userToken'); // Clear invalid token
      localStorage.removeItem('user'); // Clear user data too
    }
    return Promise.reject(error);
  }
);

// --- User (Usuario) Services ---
// Assuming standard CRUD for users based on common API patterns
export const userService = {
  login: async (credentials) => API.post('/usuarios/login', credentials), // Assuming a /login endpoint
  register: async (userData) => API.post('/usuarios/register', userData), // Assuming a /register endpoint
  getAllUsers: async () => API.get('/usuarios'),
  getUserById: async (id) => API.get(`/usuarios/${id}`),
  createUser: async (userData) => API.post('/usuarios', userData), // Might be same as register
  updateUser: async (id, userData) => API.put(`/usuarios/${id}`, userData),
  deleteUser: async (id) => API.delete(`/usuarios/${id}`),
};

// --- Company (Empresa) Services ---
export const companyService = {
  getAllCompanies: async () => API.get('/empresas'),
  getCompanyById: async (id) => API.get(`/empresas/${id}`),
  createCompany: async (companyData) => API.post('/empresas', companyData),
  updateCompany: async (id, companyData) => API.put(`/empresas/${id}`, companyData),
  deleteCompany: async (id) => API.delete(`/empresas/${id}`),
};

// --- Job Offer (Ofertas) Services ---
export const jobOfferService = {
  getAllJobOffers: async () => API.get('/ofertas'),
  getJobOfferById: async (id) => API.get(`/ofertas/${id}`),
  createJobOffer: async (jobOfferData) => API.post('/ofertas', jobOfferData),
  updateJobOffer: async (id, jobOfferData) => API.put(`/ofertas/${id}`, jobOfferData),
  deleteJobOffer: async (id) => API.delete(`/ofertas/${id}`),
};