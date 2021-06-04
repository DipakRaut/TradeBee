import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "./colors";

function AppButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.button, style]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDD835",
    width: "50%",
    padding: 8,
    borderRadius: 8,
    flexDirection: "column",
    marginVertical: 5,
    marginTop: 20,
  },
  button: {
    color: "#6D4C41",
    fontSize: 25,
  },
});
