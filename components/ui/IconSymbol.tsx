import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name];

  if (!iconName) {
    console.warn(`Icon "${name}" is not mapped to a MaterialIcons name.`);
    return null;
  }

  return (
    <MaterialIcons color={color} size={size} name={iconName} style={style} />
  );
}
