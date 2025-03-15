import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const AppointmentCard = () => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cuộc hẹn sắp tới</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#fff" />
      </View>

      {/* Date & Time Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <FontAwesome5 name="calendar-alt" size={16} color="white" />
          <Text style={styles.infoText}>22 October, 2023</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="white" />
          <Text style={styles.infoText}>08:00 AM - 10:30 AM</Text>
        </View>

        {/* <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="#4A1EA6" />
        </TouchableOpacity> */}
      </View>

      {/* Doctor Information */}
      <View style={styles.doctorContainer}>
        <Image
          source={{
            uri: "https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg", // Replace with real doctor image
          }}
          resizeMode="contain"
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. Richar Kandowen</Text>
          <Text style={styles.doctorSpecialty}>Child Specialist</Text>
        </View>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#4A1EA6" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F37199",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    alignSelf: "center",
    marginBottom: 20,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    color: "white",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
  doctorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  doctorSpecialty: {
    color: "gray",
    fontSize: 12,
  },
  chatButton: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
});

export default AppointmentCard;
