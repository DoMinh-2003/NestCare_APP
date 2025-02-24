import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const HealthTipsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Tips for Pregnant Mothers</Text>
      <Text style={styles.tip}>
        🌿 Eat a balanced diet rich in vitamins and minerals.
      </Text>
      <Text style={styles.tip}>
        💧 Stay hydrated by drinking plenty of water.
      </Text>
      <Text style={styles.tip}>
        🏃‍♀️ Engage in light exercise like prenatal yoga.
      </Text>
      <Text style={styles.tip}>
        😴 Get enough rest and manage stress levels.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 15,
  },
  tip: {
    fontSize: 16,
    marginBottom: 10,
    color: "#444",
  },
});

export default HealthTipsScreen;
