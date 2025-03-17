import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";

const Row = ({ children, style }) => (
  <View style={[styles.row, style]}>{children}</View>
);

const Col = ({ children, style }) => (
  <View style={[styles.col, style]}>{children}</View>
);

const PregnancyTracker = () => {
  const fillAnimation = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  const totalDays = 280;
  const remainingDays = 100;
  const progress = (totalDays - remainingDays) / totalDays;
  const progressPercentage = Math.round(progress * 100);

  useEffect(() => {
    Animated.timing(fillAnimation, {
      toValue: progress,
      duration: 2000,
      useNativeDriver: false,
    }).start();
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>yumi2</Text>
      </View>

      <View style={styles.infoContainer}>
        <Row style={styles.infoRow}>
          <Col style={styles.iconCol}>
            <Row style={styles.infoRow}>
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
            </Row>
            <Row style={styles.progressContainer}>
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
            </Row>
          </Col>
          <Col style={styles.infoDetails}>
            <Text style={styles.infoText}>
              TUỔI THAI: <Text style={styles.bold}>2 tuần 0 ngày</Text>
            </Text>
            <Text style={styles.infoText}>
              CÂN NẶNG: <Text style={styles.bold}>- gram</Text>
            </Text>
            <Text style={styles.infoText}>
              DỰ SINH: <Text style={styles.bold}>8 tháng 12, 2025</Text>
            </Text>
            <Text style={styles.infoText}>
              CÒN LẠI: <Text style={styles.bold}>{remainingDays} ngày</Text>
            </Text>
          </Col>
        </Row>
      </View>

      {/* Feature Grid */}
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
  container: {
    flex: 1,
    backgroundColor: "#fbe8eb",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#f8bac7",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  col: {
    flex: 1,
    paddingHorizontal: 5,
  },
  heartContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    width: 60,
    height: 60,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  progressBarContainer: {
    flex: 1,
    height: 15,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
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
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
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
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
});

export default PregnancyTracker;
