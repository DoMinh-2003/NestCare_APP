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
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import Signup from "@/screens/authScreens/Signup";
import Service from "@/screens/service/Service";
import DetailService from "@/screens/service/DetailService";
// Define Screens

// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home"; // Default

          const scale = new Animated.Value(focused ? 1.2 : 1);

          if (route.name === "Community") iconName = "people";
          else if (route.name === "Appointment") iconName = "calendar";
          else if (route.name === "Packages") iconName = "heart";
          else if (route.name === "Profile") iconName = "person";

          if (route.name === "Appointment") {
            return (
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: "#F37199",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 50,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                }}
              >
                <Ionicons name={iconName} size={size + 14} color="white" />
              </View>
            );
          }

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <Ionicons name={iconName} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: "#F37199",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", headerShown: false }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ title: "Community" }}
      />
      <Tab.Screen
        name="Appointment"
        component={Service}
        options={{ title: "Appointment" }}
      />
      <Tab.Screen
        name="Packages"
        component={Packages}
        options={{ title: "Packages" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <>
      <FlashMessage position="top" />
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailService"
          component={DetailService}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="tabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
