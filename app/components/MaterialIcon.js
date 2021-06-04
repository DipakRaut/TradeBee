import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function MaterialIcon({ onPress, name, size, color, style }) {
  return (
    <TouchableOpacity
      underlayColor="black"
      onPress={() => alert("Currently This function is under Development")}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default MaterialIcon;

const styles = StyleSheet.create({
  container: {},
});
