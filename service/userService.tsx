import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "./customize-axios";

export const Login2 = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    console.log("Login Response:", response); 

    return response;
  } catch (error: any) {
    console.error("Login Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};
