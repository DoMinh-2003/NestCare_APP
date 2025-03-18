import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GetFetalRecord } from "@/service/userService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const PregnancyTracker = () => {
  const [fetalRecord, setFetalRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const fillAnimation = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const userId = useSelector((state: RootState) => state.user?.id);

  useEffect(() => {
    const fetchFetalRecord = async () => {
      try {
        const response = await GetFetalRecord(userId);
        if (response && Array.isArray(response)) {
          const activePregnancy = response.find(
            (record) => record.status === "PREGNANT"
          );
          setFetalRecord(activePregnancy || null);
        }
      } catch (error) {
        console.error("Error fetching fetal record:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFetalRecord();
  }, [userId]);

  useEffect(() => {
    if (fetalRecord) {
      const totalDays = 286;
      const pregnancyStart = new Date(fetalRecord.dateOfPregnancyStart);
      const today = new Date();
      const elapsedDays = Math.floor(
        (today - pregnancyStart) / (1000 * 60 * 60 * 24)
      );
      const progressValue = elapsedDays / totalDays;

      setProgress(progressValue);
    }
  }, [fetalRecord]);

  useEffect(() => {
    if (progress > 0) {
      Animated.timing(fillAnimation, {
        toValue: progress,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }
  }, [progress]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  if (!fetalRecord) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No pregnancy records found.</Text>
      </View>
    );
  }

  const { dateOfPregnancyStart, expectedDeliveryDate, healthStatus, name } =
    fetalRecord;

  const pregnancyStart = new Date(dateOfPregnancyStart);
  const expectedDueDate = new Date(expectedDeliveryDate);
  const today = new Date();

  const elapsedDays = Math.floor(
    (today - pregnancyStart) / (1000 * 60 * 60 * 24)
  );
  const remainingDays = Math.max(286 - elapsedDays, 0);
  const progressPercentage = Math.round(progress * 100);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>{name}</Text>
      </View>

      {/* Row with Heart Animation & Progress Bar + Info Details */}
      <View style={styles.row}>
        {/* Left Column: Heart Animation & Progress Bar */}
        <View style={styles.leftColumn}>
          <View style={styles.heartContainer}>
            <Animated.View
              style={[
                styles.iconWrapper,
                { transform: [{ scale: heartScale }] },
              ]}
            >
              <FontAwesome name="heart" size={60} color="#e74c3c" />
            </Animated.View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: fillAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.percentageText}>{progressPercentage}%</Text>
          </View>
        </View>

        {/* Right Column: Pregnancy Details */}
        <View style={styles.rightColumn}>
          <Text style={styles.infoText}>
            TUỔI THAI:{" "}
            <Text style={styles.bold}>
              {Math.floor(elapsedDays / 7)} tuần {elapsedDays % 7} ngày
            </Text>
          </Text>
          <Text style={styles.infoText}>
            SỨC KHỎE: <Text style={styles.bold}>{healthStatus}</Text>
          </Text>
          <Text style={styles.infoText}>
            DỰ SINH:{" "}
            <Text style={styles.bold}>
              {expectedDueDate.toLocaleDateString()}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            CÒN LẠI: <Text style={styles.bold}>{remainingDays} ngày</Text>
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Image
            source={{
              uri: "https://megaweb.vn/blog/uploads/images/share-la-gi.jpg",
            }}
            style={styles.icon}
          />
          <Text style={styles.cardText}>Góc chia sẻ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="footprint" size={40} color="#61a5f1" />
          <Text style={styles.cardText}>Theo dõi số lần đạp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="weight" size={40} color="#61a5f1" />
          <Text style={styles.cardText}>Cân nặng mẹ bầu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Icon name="book" size={40} color="#61a5f1" />
          <Text style={styles.cardText}>Kiến thức thai kỳ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fbe8eb" },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f8bac7",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  appTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  row: { flexDirection: "row", justifyContent: "space-between", padding: 20 },
  leftColumn: { width: "50%", alignItems: "center" },
  rightColumn: { width: "50%" },

  rightColumn2: { width: "50%", flexDirection: "row" },

  progressContainer: {
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
  },
  progressBarContainer: {
    width: "80%",
    height: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#e74c3c",
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    marginLeft: 5,
  },
  infoText: { fontSize: 16, color: "#333", marginBottom: 5 },
  bold: { fontWeight: "bold" },
  heartContainer: {
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
  },
  icon: { width: 40, height: 40, marginBottom: 10 },
  cardText: { fontSize: 14, textAlign: "center", color: "#333" },
});

export default PregnancyTracker;
