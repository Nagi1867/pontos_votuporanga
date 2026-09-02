import axios from "axios";

const dev = "http://localhost:8080";
const prod = "https://pontos-votuporanga-1.onrender.com";

const api = axios.create({
  baseURL: prod,
});

// Adiciona o JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;