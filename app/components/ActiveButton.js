import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "./colors";

function ActiveButton(props) {
  return (
    <View
      style={[
        buttonStyleSheet.buttonStyle,
        { ...props.style },
        { backgroundColor: props.isActive ? colors.disabled : colors.primary },
      ]}
    >
      <Text>{props.title}</Text>
    </View>
  );
}

const buttonStyleSheet = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: colors.disabled,
  },
});

export default ActiveButton;
