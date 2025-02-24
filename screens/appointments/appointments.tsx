import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <Text style={styles.subtitle}>You have no upcoming appointments.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book an Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppointmentsScreen;
