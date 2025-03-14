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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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
      if (error?.message) {
        errorMessage = error.message;
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
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Image
          source={require("@/assets/images/baby-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          {" "}
          Đăng ký với <Text style={styles.tittlecolor}>NESTCARE</Text>{" "}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <FontAwesome
            name="user"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
          <TextInput
            style={styles.input}
            placeholder="Họ và Tên"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputWrapper}>
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
        </View>

        <View style={styles.inputWrapper}>
          <FontAwesome
            name="phone"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="email"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Fontisto
            name="locked"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
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

        <View style={styles.inputWrapper}>
          <Fontisto
            name="locked"
            size={24}
            style={styles.icon}
            color="#F37199"
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureTextEntry}
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

        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.replace("login")}
        style={styles.signupLink}
      >
        <Text style={styles.loginLink}>
          {" "}
          Bạn đã có tài khoản?{" "}
          <Text style={styles.loginLinkText}> Đăng nhập</Text>{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCCE1",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  // logoContainer: {
  //   alignItems: "center",
  //   marginBottom: 30,
  // },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  iconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    // borderWidth: 1, // Add border width
    // borderColor: "#ccc", // Light grey border
    // backgroundColor: "#ffffff", // Ensure white background
  },

  button: {
    backgroundColor: "#F37199",
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,

    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    fontSize: 18,
    // marginTop: 20,
    alignItems: "center",
    // alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  loginLinkText: {
    color: "#F37199",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    alignItems: "center",
  },
  signupLink: {
    marginTop: 20,
  },
  tittlecolor: {
    color: "#F37199",
  },
  icon: {
    marginRight: 10,
  },
});

export default Signup;
