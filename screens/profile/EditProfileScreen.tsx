import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button, Avatar } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/features/userSlice";
import { showMessage } from "react-native-flash-message";
import { UserChangeProfile, GetProfile } from "../../service/userService"; // Import API calls
import { RootState } from "../../redux/store";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);

  // State variables
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);


  const [originalProfile, setOriginalProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: null,
  });
  // Fetch user profile from API
useEffect(() => {
  const fetchProfile = async () => {
    if (!userId) return;

    try {
      const response = await GetProfile(userId);
      if (response) {
        const userData = response;

        setName(userData.fullName || "");
        setEmail(userData.email || "");
        setPhone(userData.phone?.toString() || "");
        setProfileImage(userData.image || null);

        // Store original values
        setOriginalProfile({
          name: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phone?.toString() || "",
          profileImage: userData.image || null,
        });

        // Update Redux state
        dispatch(updateProfile(userData));
      }
    } catch (error) {
      showMessage({ message: "Không thể tải hồ sơ", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [userId]);

const isChanged = () => {
  return (
    name !== originalProfile.name ||
    email !== originalProfile.email ||
    phone !== originalProfile.phone ||
    profileImage !== originalProfile.profileImage
  );
};

  // Handle image picker
  const handleImagePick = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: "photo", includeBase64: false },
      (response) => {
        if (response.didCancel || response.errorCode) {
          console.log("User cancelled image picker");
        } else if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
        }
      }
    );
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!email || !name || !phone) {
      showMessage({ message: "Vui lòng điền đủ thông tin!", type: "warning" });
      return;
    }

    if (!isValidEmail(email)) {
      showMessage({ message: "Email không hợp lệ!", type: "warning" });
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showMessage({
        message: "Số điện thoại phải có đúng 10 chữ số!",
        type: "warning",
      });
      return;
    }

    

    setUpdating(true);

    try {
      const response = await UserChangeProfile(
        userId,
        email,
        profileImage || "",
        name,
        phone,
        "user"
      );

      if (response) {
        dispatch(
          updateProfile({
            email,
            image: profileImage,
            fullName: name,
            phone,
          })
        );

        showMessage({ message: "Cập nhật thành công!", type: "success" });
        // navigation.goBack();
      }
    } catch (error) {
      console.error("Profile update failed:", error);

      let errorMessage = "Cập nhật thất bại!";

      if (error.response) {
        const serverMessage =
          error.response.data.data?.message ||
          JSON.stringify(error.response.data);

        if (serverMessage.includes("Duplicate entry")) {
          errorMessage = "Số điện thoại này đã được sử dụng!";
        } else {
          errorMessage = serverMessage;
        }
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến server!";
      } else {
        errorMessage = error.message;
      }

      showMessage({
        message: "Lỗi!",
        description: errorMessage,
        type: "danger",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F37199" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePick}>
          <Avatar.Image
            size={100}
            source={{
              uri:
                profileImage ||
                "https://ykhoamia.com/wp-content/uploads/2015/12/B%C3%A1c-s%C4%A9-03.jpg",
            }}
          />
        </TouchableOpacity>
      </View>
      {/* Form Fields */}
      <TextInput
        label="Họ và tên"
        value={name}
        onChangeText={setName}
        mode="outlined"
      />
      {/* <TextInput
        label="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        mode="outlined"
        style={styles.input}
      /> */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        onBlur={() => {
          if (!isValidEmail(email)) {
            showMessage({ message: "Email không hợp lệ!", type: "warning" });
          }
        }}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none" // Tránh viết hoa tự động
        style={styles.input}
      />
      <TextInput
        label="Số điện thoại"
        value={phone}
        onChangeText={(text) => {
          if (/^\d*$/.test(text)) setPhone(text); // Chỉ cho phép số
        }}
        mode="outlined"
        keyboardType="phone-pad"
        maxLength={10} // Giới hạn số lượng ký tự nhập vào là 10
        style={styles.input}
      />
      {/* Update Button */}
      <Button
        mode="contained"
        onPress={handleUpdateProfile}
        loading={updating}
        disabled={!isChanged()} // Button is disabled if no changes are detected
        style={styles.button}
      >
        Lưu thay đổi
      </Button>
      ;
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    // alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#F37199",
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
