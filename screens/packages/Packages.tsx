import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, ActivityIndicator, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { getAllPackages } from "../../service/packageService";

interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface PackageService {
  id: string;
  slot: number;
  service: Service;
}

interface Package {
  id: string;
  name: string;
  price: string;
  description: string;
  period: string;
  delivery_included: number;
  alerts_included: number;
  packageServices: PackageService[];
}

const COLORS = ["#FFD700", "#FFB6C1", "#ADD8E6", "#98FB98", "#FFA07A"];

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await getAllPackages();
        if (response && response.success) {
          setPackages(response.data || []);
        } else {
          setError("Invalid response format");
        }
      } catch (err) {
        setError("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loader} />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const isExpanded = expandedPackage === item.id;
          const backgroundColor = COLORS[index % COLORS.length];

          return (
            <TouchableOpacity
              onPress={() => setExpandedPackage(isExpanded ? null : item.id)}
            >
              <Card
                style={[
                  styles.card,
                  { backgroundColor: backgroundColor },
                  isExpanded && styles.cardExpanded,
                ]}
              >
                <Card.Content>
                  <View style={styles.titleContainer}>
                    <View style={styles.leftTitle}>
                      <MaterialIcons
                        name="emoji-events"
                        size={24}
                        color="#333"
                      />
                      <Text style={styles.cardTitle}>{item.name}</Text>
                    </View>
                    <MaterialIcons
                      name={
                        isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
                      }
                      size={24}
                      color="#333"
                    />
                  </View>
                  <Text style={styles.price}>${item.price} per month</Text>
                  {isExpanded && (
                    <>
                      <Text style={styles.description}>{item.description}</Text>
                      <Text style={styles.info}>Period: {item.period}</Text>
                      <Text style={styles.info}>
                        Delivery Included:{" "}
                        {item.delivery_included ? "Yes" : "No"}
                      </Text>
                      <Text style={styles.info}>
                        Alerts Included: {item.alerts_included ? "Yes" : "No"}
                      </Text>
                      <Text style={styles.servicesTitle}>
                        Included Services:
                      </Text>
                      {item.packageServices.length > 0 ? (
                        item.packageServices.map((service) => (
                          <View
                            key={service.id}
                            style={styles.serviceContainer}
                          >
                            <Text style={styles.serviceName}>
                              {service.service.name} (Slot {service.slot})
                            </Text>
                            <Text style={styles.servicePrice}>
                              Price: ${service.service.price}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.noServices}>
                          No services included
                        </Text>
                      )}
                      <Button
                        mode="contained"
                        style={styles.buyButton}
                        labelStyle={styles.buyButtonText}
                      >
                        BUY NOW
                      </Button>
                    </>
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardExpanded: {
    borderWidth: 2,
    borderColor: "#1E88E5",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000", // Ensuring better readability on bright backgrounds
    marginLeft: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#004AAD", // Darker blue for better contrast
  },
  description: {
    fontSize: 14,
    color: "#333", // More contrast
    marginVertical: 5,
  },
  info: {
    fontSize: 14,
    color: "#222", // Better contrast
    marginBottom: 5,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000", // Ensuring good contrast
  },
  serviceContainer: {
    padding: 10,
    backgroundColor: "#E0E0E0", // Keeping service cards readable
    borderRadius: 8,
    marginTop: 5,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
  },
  servicePrice: {
    fontSize: 14,
    color: "#006400", // A darker green for better visibility
  },
  noServices: {
    fontSize: 14,
    color: "red",
  },
  buyButton: {
    marginTop: 15,
    backgroundColor: "#1E88E5",
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});


export default Packages;
