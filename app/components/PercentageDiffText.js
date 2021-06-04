import React, { useState } from "react";
import { Text, StyleSheet, View } from "react-native";

function PercentageDiffText({
  title,
  value,
  titleStyle,
  containerStyle,
  valueStyle,
}) {
  const differ = ":";

  const tempValue =
    typeof value === "undefined" || value === null ? "" : value.toString();

  const [isPositive, setDiff] = useState(!tempValue.includes("-"));

  value =
    typeof value === "undefined" || value === null
      ? "Not available"
      : value.toFixed(2).toString();

  return (
    <View style={[styles.containerStyle, { ...containerStyle }]}>
      <Text style={[{ ...titleStyle }]}>{title + differ}</Text>
      <Text
        style={[{ ...valueStyle }, { color: isPositive ? "green" : "red" }]}
      >
        {value + "%"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PercentageDiffText;
