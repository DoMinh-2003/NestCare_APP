import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
} from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { getAllPackages } from "../../service/packageService";
import { useNavigation } from "expo-router";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { UserOrder } from "@/service/userService";

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface PackageService {
  id: string;
  slot: number;
  service: Service;
}

interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  period: string;
  delivery_included: number;
  alerts_included: number;
  packageServices: PackageService[];
}

const COLORS = ["#FFCCE1", "#BFECFF", "#FFF6E3", "#CDC1FF", "#FFD2A0"];

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);
  const navigation = useNavigation();

  const id = useSelector((state: RootState) => state.user?.id);


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getAllPackages();
        if (response && response.success) {
          setPackages(response.data || []);
          if (response.data && response.data.length > 0) {
            setExpandedPackage(response.data[0].id);
          }
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loader} />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


const handleBuy = async (packageId: string) => {
  if (!id) {
    console.error("User ID is missing.");
    return;
  }
  try {
    const response = await UserOrder(id, packageId);

    console.log(response);
    if (response) {
      const paymentUrl = response;

      // Kiểm tra nếu đang chạy trên Web thì dùng window.open
      if (Platform.OS === "web") {
        window.open(paymentUrl, "_blank"); // Mở VNPay trên tab mới của trình duyệt
      } else {
        Linking.openURL(paymentUrl); // Mở VNPay trên trình duyệt điện thoại
      }
    } else {
      alert("Đặt hàng thất bại, vui lòng thử lại!");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Đã xảy ra lỗi. Vui lòng thử lại.");
  }
};


  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isExpanded = expandedPackage === item.id;
          const backgroundColor = COLORS[index % COLORS.length];

          return (
            <TouchableOpacity
              onPress={() => setExpandedPackage(isExpanded ? null : item.id)}
            >
              <Card style={[styles.card, { backgroundColor: backgroundColor }]}>
                <Card.Content>
                  <View style={styles.titleContainer}>
                    <View style={styles.leftTitle}>
                      <MaterialIcons
                        name="emoji-events"
                        size={24}
                        color="yellow"
                      />
                      <Text style={styles.cardTitle}>{item.name}</Text>
                    </View>
                    <MaterialIcons
                      name={
                        isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
                      }
                      size={24}
                      color="#333"
                    />
                  </View>
                  <Text style={styles.price}>
                    {Number(item.price).toLocaleString("vi-VN")} VND mỗi tháng
                  </Text>

                  {isExpanded && (
                    <>
                      <Text style={styles.description}>{item.description}</Text>
                      <Text style={styles.info}>• Period: {item.period}</Text>
                      <Text style={styles.info}>
                        • Delivery Included:{" "}
                        {item.delivery_included ? "Yes" : "No"}
                      </Text>
                      <Text style={styles.info}>
                        • Alerts Included: {item.alerts_included ? "Yes" : "No"}
                      </Text>
                      <Text style={styles.servicesTitle}>Dịch vụ đi kèm:</Text>
                      {item.packageServices.length > 0 ? (
                        item.packageServices.map((service) => (
                          <TouchableOpacity
                            key={service.id}
                            style={styles.serviceContainer}
                            onPress={() =>
                              navigation.navigate("DetailService", {
                                serviceId: service.service.id,
                              })
                            }
                          >
                            <Text style={styles.serviceName}>
                              {service.service.name}{" "}
                              <Text style={{ color: "#FF4081" }}>
                                (Slot {service.slot})
                              </Text>
                            </Text>
                            <Text style={styles.servicePrice}>
                              Giá:
                              {Number(service.service.price).toLocaleString(
                                "vi-VN"
                              )}{" "}
                              VND
                            </Text>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text style={styles.noServices}>
                          No services included
                        </Text>
                      )}
                      <Button
                        mode="contained"
                        style={styles.buyButton}
                        labelStyle={styles.buyButtonText}
                        onPress={() => handleBuy(item.id)}
                      >
                        MUA NGAY
                      </Button>
                    </>
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#005f73",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginVertical: 5,
  },
  info: {
    fontSize: 14,
    color: "#222",
    marginBottom: 5,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  serviceContainer: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 5,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  servicePrice: {
    fontSize: 14,
    color: "#006b85",
    marginTop: 5,
  },
  buyButton: {
    marginTop: 15,
    backgroundColor: "#FF4081",
    borderRadius: 8,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Packages;
