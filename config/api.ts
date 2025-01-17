import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  //  baseURL: "http://103.200.20.149:8080/api/", // android
  // baseURL: "http://localhost:8080/api/", // ios
  baseURL: process.env.API_URL, // .env
});

api.interceptors.request.use(
   async (config) => {
    const token = await AsyncStorage.getItem("token");
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


// import axios from "axios";
// import { refreshAuthToken } from "../utils/authUtils";

// const SERVER = import.meta.env.VITE_API_URL_SERVER;
// const LOCAL = "http://localhost:8080/api/";

// const api = axios.create({
//   baseURL: LOCAL,
// });

// api.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite retry loop

//       try {
//         const newToken = await refreshAuthToken();
//         axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
