import axios from "axios";
import { getToken } from "../auth";

// Use the environment variable for base URL
export const BASE_URL = "https://api.mytufan.com/api/v1"

//import.meta.env.VITE_API_BASE_URL;

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Sandip ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
