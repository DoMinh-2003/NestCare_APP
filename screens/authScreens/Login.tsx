import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GoogleSocialButton } from "react-native-social-buttons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Google from "expo-auth-session/providers/google";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/config/firebase";
import { router, useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { login } from "@/redux/features/userSlice";
import { RootStackParamList } from "@/model/NavigationType";
import * as AuthSession from "expo-auth-session";
import Authentication from "@/service/Authentication";
import { Button, ButtonText } from "@/components/ui/button";
// import { signIn } from "../../service/Authentication";
import { Login2 } from "@/service/userService";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  inputContainer: {
    paddingHorizontal: 20,
    width: "100%",
    gap: 15,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 25,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D5D5D7",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  googleSocialButton: {
    borderWidth: 1,
    borderColor: "#D5D5D7",
    borderRadius: 25,
    width: "85%",
    height: 47,
    alignSelf: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

const Login = () => {
  const insets = useSafeAreaInsets();
  const { loginGoogle } = Authentication();
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "392832910333-ue02rtn0kdacm3ii1hoeabsgrtpft0ti.apps.googleusercontent.com",
    androidClientId:
      "392832910333-7vhaq8rl8llf2ukc8oa7k72sr06quip2.apps.googleusercontent.com",
    webClientId:
      "392832910333-g0gd0no6t0gan5560qeornescgku17ij.apps.googleusercontent.com",
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

  const handleLogin = async () => {
    try {
      const res = await Login2(username, password);
      console.log("res", res);
      navigation.replace("tabs");

      // router.replace('/home');
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  useEffect(() => {
    loginGG();
  }, [response]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/baby-logo.png")}
          style={styles.logo}
        />
        <Text className="text-xl font-semibold text-center mb-2">Nestcare</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          // keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace("tabs")} // Điều hướng sang homepage
          style={[styles.loginButton, { backgroundColor: "#4CAF50" }]} // Thay đổi màu cho dễ phân biệt
        >
          <Text style={styles.loginText}>Go to Homepage</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <Button onPress={() => router.push("/Signup")}>
          <ButtonText>Create Account</ButtonText>
        </Button>

        <GoogleSocialButton
          onPress={() => promptAsync()}
          buttonText="Continue with Google"
          logoStyle={{
            height: 25,
            width: 25,
          }}
          buttonViewStyle={styles.googleSocialButton}
          textStyle={{
            fontSize: 16,
          }}
        />
      </View>
    </View>
  );
};

export default Login;
