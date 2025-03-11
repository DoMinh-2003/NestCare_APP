import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.detail}>👩 Name: Jane Doe</Text>
      <Text style={styles.detail}>📧 Email: jane.doe@example.com</Text>
      <Text style={styles.detail}>📅 Due Date: July 15, 2025</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#B71C1C" }]}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDE7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9800",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FF9800",
    padding: 15,
    borderRadius: 25,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
