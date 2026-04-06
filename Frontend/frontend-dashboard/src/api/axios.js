import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  },
);

function friendlyErrorMessage(error, fallback) {
  if (!error.response) return 'Backend is unreachable. Ensure backend services are running, then retry.';
  if (error.response.status === 403) return 'Request blocked (403). Check Spring Security/CORS and service health.';
  if (error.response.status === 404) {
    return 'API route not found (404). In dev, ensure auth-service is on :8081 and restart Vite after vite.config changes. In production, set VITE_API_BASE_URL to your API gateway.';
  }
  return error.response?.data?.message || fallback;
}

export async function authRequest(config) {
  return api(config);
}

export async function customerRequest(config) {
  return api(config);
}

export async function ticketRequest(config) {
  return api(config);
}

export { friendlyErrorMessage };
