import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
  withCredentials: true, // très important pour Sanctum
});

// attach token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
