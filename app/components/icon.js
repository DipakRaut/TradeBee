import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function icon({
  iconName,
  backgroundColor = "#ffe66d",
  size = 48,
  iconColor = "#fff",
}) {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={size * 0.5}
        color={iconColor}
      />
    </View>
  );
}

export default icon;

const styles = StyleSheet.create({});
