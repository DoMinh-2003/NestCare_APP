import { axiosInstance } from "./customize-axios";
// http://14.225.217.181:3000/api/packages
export const Login = async () => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      //   searchCondition: {
      //     keyword: "",
      //     is_deleted: false,
      //   },
      //   pageInfo: {
      //     pageNum: 1,
      //     pageSize: 1000,
      //   },
    });

    console.log("====================================");
    console.log("Login", response);
    console.log("====================================");

    return response;
  } catch (error) {
    console.log(error);
  }
};
