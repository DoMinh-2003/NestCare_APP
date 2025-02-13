import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import SplashScreen from './components/SplashScreen';
import { useEffect, useState } from 'react';
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { StateProvider } from "@/context/stateProvider";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loaded) {
      setIsLoading(false);
    }

    // Simulate any initialization work
    const prepare = async () => {
      try {
        // Add any initialization logic here
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    };

    prepare();
  }, [loaded]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <GluestackUIProvider mode="light">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StateProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="oauthredirect" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </StateProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GluestackUIProvider>
  );
}
