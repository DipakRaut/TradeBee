import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
// import colors from "./colors";

function AppTextInput({ iconName, style, width = "90%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }, style]}>
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput style={styles.text} {...otherProps} />
    </View>
  );
}

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    height: 50,
    padding: 15,
    marginVertical: 10,
  },
  text: {
    width: "100%",
    color: "black",
  },
});
