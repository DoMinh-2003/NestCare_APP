import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Animated,
} from "react-native";
import { getAllRoleDoctor } from "@/service/userService";
import Service2 from "../service/Service2";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import AppointmentCard from "../service/AppointmentCard";
import SubscriptionUI from "../packages/SubscriptionUI";

const HomeScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSearch, setFinalSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchWidth = useRef(new Animated.Value(0)).current;
  const fullName = useSelector((state: RootState) => state.user?.fullName);
  const image = useSelector((state: RootState) => state.user?.image);

  const fetchDoctors = useCallback(async () => {
    const doctorList = await getAllRoleDoctor("doctor");
    setDoctors(doctorList);
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleSearch = () => {
    setFinalSearch(searchQuery.trim());
    Keyboard.dismiss();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFinalSearch("");
  };

  const toggleSearchBar = () => {
    if (isSearchOpen) {
      Animated.timing(searchWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSearchOpen(false));
    } else {
      setIsSearchOpen(true);
      Animated.timing(searchWidth, {
        toValue: 295,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              image ||
              "https://ykhoamia.com/wp-content/uploads/2015/12/B%C3%A1c-s%C4%A9-03.jpg",
          }}
          // source={{
          //   // uri: "https://i.pravatar.cc/300", // Placeholder avatar
          //   uri: "https://ykhoamia.com/wp-content/uploads/2015/12/B%C3%A1c-s%C4%A9-03.jpg", // Placeholder avatar
          // }}
          resizeMode="contain"
          style={styles.avatar}
        />
        {isSearchOpen ? (
          <Animated.View
            style={[styles.searchContainer, { width: searchWidth }]}
          >
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm dịch vụ ..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
              />
              {searchQuery ? (
                <TouchableOpacity
                  onPress={clearSearch}
                  style={styles.clearButton}
                >
                  <Icon name="times-circle" size={20} color="grey" />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={handleSearch}
                style={styles.searchButton}
              >
                <Text style={styles.searchButtonText}>
                  <Icon name={"search"} size={20} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : (
          <Text style={styles.greeting}>
            Xin chào, <Text style={{ color: "#F37199" }}>{fullName}</Text>
          </Text>
        )}

        <TouchableOpacity onPress={toggleSearchBar} style={styles.searchIcon}>
          <Icon
            name={isSearchOpen ? "caret-left" : "search"}
            size={24}
            // color="#white"
          />
        </TouchableOpacity>
      </View>

      {/* Upcoming Appointment */}
      {/* <View style={styles.upcomingContainer}>
        <Text style={styles.sectionTitle}>Cuộc hẹn sắp tới</Text>
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentText}>Dr. Anna Nguyen</Text>
          <Text style={styles.appointmentText}>March 20, 2025 at 10:00 AM</Text>
        </View>
      </View> */}

      <AppointmentCard />

      {/* <SubscriptionUI /> */}

      {/* Services */}
      <Text style={styles.sectionTitle}>Dịch vụ hiện có</Text>
      <View style={styles.servicesContainer}>
        <Service2 searchQuery={finalSearch} />
      </View>

      {/* List of Doctors */}
      <Text style={styles.sectionTitle}>Bác sĩ nổi bật</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.doctorScroll}
      >
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <Image
                source={{
                  uri:
                    doctor.image ||
                    "https://tamanhhospital.vn/wp-content/uploads/2020/12/duong-viet-bac-detail.png",
                }}
                style={styles.doctorImage}
                resizeMode="contain"
              />
              <Text style={styles.doctorName}>{doctor.fullName}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.role}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDoctorText}>No doctors available</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    height: 56,
  },
  avatar: { width: 56, height: 56, borderRadius: 20 },
  greeting: { fontSize: 18, fontWeight: "bold", flex: 1, marginLeft: 10 },
  searchIcon: { paddingTop: 10, paddingRight: 10, paddingBottom: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
    height: 45,
    width: "100%",
    alignSelf: "center",
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
  },
  clearButton: { margin: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  upcomingContainer: { marginBottom: 20 },
  appointmentCard: {
    backgroundColor: "#FFCCE1",
    padding: 15,
    borderRadius: 10,
  },
  appointmentText: { fontSize: 16, fontWeight: "bold" },
  doctorScroll: { marginBottom: 20, paddingLeft: 5 },
  doctorCard: {
    alignItems: "center",
    marginRight: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFCCE1",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  doctorImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 5 },
  doctorName: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  doctorSpecialty: { fontSize: 12, color: "gray", textAlign: "center" },
  noDoctorText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    textAlign: "center",
  },
  servicesContainer: { paddingBottom: 20 },
  searchButton: {
    backgroundColor: "#F37199",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
