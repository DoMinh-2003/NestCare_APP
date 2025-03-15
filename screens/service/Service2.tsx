import { getAllService } from "@/service/userService";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

interface ServiceItem {
  id: string;
  name: string;
  provider: string;
  price: number;
  image: string;
}

const Service2 = ({ searchQuery }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchServices(searchQuery);
  }, [searchQuery]);

  const fetchServices = async (keyword: string) => {
    try {
      setLoading(true);
      const response = await getAllService(keyword);

      if (response?.data?.pageData) {
        const formattedData: ServiceItem[] = response.data.pageData
          .filter((item: any) => !item.isDeleted)
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            provider: item.description || "Unknown Provider",
            price: parseFloat(item.price),
            image: item.image || "",
          }));

        setServices(formattedData);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchServices(searchQuery.trim());
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchServices("");
    searchInputRef.current?.focus();
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginTop: 20 }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search by service name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Icon name="times-circle" size={20} color="grey" />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View> */}

      {/* Horizontal ScrollView for Swiping */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {services.length > 0 ? (
          services.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("DetailService", { serviceId: item.id })
              }
            >
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../assets/images/default-image.jpg")
                }
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <Text style={styles.artName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.subtitle}>{item.provider}</Text>
                <View style={styles.priceGroup}>
                  <Text style={styles.price}>
                    {new Intl.NumberFormat("vi-VN").format(item.price)} VND
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noServiceText}>No services available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  clearButton: {
    padding: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scrollContainer: {
    marginBottom: 20,
    paddingLeft: 5,
  },
  card: {
    width: 140, // Ensures cards are wide enough
    marginRight: 15, // Space between cards
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#FFCCE1",
    elevation: 3, // Adds shadow effect on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    resizeMode: "cover",
    height: 120,
  },
  cardContent: {
    padding: 10,
  },
  artName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  priceGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#006b85",
  },
  noServiceText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
    marginTop: 20,
  },
});

export default Service2;
