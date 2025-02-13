import { View, Text } from "react-native";
import useApi from "@/hooks/callApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Authentication = () => {
  const { callApi, loading } = useApi();

  const loginGoogle = async (accessToken: string) => {
    console.log(accessToken);
    const response = await callApi(
      "post",
      "login-google",
      { token: accessToken },
      "Login Google Successfully"
    );
    console.log(response);
    return response;
  };

  return { loginGoogle, loading };
};

// export const signIn = async (email: string, password: string) => {
//   try {
//     // Add your authentication logic here (e.g., Firebase, custom backend)
//     const response = await callApi(
//       "post",
//       "login",
//       { email, password },
//       "Login Successfully"
//     );
//     // Store user token/session
//     await AsyncStorage.setItem('userToken', response.token);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const signUp = async (email: string, password: string) => {
//   try {
//     // Add your registration logic here
//     const response = await callApi(
//       "post",
//       "register",
//       { email, password },
//       "Register Successfully"
//     );
//     // Store user token/session
//     await AsyncStorage.setItem('userToken', response.token);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export default Authentication;
