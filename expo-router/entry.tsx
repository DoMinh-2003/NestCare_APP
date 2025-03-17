import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";

// Provide the context from require.context
export function App() {
  const context = require.context("../app"); // Ensure this path points to your `app` directory
  return <ExpoRoot context={context} />;
}

registerRootComponent(App);
