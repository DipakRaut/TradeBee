import React from "react";
import { TouchableOpacity, Text } from "react-native";

function TextButton({ onPress, title, containerStyle, btnTextStyle }) {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Text style={btnTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default TextButton;
