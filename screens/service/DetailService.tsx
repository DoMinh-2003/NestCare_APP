import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDetailServiceByID } from "../../service/userService";

// Define type for route parameters
type DetailServiceRouteProp = RouteProp<
  { DetailService: { serviceId: string } },
  "DetailService"
>;

interface DetailServiceProps {
  route: DetailServiceRouteProp;
}

interface ServiceItem {
  id: string;
  name: string;
  provider?: string;
  price: string;
  image?: string;
  description?: string;
}

const DetailService: React.FC<DetailServiceProps> = ({ route }) => {
  const navigation = useNavigation();
  const { serviceId } = route.params;
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const response = await getDetailServiceByID(serviceId);
      if (response?.data) {
        setService(response.data);
      }
    } catch (error) {
      console.error("Error fetching service details: ", error);
      Toast.show({
        text1: "Error fetching service details",
        text2: "Please try again later.",
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
        <ActivityIndicator size="large" color="#FF6347" />
        <Text style={styles.loadingText}>Fetching Service Details...</Text>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Service Not Found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{service.name}</Text>
      </View> */}

      <View style={styles.contentContainer}>
        <Image
          source={
            service.image
              ? { uri: service.image }
              : require("../../assets/images/default-image.jpg")
          }
          style={styles.image}
        />
        <Text style={styles.price}>
          {parseFloat(service.price).toLocaleString("vi-VN")} VND
        </Text>
        <Text style={styles.description}>
          {service.description || "No description available."}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgb(0, 110, 173)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerButton: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    fontSize: 16,
    color: "#666666",
    marginTop: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    marginTop: 10,
  },
});

export default DetailService;
