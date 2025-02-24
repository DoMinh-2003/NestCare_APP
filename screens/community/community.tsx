import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const dummyPosts = [
  { id: "1", user: "Alice", content: "What are the best prenatal vitamins?" },
  { id: "2", user: "Mary", content: "Any tips for morning sickness?" },
  { id: "3", user: "Emma", content: "How do you prepare for labor?" },
];

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Forum</Text>
      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.user}>{item.user}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3E5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 15,
  },
  post: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  user: {
    fontWeight: "bold",
    color: "#6A1B9A",
    marginBottom: 5,
  },
});

export default CommunityScreen;
