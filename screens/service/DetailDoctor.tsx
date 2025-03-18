import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDetailDoctorByID } from "../../service/userService";

// Define type for route parameters
type DetailDoctorRouteProp = RouteProp<
  { DetailDoctor: { doctorId: string } },
  "DetailDoctor"
>;

interface DetailDoctorProps {
  route: DetailDoctorRouteProp;
}

interface DoctorItem {
  id: string;
  name: string;
  image?: string;
  specialization?: string;
  experience?: string;
  phone?: string;
  email?: string;
  role?: string;
}

const DetailDoctor: React.FC<DetailDoctorProps> = ({ route }) => {
  const navigation = useNavigation();
  const { doctorId } = route.params;
  const [doctor, setDoctor] = useState<DoctorItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    } else {
      console.error("doctorId is undefined!");
    }
  }, [doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      const response = await getDetailDoctorByID(doctorId);
      if (response) {
        setDoctor(response);
      } else {
        console.warn("Doctor details not found!");
        setDoctor(null);
      }
    } catch (error) {
      console.error("Error fetching doctor details: ", error);
      Toast.show({
        text1: "Lỗi tải dữ liệu",
        text2: "Vui lòng thử lại sau.",
        position: "top",
        type: "error",
        visibilityTime: 2000,
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F37199" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.loadingContainer}>
        <AntDesign name="inbox" size={50} color="#F37199" />
        <Text style={styles.loadingText}>Không tìm thấy bác sĩ</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={
            doctor.image
              ? { uri: doctor.image }
              : require("../../assets/images/default-image.jpg")
          }
          resizeMode="contain"
          style={styles.avatar}
        />
        <Text style={styles.name}>{doctor.fullName || "Chưa có tên"}</Text>
        <Text style={styles.specialization}>
          <AntDesign name="idcard" size={18} color="#F37199" />{" "}
          {doctor.role || "Không có vai trò"}
        </Text>
        <Text style={styles.info}>
          <AntDesign name="phone" size={18} color="#F37199" />{" "}
          {doctor.phone || "Không có số điện thoại"}
        </Text>
        <Text style={styles.info}>
          <AntDesign name="mail" size={18} color="#F37199" />{" "}
          {doctor.email || "Không có email"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: "#F37199",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  specialization: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#444",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default DetailDoctor;
