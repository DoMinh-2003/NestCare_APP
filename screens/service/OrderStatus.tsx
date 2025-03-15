import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { StatusOrder } from "../../service/userService";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const statusConfig = {
  PENDING: { color: "#FFA500", icon: "hourglass-half" },
  PAID: { color: "#32CD32", icon: "money-bill-wave" },
  COMPLETED: { color: "#007bff", icon: "check-circle" },
  CANCELED: { color: "#DC143C", icon: "times-circle" },
};

const statuses = Object.keys(statusConfig);

const OrderStatus = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("PENDING");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  useEffect(() => {
    if (selectedStatus) {
      setLoading(true);
      StatusOrder(selectedStatus)
        .then((response) => setResponseData(response))
        .catch((error) => console.error("Error fetching status:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedStatus]);

  return (
    <View style={styles.container}>
      {/* Thanh chọn trạng thái */}
      <View style={styles.statusContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setSelectedStatus(status)}
              style={[
                styles.statusButton,
                { backgroundColor: statusConfig[status].color },
                selectedStatus === status && styles.selectedButton,
              ]}
            >
              <FontAwesome5
                name={statusConfig[status].icon}
                size={18}
                color="#fff"
                style={styles.statusIcon}
              />
              <Text style={styles.selectedText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Hiển thị dữ liệu */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F37199" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : responseData && responseData.length > 0 ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 20,
            }}
          >
            {responseData.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <FontAwesome5
                    name={statusConfig[selectedStatus].icon}
                    size={22}
                    color={statusConfig[selectedStatus].color}
                  />
                  <Text
                    style={[
                      styles.orderStatus,
                      { color: statusConfig[selectedStatus].color },
                    ]}
                  >
                    {selectedStatus}
                  </Text>
                </View>

                <Text style={styles.orderTitle}>
                  Package: {order.package.name}
                </Text>
                <View style={styles.priceGroup}>
                  <Text style={styles.price}>
                    Giá:{" "}
                    {new Intl.NumberFormat("vi-VN").format(order.package.price)}{" "}
                    VND
                  </Text>
                </View>
                <Text style={styles.orderDetail}>
                  Description: {order.package.description}
                </Text>
                <Text style={styles.orderDetail}>
                  Period: {order.package.period} months
                </Text>
                <Text style={styles.orderDetail}>
                  Delivery Included:{" "}
                  {order.package.delivery_included ? "Yes" : "No"}
                </Text>
                <Text style={styles.orderDetail}>
                  Alerts Included:{" "}
                  {order.package.alerts_included ? "Yes" : "No"}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noOrderContainer}>
            <AntDesign name="inbox" size={50} color="#F37199" />
            <Text style={styles.noOrderText}>No orders available</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  statusContainer: {
    height: 60,
    justifyContent: "center",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    minWidth: 120,
    justifyContent: "center",
  },
  statusIcon: {
    marginRight: 8,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: "#FFCCE1",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#006b85",
  },
  orderDetail: {
    fontSize: 18,
    color: "#555",
    marginBottom: 3,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#F37199",
  },
  noOrderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noOrderText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#F37199",
  },
});

export default OrderStatus;
