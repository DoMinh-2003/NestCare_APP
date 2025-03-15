import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Card } from "react-native-paper";

const packages = [
  {
    id: "basic",
    name: "Basic",
    price: "$5/month",
    services: ["Service A", "Service B"],
  },
  {
    id: "standard",
    name: "Standard",
    price: "$10/month",
    services: ["Service A", "Service B", "Service C"],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$20/month",
    services: ["Service A", "Service B", "Service C", "Service D"],
  },
];

const SubscriptionUI = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Choose Your Plan
      </Text>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 15, padding: 15 }}>
            <TouchableOpacity onPress={() => setSelectedPackage(item.id)}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, color: "gray" }}>{item.price}</Text>
              <Text style={{ marginTop: 10 }}>Includes:</Text>
              {item.services.map((service, index) => (
                <Text key={index} style={{ marginLeft: 10, color: "blue" }}>
                  - {service}
                </Text>
              ))}
              {selectedPackage === item.id && (
                <Text
                  style={{ marginTop: 10, color: "green", fontWeight: "bold" }}
                >
                  Selected
                </Text>
              )}
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
};

export default SubscriptionUI;
