import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@/screens/home/Home";
import CommunityScreen from "@/screens/community/community";
import AppointmentsScreen from "@/screens/appointments/appointments";
import HealthTipsScreen from "@/screens/healthTips/healthTips";
import ProfileScreen from "@/screens/profile/profile";

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const CommunityStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Community"
      component={CommunityScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppointmentStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Appointment"
      component={AppointmentsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const HealthyTipsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Healthy Tips"
      component={HealthTipsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
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
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Community" component={CommunityStack} />
        <Tab.Screen name="Appointment" component={AppointmentStack} />
        <Tab.Screen name="Healthy Tips" component={HealthyTipsStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </>
  );
}
