import React from "react";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function StatusBarScreen({ children, style }) {
  return (
    <SafeAreaView
      style={[styles.screen, style, { flex: 1, backgroundColor: "yellogreen" }]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

// use for setting status bar height
// cut off screen issue not solved
