import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/model/NavigationType";
import { showMessage } from "react-native-flash-message";
import { SignUp2 } from "@/service/userService";

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
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const Signup = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      showMessage({
        message: "Error",
        description: "Passwords do not match",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await SignUp2(fullName, email, username, password, phone);
      console.log("Response:", res);

      showMessage({
        message: "Xin chào 👋",
        description: "Chúc mừng đã đăng ký thành công!",
        type: "success",
        icon: "success",
        duration: 3000,
      });

      navigation.replace("login");
    } catch (error: any) {
      console.error("Signup Error:", error);

      let errorMessage = "Register failed. Please try again.";

      // ✅ Extract meaningful error message
      if (error?.message) {
        errorMessage = error.message;

        // // ✅ Handle specific duplicate entry error
        // if (errorMessage.includes("Duplicate entry")) {
        //   errorMessage =
        //     "This email is already registered. Please use another email.";
        // } else if (errorMessage.includes("Duplicate entry")) {
        //   errorMessage =
        //     "This email is already registered. Please use another email.";
        // }
      }

      showMessage({
        message: "Register Failed",
        description: errorMessage,
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

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
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
