import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAllRoleDoctor } from "@/service/userService";

const HomeScreen = () => {
  const [doctors, setDoctors] = useState([]);

  // Memoized function to fetch doctors
  const fetchDoctors = useCallback(async () => {
    const doctorList = await getAllRoleDoctor("doctor");
    setDoctors(doctorList); // ✅ Now correctly setting only doctor list
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const services = [
    { id: 1, name: "Ultrasound", icon: "medical-services" },
    { id: 2, name: "Prenatal Checkup", icon: "pregnant-woman" },
    { id: 3, name: "Nutrition Counseling", icon: "restaurant" },
    { id: 4, name: "Yoga Classes", icon: "self-improvement" },
  ];

  const upcomingAppointment = {
    doctor: "Dr. Anna Nguyen",
    date: "March 20, 2025",
    time: "10:00 AM",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Upcoming Appointment */}
      <View style={styles.upcomingContainer}>
        <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentText}>
            {upcomingAppointment.doctor}
          </Text>
          <Text style={styles.appointmentText}>
            {upcomingAppointment.date} at {upcomingAppointment.time}
          </Text>
        </View>
      </View>

      {/* List of Doctors */}
      <Text style={styles.sectionTitle}>Doctors</Text>
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

      {/* Services */}
      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.serviceScroll}
      >
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Icon name={service.icon} size={40} color="#FF6F61" />
            <Text style={styles.serviceText}>{service.name}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  upcomingContainer: { marginBottom: 20 },
  appointmentCard: {
    backgroundColor: "#FFEBEE",
    padding: 15,
    borderRadius: 10,
  },
  appointmentText: { fontSize: 16, fontWeight: "bold" },
  doctorScroll: { marginBottom: 20 },
  doctorCard: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 10,
  },
  doctorImage: {
    width: 160,
    height: 160,
    borderRadius: 40,
    marginBottom: 5,
  },

  doctorName: { fontSize: 14, fontWeight: "bold" },
  doctorSpecialty: { fontSize: 12, color: "gray" },
  noDoctorText: { fontSize: 14, fontWeight: "bold", color: "gray" },
  serviceScroll: { marginBottom: 20 },
  serviceCard: {
    alignItems: "center",
    marginRight: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF5F5",
  },
  serviceText: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
});

export default HomeScreen;
