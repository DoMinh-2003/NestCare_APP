import { View, Text } from "react-native";
import useApi from "@/hooks/callApi";

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

export default Authentication;
