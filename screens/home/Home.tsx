import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Care Center</Text>
      <Text style={styles.subtitle}>
        Stay informed about your pregnancy journey.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});

export default HomeScreen;
