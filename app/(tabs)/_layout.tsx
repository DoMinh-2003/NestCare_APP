import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@/screens/home/Home";
import CommunityScreen from "@/screens/community/community";
import AppointmentsScreen from "@/screens/appointments/appointments";
import HealthTipsScreen from "@/screens/healthTips/healthTips";
import ProfileScreen from "@/screens/profile/profile";
import Packages from "@/screens/packages/Packages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import TabBar from "@/components/tabBar/TabBar";
import Login from "@/screens/authScreens/Login";
// Define Screens

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      // tabBar={(props) => <TabBar {...props} />}
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
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ title: "Community" }} />
      <Tab.Screen name="Appointment" component={AppointmentsScreen} options={{ title: "Appointment" }} />
      <Tab.Screen name="Healthy Tips" component={HealthTipsScreen} options={{ title: "Healthy Tips" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}