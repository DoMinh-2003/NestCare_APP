import { getAllService } from "@/service/userService";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

interface ServiceItem {
  id: string; // UUID
  name: string;
  provider: string; // Fallback to description if provider isn't available
  price: number;
  image: string;
}

const Service = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchServices("");
  }, []);

  const fetchServices = async (keyword: string) => {
    try {
      setLoading(true);
      const response = await getAllService(keyword);

      if (response?.data?.pageData) {
        const formattedData: ServiceItem[] = response.data.pageData
          .filter((item: any) => !item.isDeleted) // Remove deleted items
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

  const renderItem = ({ item }: { item: ServiceItem }) => (
    <TouchableOpacity
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
            {item.price.toLocaleString("vi-VN")} VND
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
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
      </View>

      {/* Services List */}
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  row: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 10,
    marginHorizontal: "1%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    borderRadius: 10,
    height: 150,
  },
  cardContent: {
    padding: 10,
  },
  artName: {
    fontWeight: "bold",
    marginTop: 5,
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
    color: "red",
  },
});

export default Service;
