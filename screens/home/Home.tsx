import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Define props for FeatureItem component
interface FeatureItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

// Define props for NavItem component
interface NavItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  active?: boolean;
}

// HomeScreen component
const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          placeholder="Tìm bệnh viện, bác sĩ"
          style={styles.searchInput}
        />
      </View>

      <ScrollView>
        {/* Banner */}
        {/* <View style={styles.banner}>
          <Image
            source={require("../../assets/images/bannerhospital.jpg")}
            style={styles.bannerImage}
          />
        </View> */}

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <FeatureItem icon="local-hospital" title="Chọn Bệnh viện" />
          <FeatureItem icon="video-call" title="Bác sĩ tư vấn" />
          <FeatureItem icon="assignment" title="Hồ sơ sức khỏe" />
          <FeatureItem icon="shopping-cart" title="Mua sắm" />
          <FeatureItem icon="phone" title="Gọi bác sĩ khẩn cấp" />
          <FeatureItem icon="chat" title="Cộng đồng" />
          <FeatureItem icon="event" title="Đặt hẹn Bác sĩ" />
          <FeatureItem icon="calendar-today" title="Lịch khám" />
        </View>

        {/* Featured Doctors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👨‍⚕️ Bác sĩ nổi bật</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        {/* Doctor list (To be implemented) */}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      {/* <View style={styles.navbar}>
        <NavItem icon="home" label="Trang chủ" active />
        <NavItem icon="people" label="Cộng đồng" />
        <NavItem icon="notifications" label="Thông báo" />
        <NavItem icon="person" label="Cá nhân" />
      </View> */}
    </View>
  );
};

// FeatureItem Component
const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title }) => (
  <View style={styles.featureItem}>
    <MaterialIcons name={icon} size={28} color="#FF6B6B" />
    <Text style={styles.featureText}>{title}</Text>
  </View>
);

// Navigation Item Component
const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => (
  <View style={styles.navItem}>
    <MaterialIcons name={icon} size={30} color={active ? "#FF6B6B" : "#777"} />
    <Text style={[styles.navText, active && { color: "#FF6B6B" }]}>
      {label}
    </Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    margin: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  banner: {
    width: "100%", // Ensure the container takes full width
    padding: 0,
  },
  bannerImage: {
    width: "100%", // Full width
    height: 200, // Adjust height as needed
    resizeMode: "contain", // Ensure full visibility
    alignSelf: "stretch", // Stretch to fill parent width
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  featureItem: {
    width: "22%",
    alignItems: "center",
    marginVertical: 10,
  },
  featureText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
    color: "#333",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewMore: {
    fontSize: 14,
    color: "#FF6B6B",
  },
  // navbar: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   padding: 10,
  //   backgroundColor: "#fff",
  //   borderTopWidth: 1,
  //   borderTopColor: "#ddd",
  // },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#777",
  },
});

export default HomeScreen;
