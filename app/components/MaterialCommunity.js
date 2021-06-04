import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function MaterialCommunity({ onPress, name, size, color, selectionColor }) {
  return (
    <TouchableOpacity
      underlayColor="black"
      onPress={() => alert("Currently This function is under Development")}
    >
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        selectionColor={selectionColor}
      />
    </TouchableOpacity>
  );
}

export default MaterialCommunity;

const styles = StyleSheet.create({
  container: {},
});
