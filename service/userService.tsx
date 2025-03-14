import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "./customize-axios";

export const Login2 = async (
  username: string,
  password: string
): Promise<{
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  isDeleted: boolean;
  token: string;
}> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });

    console.log("Login Response:", response);

    return response; // Extract the data property
  } catch (error: any) {
    console.error("Login Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
};

export const SignUp2 = async (
  fullName: string,
  email: string,
  username: string,
  password: string,
  phone: string
): Promise<{
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  isDeleted: boolean;
  token: string;
}> => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      fullName,
      email,
      username,
      password,
      phone,
    });

    console.log("Register Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Register Error:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Register failed. Please try again."
    );
  }
};

export const getAllService = async (keyword = "") => {
  try {
    const response = await axiosInstance.post("/services/search", {
      searchCondition: {
        keyword: keyword, // Use the keyword parameter
        isDeleted: 0,
      },
      pageInfo: {
        pageNum: 1,
        pageSize: 1000,
      },
    });

    console.log("====================================");
    console.log("getAllService", response);
    console.log("====================================");

    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

export const getDetailServiceByID = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/services/${id}`, {});

    console.log("====================================");
    console.log("getServiceDetail", response);
    console.log("====================================");

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRoleDoctor = async (role: string) => {
  try {
    const response = await axiosInstance.get(`/users/role/doctor`, {
      params: { role },
    });

    console.log("====================================");
    console.log("getAllRoleDoctor", response);
    console.log("====================================");

    return response;
  } catch (error) {
    console.log(error);
  }
};
