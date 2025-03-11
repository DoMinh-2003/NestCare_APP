import TabBar from "@/components/tabBar/TabBar";
import AppointmentsScreen from "@/screens/appointments/appointments";
import Login from "@/screens/authScreens/Login";
import CommunityScreen from "@/screens/community/community";
import HomeScreen from "@/screens/home/Home";
import Packages from "@/screens/packages/Packages";
import ProfileScreen from "@/screens/profile/profile";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Animated, Text, View } from "react-native";
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
      name="Packages"
      component={Packages}
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

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="login"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          const scale = new Animated.Value(focused ? 1.2 : 1);

          if (route.name === "Community") iconName = "people";
          else if (route.name === "Healthy Tips") iconName = "heart";
          else if (route.name === "Profile") iconName = "person";

          if (route.name === "Appointment") {
            return (
              <View
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: "pink",
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
                <Ionicons name="calendar" size={36} color="white" />
              </View>
            );
          }

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <Ionicons name={iconName} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, fontSize: 12, fontWeight: "bold" }}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: "pink",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
        },
      })}
    >
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        component={HomeStack}
        options={{ headerShown: false, title: "(tabs)" }}
      />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="Appointment" component={AppointmentStack} />
      <Tab.Screen name="Healthy Tips" component={HealthyTipsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
