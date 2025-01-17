import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { GoogleSocialButton } from "react-native-social-buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { login } from "@/redux/features/userSlice";
import { RootStackParamList } from "@/model/NavigationType";
import * as AuthSession from "expo-auth-session";
import Authentication from "@/service/Authentication";
import { Button, ButtonText } from "@/components/ui/button";

const styles = StyleSheet.create({
  centerContent: {
    alignItems: "center",
  },

  googleSocialButton: {
    borderWidth: 1,
    borderColor: "#D5D5D7",
    borderRadius: 50,
    width: "90%",
    height: 47,
  },
});

const Login = () => {
  const insets = useSafeAreaInsets();
  const { loginGoogle } = Authentication();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "392832910333-ue02rtn0kdacm3ii1hoeabsgrtpft0ti.apps.googleusercontent.com",
    androidClientId:
      "392832910333-7vhaq8rl8llf2ukc8oa7k72sr06quip2.apps.googleusercontent.com",
  });

  const loginGG = async () => {
    if (response?.type === "success") {
      navigation.navigate("tabs");
      // const { authentication } = response;
      // const credential = await GoogleAuthProvider.credential(
      //   authentication?.idToken,
      //   authentication?.accessToken
      // );
      // try {
      //   const res = await signInWithCredential(auth, credential);
      //   const { accessToken }: any = res.user;
      //   const response = await loginGoogle(accessToken);
      //   const { data } = response;
      //   dispatch(login(data));
      //   await AsyncStorage.setItem("token", data.token);
      //   navigation.navigate("Home");
      //   if (data.role == "STUDENT") {
      //     navigation.navigate("Login");
      //   } else {
      //     navigation.navigate("Profile");
      //   }
      // } catch (error) {
      //   console.error(error);
      // }
    }
  };

  useEffect(() => {
    loginGG();
  }, [response]);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
      }}
      className="flex justify-center items-center"
    >
      <View className="w-full space-y-4 items-center">
        <Text className="text-[30px] font-bold text-center">
          Đăng nhập vào hệ thống
        </Text>

        <Button size="md" variant="solid" action="primary" className="my-5">
          <ButtonText>Đăng nhập</ButtonText>
        </Button>

        <GoogleSocialButton
          onPress={() => {
            promptAsync();
          }}
          logoStyle={{
            height: 40,
            width: 40,
          }}
          buttonViewStyle={styles.googleSocialButton}
        />
      </View>
    </View>
  );
};

export default Login;
