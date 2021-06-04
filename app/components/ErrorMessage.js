import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

function ErrorMessage({ error }) {
  if (!error) return null;
  return <AppText style={styles.container}>{error}</AppText>;
}

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    color: "yellow",
    fontSize: 13,
  },
});
