import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Login from "@/screens/authScreens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "@/components/tabBar/TabBar";
import HomeScreen from "./index";
import TabTwoScreen from "./explore";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const HomeTabs = () => {
    return (
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: { height: 90 },
          tabBarItemStyle: { paddingTop: 10 },
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="explore"
          component={TabTwoScreen}
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="tabs"
        component={HomeTabs}
        options={{ headerShown: false, title: "tabs" }}
      />
    </Stack.Navigator>
  );
}
