import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "expo-router";
import { GoogleSocialButton } from "react-native-social-buttons";
import { auth } from "@/config/firebase";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "@/redux/features/userSlice";
import { Login2 } from "@/service/userService";
// import { Ionicons } from "@expo/vector-icons";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Divider } from "react-native-paper";
import { Button, ButtonText } from "@/components/ui/button";
const Login = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "392832910333-ue02rtn0kdacm3ii1hoeabsgrtpft0ti.apps.googleusercontent.com",
    androidClientId:
      "392832910333-7vhaq8rl8llf2ukc8oa7k72sr06quip2.apps.googleusercontent.com",
    webClientId:
      "392832910333-g0gd0no6t0gan5560qeornescgku17ij.apps.googleusercontent.com",
  });

  const handleLogin = async () => {
    try {
      const res = await Login2(username, password);
      if (res?.token) {
        await AsyncStorage.setItem("token", res.token);
        dispatch(login(res));
        showMessage({
          message: "Xin chào 👋",
          description: `${res.fullName} đăng nhập thành công!`,
          type: "success",
        });
        navigation.replace("tabs");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
      showMessage({
        message: "Đăng nhập không thành công. Vui lòng thử lại.",
        description: `${error} `,
        type: "danger",
      });
      setError("Đăng nhập không thành công. Vui lòng thử lại.");
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Image
        source={require("../../assets/images/baby-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Đăng nhập với <Text style={styles.tittlecolor}>NESTCARE</Text>
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          {/* <Ionicons
              name="mail-outline"
              size={24}
              color="#666"
              style={styles.icon}
            /> */}
          <FontAwesome
            name="user"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Ionicons
              name={secureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="#F37199"
              style={{ opacity: 0, height: 0 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <Fontisto
            name="locked"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
          {/* <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#F37199"
              style={styles.icon}
            /> */}
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />

          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Ionicons
              name={secureTextEntry ? "eye-off" : "eye"}
              size={24}
              color="#F37199"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>
        {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </View>
      {/* <Text style={styles.orText}>
        ----------------------------------------------
      </Text> */}
      {/* <View style={styles.socialButtonsContainer}>
          <GoogleSocialButton onPress={() => promptAsync()} />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <View style={styles.textContainer}>
            <Text style={styles.dividerText}>Or</Text>
          </View>
          <View style={styles.divider} />
        </View> */}

      {/* <Divider style={{ height: 100, backgroundColor: "black" }} /> */}

      {/* <Button onPress={() => navigation.replace("signup")}>
        <ButtonText>Create Account</ButtonText>
      </Button> */}

      <TouchableOpacity
        onPress={() => navigation.replace("signup")}
        // style={styles.signupLink}
      >
        <Text style={styles.signupText}>
          Bạn chưa có tài khoản?
          <Text style={styles.signupLink}> Đăng ký</Text>
        </Text>
      </TouchableOpacity>

      {/* 
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  inputContainer: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    // borderWidth: 1, // Add border width
    // borderColor: "#ccc", // Light grey border
    // backgroundColor: "#ffffff", // Ensure white background
  },

  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#F37199",
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,

    borderRadius: 25,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#4A56E2",
    textAlign: "right",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 10
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 10,
    backgroundColor: "#red",
  },
  textContainer: {
    paddingHorizontal: 10,
    backgroundColor: "white", // Match background to avoid overlap
  },
  dividerText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  orText: {
    fontSize: 18,
    marginBottom: 10,
  },
  signupText: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  signupLink: {
    fontSize: 18,
    color: "#F37199",
    fontWeight: "bold",
  },
  tittlecolor: {
    color: "#F37199",
  },
});

export default Login;
