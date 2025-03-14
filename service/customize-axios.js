import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://192.168.2.12:8080/api',
  // baseURL: 'http://192.168.88.161:8080/api',
  // baseURL: 'https://5a65-118-69-182-149.ngrok-free.app/api/',
  baseURL: 'https://583e-2405-4802-a30e-2990-3502-82a7-9aff-83cb.ngrok-free.app/api/',
  // baseURL: 'http://192.168.1.3:8080/api',
  // baseURL: 'http://192.168.1.3:8080/api',
  // baseURL: 'http://10.87.13.176:8080/api',
  headers: {
    'Content-Type': 'application/json',
    "ngrok-skip-browser-warning": "true"
  },
  timeout: 20000, // 20 seconds
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to return response.data
axiosInstance.interceptors.response.use(
  response => response.data, // Intercept and return only the data part of the response
  error => {
    // Optional: You can log the error here for additional debugging
    console.error('Axios error:', error.response || error.message);
    return Promise.reject(error); // Forward any errors
  }
);

export { axiosInstance };
