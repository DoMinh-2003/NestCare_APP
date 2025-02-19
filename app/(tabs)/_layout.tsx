import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Screens
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Welcome to Pregnancy Care Home</Text>
  </View>
);

const CommunityScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Join our Community</Text>
  </View>
);

const AppointmentScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Manage Your Appointments</Text>
  </View>
);

const HealthyTipsScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Healthy Tips for Pregnant Mothers</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Your Profile</Text>
  </View>
);

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home"; // Default
            const scale = new Animated.Value(focused ? 1.2 : 1);

            if (route.name === "Community") iconName = "people";
            else if (route.name === "Appointment") iconName = "calendar";
            else if (route.name === "Healthy Tips") iconName = "heart";
            else if (route.name === "Profile") iconName = "person";

            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons name={iconName} size={size} color={color} />
              </Animated.View>
            );
          },
          tabBarActiveTintColor: "pink",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Appointment" component={AppointmentScreen} />
        <Tab.Screen name="Healthy Tips" component={HealthyTipsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
}
